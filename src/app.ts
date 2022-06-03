import * as express from 'express';
import bodyParser = require('body-parser');
import cors = require('cors');
import helmet from 'helmet';
import moment = require('moment');
import morgan = require('morgan');
import { BaseController } from 'routes/controllers/base-controller';
import { authMiddleware, decodeToken } from 'middleware/auth.middleware';

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: Array<BaseController>, port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeAliveCheck();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(helmet());

    this.app.use(bodyParser.json());

    this.app.use(cors());

    morgan.token('date', (req: express.Request, res: express.Response) => moment().locale('es').format('YYYY-MM-DD HH:mm:ss'));
    morgan.token('userId', (req: express.Request, res: express.Response) => {
      const decodedToken = decodeToken(req.headers['authorization']);
      return `${decodedToken?.email ?? 'unknown'}#${decodedToken?.role ?? 'unknown'}`;
    });
    morgan.format('esFormat', ':date | :response-time ms | :status | :method | :url | :userId');
    this.app.use(morgan('esFormat'));

    this.app.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => authMiddleware(req, res, next));
  }

  private initializeAliveCheck() {
    this.app.get('/alive', (req: express.Request, res: express.Response) => res.send({ say: 'I am alive' }));
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller: BaseController) => this.app.use('', controller.router));
  }

  public listen() {
    this.app.listen(this.port, () => console.log(`Listening on port ${this.port}`));
  }
}

export default App;
