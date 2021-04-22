import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignUpMutation($email: String!, $password: String!, $name: String) {
    signUp(email: $email, password: $password, name: $name) {
      token
      email
      name
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      email
      name
    }
  }
`;
