import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import _cloneDeep from 'lodash.clonedeep';

import { useAuth } from './AuthContext';
import ChatApi from '../resources/chat';

import { connect, disconnect, addListener } from '../resources/websocket'; 

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const { authenticated } = useAuth();
  const [rooms, setRooms] = useState([]);

  const getRooms = useCallback(() => {
    ChatApi.listRooms()
      .then(({ data }) => {
        setRooms(data)
      })
  }, [])
  
  const checkRoomAsSeen = useCallback((roomId) => {
    if(roomId) {
      ChatApi.checkRoomAsSeen({ roomId })
    }
  }, [])

  useEffect(() => {
    if(authenticated) {
      const token = localStorage.getItem('token');
      connect(token);
      getRooms();
    }
    window.addEventListener('beforeunload', e => {
      disconnect();
    });
    return () => disconnect()

  }, [authenticated, getRooms])

  return (
    <ChatContext.Provider
      value={{
        rooms,
        checkRoomAsSeen,
        getRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

const withChatConsumer = (WrappedComponent) => (props) => (
  <ChatContext.Consumer>
    {(value) => (
      <WrappedComponent {...props} {...value} />
    )}
  </ChatContext.Consumer>
)

export { withChatConsumer };
export default ChatProvider;