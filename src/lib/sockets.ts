import { io } from "socket.io-client";
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
   transports: ['websocket'], // Solo usar websockets evita el uso de polling 
   autoConnect: false,
})
export const connectSocket = () => {
   const token = localStorage.getItem('token')
   if (!token) {
      console.warn("⚠ No se pudo conectar a WebSocket: Token no encontrado.");
      return
   }
   
   if (!socket.connected) {
      socket.auth = { token }
      socket.connect()
   }
   socket.on("connect", () => {
      console.log("✅ Conectado a WebSocket con ID:", socket.id);
   });

   socket.on("disconnect", (reason) => {
      console.warn("❌ WebSocket desconectado:", reason);
   });

   socket.on("connect_error", (error) => {
      console.error("⚠ Error de conexión WebSocket:", error.message);
   });
}
export const disconnectSocket = () => {
   if (socket.connected) {
      socket.disconnect();
      console.log("❌ Socket desconectado.");
   }
};