require("dotenv").config();
const CronJob = require("cron").CronJob;
const { IgApiClient } = require('instagram-private-api');
const { get } = require('request-promise');
const express = require('express');  // Change to require
const { promisify } = require('util');
const { readFile } = require('fs');

const readFileAsync = promisify(readFile);
const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})



const postToInsta = async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

    const videoPath = './friday.mp4'
    const coverPath = './friday.jpg'

    const publish = await ig.publish.video({
        video: await readFileAsync(videoPath),
        coverImage: await readFileAsync(coverPath),
        caption: 'Today Is Friday In California',
    })

}






const cronInsta = new CronJob("* 14 * * FRI", async () => {
    postToInsta();
})

//postToInsta();
cronInsta.start();
