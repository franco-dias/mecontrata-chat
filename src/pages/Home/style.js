import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 48px;
  background-color: #aa00ff;
  width: 100%;
`;

const RoomList = styled.div`
  flex: 1;
  padding: 16px 0;
`;

const Room = styled.div`
  display: flex;
  position: relative;
  margin: 8px;
  &:first-of-type {
    margin-top: 0;
  }
  padding: 8px 8px 12px;
  background-color: #fff;
  border-radius: 8px;
  align-items: center;
  & img {
    width: 48px;
    height: 48px;
    border-radius: 24px;
  }

  & div {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    overflow: hidden;
    & span:first-of-type {
      font-weight: 600;
      font-size: 14px;
    }
    & p, & b {
      margin: 4px 0 0;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    & span.date {
      position: absolute;
      bottom: 4px;
      right: 12px;
      font-weight: 400;
      font-size: 12px;
    }
  }
`;

export {
  Container,
  Header,
  RoomList,
  Room,
}