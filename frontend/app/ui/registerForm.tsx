export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-2">
      <label htmlFor="username-input">Username</label>
      <input type="text" id="username-input" />
      <label htmlFor="email-input">E-mail</label>
      <input type="text" id="email-input" />
      <label htmlFor="password-input">Password</label>
      <input type="password" id="password-input" />
      <label htmlFor="password-check-input">Confirm password</label>
      <input type="password" id="password-check-input" />
      <button type="submit" className="self-end">
        Register
      </button>
    </form>
  );
}
