import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function() {
    https.get("https://delabooks.vercel.app/api/cron", (res) => {
        
    })
})