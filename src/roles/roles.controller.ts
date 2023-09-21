import { Controller, Get, Post, Body,  ClassSerializerInterceptor, UseInterceptors, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UserinfoService } from 'src/userinfo/userinfo.service';
import { Role } from './roles.enum';
import { Roles } from 'src/allProcessor/decorator/roles';
import { JwtAuthGuard } from 'src/allProcessor/guard/auth.guard';
import { RolesGuard } from 'src/allProcessor/guard/role.guard';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('角色相关接口')  //  角色相关接口swagger注释
@Controller('roles')
@UseInterceptors(ClassSerializerInterceptor)
export class RolesController {
  constructor(private readonly rolesService: RolesService,
    private readonly userinfoService: UserinfoService,) {}

  @Post('create')
  // @ApiCreatedResponse({description: '创建新角色',type: Roles})
  @ApiResponse({status: 200, description: '响应数据描述'})
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get('getall')
  @Roles(Role.Admin)  //  注明允许的身份
  @UseGuards(RolesGuard) // 引入角色守卫
  @UseGuards(JwtAuthGuard) // 引入jwt解析req.user
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('getarr')
  findRoleArr() {
    return this.rolesService.findRoleArr();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.rolesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @Req() req: any) {
  //   let updateData = Object.keys(updateRoleDto).length == 0 ?  req.query: updateRoleDto
  //   // console.log("🚀 ~ file: roles.controller.ts:28 ~ RolesController ~ update ~ updateData:", updateData)
  //   // return 'ceshi'
  //   return this.rolesService.update(+id, updateData);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.rolesService.remove(+id);
  // }

  @Post('addrole')
  addRole(@Body() userAndRole: any){
    return this.userinfoService.updateRole(userAndRole)
  }
}
