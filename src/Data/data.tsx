export interface IData {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  primaryImageSmall: string;
}

export interface StateI {
  data: IData[];
}

export interface IDataApi {
  repos?: IData[] | null;
  isLoading?: boolean;
}
