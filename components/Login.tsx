"use client";

import { createClient } from "@/utils/supabase/client";
import Script from "next/script";
import { useEffect } from "react";

export const runtime = "edge";

declare global {
  function handleSignInWithGoogle(response: any): void;
}

const Login = () => {
  useEffect(() => {
    async function handleSignInWithGoogle(response: any) {
      console.log(response);
      const supabase = createClient();

      await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });
    }
    globalThis.handleSignInWithGoogle = handleSignInWithGoogle;
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" defer />
      <div
        id="g_id_onload"
        data-client_id="317966960400-25c9s3kttkstji6j0p5l9rir3j9h2cj4.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-nonce=""
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
      ></div>
    </>
  );
};

export default Login;
