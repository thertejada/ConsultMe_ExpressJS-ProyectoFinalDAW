import { OrderStatus } from 'enums';
import { CompanyEntity, OrderEntity } from 'models';
import { BaseRespository } from './base-repository';

class OrderRepository extends BaseRespository {
  constructor() {
    super();
  }

  async findMany(
    userId: number,
    companyId: number,
    status: OrderStatus,
    startDate: Date,
    endDate: Date,
    code: string,
    limit: number,
    offset: number
  ): Promise<[Array<OrderEntity>, number]> {
    try {
      let hasWhere = false;
      let query = OrderEntity.createQueryBuilder('o')
        .leftJoinAndMapOne('o.company', CompanyEntity, 'c', 'c.id = o.companyId')
        .leftJoin('user_orders_order', 'uo', 'uo.orderId = o.id');

      if (userId) {
        query = super.getQueryWithWhereAndWhere(query, 'uo.userId = :userId', { userId }, hasWhere);
        hasWhere = true;
      }
      if (companyId) {
        query = super.getQueryWithWhereAndWhere(query, 'o.companyId = :companyId', { companyId }, hasWhere);
        hasWhere = true;
      }
      if (status) {
        query = super.getQueryWithWhereAndWhere(query, 'o.status = :status', { status }, hasWhere);
        hasWhere = true;
      } else if (!code) {
        query = super.getQueryWithWhereAndWhere(query, 'o.status != :status', { status: OrderStatus.DELIVERED }, hasWhere);
      }
      if (startDate && endDate) {
        query = super.getQueryWithWhereAndWhere(query, 'o.date BETWEEN :startDate AND :endDate', { startDate, endDate }, hasWhere);
        hasWhere = true;
      }
      if (code) {
        query = super.getQueryWithWhereAndWhere(query, 'o.code = :code', { code }, hasWhere);
      }
      query.take(limit ?? 10);
      query.skip(offset ?? 0);

      query.orderBy('o.date', 'ASC');
      query.addOrderBy('o.status', 'ASC');

      return await query.getManyAndCount();
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async findOneByCode(code: string): Promise<OrderEntity> {
    try {
      return await OrderEntity.findOne({ where: { code }, relations: { company: true } });
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async findOne(id: number): Promise<OrderEntity> {
    try {
      const order: OrderEntity = await OrderEntity.findOne({ where: { id } });
      if (!order) {
        throw new Error('Order not found.');
      }

      return order;
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    try {
      const o = await this.findOneByCode(order.code);
      if (o) {
        throw new Error('Order already exists');
      }

      return await OrderEntity.save(order);
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async update(order: OrderEntity): Promise<OrderEntity> {
    try {
      return await OrderEntity.save(order);
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }
}

export default OrderRepository;
