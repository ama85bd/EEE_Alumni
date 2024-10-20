import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import config from 'config';
import cors from 'cors';
import logger from './utils/logger';
import connect from './utils/connect';
import userRoutes from './routes/user';
import sessionRoutes from './routes/session';
import { deserializeUser } from './middleware/deserializeUser';
import galleryRoutes from './routes/gallery';
import bodyParser from 'body-parser';
import noticeRoutes from './routes/notice';

const port = config.get<number>('port');
const app = express();
app.use(bodyParser.json({ limit: '5mb' }));
app.use(express.json());

app.use(deserializeUser);

if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: [
        `${process.env.CLIENT_URL}`,
        'http://localhost:3000/',
        'http://localhost:1337',
      ],
    })
  );
}

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  // user route
  userRoutes(app);

  // session route
  sessionRoutes(app);

  // gallery route
  galleryRoutes(app);

  // notice route
  noticeRoutes(app);
});
