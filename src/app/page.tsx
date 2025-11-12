import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center">
      <Image
        src="/heightenthehustlelogo small copy.png"
        alt="Heighten The Hustle Logo"
        width={200}
        height={200}
        className="mb-8" // Add some margin below the logo
      />
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          USER PORTAL
        </h1>
        <p className="text-lg text-foreground mb-8">
          Your one-stop destination for amazing things.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-primary transition-colors">
            Login
          </Link>
          <Link href="/create-account" className="px-6 py-3 bg-secondary text-white font-semibold rounded-lg shadow-md hover:bg-primary transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
