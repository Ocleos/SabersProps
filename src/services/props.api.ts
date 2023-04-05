import { Prop } from '@src/models/prop.model';
import axios from 'axios';

export const getProps = async () => {
  const url = '/props';
  const response = await axios.get<Prop[]>(url);
  return response.data;
};

export const postProps = async (prop: Prop) => {
  const url = '/props';
  await axios.post(url, prop);
};
