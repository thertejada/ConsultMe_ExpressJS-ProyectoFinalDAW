import { INVALID_PARAMETER_CODE } from '../../constants';
import Option from './option.model';

interface GetOrdersCodeCodeI {
  code?: string;
}

class GetOrdersCodeCodeOption extends Option {
  code: string;

  constructor(options: GetOrdersCodeCodeI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [options?.code];
    super(options, minimumRequiredOptionInputs, requiredValues);

    if (!/^\d+$/.test(options.code)) {
      throw INVALID_PARAMETER_CODE;
    }
    this.code = options.code;
  }
}

export { GetOrdersCodeCodeOption };
