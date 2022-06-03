import { ErrorModel } from '.';
import { OrderDto, UserDto } from './dtos';

export interface ResponseSusscess {
  result: string;
  error: ErrorModel;
}

export interface ResponseGetOrders {
  data: {
    orders: Array<OrderDto>;
    total: number;
  };
  error: ErrorModel;
}

export interface ResponseGetOrder {
  data: OrderDto;
  error: ErrorModel;
}

export interface ResponsePostLogin {
  data: { user: UserDto; token: string };
  error: ErrorModel;
}

export interface ResponsePostRegister {
  data: { user: UserDto; token: string };
  error: ErrorModel;
}

export interface ResponsePostAuth {
  data: UserDto;
  error: ErrorModel;
}

export interface ResponseGetAnalytics {
  data: Array<StatData>;
  error: ErrorModel;
}
export interface StatData {
  name: string;
  value: number;
}
