import { toApiResult, unwrapApiResult } from '~src/utils/apiResult.utils';
import { FOLDERS_TABLE, getData, PROPS_TABLE, putData, supabase } from '~src/utils/supabase.utils';
import type { Folder } from '../types/folder.type';
import type { FolderDetail } from '../types/folderDetail.type';
import type { Prop } from '../types/prop.type';
import { PropColumnPlacement } from '../types/propColumnPlacement.type';
import { toSequentialOrder } from '../utils/reorder.utils';

export type FolderWithPropsCount = Folder & { propsCount: number };

export const getFoldersWithPropsCount = async (): Promise<FolderWithPropsCount[]> => {
  const [folders, props] = await Promise.all([getData<Folder>(FOLDERS_TABLE), getData<Prop>(PROPS_TABLE)]);

  return folders
    .map((folder) => ({
      ...folder,
      propsCount: props.filter((prop) => prop.idFolder === folder.id).length,
    }))
    .sort((a, b) => a.order - b.order);
};

export const getUnassignedProps = async (): Promise<Prop[]> => {
  const response = await supabase.from(PROPS_TABLE).select('*').is('idFolder', null).order('name', { ascending: true });

  return unwrapApiResult(toApiResult(response.data as Prop[], response.error));
};

export const getFolderWithProps = async (id: string): Promise<FolderDetail | null> => {
  const response = await supabase
    .from(FOLDERS_TABLE)
    .select(`*, ${PROPS_TABLE} (*)`)
    .eq('id', id)
    .order('order', { ascending: true, nullsFirst: false, referencedTable: PROPS_TABLE })
    .maybeSingle();

  return unwrapApiResult(toApiResult(response.data, response.error)) as FolderDetail | null;
};

export const assignPropsToFolder = async (propIds: string[], folderId: string, startOrder: number): Promise<void> => {
  const rows = propIds.map((propId, index) => ({
    columnPlacement: PropColumnPlacement.LEFT,
    id: propId,
    idFolder: folderId,
    order: startOrder + index,
  }));

  await Promise.all(rows.map((row) => putData(PROPS_TABLE, row)));
};

export const removePropFromFolder = async (propId: string): Promise<void> => {
  const { error } = await supabase
    .from(PROPS_TABLE)
    .update({ columnPlacement: null, idFolder: null, order: null })
    .eq('id', propId);

  unwrapApiResult(toApiResult(null, error));
};

export const reorderFolders = async (folders: Folder[]): Promise<void> => {
  const rows = toSequentialOrder(folders).map(({ id, order }) => ({ id, order }));

  await Promise.all(rows.map((row) => putData(FOLDERS_TABLE, row)));
};

export const reorderFolderProps = async (props: Prop[]): Promise<void> => {
  const rows = toSequentialOrder(props).map(({ id, order }) => ({ id, order }));

  await Promise.all(rows.map((row) => putData(PROPS_TABLE, row)));
};
