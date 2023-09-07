import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>
    ) { }
  
  async   create(createRoleDto: CreateRoleDto) {
    const role =  await this.rolesRepository.create(createRoleDto)
    return this.rolesRepository.save(role)
  }

  async findAll() {
    return await this.rolesRepository.find()
        //  const [ roles, sum]  = await this.rolesRepository.findAndCount()
        //   return roles

  }

  findOne(id: number) {
    return this.rolesRepository.findOne({
      where: {
        id
      }
    })

  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    let currole =  await this.findOne(id) // 获取当前用户实例
    this.rolesRepository.merge(currole, updateRoleDto)   // 合并生成新的实例
    return this.rolesRepository.save(currole)   // 保存实例
  }

  async remove(id: number) {
    const res = await this.rolesRepository.delete(id)
    if(res.affected == 1) return { msg: `删除id为${id}的角色成功！`}

  }
}
