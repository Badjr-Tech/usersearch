import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-light-background flex flex-col justify-center items-center">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
          USER PORTAL
        </h1>
        <p className="text-lg text-[var(--foreground)] mb-8">
          Your one-stop destination for amazing things.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="px-6 py-3 bg-secondary-accent text-white font-semibold rounded-lg shadow-md hover:bg-secondary-accent transition-colors">
            Login
          </Link>
          <Link href="/create-account" className="px-6 py-3 bg-secondary-accent text-white font-semibold rounded-lg shadow-md hover:bg-secondary-accent transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}