import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3030";
const socket = socketIOClient(ENDPOINT);
export default socket;
