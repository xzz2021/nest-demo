
//定义表格，表的名称会以class小写命名

//若已有项目数据库，，反向生成模型代码，可以使用三方库typeorm-model-generator


//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Profile } from './profile.entity';
import { Logs } from './logs.entity';
import { UsersRole } from './usersrole.entity';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique: true })  // 设定当前键为唯一值
    username: string;

    @Column()
    password: string;

    //ontoone 只需要在被关联的副表声明即可
    //  oneToOne 定义的位置 会在当前表格生成关联字段

   //  第一个参数是关联的类， 也即被关联的表格名
   //  cascade 代表可以直接对关联表单进行操作
    @OneToOne(() => Profile, { cascade: true})   //关联表单，需要在关联的两张表的entity里都声明OneToOne， 实现映射
    @JoinColumn()
    profile: Profile;


    // 第二个参数  创建双向关系
    @OneToMany(() => Logs, logs => logs.user)
    logs: Logs[];

    @OneToMany(() => UsersRole, usersrole => usersrole.user, {cascade: true,})
    @JoinColumn()
    myrole: UsersRole[];
}