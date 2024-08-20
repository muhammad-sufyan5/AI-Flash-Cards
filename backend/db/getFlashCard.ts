"use server";
import {
  query,
  collection,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "./firbase.config";

// export async function getFlashCard() {
//   const fcRef = query(
//     collection(db, "flashcards"),
//     where("front", "==", "What is buoyancy?")
//   );
//   const fc = await getDocs(fcRef);
//   fc.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }
export async function getFlashCard() {
  const fcRef = doc(collection(db, "flashcards"), "gMGBNif9Bb0qA1c41A04");
  const fc = await getDoc(fcRef);
  console.log(fc.data());
}
// export async function getFlashCard() {
//   const user = query(
//     collection(db, "flashcards"),
//     where("id", "==", "gMGBNif9Bb0qA1c41A04")
//   );
//   const docs = await getDocs(user);
//   docs.forEach((doc) => {
//     console.log("one");
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }
