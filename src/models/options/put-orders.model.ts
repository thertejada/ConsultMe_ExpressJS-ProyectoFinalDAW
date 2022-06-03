import { INVALID_PARAMETER_DATE } from '../../constants';
import { OrderDto } from 'models/dtos';
import { CompanyEntity, OrderEntity } from 'models/entities';
import moment = require('moment');
import Option from './option.model';

const DATE_FORMAT = 'D/M/YYYY';

interface PutOrderOptionI {
  body: OrderDto;
}

class PutOrderOption extends Option {
  order: OrderEntity;

  constructor(options: PutOrderOptionI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [
      options?.body?.id,
      options?.body?.code,
      options?.body?.title,
      options?.body?.status,
      options?.body?.company?.id,
      options?.body?.date
    ];
    super(options, minimumRequiredOptionInputs, requiredValues);

    const date = moment(options.body.date, DATE_FORMAT);
    if (!date || !date.isValid()) {
      throw INVALID_PARAMETER_DATE;
    }

    this.order = new OrderEntity();
    this.order.id = options.body.id;
    this.order.code = options.body.code;
    this.order.title = options.body.title;
    this.order.description = options.body?.description;
    this.order.price = options.body?.price;
    this.order.date = date.toDate();
    this.order.status = options.body.status;
    this.order.company = new CompanyEntity();
    this.order.company.id = options.body.company.id;
  }
}

export { PutOrderOption };
