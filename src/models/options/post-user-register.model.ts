import { PASSWORD_INVALID } from '../../constants';
import Option from './option.model';

interface PostUserRegisterI {
  body: {
    email: string;
    password: string;
    name: string;
    surnames: string;
  };
}

class PostUserRegisterOption extends Option {
  email: string;
  password: string;
  name: string;
  surnames: string;

  constructor(options: PostUserRegisterI) {
    const minimumRequiredOptionInputs = 1;
    const requiredValues = [options?.body?.email, options?.body?.password, options?.body?.name, options?.body?.surnames];
    super(options, minimumRequiredOptionInputs, requiredValues);

    this.email = options.body.email.trim();
    this.password = options.body.password.trim();
    this.name = options.body.name.trim();
    this.surnames = options.body.surnames.trim();

    if (this.password.length < 6) {
      throw PASSWORD_INVALID;
    }
  }
}

export { PostUserRegisterOption };
