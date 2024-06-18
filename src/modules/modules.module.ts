import { Module } from "@nestjs/common";

import { FileModule } from "./file/file.module";
import { UserModule } from "./user/user.module";
import { OrganizerModule } from "./organizer/organizer.module";
import { OrganizerRoleModule } from "./organizer-role/organizer-role.module";
import { CommitteeModule } from "./committee/committee.module";
import { CommitteeRoleModule } from "./committee-role/committee-role.module";
import { SpeakerModule } from "./speaker/speaker.module";
import { HeaderModule } from "./header/header.module";
import { HomepageModule } from "./homepage/homepage.module";
import { SectionModule } from "./section/section.module";
import { ArticleModule } from "./article/article.module";
import { DateModule } from "./date/date.module";
import { FeeModule } from "./fee/fee.module";
import { SponsorModule } from "./sponsor/sponsor.module";
import { SubmissionModule } from "./submission/submission.module";
import { VenueModule } from "./venue/venue.module";
import { AccommodationModule } from "./accommodation/accommodation.module";
import { ContactModule } from "./contact/contact.module";
import { ProgramModule } from "./program/program.module";
import { SocialProgramModule } from "./social-program/social-program.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    FileModule,
    UserModule,
    OrganizerModule,
    OrganizerRoleModule,
    CommitteeModule,
    CommitteeRoleModule,
    SpeakerModule,
    HeaderModule,
    HomepageModule,
    DateModule,
    FeeModule,
    SponsorModule,
    SubmissionModule,
    VenueModule,
    AccommodationModule,
    ContactModule,
    ProgramModule,
    SocialProgramModule,
    SectionModule,
    ArticleModule,
    AdminModule,
  ],
})
export class Modules {}
