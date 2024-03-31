import { Module } from "@nestjs/common";

import { CronTestController } from "./cron-test.controller";

@Module({
  imports: [],
  controllers: [CronTestController],
})
export class CronTestModule {}
