export interface IEvent {
  id: number;
  name: string;
  image: string;
  place: string;
  previewText: string;
  dates: number[];
}
export interface IeventsRes {
  data: IEvent[];
  total: number;
}
