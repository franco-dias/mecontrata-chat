import styled, { css } from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 76px;
  overflow-y: auto;
`;

const Header = styled.div`
  padding: 0 16px;
  height: 56px;
  background-color: #8800ff;
  width: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Photo = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  margin-left: 16px;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  margin-left: 16px;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  max-height: 100%;
`

const Message = styled.div`
  width: 100%;
  ${({ ownMessage }) => ownMessage && css`
    display: flex;
    justify-content: flex-end;
  `}
  padding: 2px 8px;
`

const Balloon = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 48px 8px 8px;
  border-radius: 8px;
  position: relative;
  max-width: 70%;
  min-width: 100px;
  ${({ ownMessage}) => ownMessage
    ? css`
      background: #8800ff;
      color: #fff;
    ` : css`
      background: #cdc;
      color: #666;
    `
  }
  ${({ condense }) => !condense && css`
    &:not(:last-child) {
      margin-bottom: 12px;
    }
  `}
  ${({ addMarginBottom }) => addMarginBottom && css`margin-bottom: 8px;`}
`

const MessageDate = styled.span`
  position: absolute;
  right: 8px;
  bottom: 8px;
  font-size: 12px;
`

const InputArea = styled.form`
  height: 80px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0%;
  right: 0;
  width: 100%;
`

const Input = styled.input`
  height: 100%;
  flex: 1;
  border: 2px solid transparent;
  color: #666;
  border-radius: 28px;
  background-color: #fff;
  padding: 0 16px;
  &:focus {
    border: 2px solid #8800ff;
  }

`

const Button = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: #aa00ff;
  border: none;
  margin-left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s ease;
`

export {
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
  Button
}