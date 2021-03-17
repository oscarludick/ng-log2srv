import { HttpHeaders, HttpParams } from '@angular/common/http';

export function cloneHttpHeaders(
  headers: HttpHeaders | { [key: string]: any } = new HttpHeaders(),
  mHeaders: HttpHeaders = new HttpHeaders()
): HttpHeaders {
  if (headers instanceof HttpHeaders) {
    headers.keys().forEach((key: any) => {
      mHeaders = mHeaders.set(key, (headers as HttpHeaders).get(key)!);
    });
  } else {
    for (const key of Object.keys(headers)) {
      mHeaders = mHeaders.set(key, headers[key] as any);
    }
  }
  return mHeaders;
}

export function cloneHttpParams(
  params: HttpParams | { [param: string]: any } = new HttpParams(),
  mParams: HttpParams = new HttpParams()
): HttpParams {
  if (params instanceof HttpParams) {
    params.keys().forEach((key: any) => {
      mParams = mParams.set(key, (params as HttpParams).get(key)!);
    });
  } else {
    for (const key of Object.keys(params)) {
      mParams = mParams.set(key, params[key] as any);
    }
  }
  return mParams;
}
