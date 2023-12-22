const noblox = require("noblox.js");
const fs = require('fs');
const chalk = require('chalk');

async function startApp() {
    try {
        const cookies = fs.readFileSync("cookies.txt", 'utf8').split("\n").filter(Boolean);

        if (cookies.length === 0) {
            console.log(chalk.redBright("COOKIES.TXT IS EMPTY, PLEASE ADD SOME COOKIES THEN RESTART THE BOT"));
            return;
        }

        const mutes = {};

        for (const line of cookies) {
            try {
                await noblox.setCookie(line);
                const currentUser = await noblox.getCurrentUser();

                mutes[currentUser.UserID] = {
                    userid: currentUser.UserID,
                    cookie: line
                };

                const data = JSON.stringify(mutes, null, 4);
                fs.writeFileSync("./accounts.json", data, 'utf8');

                const information = await noblox.getPlayerInfo({ userId: currentUser.UserID });
                console.log(chalk.blue(`${currentUser.UserName}:${currentUser.UserID} has an account age of ${information.age} with ${information.friendCount} friend(s), following ${information.followingCount} people, with a total of ${information.followerCount} follower(s)`));
            } catch (err) {
                console.log(chalk.redBright(`Error: ${err}`));
            }
        }
    } catch (err) {
        console.log(chalk.redBright(`Error: ${err}`));
    }
}

startApp();
