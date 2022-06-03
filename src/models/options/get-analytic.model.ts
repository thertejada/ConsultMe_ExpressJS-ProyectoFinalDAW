import { AnalyticsType, OrderStatus } from 'enums';
import Option from './option.model';
import moment = require('moment');
import { INVALID_PARAMETER_CODE, INVALID_PARAMETER_STARTDATE_ENDDDATE } from '../../constants';

const DATE_FORMAT = 'D/M/YYYY';

interface GetAnalyticsI {
  companyId: string;
  filterType: string;
  filterValue: string;
}

class GetAnalyticsOption extends Option {
  companyId: number;
  filterType: AnalyticsType;
  filterValue: string;

  constructor(options: GetAnalyticsI) {
    const minimumRequiredOptionInputs = 3;
    const requiredValues = [options?.companyId, options?.filterType, options?.filterValue];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.companyId = parseInt(options.companyId);
    this.filterType = options.filterType as AnalyticsType;
    this.filterValue = options.filterValue;
  }
}

export { GetAnalyticsOption };
