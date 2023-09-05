
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'


@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    @Exclude()
    id: number;

    @Column()
    gender: string;

    @Column()
    age: string;

    @Column()
    address: string;


    // @Column({length: 64})
    // testdfgdfgnewitem: string;

    // @Column()
    // testn6: string;

    // @Column()
    // testn777: string;

    // @OneToOne(() => Users)   // 关联表单
    // @JoinColumn()
    // user: Users;  //  关联表单Users   连接点  字段是 此处定义的 user键加上  Users表里的自增id  最后是 userId
    

}
