import socketio from 'socket.io-client';

const API_URL = 'http://localhost:3333';

const socket = socketio(API_URL, {
  autoConnect: false,
})

const connect = (token) => {
  socket.io.opts.query = {
    authorization: token,
  }
  socket.connect();
}

const disconnect = () => {
  if(socket.connected) {
    socket.disconnect()
  }
}

export function addListener({ type, callback }) {
  return socket.on(type, callback);
}

export function removeListener({ type, listener }) {
  socket.off(type, listener);
}

export { connect, disconnect }