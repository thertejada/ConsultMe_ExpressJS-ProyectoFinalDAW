import express = require('express');
import { Response } from 'models';
import OrderService from 'routes/services/order.services';
import { BaseController } from './base-controller';

export class OrderController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get('/orders', this.getOrders);
    this.router.get('/orders/code/:code', this.getOrderWithCode);
    this.router.post('/orders', this.postOrder);
    this.router.put('/orders', this.putOrder);
  }

  private async getOrders(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        userId: req.query?.userId,
        companyId: req.query?.companyId,
        status: req.query?.status,
        startDate: req.query?.startDate,
        endDate: req.query?.endDate,
        code: req.query?.code,
        limit: req.query?.limit,
        offset: req.query?.offset
      };

      const controllerResponse: Response = await new OrderService(req.headers).getOrders(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async getOrderWithCode(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        code: req?.params?.code
      };

      const controllerResponse: Response = await new OrderService(req.headers).getOrderWithCode(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async postOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        body: req?.body
      };

      const controllerResponse: Response = await new OrderService(req.headers).postOrder(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }

  private async putOrder(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        body: req?.body
      };

      const controllerResponse: Response = await new OrderService(req.headers).putOrder(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }
}
