import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = ({ path, url }: { path?: string; url: string }) => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketio = io(url, {
      transports: ["websocket"],
    });
    setSocket(socketio);
    return () => {
      socketio.disconnect();
      // socketio.off();
    };
  }, [path, url]);

  return socket;
};
