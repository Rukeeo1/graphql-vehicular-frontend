import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';

import AppContext from 'context/';

import { Input, Button } from 'components/index';

import { SIGNUP_MUTATION, LOGIN_MUTATION } from 'graphql/mutations';

import { LoginResultType, SignUpResultType } from './types';

import {
  AuthFormBody,
  AuthFormContainer,
  AuthContainer,
  AuthFormHeader,
  AuthFormHeaderTabItem,
  AuthFormHeaderTabItemText,
  CircularLoader,
} from './styles';

const AuthValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is not valid')
    .required('Required')
    .min(2, 'Too Short!')
    .max(1000, 'Too Long!'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Too Short!')
    .max(100, 'Too Long!'),
});

const Auth = () => {
  const appContext = useContext(AppContext);
  const history = useHistory();

  const [signUp, { loading }] = useMutation(SIGNUP_MUTATION, {
    onError(err) {
      alert(JSON.stringify(err.message));
    },
    onCompleted({ signUp }: SignUpResultType) {
      appContext.actions.updateAuthDetails(signUp);
      history.push('/bikes');
    },
  });

  const [login, { loading: loginProgress }] = useMutation(LOGIN_MUTATION, {
    onError(err) {
      alert(JSON.stringify(err.message));
    },
    onCompleted({ login }: LoginResultType) {
      appContext.actions.updateAuthDetails(login);
      history.push('/bikes');
    },
  });

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues: {
      login: false,
      name: '',
      email: '',
      password: '',
    },
    validationSchema: AuthValidationSchema,
    onSubmit: () => {
      values.login
        ? login({ variables: { ...values } })
        : signUp({ variables: { ...values } });
    },
  });

  const submitForm = () => handleSubmit();
  const toggleLogin = () => setFieldValue('login', !values.login);

  const buttonText = values.login ? 'Login' : 'Sign Up';

  return (
    <AuthContainer>
      <AuthFormContainer>
        <AuthFormHeader>
          <AuthFormHeaderTabItem isActive={!values.login} onClick={toggleLogin}>
            <AuthFormHeaderTabItemText isActive={!values.login}>
              SignUp
            </AuthFormHeaderTabItemText>
          </AuthFormHeaderTabItem>
          <AuthFormHeaderTabItem isActive={values.login} onClick={toggleLogin}>
            <AuthFormHeaderTabItemText isActive={values.login}>
              Login
            </AuthFormHeaderTabItemText>
          </AuthFormHeaderTabItem>
        </AuthFormHeader>
        <AuthFormBody>
          {!values.login && (
            <Input
              id='standard-error-helper-text'
              label='Name'
              name='name'
              value={values.name}
              helperText={errors.name}
              onChange={handleChange}
            />
          )}
          <Input
            name='email'
            id='standard-error-helper-text'
            label='Email'
            value={values.email}
            helperText={errors.email}
            onChange={handleChange}
          />
          <Input
            name='password'
            id='standard-error-helper-text'
            label='Password'
            value={values.password}
            helperText={errors.password}
            onChange={handleChange}
            type='password'
          />
          <Button
            disabled={!isValid || loading || loginProgress}
            onClick={submitForm}
          >
            {loading || loginProgress ? <CircularLoader /> : buttonText}
          </Button>
        </AuthFormBody>
      </AuthFormContainer>
    </AuthContainer>
  );
};

export default Auth;
