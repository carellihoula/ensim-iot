import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center  h-full px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md">
        <h2 className="text-4xl font-bold text-red-600 mb-4">404</h2>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
