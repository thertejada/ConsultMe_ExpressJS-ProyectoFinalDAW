import express = require('express');
import { Response } from 'models';

export abstract class BaseController {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
  }

  protected abstract initializeRoutes(app: express.Application): void;

  public sendControllerResponse(req: express.Request, res: express.Response, controllerResponse: Response) {
    res.contentType(controllerResponse.contentType);
    res.status(controllerResponse.status || 200).send(controllerResponse.data);
  }
}
