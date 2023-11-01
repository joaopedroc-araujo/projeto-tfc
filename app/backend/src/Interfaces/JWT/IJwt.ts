export interface IJwt {
  sign(payload: object): string,
  verify(token: string): object,
}
