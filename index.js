const noblox = require("noblox.js")
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const mutes = require("./accounts.json");
async function startApp() {

    fs.readFileSync("cookies.txt").toString().split("\n").forEach(async function (line, index, arr) {
        if (index === arr.length - 1 && line === "") {
            console.log(chalk.redBright("COOKIES.TXT IS EMPTY, PLEASE ADD SOME COOKIES THEN RESTART THE BOT"))
            return;
        }

        try {

            await noblox.setCookie(line);
        } catch (err) {
            for (let i in mutes) {
                console.log(chalk.redBright(`${mutes[i].userid} USER IS UNKNOWN/DELETED - (${err})`));
                delete mutes[i];
            }
        }
        let currentUser2 = await noblox.getCurrentUser();

        mutes[currentUser2.UserID] = {
            userid: currentUser2.UserID,
            cookie: line
        }
        fs.readFile("./accounts.json", 'utf8', function (err, data) {
            if (err) { console.log(`${currentUser.UserID} FAILED TO STORE IN JSON FILE - (${err})`) };
            fs.writeFile("./accounts.json", JSON.stringify(mutes, null, 4), function (err, result) {
                if (err) { console.log(`${currentUser.UserID} FAILED TO STORE IN JSON FILE - (${err})`) };
            });
        });
        let currentUser = await noblox.getCurrentUser();
        let information = await noblox.getPlayerInfo({ userId: currentUser.UserID })
        console.log(chalk.blue(`${currentUser.UserName}:${currentUser.UserID} has an account age of ${information.age} with ${information.friendCount} friend(s), following ${information.followingCount} people, with a total of ${information.followerCount} follower(s)`));
    });

};

startApp();