import { HttpHeaders, HttpParams } from "@angular/common/http";

export function cloneHttpHeaders(
  headers: HttpHeaders | { [key: string]: any } = new HttpHeaders(),
  mHeaders: HttpHeaders = new HttpHeaders(),
): HttpHeaders {
  if (headers instanceof HttpHeaders) {
    headers.keys().forEach((key: any) => {
      mHeaders = mHeaders.set(key, (<HttpHeaders>headers).get(key)!);
    });
  } else {
    for (const key of Object.keys(headers)) {
      mHeaders = mHeaders.set(key, <any>headers[key]);
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
      mParams = mParams.set(key, (<HttpParams>params).get(key)!);
    });
  } else {
    for (const key of Object.keys(params)) {
      mParams = mParams.set(key, <any>params[key]);
    }
  }
  return mParams;
}
