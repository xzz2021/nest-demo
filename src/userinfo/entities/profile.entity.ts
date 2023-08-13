
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Users } from './users.entity';


@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    gender: number;

    @Column()
    photo: string;

    @Column()
    address: string;

    @OneToOne(() => Users)   // 关联表单
    @JoinColumn()
    user: Users;  //  关联表单Users   连接点  字段是 此处定义的 user键加上  Users表里的自增id  最后是 userId
    

}
