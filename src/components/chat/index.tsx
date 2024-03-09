import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useSocket } from "../../hooks/use-socket";
import { constant } from "../constant";
import { user } from "../login";
import { Message } from "../message";

export function Chat() {
  const [text, setText] = useState("");
  const [socketid, setSocketID] = useState("");
  const socket = useSocket({ url: constant.SOCKET_URL });
  const [messages, setMessages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("connected successfully");
        console.log("soket-id", socket.id);
        setSocketID(user.id);
      });
      socket.emit("joined", user);

      socket.on("user-joined", (data) => {
        console.log("data", data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("all-message", (data) => {
        // console.log("all", data);
        setMessages(data);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (data) => {
        // console.log("final-message", data);
        setMessages(data);
      });
    }
    // return () => {
    //   if (socket) {
    //     socket.off();
    //   }
    // };
  }, [socket, messages]);

  function submit() {
    socket.emit("send-message", { text, user });
    // console.log("inside-form");
    setText("");
  }

  // console.log("message", messages, { socketid }, socket);

  if (!user) {
    navigate("/login");
    return <>loading...</>;
  }
  return (
    <>
      <div>
        let's start
        <div className='min-w-[50rem] bg-white h-[60vh]'>
          <div className='bg-red-700 h-[5rem]'>{user.name}</div>
          <ReactScrollToBottom className=' h-[calc(60vh-10rem)] '>
            <div className='p-[1rem] flex flex-col gap-[1rem]'>
              {messages?.map((data: any, index: number) => {
                return (
                  <Message
                    data={data}
                    key={index}
                    id={socketid}
                  />
                );
              })}
            </div>
          </ReactScrollToBottom>
          <div className='border-t-2 h-[5rem] flex gap-[.8rem]'>
            <input
              type='text'
              value={text}
              placeholder='message...'
              onChange={(e) => {
                setText(e.target.value);
              }}
              className='bg-transparent text-[1.4rem] w-full p-[1rem] text-neutral-600  '
            />
            <button
              onClick={() => {
                submit();
              }}
              className='bg-red-600 hover:bg-red-700 text-[1.4rem] w-[10rem] !rounded-[0px]'
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
