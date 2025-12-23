import RegisterForm from "@/app/ui/registerForm";
import Link from "next/link";
import routes from "@/app/lib/routes";

export default function Page() {
  return (
    <div className="w-125">
      <h2 className="text-center">Create account</h2>
      <p className="subtle-text text-center mt-2 mb-4">
        Join us and unlock for potential of our blog.
      </p>
      {RegisterForm()}
      <p className="subtle-text text-center mt-5">
        Don't have an account?
        <Link className="pl-1" href={routes.login}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
