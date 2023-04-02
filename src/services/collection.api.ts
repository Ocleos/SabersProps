import { ItemCollection } from '@src/models/itemCollection.model';
import axios from 'axios';

export const getCollection = async () => {
  const url = '/collection';

  const response = await axios.get<ItemCollection[]>(url);

  return response.data;
};
