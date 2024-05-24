import { Module } from "@nestjs/common";

import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { HeaderModule } from "./header/header.module";
import { HomepageModule } from "./homepage/homepage.module";
import { SectionModule } from "./section/section.module";
import { ArticleModule } from "./article/article.module";
import { DateModule } from "./date/date.module";
import { FeeModule } from "./fee/fee.module";
import { SponsorModule } from "./sponsor/sponsor.module";
import { SubmissionModule } from "./submission/submission.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    FileModule,
    UserModule,
    HeaderModule,
    HomepageModule,
    DateModule,
    FeeModule,
    SponsorModule,
    SubmissionModule,
    SectionModule,
    ArticleModule,
    AdminModule,
  ],
})
export class Modules {}
