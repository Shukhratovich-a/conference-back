import { Controller, Get } from "@nestjs/common";
import { appendFile } from "fs";

import * as cron from "node-cron";

@Controller("cron-test")
export class CronTestController {
  // GET
  @Get()
  async getAll() {
    try {
      cron.schedule("* * * * *", () => {
        appendFile("logger.txt", "it works", (error) => {
          if (error) throw error;
          console.log("Logged");
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
