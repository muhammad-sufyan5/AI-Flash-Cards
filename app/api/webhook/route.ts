import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/backend/db/firbase.config";
// import {
//   createUserByClerk,
//   updateUserByClerk,
//   deleteUserByClerkId,
// } from "@/database/actions.db";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  if (evt.type === "user.created") {
    console.log("userId:", evt.data.id);
  }
  if (eventType == "user.created") {
    const { username, email_addresses, first_name, last_name, image_url, id } =
      evt.data;

    const newUser = {
      clerkId: id,
      name: `${first_name + " " + last_name}`,
      username: username as string,
      email: email_addresses[0].email_address,
      picture: image_url,
    };

    const collectionRef = collection(db, "users");
    const createdUser = await addDoc(collectionRef, newUser);

    if (createdUser)
      return NextResponse.json({ status: "ok", user: createdUser });
    return NextResponse.json({ status: "error" });
  }
  if (eventType == "user.updated") {
    const { username, email_addresses, first_name, last_name, image_url, id } =
      evt.data;

    const toUpdate = {
      name: `${first_name + " " + last_name}`,
      username: username as string,
      email: email_addresses[0].email_address,
      picture: image_url,
    };

    const user = query(collection(db, "user"), where("clerkId", "==", id));

    const docs = await getDocs(user);
    docs.forEach((docc) => {
      console.log(docc.id, " => ", docc.data());
      updateDoc(doc(db, "user", docc.id), toUpdate);
      if (docc.data())
        return NextResponse.json({ status: "deleted", user: docc.data() });
    });

    return NextResponse.json({ status: "error" });
  }

  if (eventType == "user.deleted") {
    const { id } = evt.data;
    const user = query(collection(db, "user"), where("clerkId", "==", id));

    const docs = await getDocs(user);
    docs.forEach((docc) => {
      console.log(docc.id, " => ", docc.data());
      deleteDoc(doc(db, "user", docc.id));
      if (docc.data())
        return NextResponse.json({ status: "deleted", user: docc.data() });
      return NextResponse.json({ status: "error" });
    });
  }

  return new Response("", { status: 200 });
}
