/* This TypeScript code snippet is setting up a cron job that runs every 14 minutes. Within the cron
job function, it makes an HTTPS GET request to an API endpoint specified in the environment variable
`API_URI`. If the response status code is 200, it logs "API is running"; otherwise, it logs "API is
not running" along with the response status code. Additionally, it handles errors that may occur
during the HTTPS request. */
import dotenv from 'dotenv';
dotenv.config();
// import cron from "cron";
import { CronJob } from "cron";

import https from "https";

const job = new CronJob("*/14 * * * *", function() {
    https.get(process.env.API_URI!, (res) => {
        if(res.statusCode === 200) console.log("API is running");
        else console.log("API is not running", res.statusCode);
    })
    .on("error", (err) => console.log("Error while checking API",err));
})

export default job