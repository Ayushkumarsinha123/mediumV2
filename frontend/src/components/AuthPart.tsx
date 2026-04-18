export const AuthPart = () => {
  return (
    <div className="bg-white h-svh flex flex-col items-center justify-center">
      <p className="font-bold text-3xl">Create an account</p>
      <p>
        Already have an account?
        <a href="/login" className="text-slate-500 underline">
          login
        </a>
      </p>
      <div className="mt-2 w-80">
        <p className="text-left text-black font-bold">Username</p>
        <input className="border-slate-400 border-2 w-full p-2 rounded"></input>
        <p className="text-left text-black font-bold">Email</p>
        <input className="border-slate-400 border-2 w-full p-2 rounded"></input>
        <p className="text-left text-black font-bold">Password</p>
        <input className="border-slate-400 border-2 w-full p-2 rounded"></input>
        <button className="bg-black text-white w-full border-2 rounded mt-2 p-2">Sign up</button>
      </div>
      
    </div>
  );
}