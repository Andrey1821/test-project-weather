import { environment } from '../../environments/environment';

export const API_CONFIG = {
  weatherApiPath: environment.weatherApiPath,
  locationsApiPath: 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000'
}
