import { Button } from "@/components";
import React from "react";
import { useFormStatus } from "react-dom";

export const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className={pending ? "" : "ripple"}>
      {pending ? "Ачаалж байна..." : "Нэвтрэх"}
    </Button>
  );
};

export default SignInButton;
