import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../configs/api-config';

@Injectable({
  providedIn: 'root'
})
export class LocationsHttpService {

  constructor(private http: HttpClient) {
  }

  public getLocation(): Observable<ILocationApi> {
    return this.http.get<ILocationApi>(API_CONFIG.locationsApiPath)
  }
}
