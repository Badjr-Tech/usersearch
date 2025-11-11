"use client";

import { useFormState } from "react-dom";
import { login } from "./actions";

type FormState = {
  error: string;
} | undefined;

export default function LoginPage() {
  const [state, formAction] = useFormState<FormState, FormData>(login, undefined);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-dark-foreground text-center mb-8">Login</h1>
        <p className="text-center text-dark-foreground mb-6">
          Enter your credentials to access your account.
        </p>
        <form action={formAction} className="space-y-6">
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
                autoComplete="current-password"
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
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}