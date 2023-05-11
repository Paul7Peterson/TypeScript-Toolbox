/** */
export const HTTPResponse = {
  /** */
  Ok: 200,
  /** */
  Created: 201,
  /** */
  BadRequest: 400,
  /** */
  Unauthorized: 401,
  /** */
  PaymentRequired: 402,
  /** */
  Forbidden: 403,
  /** */
  NotFound: 404,
  /** */
  RequestTimeout: 408,
  /** */
  Conflict: 409,
  /** */
  Gone: 410,
  /** */
  UnavailableForLegalReasons: 451,
  /** */
  UnsupportedMediaType: 415,
  /** */
  InternalServerError: 500,
  /** */
  NotImplemented: 501,
  /** */
  ServiceUnavailable: 503,
} as const;


export type HTTPResponse = typeof HTTPResponse[keyof typeof HTTPResponse];