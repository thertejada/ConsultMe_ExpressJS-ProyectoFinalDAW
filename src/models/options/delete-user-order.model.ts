import Option from './option.model';

interface DeleteUserOrderOptionI {
  body: {
    orderId: number;
    userId: number;
  };
}

class DeleteUserOrderOption extends Option {
  orderId: number;
  userId: number;

  constructor(options: DeleteUserOrderOptionI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [options?.body?.orderId, options?.body?.userId];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.orderId = options.body.orderId;
    this.userId = options.body.userId;
  }
}

export { DeleteUserOrderOption };
