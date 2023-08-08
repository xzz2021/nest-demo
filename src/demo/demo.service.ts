import { Injectable } from '@nestjs/common';
import { CreateDemoDto } from './dto/create-demo.dto';
import { UpdateDemoDto } from './dto/update-demo.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class DemoService {
  constructor(
    @InjectRepository(User) private readonly userRepository:  //  调用数据库必须进行注入
    Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository:  //  调用数据库必须进行注入
    Repository<Profile>,
  ){}

  // 创建数据的post请求会走向这里
  create(createDemoDto: CreateDemoDto) {
      const userSave = this.userRepository.create(createDemoDto)
      return this.userRepository.save(userSave)
  }

  createProfile(createProfileDto: CreateProfileDto) {
    const profileSave = this.profileRepository.create(createProfileDto)
    return this.profileRepository.save(profileSave)
}

    findProfile( id: number){   //关联表格profile查询，，提供关键索引userid，，，直接使用user表就可以获得profile表格的数据
      return this.userRepository.findOne({ where: { id } })
    }

  findAll() {
    // return `This action returns all demo`;
    return this.userRepository.find();
  }

  async findOne(username: string) {
    let res = await this.userRepository.findOne({ where: {username} })
    return res || '未找到此用户信息'
    // return await this.userRepository.find();
  }

  async update(id: number, updateDemoDto: UpdateDemoDto) {
    // let res = await this.userRepository.exist()
    let res = await this.userRepository.update(id, updateDemoDto)
    console.log("🚀 ~ file: demo.service.ts:35 ~ DemoService ~ update ~ res:", res)
    return  res.affected ? '修改成功': '修改失败'
  }

  async remove(id: number) {
    let res = await this.userRepository.delete(id)
    if(res.affected == 1) return `删除用户${id}成功！`;
    return '删除失败'
  }
}


