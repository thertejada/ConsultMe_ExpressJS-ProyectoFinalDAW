import Option from './option.model';

interface GetUserSelfOptionI {
  token: string;
}

class GetUserSelfOption extends Option {
  token: string;

  constructor(options: GetUserSelfOptionI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [options?.token];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.token = options.token;
  }
}

export { GetUserSelfOption };
