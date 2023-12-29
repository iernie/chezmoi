"use client";

import { createClient } from "@/utils/supabase/client";
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

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
        nonce: "NONCE", // must be the same one as provided in data-nonce (if any)
      });
    }
    globalThis.handleSignInWithGoogle = handleSignInWithGoogle;
  }, []);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id="317966960400-25c9s3kttkstji6j0p5l9rir3j9h2cj4.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
      ></div>

      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </>
  );
};

export default Login;
