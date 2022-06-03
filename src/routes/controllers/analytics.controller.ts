import express = require('express');
import { Response } from 'models';
import AnalyticService from 'routes/services/analytic.services';
import { BaseController } from './base-controller';

export class AnalyticController extends BaseController {
  constructor() {
    super();
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get('/analytics/company/:id', this.getAnalytics);
  }

  private async getAnalytics(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const options = {
        companyId: req.params?.id,
        filterType: req.query?.filterType,
        filterValue: req.query?.filterValue
      };

      const controllerResponse: Response = await new AnalyticService(req.headers).getAnalytics(options);
      super.sendControllerResponse(req, res, controllerResponse);
    } catch (err: Response | any) {
      console.error('!!!ERROR: ', JSON.stringify(err));
      super.sendControllerResponse(req, res, err);
    }
  }
}
