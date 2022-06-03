import * as cloneDeep from 'lodash/cloneDeep';
import { SERVICE_ERROR, MIMETYPES_ERROR } from '../../constants';
import { MimeTypes } from 'enums';
import { IncomingHttpHeaders } from 'http';
import { Response } from 'models';
import { ErrorModel } from 'models/error.model';

export abstract class BaseService {
  headerAcceptArray: Array<string>;
  serviceResponse: Response;
  headers: IncomingHttpHeaders;

  constructor(headers: IncomingHttpHeaders) {
    this.serviceResponse = this.getBaseResponseService();
    this.headers = headers;
  }

  private getHeaderAcceptArray(producesValues: Array<string>): Array<string> {
    let headerAcceptArray = [];
    if (!this.headers.accept) {
      headerAcceptArray.push(MimeTypes.JSON);
    } else if (this.headers.accept.includes(MimeTypes.ALL1) || this.headers.accept.includes(MimeTypes.ALL2)) {
      headerAcceptArray.push(producesValues[0]);
    } else {
      headerAcceptArray = this.headers.accept.split(',');
    }

    return headerAcceptArray;
  }

  private checkProducesWithInvalidValue(headerAcceptArray: Array<string>, producesValues: Array<string>): boolean {
    let isInvalidValue = true;
    headerAcceptArray.forEach((headerAcceptValue) => {
      if (isInvalidValue && producesValues.includes(headerAcceptValue)) {
        isInvalidValue = false;
      }
    });

    return isInvalidValue;
  }

  private getInvalidMimeTypeErrorResponseService(producesValues: Array<string>): Response {
    const producesValuesAsString = producesValues.toString().replace(/\,/g, ', ');
    const error: ErrorModel = cloneDeep(MIMETYPES_ERROR);
    error.data.message = error.data.message.replace('{0}', producesValuesAsString);

    return this.getErrorResponseService(error);
  }

  public checkMimeType(producesValues: Array<MimeTypes>) {
    this.headerAcceptArray = this.getHeaderAcceptArray(producesValues);
    if (this.checkProducesWithInvalidValue(this.headerAcceptArray, producesValues)) {
      throw this.getInvalidMimeTypeErrorResponseService(producesValues);
    }
  }

  public throwErrorService(err: ErrorModel | any) {
    if ('status' in err && 'data' in err) {
      this.serviceResponse = this.getErrorResponseService(err);
    } else {
      const error: ErrorModel = SERVICE_ERROR;
      error.data.description = err?.message ?? '';
      this.serviceResponse = this.getErrorResponseService(error);
    }

    throw this.serviceResponse;
  }

  public getBaseResponseService(): Response {
    return {
      status: 200,
      data: {},
      contentType: null
    };
  }

  public getErrorResponseService(err: ErrorModel): Response {
    return {
      ...err,
      contentType: MimeTypes.JSON
    };
  }
}
