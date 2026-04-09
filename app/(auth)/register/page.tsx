"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { push } = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value,
    };

    const result = await fetch("api/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await result.json();

    if (result.ok) {
      form.reset();
      setIsLoading(true);
      push("/login");
    } else {
      setIsLoading(false);
      setError(res.message);
    }
  };
  return (
    <div className="flex min-h-screen w-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
          Sign Up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error ? <p className="text-center text-red-500">{error}</p> : ""}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="block text-sm/6 font-medium ">
              Fullname
            </label>
            <div className="mt-2">
              <input
                id="fullname"
                type="fullname"
                name="fullname"
                required
                className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium ">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm/6 font-medium ">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                type="text"
                name="phone"
                required
                autoComplete="mobile tel"
                className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium "
              >
                Password
              </label>{" "}
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium "
              >
                Confirm Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="Password"
                name="confirmPassword"
                required
                autoComplete="current-Password"
                className="block w-full rounded-md bg-black/10 px-3 py-1.5 text-base  outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold  hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-400">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
