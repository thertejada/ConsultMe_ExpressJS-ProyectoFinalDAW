import { ADDORDERTOMYLIST_ORDER_EXISTING } from '../../constants';
import { UserEntity } from 'models';
import { BaseRespository } from './base-repository';
import OrderRepository from './order.repository';

class UserRepository extends BaseRespository {
  constructor() {
    super();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    try {
      const userEntity: UserEntity = await UserEntity.findOne({ where: { email }, relations: { company: true } });
      if (!userEntity) {
        throw new Error('User not found.');
      }

      return userEntity;
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async findOneByEmailAndPassword(email: string, password: string): Promise<UserEntity> {
    try {
      const userEntity: UserEntity = await UserEntity.findOne({ where: { email, password }, relations: { company: true } });
      if (!userEntity) {
        throw new Error('User not found.');
      }

      return userEntity;
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async findOne(userId: number, allEntities = false): Promise<UserEntity> {
    try {
      return await UserEntity.findOne({ where: { id: userId }, relations: allEntities ? { company: true, orders: true } : undefined });
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async addOrderToUser(userId: number, orderId: number): Promise<UserEntity> {
    try {
      const user = await this.findOne(userId, true);
      if (!user) {
        throw new Error('User not found.');
      }
      if (user.orders.find((order) => order.id === orderId)) {
        throw ADDORDERTOMYLIST_ORDER_EXISTING;
      }

      const orderRepository = new OrderRepository();
      const order = await orderRepository.findOne(orderId);
      if (!order) {
        throw new Error('Order not found.');
      }

      user.orders.push(order);

      return await user.save();
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async deleteOrderFromUser(userId: number, orderId: number): Promise<UserEntity> {
    try {
      const user = await this.findOne(userId, true);
      if (!user) {
        throw new Error('User not found.');
      }
      if (!user.orders.find((order) => order.id === orderId)) {
        throw new Error('Order not found in user.');
      }

      const orderRepository = new OrderRepository();
      const order = await orderRepository.findOne(orderId);
      if (!order) {
        throw new Error('Order not found.');
      }

      user.orders = user.orders.filter((order) => order.id !== orderId);

      return await user.save();
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    try {
      return await UserEntity.save(user);
    } catch (err) {
      super.throwRepositoryError(err);
    }
  }
}

export default UserRepository;
