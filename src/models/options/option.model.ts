import * as Errors from '../../constants/errors.constant';

abstract class Option {
  /**
   * @param options - objeto 'options' proveniente del controlador
   * @param minimumRequiredOptionInputs - número mínimo de valores obligatorios del objeto 'options'
   * @param requiredValues - valores obligatorios
   */
  constructor(options: Record<string, any>, minimumRequiredOptionInputs?: number, requiredValues?: Array<any>) {
    this.checkOptions(options, minimumRequiredOptionInputs, requiredValues);
  }

  private checkOptions(options: Record<string, any>, minimumRequiredOptionInputs: number, requiredValues: Array<any>): void {
    if (minimumRequiredOptionInputs != null && minimumRequiredOptionInputs !== 0) {
      this.checkMinimumRequiredOptionInputs(options, minimumRequiredOptionInputs);
    }
    if (requiredValues?.length > 0) {
      this.checkRequiredOptions(requiredValues);
    }
  }

  private checkRequiredOptions(requiredValues: Array<any>): void {
    if (requiredValues.some((requiredValue) => requiredValue == null || requiredValue === '')) {
      throw Errors.REQUIRED_PARAMS_ERROR;
    }
  }

  private checkMinimumRequiredOptionInputs(options: Record<string, any>, minimumOptions: number): void {
    const keysDefined = Object.keys(options).filter(
      (key) => options[key] != null && (typeof options[key] !== 'string' || (typeof options[key] === 'string' && options[key] !== ''))
    );
    if (keysDefined.length < minimumOptions) {
      throw Errors.MINIMUM_PARAMS_ERROR;
    }
  }
}

export default Option;
