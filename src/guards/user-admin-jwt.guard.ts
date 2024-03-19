import { AuthGuard } from "@nestjs/passport";

export class UserOrAdminJwtGuard extends AuthGuard(["user-jwt", "admin-jwt"]) {}
