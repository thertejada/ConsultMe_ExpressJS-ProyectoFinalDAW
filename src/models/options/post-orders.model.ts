import { INVALID_PARAMETER_DATE } from '../../constants';
import { OrderDto } from 'models/dtos';
import { CompanyEntity, OrderEntity } from 'models/entities';
import moment = require('moment');
import Option from './option.model';

const DATE_FORMAT = 'D/M/YYYY';

interface PostOrderOptionI {
  body: OrderDto;
}

class PostOrderOption extends Option {
  order: OrderEntity;

  constructor(options: PostOrderOptionI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [
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
    this.order.code = options.body.code;
    this.order.title = options.body.title;
    this.order.description = options.body?.description;
    this.order.price = options.body?.price ? Number(options.body.price) : undefined;
    this.order.date = date.toDate();
    this.order.status = options.body.status;
    this.order.company = new CompanyEntity();
    this.order.company.id = options.body.company.id;
  }
}

export { PostOrderOption };
