import { OrderEntity, StatData } from 'models';
import moment = require('moment');
import { BaseRespository } from './base-repository';

const DATE_FORMAT = 'D/M/YYYY';

class AnalyticsRepository extends BaseRespository {
  constructor() {
    super();
  }

  async countOrdersWhereCreatedByLastXDays(companyId: number, days: string): Promise<Array<{ count: string; createdAt: string }>> {
    try {
      let query = OrderEntity.createQueryBuilder('o');

      query.select('COUNT(o.id) as count, MAX(o.CREATED_AT) as createdAt');

      query.where('o.companyId = :companyId', { companyId });
      query.andWhere('o.CREATED_AT >= DATE(NOW() - INTERVAL :days DAY)', { days });

      query.groupBy('DATE(o.CREATED_AT)');

      return (await query.getRawMany())?.map((item: any) => {
        return { ...item, createdAt: moment(item.createdAt).format(DATE_FORMAT) };
      });
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async countOrdersWhereDayGroupByStatus(companyId: number, date: Date): Promise<Array<StatData>> {
    try {
      let query = OrderEntity.createQueryBuilder('o');

      query.select('COUNT(o.id) as value, o.status as name');

      query.where('o.companyId = :companyId', { companyId });
      query.andWhere('o.date = :date', { date });

      query.groupBy('o.status');
      query.orderBy('o.status');

      return (await query.getRawMany())?.map((item: any) => {
        return { ...item, value: parseInt(item.value) };
      });
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }
}

export default AnalyticsRepository;
