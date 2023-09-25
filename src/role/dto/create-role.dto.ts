import { Role } from "src/role/entities/role.entity";

export class CreateRoleDto extends Role{
  name: string;
  description: string;
}
