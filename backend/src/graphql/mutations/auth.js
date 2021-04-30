import { UserInputError } from 'apollo-server-express';
import { schemaComposer } from 'graphql-compose';
import jsonwebtoken from 'jsonwebtoken';

import { CartModel, UserModel, UserTC } from '../../models';

const RegisterPayload = schemaComposer.createObjectTC({
  name: 'RegisterPayload',
  fields: {
    status: 'String!',
  },
});

export const register = schemaComposer.createResolver({
  name: 'register',
  args: {
    displayName: 'String!',
    username: 'String!',
    password: 'String!',
  },
  type: RegisterPayload,
  resolve: async ({ args }) => {
    const { displayName, username, password } = args;
    const isUsernameAlreadyUse = await UserModel.findOne({ username });
    if (isUsernameAlreadyUse) {
      throw new UserInputError('Username already used.');
    }

    if (password.length < 8) {
      throw new UserInputError('Password is too weak.');
    }

    const user = await UserModel.create({
      displayName,
      role: 'customer',
      username,
      password,
    });

    await CartModel.create({
      userId: user._id,
      status: 'WAITING',
    });

    return { status: 'Success' };
  },
});

const LoginPayload = schemaComposer.createObjectTC({
  name: 'LoginPayload',
  fields: {
    token: 'String',
    user: UserTC.getType(),
  },
});

export const login = schemaComposer.createResolver({
  name: 'login',
  args: {
    username: 'String!',
    password: 'String!',
  },
  type: LoginPayload,
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
