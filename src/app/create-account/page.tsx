"use client";

import { useFormState } from "react-dom";
import { createAccount, FormState } from "./actions";

export default function CreateAccountPage() {
  const [state, formAction] = useFormState<FormState, FormData>(createAccount, undefined);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-dark-foreground text-center mb-8">Create an Account</h1>
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-dark-foreground">
              Name
            </label>
            <div className="mt-1">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none block w-full px-3 py-2 border border-light-gray rounded-md shadow-sm placeholder-light-gray focus:outline-none focus:ring-primary-accent focus:border-primary-accent sm:text-sm text-dark-foreground"
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-dark-foreground">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                className="appearance-none block w-full px-3 py-2 border border-light-gray rounded-md shadow-sm placeholder-light-gray focus:outline-none focus:ring-primary-accent focus:border-primary-accent sm:text-sm text-dark-foreground"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-dark-foreground">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-light-gray rounded-md shadow-sm placeholder-light-gray focus:outline-none focus:ring-primary-accent focus:border-primary-accent sm:text-sm text-dark-foreground"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-dark-foreground">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-light-gray rounded-md shadow-sm placeholder-light-gray focus:outline-none focus:ring-primary-accent focus:border-primary-accent sm:text-sm text-dark-foreground"
              />
            </div>
          </div>
          {state?.error && <p className="text-red-600 text-sm">{state.error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#476c2e] hover:bg-secondary-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#476c2e]"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
