
//定义表格的column，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm'
import { Users } from '../users/users.entity';
import { Exclude } from 'class-transformer';
// import { UsersRole } from './usersrole.entity';


@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    // @Exclude()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Users, user => user.username)   // 关联表单   联合查询可以使用querybuilder进行筛选条件查询
    // @JoinTable()  // 因为是多对多   这里是要关联整张表格
    users: Relation<Users[]>;
}
