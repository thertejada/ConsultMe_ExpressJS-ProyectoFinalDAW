import { OrderStatus } from 'enums';
import Option from './option.model';
import moment = require('moment');
import { INVALID_PARAMETER_CODE, INVALID_PARAMETER_STARTDATE_ENDDDATE } from '../../constants';

const DATE_FORMAT = 'D/M/YYYY';

interface GetOrdersI {
  userId?: string;
  companyId?: string;
  status?: OrderStatus | string;
  startDate?: string;
  endDate?: string;
  code?: string;
  limit?: number | string;
  offset?: number | string;
}

class GetOrdersOption extends Option {
  userId: number;
  companyId: number; // Solo si userId no se proporciona
  status: OrderStatus;
  startDate: Date;
  endDate: Date;
  code: string;
  limit: number;
  offset: number;

  constructor(options: GetOrdersI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.userId = options?.userId && (options.userId as any) !== '' ? parseInt(options.userId) : null;
    this.companyId =
      options?.companyId && options.companyId !== '' && (options?.userId == null || options.userId === '')
        ? parseInt(options.companyId)
        : null;
    this.status = options?.status && (options.status as any) !== '' ? OrderStatus[options?.status] : null;
    this.code = options?.code && options.code !== '' ? options.code : null;
    if (this.code && !/^\d+$/.test(this.code)) {
      throw INVALID_PARAMETER_CODE;
    }
    this.limit = options?.limit && (options.limit as any) !== '' ? parseInt(options.limit as any) : null;
    this.offset = options?.offset && (options.offset as any) !== '' ? parseInt(options.offset as any) : null;
    if ((options?.startDate && (options.startDate as any) !== '') || (options?.endDate && (options.endDate as any) !== '')) {
      const startDateMoment = moment(options.startDate, DATE_FORMAT);
      const endDateMoment = moment(options.endDate, DATE_FORMAT);

      if (
        !startDateMoment ||
        !endDateMoment ||
        !startDateMoment.isValid() ||
        !endDateMoment.isValid() ||
        (startDateMoment.isAfter(endDateMoment) && !startDateMoment.isSame(endDateMoment))
      ) {
        throw INVALID_PARAMETER_STARTDATE_ENDDDATE;
      }

      this.startDate = startDateMoment.toDate();
      this.endDate = endDateMoment.toDate();
    }
  }
}

export { GetOrdersOption };
