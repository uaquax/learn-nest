import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/User";
import { UsersService } from "src/users/services/users/users.service";

export class SessionSerializer extends PassportSerializer {
    constructor(@Inject("USER_SERVICE") private readonly usersService: UsersService){
        super();
    }

    serializeUser(user: User, done: (err, user: User) => void) {
        done(null, user);
    }
    async deserializeUser(user: User, done: (err, user: User) => void) {
        const userDb = await this.usersService.findUserById(user.id);
        return userDb ? done(null, userDb): done(null, null);
    }
}