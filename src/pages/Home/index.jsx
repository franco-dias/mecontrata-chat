import React, { useEffect } from 'react';
import * as moment from 'moment';

import { withChatConsumer } from '../../contexts/ChatContext'; 
import {
  Container,
  Header,
  RoomList,
  Room,
} from './style';
import { addListener, removeListener } from '../../resources/websocket';

const Home = ({ history, getRooms, rooms }) => {

  useEffect(() => {
    getRooms();
    const listener = addListener({
      type: 'NEW_MESSAGE',
      callback: () => getRooms()
    });
    return () => removeListener('NEW_MESSAGE', listener);
  }, [getRooms])

  console.log({ rooms })

  return (
    <Container>
      <Header />
      <RoomList>
        {rooms.map(room => {
          const { seen, isOwnMessage, text } = room?.lastMessage;
          const unseen = !seen && !isOwnMessage;
          return (
            <Room key={room.roomId} onClick={() => history.push(`/room/${room.roomId}`)}>
              <img src={`http://localhost:3333/${room?.user[0]?.avatar?.url}`} alt="avatar" />
              <div>
                <span> {room.title} </span>
                {unseen
                  ? <b> {text} </b>
                  : <p> {isOwnMessage && 'Você: '} {text} </p>
                }
                <span className="date"> {moment(room.updatedAt).format('DD/MM - HH:mm')} </span>
              </div>
            </Room>
          )
        })}
      </RoomList>
    </Container>
  )
}

export default withChatConsumer(Home);
