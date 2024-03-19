import { Module } from "@nestjs/common";

import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { TopicModule } from "./topic/topic.module";
import { ArticleModule } from "./article/article.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [FileModule, UserModule, TopicModule, ArticleModule, AdminModule],
})
export class Modules {}
