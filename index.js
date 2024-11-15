import dotenv from 'dotenv';
dotenv.config();

import { CronJob } from 'cron'; // Changed require to import
import { IgApiClient } from 'instagram-private-api';
//import { get } from 'request-promise';
import express from 'express';
import { promisify } from 'util';
import { readFile } from 'fs'; 

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

    // const videoBuffer = await get({
    //     url: 'https://drowsykat.dev/Share/videos/friday.mp4',
    //     encoding: null,
    // })
    // console.log("Fetched video buffer:", videoBuffer);

    const videoPath = './friday.mp4'
    const coverPath = './friday.jpg'

    const publish = await ig.publish.video({
        video: await readFileAsync(videoPath),
        coverImage: await readFileAsync(coverPath),
        caption: 'Today Is Friday In California',
    })

}






const cronInsta = new CronJob("0 14 * * FRI", async () => {
    postToInsta();
})

postToInsta();
cronInsta.start();