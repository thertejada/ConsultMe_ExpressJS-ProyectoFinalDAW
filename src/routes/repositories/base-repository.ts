import { ErrorModel } from 'models';
import { SelectQueryBuilder } from 'typeorm';
import { REPOSITORY_ERRROR } from '../../constants';

export abstract class BaseRespository {
  constructor() {}

  public throwRepositoryError(err: any): void {
    const error: ErrorModel = REPOSITORY_ERRROR;
    error.status = err?.status ?? REPOSITORY_ERRROR.status;
    error.data.description = err?.message ?? err?.data?.description ?? REPOSITORY_ERRROR.data.description;
    error.data.code = err?.code ?? err?.data?.code ?? REPOSITORY_ERRROR.data.code;
    throw REPOSITORY_ERRROR;
  }

  public getQueryWithWhereAndWhere(
    query: SelectQueryBuilder<any>,
    where: string,
    parameters: any,
    hasWhere: boolean
  ): SelectQueryBuilder<any> {
    if (hasWhere) {
      query.andWhere(where, parameters);
    } else {
      query.where(where, parameters);
    }
    return query;
  }
}
