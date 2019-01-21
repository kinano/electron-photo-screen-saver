let fs = require('fs');
interface ScreenSaverConfig
{
    sourceUrls: string[];
    interval: number;
}

let data = fs.readFileSync(process.env.ELECTRON_SCREENSAVER_CONFIG_FILE);

let config = JSON.parse(data) as ScreenSaverConfig;

let {sourceUrls, interval} = config;

export {
    sourceUrls,
    interval
};