import { PartialType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";

//  class ProfileDto {
//     gender: string;
//     photo: string;
//     address: string;
//     user: string;
// }


// export class CreateProfileDto extends PartialType(ProfileDto) {
//     gender: string;
//     photo: string;
//     address: string;
//     user: string;
// }


export class CreateProfileDto  {
    gender: number;
    photo: string;
    address: string;
    user: User;
}