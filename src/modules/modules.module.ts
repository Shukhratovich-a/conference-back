import { Module } from "@nestjs/common";

import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { HeaderModule } from "./header/header.module";
import { HomepageModule } from "./homepage/homepage.module";
import { SectionModule } from "./section/section.module";
import { ArticleModule } from "./article/article.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [FileModule, UserModule, HeaderModule, HomepageModule, SectionModule, ArticleModule, AdminModule],
})
export class Modules {}
