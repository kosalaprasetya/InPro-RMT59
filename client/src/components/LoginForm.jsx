import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) {

  function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
  }

  useEffect(() => {  
        google.accounts.id.initialize({
          client_id: "199258532213-eulv0rk3khjv8c7jjbta0nch24h72pjm.apps.googleusercontent.com",
          callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("google-login"),
          { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt()
    
  }, []);
  return (
    <form className="flex w-md flex-col gap-4 p-4" onSubmit={handleLogin}>
      <div className="title">
        <h2 className="text-center text-xl font-bold text-white">
          Train Scheduler
        </h2>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1">Your email</Label>
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@mail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1">Your password</Label>
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      
      <Button type="submit" className="cursor-pointer">Submit</Button>

      <div id="google-login" className="w-full text-center">
      </div>
    </form>
  );
}
