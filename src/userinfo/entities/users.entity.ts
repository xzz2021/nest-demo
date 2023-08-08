
//定义表格，表的名称会以class小写命名

//若已有项目数据库，，反向生成模型代码，可以使用三方库typeorm-model-generator


//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './profile.entity';
import { Logs } from './logs.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;


    @OneToOne(() => Profile)   //关联表单，需要在关联的两张表的entity里都声明OneToOne， 实现映射
    profile: Profile;

    @OneToMany(() => Logs, logs => logs.user)
    logs: Logs[];
}