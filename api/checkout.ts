import { handle } from '../server/handlers/checkout';

export default async function handler(req: Request): Promise<Response> {
  return handle(req);
}