import Image from "next/image";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header className="flex items-center justify-center py-6">
      <Link href={"/"}>
        <Image width={168} height={42} alt="Logo" src="/assets/logo.png" />
      </Link>
    </header>
  );
};
