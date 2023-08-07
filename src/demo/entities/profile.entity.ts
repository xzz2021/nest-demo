
//定义表格，表的名称会以class小写命名

//  此处定义完会直接连接数据库生成表， 新增和移除column也能自动完成
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity';

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

    @OneToOne(() => User)   // 关联表单
    @JoinColumn()
    user: User;
    

}
