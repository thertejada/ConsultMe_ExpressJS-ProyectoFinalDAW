import { CompanyEntity, OrderEntity } from 'models/entities';
import { OrderDto, UserDto } from '.';

class CompanyDto {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  country?: string;
  province?: string;
  city?: string;
  street?: string;
  doorNumber?: string;
  doorLetter?: string;
  postalCode?: string;
  phone?: string;
  email?: string;
  website?: string;
  orders?: Array<OrderDto>;

  constructor(companyEntity: CompanyEntity) {
    this.id = companyEntity?.id ?? null;
    this.code = companyEntity?.code ?? null;
    this.name = companyEntity?.name ?? null;
    this.description = companyEntity?.description ?? null;
    this.country = companyEntity?.country ?? null;
    this.province = companyEntity?.province ?? null;
    this.city = companyEntity?.city ?? null;
    this.street = companyEntity?.street ?? null;
    this.doorNumber = companyEntity?.doorNumber ?? null;
    this.doorLetter = companyEntity?.doorLetter ?? null;
    this.postalCode = companyEntity?.postalCode ?? null;
    this.phone = companyEntity?.phone ?? null;
    this.email = companyEntity?.email ?? null;
    this.website = companyEntity?.website ?? null;
  }
}

export { CompanyDto };
