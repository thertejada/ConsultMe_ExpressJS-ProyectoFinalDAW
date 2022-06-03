import { IncomingHttpHeaders } from 'http';
import { ErrorModel, Response, GetAnalyticsOption, ResponseGetAnalytics, StatData } from 'models';
import { AnalyticsType, MimeTypes, OrderStatus } from 'enums';
import { BaseService } from './base-service';
import AnalyticsRepository from 'routes/repositories/analytics.repository';
import moment = require('moment');
import { INVALID_ANALYTICS_FILTER_TYPE } from '../../constants';

const DATE_FORMAT = 'D/M/YYYY';

class AnalyticService extends BaseService {
  constructor(headers: IncomingHttpHeaders) {
    super(headers);
  }

  public async getAnalytics(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initGetAnalytics(new GetAnalyticsOption(options), new AnalyticsRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initGetAnalytics(options: GetAnalyticsOption, repository: AnalyticsRepository): Promise<ResponseGetAnalytics> {
    let res: Array<StatData> = [];
    if (options.filterType === AnalyticsType.ORDERS_CREATED_LAST_X_DAYS) {
      const days = options.filterValue;
      const repositoryRes = await repository.countOrdersWhereCreatedByLastXDays(options.companyId, days.toString());

      for (let i = 0; i > -days; i--) {
        let dateStr: string = moment().add(i, 'days').format(DATE_FORMAT);

        const dateInResporityRes = repositoryRes.find((item) => item.createdAt === dateStr);
        if (dateInResporityRes) {
          res.push({ name: dateStr, value: parseInt(dateInResporityRes.count) });
        } else {
          res.push({ name: dateStr, value: 0 });
        }
      }

      return {
        data: res.reverse(),
        error: null
      };
    } else if (options.filterType === AnalyticsType.TOTAL_COUNT_ORDERS_STATUS_IN_X_DAY) {
      const repositoryRes = await repository.countOrdersWhereDayGroupByStatus(
        options.companyId,
        moment(options.filterValue, DATE_FORMAT).toDate()
      );

      return {
        data: Object.keys(OrderStatus).map((key) => {
          return { name: key, value: repositoryRes.find((item) => item.name === key)?.value || 0 };
        }),
        error: null
      };
    } else {
      throw INVALID_ANALYTICS_FILTER_TYPE;
    }
  }
}

export default AnalyticService;
