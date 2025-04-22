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
// import cron from "cron";
const cron_1 = require("cron");
const https_1 = __importDefault(require("https"));
const job = new cron_1.CronJob("*/14 * * * *", function () {
    https_1.default.get(process.env.API_URI, (res) => {
        if (res.statusCode === 200)
            console.log("API is running");
        else
            console.log("API is not running", res.statusCode);
    })
        .on("error", (err) => console.log("Error while checking API", err));
});
exports.default = job;
