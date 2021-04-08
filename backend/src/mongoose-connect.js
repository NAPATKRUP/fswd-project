import mongoose from "mongoose";

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_ALTAS, {
  dbName: process.env.MONGODB_DATABASE,
  promiseLibrary: Promise,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
