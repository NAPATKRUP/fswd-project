import mongoose from "mongoose";
import bcrypt from "mongoose-bcrypt";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: { type: String, required: true },
  role: { type: String, required: true },
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, require: true, bcrypt: true },
});

UserSchema.plugin(bcrypt);

export const UserModel = mongoose.model("User", UserSchema);

export const UserTC = composeWithMongoose(UserModel).removeField("password");

export default UserModel;
