import Image from "next/image";
import Link from "next/link";

export const AuthHeader = () => {
  return (
    <header className="flex items-center justify-center py-12">
      <Link href={"/"}>
        <Image width={168} height={42} alt="Logo" src="/assets/logo.png" />
      </Link>
    </header>
  );
};
// const LeftIcon = () => (
//   <svg
//     width="64"
//     height="64"
//     viewBox="0 0 64 64"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
//       stroke="black"
//       strokeWidth="2"
//       strokeMiterlimit="10"
//     />
//     <path
//       d="M32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
//       stroke="white"
//       stroke-opacity="0.7"
//       strokeWidth="2"
//       strokeMiterlimit="10"
//     />
//     <path
//       d="M30.475 40.4754L22 32.0004L30.475 23.5254"
//       stroke="black"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M30.475 40.4754L22 32.0004L30.475 23.5254"
//       stroke="white"
//       stroke-opacity="0.7"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M22 32H42"
//       stroke="black"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M22 32H42"
//       stroke="white"
//       stroke-opacity="0.7"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );
