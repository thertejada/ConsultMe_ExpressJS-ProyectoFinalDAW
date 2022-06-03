import { ErrorModel } from 'models/error.model';

const JET_SECRET_ERROR: ErrorModel = {
  status: 500,
  data: {
    code: 1001,
    message: 'The secret could not be found.',
    description: '',
    details: []
  }
};

const INVALID_AUTH: ErrorModel = {
  status: 401,
  data: {
    code: 1002,
    message: 'Invalid Authorization.',
    description: '',
    details: []
  }
};

const MIMETYPES_ERROR: ErrorModel = {
  status: 500,
  data: {
    code: 1003,
    message: "This endpoint produces '{0}' MimeTypes.",
    description: '',
    details: []
  }
};

// --

const SERVICE_ERROR: ErrorModel = {
  status: 500,
  data: {
    code: 2001,
    message: 'An error has occurred in the service.',
    description: '',
    details: []
  }
};

const MINIMUM_PARAMS_ERROR: ErrorModel = {
  status: 400,
  data: {
    code: 2003,
    message: 'Invalid parameters.',
    description: 'More parameters are required.'
  }
};

const REQUIRED_PARAMS_ERROR: ErrorModel = {
  status: 400,
  data: {
    code: 2004,
    message: 'Invalid parameters.',
    description: 'Required parameters has not been provided.'
  }
};

const INVALID_PARAMETER_CODE: ErrorModel = {
  status: 400,
  data: {
    code: 2005,
    message: 'Invalid parameter (code).',
    description: 'Check that it only contains numbers.'
  }
};

const INVALID_PARAMETER_STARTDATE_ENDDDATE: ErrorModel = {
  status: 400,
  data: {
    code: 2006,
    message: 'Invalid parameters (startDate and/or endDate).',
    description: 'Check that both are in the format DD/MM/YYYY.'
  }
};

const INVALID_PARAMETER_DATE: ErrorModel = {
  status: 400,
  data: {
    code: 2007,
    message: 'Invalid date.',
    description: 'Check that it is in the format DD/MM/YYYY.'
  }
};

const INVALID_ANALYTICS_FILTER_TYPE: ErrorModel = {
  status: 400,
  data: {
    code: 2005,
    message: 'Invalid filterType.',
    description: ''
  }
};

const PASSWORD_INVALID: ErrorModel = {
  status: 400,
  data: {
    code: 2006,
    message: 'THE PASSWORD IS NOT VALID.',
    description: ''
  }
};

// ---

const REPOSITORY_ERRROR: ErrorModel = {
  status: 500,
  data: {
    code: 3001,
    message: 'An error has occurred in the repository.',
    description: ''
  }
};

const ADDORDERTOMYLIST_ORDER_EXISTING: ErrorModel = {
  status: 500,
  data: {
    code: 3002,
    message: 'An error has occurred in the repository.',
    description: 'The order is already from the user.'
  }
};

export {
  REPOSITORY_ERRROR,
  INVALID_PARAMETER_CODE,
  INVALID_AUTH,
  JET_SECRET_ERROR,
  MIMETYPES_ERROR,
  SERVICE_ERROR,
  MINIMUM_PARAMS_ERROR,
  INVALID_PARAMETER_STARTDATE_ENDDDATE,
  REQUIRED_PARAMS_ERROR,
  INVALID_PARAMETER_DATE,
  ADDORDERTOMYLIST_ORDER_EXISTING,
  INVALID_ANALYTICS_FILTER_TYPE,
  PASSWORD_INVALID
};
