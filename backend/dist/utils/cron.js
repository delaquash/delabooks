"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* This TypeScript code snippet is setting up a cron job that runs every 14 minutes. Within the cron
job function, it makes an HTTPS GET request to an API endpoint specified in the environment variable
`API_URI`. If the response status code is 200, it logs "API is running"; otherwise, it logs "API is
not running" along with the response status code. Additionally, it handles errors that may occur
during the HTTPS request. */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cron_1 = require("cron");
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const job = new cron_1.CronJob("*/14 * * * *", function () {
    // Parse the URI to determine which protocol to use
    const apiUrl = process.env.API_URI;
    const parsedUrl = url_1.default.parse(apiUrl);
    // Choose the appropriate module based on protocol
    const requestModule = parsedUrl.protocol === 'https:' ? https_1.default : http_1.default;
    requestModule.get(apiUrl, (res) => {
        if (res.statusCode === 200) {
            console.log("API is running");
        }
        else {
            console.log("API is not running", res.statusCode);
        }
    })
        .on("error", (err) => console.log("Error while checking API", err));
});
// Start the job
job.start();
exports.default = job;
