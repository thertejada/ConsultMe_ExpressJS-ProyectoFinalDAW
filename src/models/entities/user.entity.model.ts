import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from 'enums';
import { CompanyEntity, OrderEntity } from '.';

@Entity({ name: 'user' })
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'varchar', length: 30, unique: false, nullable: false })
  name?: string;

  @Column({ type: 'varchar', length: 60, unique: false, nullable: false })
  surnames?: string;

  @Column({ type: 'varchar', length: 40, unique: true, nullable: false })
  email?: string;

  @Column({ type: 'varchar', length: 40, unique: false, nullable: false })
  password?: string;

  @Column({ type: 'enum', unique: false, nullable: false, enum: UserRole, enumName: 'UserRole', default: UserRole.USER })
  role?: UserRole;

  @OneToOne((type) => CompanyEntity, (company) => company.ownerUser, { nullable: true, cascade: false })
  @JoinColumn()
  company?: CompanyEntity;

  @ManyToMany((type) => OrderEntity, (order) => order.users, { nullable: true, cascade: false })
  @JoinTable()
  orders?: Array<OrderEntity>;
}

export { UserEntity };
