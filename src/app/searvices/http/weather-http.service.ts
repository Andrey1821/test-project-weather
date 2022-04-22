import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONFIG } from '../../consts/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherHttpService {

  constructor(private http: HttpClient) {
  }

  public getWeatherByCoords(params: HttpParams): Observable<IWeatherApi> {
    return this.http.get<IWeatherApi>(API_CONFIG.weatherApiPath, {
      params: params
    })
  }
}
