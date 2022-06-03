import { IncomingHttpHeaders } from 'http';
import {
  ErrorModel,
  Response,
  GetOrdersOption,
  OrderEntity,
  ResponseGetOrders,
  ResponseGetOrder,
  ResponseSusscess,
  PostOrderOption,
  PutOrderOption
} from 'models';
import { MimeTypes } from 'enums';
import { BaseService } from './base-service';
import OrderRepository from 'routes/repositories/order.repository';
import { OrderDto } from 'models/dtos';
import { GetOrdersCodeCodeOption } from 'models/options/get-orders-code-code.model';

class OrderService extends BaseService {
  constructor(headers: IncomingHttpHeaders) {
    super(headers);
  }

  public async getOrders(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initGetOrders(new GetOrdersOption(options), new OrderRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initGetOrders(options: GetOrdersOption, repository: OrderRepository): Promise<ResponseGetOrders> {
    const result: [Array<OrderEntity>, number] = await repository.findMany(
      options.userId,
      options.companyId,
      options.status,
      options.startDate,
      options.endDate,
      options.code,
      options.limit,
      options.offset
    );

    return {
      data: {
        orders: result[0] ? result[0].map((order: OrderEntity) => new OrderDto(order)) : [],
        total: parseInt(result[1] as any)
      },
      error: null
    };
  }

  public async getOrderWithCode(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initGetOrdersWithCode(new GetOrdersCodeCodeOption(options), new OrderRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initGetOrdersWithCode(options: GetOrdersCodeCodeOption, repository: OrderRepository): Promise<ResponseGetOrder> {
    const orderEntity = await repository.findOneByCode(options.code);

    return {
      data: orderEntity ? new OrderDto(orderEntity) : {},
      error: null
    };
  }

  public async postOrder(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initPostOrder(new PostOrderOption(options), new OrderRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initPostOrder(options: PostOrderOption, repository: OrderRepository): Promise<ResponseSusscess> {
    await repository.create(options.order);

    return {
      result: 'OK',
      error: null
    };
  }

  public async putOrder(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initPutOrder(new PutOrderOption(options), new OrderRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initPutOrder(options: PutOrderOption, repository: OrderRepository): Promise<ResponseSusscess> {
    await repository.update(options.order);

    return {
      result: 'OK',
      error: null
    };
  }
}

export default OrderService;
