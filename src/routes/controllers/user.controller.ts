import express = require('express');
import { Response } from 'models';
import UserService from 'routes/services/user.services';
import { BaseController } from './base-controller';

export class UserController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get('/users/self', this.getSelf);
    this.router.post('/users/login', this.postLogin);
    this.router.post('/users/register', this.postRegister);
    this.router.post('/users/order', this.postOrder);
    this.router.delete('/users/order', this.deleteOrder);
  }

  private async getSelf(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        token: req.headers?.['authorization'] ? req.headers['authorization'].replace('Bearer ', '') : null
      };

      const controllerResponse: Response = await new UserService(req.headers).getSelf(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async postLogin(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        body: req.body
      };

      const controllerResponse: Response = await new UserService(req.headers).postLogin(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async postRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        body: req.body
      };

      const controllerResponse: Response = await new UserService(req.headers).postRegister(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async postOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        body: req.body
      };

      const controllerResponse: Response = await new UserService(req.headers).postOrder(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async deleteOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        body: req.body
      };

      const controllerResponse: Response = await new UserService(req.headers).deleteOrder(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }
}
