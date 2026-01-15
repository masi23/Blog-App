"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { AuthApi } from "../lib/api/auth.api";
import type { UserStatus } from "../lib/types";
import { Verify } from "../lib/api/verifyToken";

export default function NavbarAccount() {
  const [userStatus, setUserStatus] = useState<UserStatus>({
    authenticated: false,
  });
  useEffect(() => {
    const verifyToken = async () => {
      const status = await Verify.verifyToken();
      setUserStatus(status);
    };
    verifyToken();
  }, []);
  //   const success = fetchVerify();
  //   const [userLogged, setUserLogged] = useState(false);
  //   useEffect(() => {
  //     const fetchVerify = async () => {
  //       const { success } = await AuthApi.verifyToken();
  //       setUserLogged(success);
  //     };
  //     fetchVerify();
  //   }, []);

  if (userStatus.authenticated) {
    return (
      <div>
        <Link
          className="text-white hover:text-blue-500 transition-colors duration-200"
          href="/users"
        >
          My profile
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Link href="/auth/login">Sign in</Link>
        </div>
        <div className="bg-blue-700 hover:bg-blue-900 text-white">
          <Link href="/auth/register">Register</Link>
        </div>
      </div>
    );
  }
}
