import {
  INetViewResponse,
  IUserNode,
} from '../../client/common/server/types/types';
import { THandler } from '../../controller/types';
import { UserNodeSchema, NetViewResponseSchema } from '../schema/schema';

export const getCircle: THandler<IUserNode, INetViewResponse> = async (
  { member },
  { node_id },
) => {
  const { parent_node_id, confirmed } = member!.get();
  if (!parent_node_id) return [];
  if (!confirmed) return [];
  return await execQuery.net.circle.getData([node_id, parent_node_id]);
};
getCircle.paramsSchema = UserNodeSchema;
getCircle.responseSchema = NetViewResponseSchema;
getCircle.allowedForNetUser = 'INVITING';
getCircle.checkNet = true;

export const getTree: THandler<IUserNode, INetViewResponse> = async (
  _,
  { node_id },
) => await execQuery.net.tree.getData([node_id]);
getTree.paramsSchema = UserNodeSchema;
getTree.responseSchema = NetViewResponseSchema;
getTree.allowedForNetUser = 'INVITING';
getTree.checkNet = true;
