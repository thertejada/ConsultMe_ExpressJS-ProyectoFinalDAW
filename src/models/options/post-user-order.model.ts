import Option from './option.model';

interface PostUserOrderOptionI {
  body: {
    orderId: number;
    userId: number;
  };
}

class PostUserOrderOption extends Option {
  orderId: number;
  userId: number;

  constructor(options: PostUserOrderOptionI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [options?.body?.orderId, options?.body?.userId];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.orderId = options.body.orderId;
    this.userId = options.body.userId;
  }
}

export { PostUserOrderOption };
