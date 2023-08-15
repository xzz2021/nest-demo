//dto 定义表格字段 即row

import { IsNotEmpty, IsString, Length } from "class-validator";


export class CreateUsersDto {
    @IsString()
    // @IsNotEmpty({message: '用户名不能为空'})
    @Length(3,20, {
        // $value 
        message: `用户名长度必须在$constraint1到$constraint2之间`
    })
    username: string;


    @IsString()
    @IsNotEmpty()
    @Length(6,50)
    password: string
}
