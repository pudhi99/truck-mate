import * as React from "react";

export const EmailTemplate = ({ firstName, otp }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
    <div className="text-center">
      <img
        src="https://truck-mate.vercel.app/_next/image?url=%2Flogopng.png&w=64&q=75"
        alt="Truck-Mate Logo"
        className="mx-auto mb-4 h-16"
      />
      <h1 className="text-3xl font-bold text-blue-600">
        Welcome to Truck-Mate, {firstName}!
      </h1>
      <p className="mt-2 text-lg text-gray-700">
        We are excited to have you on board.
      </p>
    </div>
    {otp && (
      <div className="mt-6 text-center">
        <p className="text-xl text-gray-900 font-semibold">Your OTP Code:</p>
        <div className="mt-2 inline-block bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded-md text-3xl tracking-widest">
          {otp}
        </div>
      </div>
    )}
    <div className="mt-6 text-center">
      <p className="text-gray-700">Click the link below to get started:</p>
      <a
        href="https://truck-mate.vercel.app/"
        className="mt-2 inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Visit Truck-Mate
      </a>
    </div>
    <div className="mt-6 text-center text-gray-500 text-sm">
      <p>
        If you have any questions, feel free to contact us at
        support@truck-mate.com.
      </p>
      <p className="mt-2">&copy; 2024 Truck-Mate. All rights reserved.</p>
    </div>
  </div>
);
