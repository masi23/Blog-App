import LoginForm from "@/app/ui/loginForm";
import Link from "next/link";
import routes from "@/app/lib/routes";

export default function Page() {
  return (
    <div className="w-125">
      <h2 className="text-center">Log In</h2>
      <p className="subtle-text text-center mb-4 mt-2">
        Enter your e-mail and password to access your account.
      </p>
      <LoginForm></LoginForm>
      <p className="subtle-text text-center mt-5">
        Don't have an account?
        <Link className="pl-1" href={routes.register}>
          Sign up
        </Link>
      </p>
    </div>
  );
}
