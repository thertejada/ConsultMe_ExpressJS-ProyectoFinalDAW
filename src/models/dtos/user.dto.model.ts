import { UserRole } from 'enums';
import { OrderEntity, UserEntity } from 'models/entities';
import { CompanyDto, OrderDto } from '.';

class UserDto {
  id?: number;
  name?: string;
  surnames?: string;
  email?: string;
  role?: UserRole;
  company?: CompanyDto;
  orders?: Array<OrderDto>;

  constructor(userEntity: UserEntity) {
    this.id = userEntity?.id ?? null;
    this.name = userEntity?.name ?? null;
    this.surnames = userEntity?.surnames ?? null;
    this.email = userEntity?.email ?? null;
    this.role = userEntity?.role ?? null;
    this.company = userEntity?.company ? new CompanyDto(userEntity.company) : null;
    this.orders = userEntity?.orders?.map((order) => new OrderDto(order)) ?? null;
  }
}

export { UserDto };
