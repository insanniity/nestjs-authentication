import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRoleDto) {
    const createdRole = await this.prisma.role.create({ data });
    return createdRole;
  }

  async findAll() {
    const roles = await this.prisma.role.findMany();
    return roles;
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const updatedRole = await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
    return updatedRole;
  }

  async remove(id: number) {
    await this.prisma.role.delete({ where: { id } });
  }
}
