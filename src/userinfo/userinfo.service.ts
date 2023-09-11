
//  此处定义业务处理功能函数， orm对接数据库

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { joinQueryInfo } from './dto/join-query-info.dto';
import { confitionUtils } from 'src/utils/db.auxiliary';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from '../profiles/profile.entity';
import { Roles } from '../roles/roles.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserinfoService {
  constructor(
    @InjectRepository(Users) private readonly usersRepository:  //  调用数据库必须进行注入
    Repository<Users>,
    @InjectRepository(Profile) private readonly profileRepository:  //  调用数据库必须进行注入
    Repository<Profile>,
    @InjectRepository(Roles) private readonly rolesRepository:  //  调用数据库必须进行注入
    Repository<Roles>,
  ){}

  
  // 创建数据的post请求会走向这里
  async create(createUsersDto: any) {

    const saltOrRounds = 10; // 数值越大速度越慢

    createUsersDto.password = await bcrypt.hash(createUsersDto.password, saltOrRounds);

    // const salt = await bcrypt.genSalt() // 用于生成salt

    
    // 创建注册用户信息
    const userSave:any = this.usersRepository.create(createUsersDto)

    // 获取  普通用户 角色  数据库对应的   实例 
    let curUserrole = await this.rolesRepository.findOne({where:{name: '普通用户'}})

    // 给用户角色赋值  //  必须对应存入实例对象{}  否则没有映射 关系
    userSave.role = [curUserrole]

    //  存储新用户  //  使用save时,若保存的实体有id且存在于数据库,则会自动执行update,没有则insert
    return await this.usersRepository.save(userSave)
    // return await this.usersRepository.insert([userSave1,userSave2,userSave3,userSave4])  //批量存储 插入

  }


  findProfile( id: number){   //关联表格profile查询，，提供关键索引userid，，，直接使用user表就可以获得profile表格的数据
    return this.usersRepository.findOne({ where: { id },relations: ['role'] })
  }
  

  // 返回所有用户
  async findAll() {
    const allUsers = await this.usersRepository.find({
      relations:['role', 'profile']
    })
    return  allUsers
  }

  // 返回所有用户
  async findAll2() {
    const allUsers = await this.usersRepository
    .createQueryBuilder('users')
    .leftJoinAndSelect("users.profile", "profile")
    .leftJoinAndSelect("users.role", "role")
    .getMany()
    return  allUsers

  }

  async findOne(username: string) {
    let res = await this.usersRepository.findOne({where: {username},relations: ['role']})
    // console.log("🚀 ~ file: userinfo.service.ts:85 ~ UserinfoService ~ findOne ~ res:", res)
    return res 
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

  // 更新带联合数据的表  11111 失败
  // async updateprofile(profileDto: ProfileDto) {
  //   let { userId, ...profile } = profileDto
  //   // 先根据id查到User表的用户信息
  //   const currentUser = await this.findID(userId)
  //   //  使用merge进行联合更新
  //   const newUser = this.usersRepository.merge(currentUser, profile as Partial<Users>)
  //   return this.usersRepository.save(newUser)
  // }

    // 更新带联合数据的表
    async updateprofile(profileDto: ProfileDto) {
      let { userId } = profileDto
      // 先根据userid查到User表profileId
      const profileInfo = await this.usersRepository.find({
        where: {id: userId},
        join: { 
          alias: 'user',
          leftJoinAndSelect: {
            pro: 'user.profile.id',
            // profileId: 'user.profileId'
        }
      }
      })
      // console.log("🚀 ~ file: userinfo.service.ts:100 ~ UserinfoService ~ updateprofile ~ profileInfo:", profileInfo)
      // const profileId = profileInfo.profile.id

      return 'test'
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

  async remove(body) {
    let res = await this.usersRepository.delete(body)
    if(res.affected == 1) return { msg: `已删除用户: ${body.username}！`}
    // return await this.usersRepository.delete(body)
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

  // 通过用户名查询用户信息
  findByUsername(username: string) {
    return this.usersRepository.findOne({ where: {username} })
  }

  async findRole(username){
    // 拿到role数组
    let curuser: any = await  this.usersRepository.find(
      {
        where: {username},
        join: {
        alias: "users",
        leftJoinAndSelect: {
          myrole: "users.myrole"
        }
    }})
      // return curuser
      let roleArray = []
      Object.values(curuser[0].myrole).forEach(item  => {
        roleArray.push(item['roleid'])
      })

      // return roleArray
      let newroleArray = []
      for( const item of roleArray){
        let rolename = await  this.rolesRepository.find( { where: {id: item} })
          newroleArray.push(rolename[0]['role'])
      }
         return newroleArray
  }




  async updateRole(userAndRole:any){
    // return 'test'
    let { username, role } = userAndRole
       let curUser = await this.findByUsername(username)
       curUser.role = role
       return await this.usersRepository.save(curUser)
  }

    //  修改用户信息
  async modifyInfo(newInfo: any){
    const { oldUsername, username, userrole } = newInfo
    let curUser = await this.usersRepository.findOne({ where: {username: oldUsername} })
    let roleSave = await Promise.all(
      userrole.map(async(item: any )  => {
       return  await this.rolesRepository.findOne({where:{name: item}})
     })
    )
    curUser.username = username
    curUser.role = roleSave
    return await this.usersRepository.save(curUser)
  }
}
