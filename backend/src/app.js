import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'express-jwt';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';

import './mongoose-connect';
import schema from './graphql';

const graphqlPath = '/graphql';
const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();
const server = new ApolloServer({
  schema,
  playground: true,
  cors: cors(corsOptions),
  context: ({ req }) => ({ user: req.user }),
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(
  graphqlPath,
  jwt({
    secret: process.env.SECRET ?? 'default-secret',
    algorithms: ['HS256'],
    getToken: (req) => {
      if (req?.cookies?.token) {
        return req?.cookies?.token;
      }
      if (req?.headers?.authorization?.split(' ')?.[0] === 'Bearer') {
        return req?.headers?.authorization?.split(' ')?.[1];
      }
      if (req?.query?.token) {
        return req?.query?.token;
      }
      return null;
    },
    credentialsRequired: false,
  }),
  (err, req, res, next) => {
    res.status(200).json({
      errors: [
        {
          message: err.message,
        },
      ],
    });
  }
);

// upload image
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY || 'xxx',
  secretAccessKey: process.env.AWS_SECERT_KEY || 'xxx',
});
const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'perfume-house-bucket',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key(req, file, cb) {
      cb(null, `${Date.now()}-${Math.floor(Math.random() * 1000000)}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(null, false);
    }
    cb(null, true);
  },
});

// use by upload form
app.post('/upload', upload.single('image'), (req, res, next) => {
  if (req.fileValidationError) res.status(400).send({ error: req.fileValidationError });
  else res.send({ name: req.file.key, location: req.file.location });
});

server.applyMiddleware({
  app,
  graphqlPath,
  cors: corsOptions,
});

const port = process.env.PORT ?? 5001;
app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
