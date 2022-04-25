declare interface ILocationApi {
  nhits: number;
  parameters: ILocationApiParameters;
  records: ILocationApiRecord[];
}

declare interface ILocationApiRecord {
  datasetid: string;
  recordid: string;
  fields: ILocationMainApiFields;
  geometry: ILocationGeometry;
  record_timestamp: Date;
}

declare interface ILocationApiParameters {
  dataset: string;
  rows: number;
  start: number;
  format: string;
  timezone: string;
}

declare interface ILocationMainApiFields {
  coordinates: number[];
  cou_name_en: string;
  label_en: string;
  feature_code: string;
  population: number;
  dem: number;
  geoname_id: string;
  name: string;
  ascii_name: string;
  alternate_names: string;
  admin1_code: string;
  feature_class: string;
  country_code: string;
  admin2_code: string;
  timezone: string;
  modification_date: string;
}

declare interface ILocationGeometry {
  type: string;
  coordinates: number[];
}
