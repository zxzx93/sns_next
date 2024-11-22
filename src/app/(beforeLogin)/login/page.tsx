"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Main from "@/app/(beforeLogin)/_component/Main";
import { useEffect } from "react";

function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    router.replace("/i/flow/login");
  }, [router]);

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  return <Main />;
}

export default Login;
