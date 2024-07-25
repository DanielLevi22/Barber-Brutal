import UserForm from "@/components/user/user-form";
import { Suspense } from "react";

export default function SignIn() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <UserForm />
    </Suspense>
  )
}