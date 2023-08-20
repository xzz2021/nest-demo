import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/userinfo/dto/create-users.dto';
import { UserinfoService } from 'src/userinfo/userinfo.service';

// interface CreateUsers{
//   usernames: string;
//   passwords: string;
//   createtime: string;
// }

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userinfoService: UserinfoService,
        ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Body() userinfo: any, @Req() req: Request){
      // 经过守卫返回的信息会自动放在req.user中
      // 如果上面守卫校验通过了,则会执行下面的登录返回token时间
      return this.authService.login(userinfo)
    }

    // 使用nest内置的序列化拦截器,, 可以将返回数据的字段 进行过滤排除等(在数据的entity文件里定义)
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('register')  // 新增表格数据接口
    //  body后的dto定义传递过来的请求体数据格式
    // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
    create(@Body() createUsersDto: any) {
      createUsersDto.createtime = new Date().toLocaleString();
      return this.userinfoService.create(createUsersDto);
    }
}
