import { ChartBarIcon, PencilAltIcon, UserIcon } from "@heroicons/react/outline";


const Features = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
      <div className="flex flex-col space-y-10 max-w-4xl">
        <div className="flex items-center space-x-6">
          <ChartBarIcon className="w-16 h-16 text-purple-500" />
          <div>
            <h3 className="text-xl font-semibold">Analytics</h3>
            <p>Monitor the performance of your flashcards and optimize learning.</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <PencilAltIcon className="w-16 h-16 text-purple-500" />
          <div>
            <h3 className="text-xl font-semibold">Custom Forms</h3>
            <p>Create your own flashcards with our easy-to-use custom forms.</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <UserIcon className="w-16 h-16 text-purple-500" />
          <div>
            <h3 className="text-xl font-semibold">User Management</h3>
            <p>Manage your account settings and preferences effortlessly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;