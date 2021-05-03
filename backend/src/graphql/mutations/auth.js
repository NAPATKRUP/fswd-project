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
      token: jsonwebtoken.sign(
        { _id: user._id, role: user.role },
        process.env.SECRET ?? 'default-secret',
        {
          expiresIn: '1d',
          algorithm: 'HS256',
        }
      ),
      user,
    };
  },
});

const UpdateUserPayload = schemaComposer.createObjectTC({
  name: 'UpdateUserPayload',
  fields: {
    status: 'String!',
  },
});

export const updateUser = schemaComposer.createResolver({
  name: 'updateUser',
  args: {
    displayName: 'String!',
    password: 'String!',
  },
  type: UpdateUserPayload,
  resolve: async ({ context, args }) => {
    const { displayName, password } = args;
    const { _id: userId } = context.user;

    const user = await UserModel.findById(userId);
    const valid = await user.verifyPassword(password);

    if (valid) {
      throw new UserInputError('Same password');
    }

    await UserModel.findByIdAndUpdate(user._id, {
      displayName,
      password,
    });

    return { status: 'Success' };
  },
});
