export interface IData {
  id: number;
  title?: string;
  artist_title?: string;
  date_display?: string;
  image_id?: string;
}

export interface StateI {
  data: IData[];
}

export interface IDataApi {
  repos?: IData[] | null;
  isLoading?: boolean;
}
