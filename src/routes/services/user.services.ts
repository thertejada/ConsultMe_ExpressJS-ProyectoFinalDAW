import { IncomingHttpHeaders } from 'http';
import {
  ErrorModel,
  Response,
  ResponsePostLogin,
  PostUserLoginOption,
  GetUserSelfOption,
  ResponsePostAuth,
  UserEntity,
  PostUserOrderOption,
  DeleteUserOrderOption,
  ResponseSusscess,
  PostUserRegisterOption,
  ResponsePostRegister
} from 'models';
import { MimeTypes } from 'enums';
import { BaseService } from './base-service';
import { decodeToken, generateAccessToken } from 'middleware/auth.middleware';
import UserRepository from 'routes/repositories/user.repository';
import { UserDto } from 'models/dtos';

class UserService extends BaseService {
  constructor(headers: IncomingHttpHeaders) {
    super(headers);
  }

  public async postLogin(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initPostLogin(new PostUserLoginOption(options), new UserRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initPostLogin(options: PostUserLoginOption, repository: UserRepository): Promise<ResponsePostLogin> {
    const userEntity: UserEntity = await repository.findOneByEmailAndPassword(options.email, options.password);

    return {
      data: {
        token: generateAccessToken(userEntity.email, userEntity.role),
        user: new UserDto(userEntity)
      },
      error: null
    };
  }

  public async postRegister(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initPostRegister(new PostUserRegisterOption(options), new UserRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initPostRegister(options: PostUserRegisterOption, repository: UserRepository): Promise<ResponsePostRegister> {
    const user = new UserEntity();
    user.email = options.email;
    user.password = options.password;
    user.name = options.name;
    user.surnames = options.surnames;

    const userEntity: UserEntity = await repository.create(user);

    return {
      data: {
        token: generateAccessToken(userEntity.email, userEntity.role),
        user: new UserDto(userEntity)
      },
      error: null
    };
  }

  public async getSelf(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initSelf(new GetUserSelfOption(options), new UserRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initSelf(options: GetUserSelfOption, repository: UserRepository): Promise<ResponsePostAuth> {
    const token = decodeToken(options.token);
    const userEntity = await repository.findOneByEmail(token.email);

    return {
      data: new UserDto(userEntity),
      error: null
    };
  }

  public async postOrder(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initPostOrder(new PostUserOrderOption(options), new UserRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initPostOrder(options: PostUserOrderOption, repository: UserRepository): Promise<ResponseSusscess> {
    await repository.addOrderToUser(options.userId, options.orderId);

    return {
      result: 'OK',
      error: null
    };
  }

  public async deleteOrder(options: any): Promise<Response> {
    super.checkMimeType([MimeTypes.JSON]);
    for (const headerAcceptValue of this.headerAcceptArray) {
      if (headerAcceptValue === MimeTypes.JSON) {
        try {
          this.serviceResponse.data = await this.initDeleteOrder(new DeleteUserOrderOption(options), new UserRepository());
          this.serviceResponse.contentType = MimeTypes.JSON;
        } catch (err: ErrorModel | any) {
          super.throwErrorService(err);
        }

        return this.serviceResponse;
      }
    }
  }

  private async initDeleteOrder(options: DeleteUserOrderOption, repository: UserRepository): Promise<ResponseSusscess> {
    await repository.deleteOrderFromUser(options.userId, options.orderId);

    return {
      result: 'OK',
      error: null
    };
  }
}

export default UserService;
