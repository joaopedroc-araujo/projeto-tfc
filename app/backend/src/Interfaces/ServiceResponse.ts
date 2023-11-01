export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data: T,
  token?: string
};

export type LoginResponseSuccess = {
  data: {
    token: string
  }
};

export type TokenResponse = {
  token: string;
};

export type LoginResponse = ServiceResponseError | TokenResponse;

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
