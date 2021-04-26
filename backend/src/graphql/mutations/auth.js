import { UserInputError } from 'apollo-server-express';
import { schemaComposer } from 'graphql-compose';
import jsonwebtoken from 'jsonwebtoken';

import { UserModel, UserTC } from '../../models';

const AuthPayload = schemaComposer.createObjectTC({
  name: 'AuthPayload',
  fields: {
    token: 'String',
    user: UserTC.getType(),
  },
});

export const register = schemaComposer.createResolver({
  name: 'register',
  args: {
    displayName: 'String!',
    username: 'String!',
    password: 'String!',
  },
  type: AuthPayload,
  resolve: async ({ args }) => {
    const { displayName, username, password } = args;
    const isUsernameAlreadyUse = await UserModel.findOne({ username });
    if (isUsernameAlreadyUse) {
      throw new UserInputError(`Username ${username} already used.`);
    }

    if (password.length <= 7) {
      throw new UserInputError('Password is too weak.');
    }

    const user = await UserModel.create({
      displayName,
      role: 'customer',
      username,
      password,
    });

    return {
      token: jsonwebtoken.sign({ _id: user._id }, process.env.SECRET ?? 'default-secret', {
        expiresIn: '1d',
        algorithm: 'HS256',
      }),
      user,
    };
  },
});

export const login = schemaComposer.createResolver({
  name: 'login',
  args: {
    username: 'String!',
    password: 'String!',
  },
  type: AuthPayload,
  resolve: async ({ args }) => {
    const { username, password } = args;
    const user = await UserModel.findOne({ username });
    if (!user) {
      throw new UserInputError('Username not found');
    }
    const valid = await user.verifyPassword(password);
    if (!valid) {
      throw new UserInputError('Incorrect password');
    }
    return {
      token: jsonwebtoken.sign({ _id: user._id }, process.env.SECRET ?? 'default-secret', {
        expiresIn: '1d',
        algorithm: 'HS256',
      }),
      user,
    };
  },
});
