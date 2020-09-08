import React from 'react';
import { Formik } from 'formik';

import { useAuth } from '../../contexts/AuthContext';

import {
  Form,
  Input,
  Button,
} from './style';

const SignIn = () => {
  const { signIn } = useAuth();
  
  const handleSubmit = async ({ email, password }) => {
    await signIn({ email, password })
  }
  
  return (
    <Formik
      initialValues={{}}
      onSubmit={handleSubmit}
    >
      {({ values, errors, handleChange, handleSubmit }) => (
        <Form>
          <Input
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder="E-mail"
          />
          <Input
            name="password"
            onChange={handleChange}
            value={values.password}
            type="password"
            placeholder="Senha"
          />
          <Button onClick={handleSubmit}>
            Entrar
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignIn;
