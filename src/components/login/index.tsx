import { useState } from "react";
import { useNavigate } from "react-router-dom";

export let user: any;
export function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  function handleLogin() {
    // socket.emit("user-joined",);
    user = { name, id: new Date().toISOString() };
    navigate("/chat");
    // alert(``);
  }
  return (
    <div className='grid gap-[2rem]'>
      <img
        src='/chat-red-logo.png'
        alt='logo'
        className='w-[20rem] h-[20rem]'
      />
      <h2 className=' text-[2rem] border-b-2'>Login to Chat</h2>
      <div className='flex flex-col justify-center w-[20rem]  gap-[1rem]'>
        <input
          type='text'
          className='h-[4rem] p-[1rem] text-[1.4rem]'
          placeholder='Enter your name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button
          className='h-[4rem] bg-red-700 text-[1.4rem]'
          onClick={(e) => {
            !name ? e.preventDefault() : handleLogin();
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
