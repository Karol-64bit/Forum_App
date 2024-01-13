"use client"

import Link from 'next/link'
import React, {useState} from 'react'
import { useRouter } from "next/navigation";

const RegisterForm = () => {

    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
  
    const handleChange = (e) => {
      const value = e.target.value;
      const name = e.target.name;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      const res = await fetch("/api/Users", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "content-type": "application/json",
      });
  
      if (!res.ok) {
        const response = await res.json();
        setErrorMessage(response.message);
      } else {
        router.refresh();
        router.push("/Login");
      }
    };

  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden mt-20">
            <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold text-center text-gray-700">Rejestracja</h1>
                <form className="mt-6">

                <div className="mb-4">
                    <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                    >
                    Nazwa użytkownika
                    </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleChange}
                    value={formData.name}
                    />
                </div>

                <div className="mb-2">
                    <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-800"
                    >
                    Email
                    </label>
                    <input
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleChange}
                    value={formData.email}
                    />
                </div>

                <div className="mb-2">
                    <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-800"
                    >
                    Hasło
                    </label>
                    <input
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleChange}
                    value={formData.password}
                    />
                </div>

                <p className='text-red-400'>{errorMessage}</p>

                <div className="mt-8">
                    <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        onClick={handleSubmit}
                    >
                    Zarejestruj się
                    </button>
                </div>
                </form>


                <p className="mt-4 text-sm text-center text-gray-700">
                {"Masz już konto?  "}
                <Link
                    href="/Login"
                    className="font-medium text-blue-600 hover:underline"
                >
                    Zaloguj się
                </Link>
                </p>
            </div>
        </div>
  )
}

export default RegisterForm
