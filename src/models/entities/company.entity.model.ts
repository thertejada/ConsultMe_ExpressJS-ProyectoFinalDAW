import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity, OrderEntity } from '.';

@Entity({ name: 'company' })
class CompanyEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'int', unique: true, nullable: false })
  code?: string;

  @Column({ type: 'varchar', length: 40, unique: false, nullable: false })
  name?: string;

  @Column({ type: 'varchar', length: 254, unique: false, nullable: false })
  description?: string;

  @Column({ type: 'varchar', length: 30, unique: false, nullable: false })
  country?: string;

  @Column({ type: 'varchar', length: 30, unique: false, nullable: false })
  province?: string;

  @Column({ type: 'varchar', length: 30, unique: false, nullable: false })
  city?: string;

  @Column({ type: 'varchar', length: 60, unique: false, nullable: false })
  street?: string;

  @Column({ type: 'varchar', length: 5, unique: false, nullable: false })
  doorNumber?: string;

  @Column({ type: 'varchar', length: 5, unique: false, nullable: true })
  doorLetter?: string;

  @Column({ type: 'varchar', length: 5, unique: false, nullable: false })
  postalCode?: string;

  @Column({ type: 'varchar', length: 12, unique: false, nullable: false })
  phone?: string;

  @Column({ type: 'varchar', length: 40, unique: false, nullable: false })
  email?: string;

  @Column({ type: 'varchar', length: 30, unique: false, nullable: true })
  website?: string;

  @OneToMany((type) => OrderEntity, (order) => order.company, { nullable: true, cascade: false, lazy: true })
  orders?: Array<OrderEntity>;

  @OneToOne((type) => UserEntity, (user) => user.company, { nullable: false, cascade: false })
  ownerUser?: UserEntity;
}

export { CompanyEntity };
