import React, { useState, useEffect, useRef, memo } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { Formik } from 'formik';
import { MdKeyboardBackspace } from 'react-icons/md';
import * as moment from 'moment';
import * as yup from 'yup';

import { useAuth } from '../../contexts/AuthContext';
import ChatApi from '../../resources/chat';
import { withChatConsumer } from '../../contexts/ChatContext';
import {
  Container,
  Header,
  Photo,
  Name,
  MessageContainer,
  Message,
  Balloon,
  MessageDate,
  InputArea,
  Input,
  Button,
} from './style';
import { addListener, removeListener } from '../../resources/websocket';

const validationSchema = yup.object().shape({
  text: yup.string().required(),
})

const Room = ({ match, history, checkRoomAsSeen }) => {
  const scrollViewRef = useRef(null)
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const { userData } = useAuth();

  const roomId = match.params.id;
  
  useEffect(() => {
    ChatApi.getRoomDetails({ roomId })
      .then(({ data }) => {
        setCurrentRoom(data)
        setMessages(data.messages)
      })
    checkRoomAsSeen(roomId)
  }, [checkRoomAsSeen, roomId]);

  useEffect(() => {
    const listener = addListener({
      type: 'NEW_MESSAGE',
      callback: message => {
        if(message.roomId === roomId) {
          setMessages(prev => ([
            ...prev,
            message,
          ]))
          // tentar resolver problema de marcar mensagens como lidas
          checkRoomAsSeen(roomId)
        }
      }
    })

    return () => removeListener('NEW_MESSAGE', listener)
  }, [checkRoomAsSeen, roomId])

  const ownMessage = message => message && message.userId === userData?.id

  const handleSubmit = ({ text }) => {
    ChatApi.sendMessage({ text, roomId })
  }

  const {
    title,
    user,
  } = currentRoom || {};

  return (
    <Container>
      <Header>
      <MdKeyboardBackspace size={24} color="#fff" onClick={() => history.goBack()} />
      {currentRoom && (
        <>
          <Photo src={`http://localhost:3333/${user?.avatar?.url}`} alt="avatar" />
          <Name>{title}</Name>
        </>
      )}
      
      </Header>
      <MessageContainer ref={scrollViewRef}>
        {messages.map((message, index) => {
          const condense = ownMessage(message) === ownMessage(messages[index+1]);
          return (
            <Message
              ownMessage={ownMessage(message)}
              key={message.messageId}
            >
              <Balloon
                ownMessage={ownMessage(message)}
                condense={condense}
                addMarginBottom={!condense}
              >
                {message.text}
                <MessageDate> {moment(message.createdAt).format('HH:mm')} </MessageDate>
              </Balloon>
            </Message>
          )
        })}
      </MessageContainer>
      <Formik
        initialValues={{}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => (
          <InputArea onSubmit={(ev) => {
            ev.preventDefault();
            handleSubmit();
            setTimeout(() => {
              setFieldValue('text', '')
            }, 200);
          }}>
            <Input
              value={values.text}
              onChange={handleChange}
              name="text"
              placeholder="Digite uma mensagem aqui"
            />
            <Button type="submit">
              <AiOutlineSend color="#fff" size={24}/>
            </Button>
          </InputArea>
        )}
      </Formik>
    </Container>  
  )
}

export default withChatConsumer(memo(Room));