import { HttpParams } from "@angular/common/http";

export function createHttpParams(data: any): HttpParams {
  let params = new HttpParams();
  if (data) {
    Object.entries(data).forEach(([key, value]) => {
      params = params.append(key, value as any);
    })
  }
  return params;
}
