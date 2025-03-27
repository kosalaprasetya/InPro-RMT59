import { useEffect } from "react";
import { useNavigate } from "react-router";
import http from "../helpers/http";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
}) {

  const navigate = useNavigate();
  async function handleCredentialResponse(response) {
    try {
          const res = await http({
            url: "/auth/googlelogin",
            method: "POST",
            data:{
              googleToken: response.credential
            }
          })
          localStorage.setItem('access_token', res.data["access_token"]);
          navigate("/");
        } catch (error) {
          console.error(error);
        }
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
          <label htmlFor="email1" className="text-white ">Your email</label>
        </div>
        <input
          id="email1"
          type="email"
          placeholder="name@mail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="text-white bg-gray-600 p-2 rounded-md w-full"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <label htmlFor="password1" className="text-white ">Your password</label>
        </div>
        <input
          id="password1"
          type="password"
          required
          placeholder="your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-white bg-gray-600 p-2 rounded-md w-full"
        />
      </div>
      
      <button type="submit" className="cursor-pointer bg-sky-600 text-white font-medium rounded-md p-2 hover:bg-sky-800">Submit</button>

      <div id="google-login" className="w-full text-center">
      </div>
    </form>
  );
}
