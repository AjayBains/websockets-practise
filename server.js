import { WebSocketServer ,WebSocket} from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket,request) => {
  const ip = request.socket.remoteAddress;
  console.log(`New connection from ${ip}`);

  socket.on("message", (rawData) => {
    console.log({rawData})
    console.log({rawDatatoString:rawData.toString()})
    console.log(`Received message from ${ip}: ${rawData}`);
    const message = rawData.toString();
    console.log(`Processed message from ${ip}: ${message}`);
    // Echo the message back to the client
    // socket.send(`Server received: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Broadcast from ${ip}: ${message}`);
      }
  });

});
socket.on("error", (error) => {
    console.error(`Error on connection from ${ip}:`, error);
  });
  
  socket.on("close", () => {
    console.log(`Connection from ${ip} closed`);
  });
})

console.log("WebSocket server is running on ws://localhost:8080");