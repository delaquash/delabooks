/* This TypeScript code snippet is setting up a cron job that runs every 14 minutes. Within the cron
job function, it makes an HTTPS GET request to an API endpoint specified in the environment variable
`API_URI`. If the response status code is 200, it logs "API is running"; otherwise, it logs "API is
not running" along with the response status code. Additionally, it handles errors that may occur
during the HTTPS request. */
import dotenv from 'dotenv';
dotenv.config();

import { CronJob } from "cron";
import https from "https";
import http from "http";
import url from "url";

const job = new CronJob("*/14 * * * *", function() {
  // Parse the URI to determine which protocol to use
  const apiUrl = process.env.API_URI!;
  const parsedUrl = url.parse(apiUrl);
  
  // Choose the appropriate module based on protocol
  const requestModule = parsedUrl.protocol === 'https:' ? https : http;
  
  requestModule.get(apiUrl, (res) => {
    if(res.statusCode === 200) {
      console.log("API is running");
    } else {
      console.log("API is not running", res.statusCode);
    }
  })
  .on("error", (err) => console.log("Error while checking API", err));
});

// Start the job
job.start();

export default job;