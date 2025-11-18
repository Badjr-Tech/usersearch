import Link from "next/link";
import Image from "next/image";
import WhitelabelButton from "./components/WhitelabelButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-20">
      <Image
        src="/green.png"
        alt="Badjr Logo"
        width={400}
        height={400}
        className="mb-8"
      />
      <h1 className="text-5xl font-extrabold text-foreground mb-4">
        Welcome to Badjr
      </h1>
      <p className="text-xl text-foreground mb-10">
        Your all-in-one platform for business management and growth.
      </p>
      <div className="flex space-x-6">
        <WhitelabelButton href="/login">
          Login
        </WhitelabelButton>
        <WhitelabelButton href="/request-account">
          Request Account
        </WhitelabelButton>
      </div>
    </div>
  );
}
