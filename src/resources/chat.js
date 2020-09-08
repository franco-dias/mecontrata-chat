import api from './api';

const ChatApi = {
  async listRooms() {
    return api.get('/chat/room')
  },
  async getRoomDetails({ roomId }) {
    return api.get(`/chat/room/${roomId}`)
  },
  async getMessages({ roomId }) {
    return api.get(`/chat/message/room/${roomId}`);
  },
  async sendMessage({ text, roomId }) {
    return api.post('/chat/message', {
      text,
      roomId,
    })
  },
  async checkRoomAsSeen({ roomId }) {
    return api.put(`/chat/message/room/${roomId}`);
  }
}

export default ChatApi;