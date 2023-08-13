
//  此处定义业务处理功能函数， orm对接数据库

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Logs } from './entities/logs.entity';
import { joinQueryInfo } from './dto/join-query-info.dto';
import { confitionUtils } from 'src/utils/db.auxiliary';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './entities/profile.entity';



@Injectable()
export class UserinfoService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository:  //  调用数据库必须进行注入
    Repository<Users>,
    @InjectRepository(Logs) private readonly logsRepository:  //  调用数据库必须进行注入
    Repository<Logs>,
    @InjectRepository(Profile) private readonly profileRepository:  //  调用数据库必须进行注入
    Repository<Profile>,
  ){}

  
  // 创建数据的post请求会走向这里
  create(createUsersDto: CreateUsersDto) {
    const userSave = this.usersRepository.create(createUsersDto)
    return this.usersRepository.save(userSave)
  }


  findProfile( id: number){   //关联表格profile查询，，提供关键索引userid，，，直接使用user表就可以获得profile表格的数据
    return this.usersRepository.findOne({ where: { id } })
  }

  findAll() {
    return `This action returns all userinfo`;
  }

  async findOne(username: string) {
    let res = await this.usersRepository.findOne({ where: {username} })
    return res || '未找到此用户信息'
  }


   findID(id: number) {
    return this.usersRepository.findOne({ where: {id} })
  }

  async addprofile(profileDto: ProfileDto) {

    let { userId, ...profile } = profileDto
    // 先构造生成profile的class类数据
    const profileSave = await this.profileRepository.create(profile)
    // 先进行profile表的存储
    await  this.profileRepository.save(profileSave)
    //  获取当前用户的信息
    const currentUser= await this.usersRepository.findOne({ where: {id: userId} })
    //  把当前profile表存储的信息  赋值给  Users表  进行关联存储
    currentUser.profile = profileSave
    await  this.usersRepository.save(currentUser)

     return '保存成功！'
    // userinfo.profile = profileSave
    // return  res.affected ? '修改成功': '修改失败'

  }


  async getprofile(id: number){  //  https://orkhan.gitbook.io/typeorm/docs/select-query-builder
    // return this.usersRepository.createQueryBuilder('user')
    //         // .select('profile')
    //         .where('id = :id', {id})
    //         .leftJoinAndSelect('user.profile', 'profile')
    //         .getMany()

            return  this.usersRepository.find({
              where: {
                id
              },
              relations: {
                  profile: true,
              },
          })
  }

  async update(id: number, updateUsersDto: UpdateUsersDto) {
    //  貌似应该先通过token确认用户信息，对比id一致，再进行下一步
    let res = await this.usersRepository.update(id, updateUsersDto)
    // console.log("🚀 ~ file: demo.service.ts:35 ~ DemoService ~ update ~ res:", res)
    return  res.affected ? '修改成功': '修改失败'
  }

  async remove(id: number) {
    let res = await this.usersRepository.delete(id)
    if(res.affected == 1) return `删除用户${id}成功！`;
    return '删除失败'
  }
  async findLogsByGroup0(id: number){
    const user = await this.findID(id)  // 通过id查找到用户信息
    return this.logsRepository.find({
        where: {
          user
        },
        relations: {  // 此定义为是否附带返回当前用户信息  附带返回更多信息
          user: !true,
        }
    })
  }

  


  async findLogsByGroup(id: number){  //  https://orkhan.gitbook.io/typeorm/docs/select-query-builder
    return this.logsRepository.createQueryBuilder('logs')
            .select('logs.status')
            .select('*')
            .where('userId = :id', {id})
            .getRawMany()
  }


  joinQuery(joinQueryParams: joinQueryInfo){
    const { page, limit, username, role, gender  } = joinQueryParams

    const capacity = limit || 10
    const skip = ((capacity || 1) - 1) * capacity

    const queryBuilder = this.usersRepository.createQueryBuilder('users')
          .leftJoinAndSelect('users.profile', 'profile')
          .leftJoinAndSelect('users.role', 'role')
          let obj = {
            'user.username': username,
            'profile.gender': gender,
            'roles.id': role,
          }
        return  confitionUtils(queryBuilder, obj)


  }
}
