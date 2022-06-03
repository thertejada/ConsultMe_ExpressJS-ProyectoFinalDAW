import Option from './option.model';

interface PostUserLoginI {
  body: {
    email: string;
    password: string;
  };
}

class PostUserLoginOption extends Option {
  email: string;
  password: string;

  constructor(options: PostUserLoginI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [options?.body?.email, options?.body?.password];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.email = options.body.email;
    this.password = options.body.password;
  }
}

export { PostUserLoginOption };
