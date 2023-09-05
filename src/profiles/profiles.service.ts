import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Users) private readonly usersRepository:  //  调用数据库必须进行注入
  Repository<Users>){
  }
  

  async updateProfile(userAndProfile){
    const { username, profile } = userAndProfile
    const curUser = await this.usersRepository.findOne({ where: {username} })
    curUser.profile = profile
    return await this.usersRepository.save(curUser)
  }

  create(createProfileDto: CreateProfileDto) {
    return 'This action adds a new profile';
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
