import moment = require('moment');
import { OrderStatus } from 'enums';
import { OrderEntity } from 'models/entities';
import { CompanyDto } from '.';

const FORMAT = 'D/M/YYYY';

class OrderDto {
  id?: number;
  code?: string;
  title?: string;
  description?: string;
  price?: number;
  date?: string;
  status?: OrderStatus;
  company?: CompanyDto;

  constructor(orderEntity: OrderEntity) {
    this.id = orderEntity?.id ?? null;
    this.code = orderEntity?.code ?? null;
    this.title = orderEntity?.title ?? null;
    this.description = orderEntity?.description ?? null;
    this.price = orderEntity?.price ?? null;
    this.date = orderEntity?.date ? moment(orderEntity?.date).format(FORMAT) : null;
    this.status = orderEntity?.status ?? null;
    this.company = orderEntity?.company ? new CompanyDto(orderEntity.company) : null;
  }
}

export { OrderDto };
