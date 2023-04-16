import { Prop } from '@src/models/prop.model';
import axios from 'axios';

export const propsUrlEndpoint = '/props';

export const getProps = async () => {
  const response = await axios.get<Prop[]>(propsUrlEndpoint);
  return response.data;
};

export const postProp = async (url: string, { arg }: { arg: Prop }) => {
  const response = await axios.post<Prop>(url, arg);
  return response.data;
};
