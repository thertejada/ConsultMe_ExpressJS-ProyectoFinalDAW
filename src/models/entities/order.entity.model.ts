import { ManyToOne, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, Entity, ManyToMany } from 'typeorm';
import { OrderStatus } from 'enums';
import { CompanyEntity, UserEntity } from '.';

@Entity({ name: 'order' })
class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 30, unique: true, nullable: false })
  code?: string;

  @Column({ type: 'varchar', length: 100, unique: false, nullable: false })
  title?: string;

  @Column({ type: 'varchar', length: 254, unique: false, nullable: true })
  description?: string;

  @Column({ type: 'double', unique: false, nullable: true })
  price?: number;

  @Column({ type: 'date', unique: false, nullable: false })
  date?: Date;

  @Column({ type: 'enum', unique: false, nullable: false, enum: OrderStatus, enumName: 'OrderStatus', default: OrderStatus.PENDING })
  status?: OrderStatus;

  @ManyToOne((type) => CompanyEntity, (company) => company.orders, { nullable: false, cascade: false })
  company?: CompanyEntity;

  @ManyToMany((type) => UserEntity, (order) => order.orders, { nullable: true, cascade: false })
  users?: Array<UserEntity>;

  @CreateDateColumn()
  CREATED_AT?: Date;

  @UpdateDateColumn()
  UPDATED_AT: Date;
}

export { OrderEntity };
