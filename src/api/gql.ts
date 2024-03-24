import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetUser {
    profile {
      id
      fullName
    }
  }
`;

export const GET_TASKS_BY_USER = gql`
  query GetTasks($input: FilterTaskInput!) {
    tasks(input: $input) {
      id
      name
      dueDate
      pointEstimate
      position
      status
      tags
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      id
      name
      dueDate
      pointEstimate
      position
      status
      tags
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
      name
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      fullName
    }
  }
`;
