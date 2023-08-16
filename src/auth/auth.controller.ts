import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/auth.guard';
import { AuthService } from './auth.service';
import { CreateUsersDto } from 'src/userinfo/dto/create-users.dto';

@Controller('auth')
export class AuthController {
    userinfoService: any;
    constructor(
        private readonly authService: AuthService,
        ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Body() userinfo: any, @Req() req: Request){
      // 经过守卫返回的信息会自动放在req.user中
      // 如果上面守卫校验通过了,则会执行下面的登录返回token时间
      return this.authService.login(userinfo)
    }


    @Post('register')  // 新增表格数据接口
    //  body后的dto定义传递过来的请求体数据格式
    // 如果前端数据体传递了其他未在dto定义的数据，将会被自动剔除
    create(@Body() createUsersDto: CreateUsersDto) {
      return this.userinfoService.create(createUsersDto);
    }
}
