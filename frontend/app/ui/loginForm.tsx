export default function LoginForm() {
  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="email-input">E-mail</label>
      <input type="text" id="email-input" />
      <label htmlFor="password-input">Password</label>
      <input type="password" id="password-input" />
      <button type="submit" className="self-end">
        Login
      </button>
    </form>
  );
}
