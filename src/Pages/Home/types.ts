import { IData } from "../../Components/Card";
import { IModalCard } from "../../Components/CardModal";

export interface IDataApi {
  loading?: boolean;
  repos?: IData[] | null;
}
export interface IDataModal {
  loading?: boolean;
  repos?: IModalCard[] | null;
}
