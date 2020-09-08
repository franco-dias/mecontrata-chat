import styled from 'styled-components';

const Form = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  height: 48px;
  width: 100%;
  border-radius: 24px;
  border: 2px solid #ccc;
  background: #fff;
  padding: 0 16px;
  &:focus {
    border: 2px solid #aa00ff;  
  }
  margin-top: 16px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #aa00ff;
  border-radius: 24px;
  height: 48px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  margin-top: 24px;
  width: 100%;
  border: none; 
`;

export {
  Form,
  Input,
  Button,
}