# electron-photo-screen-saver

This is a fork from https://github.com/RandScullard/photo-screen-saver
Since Google killed their Picasa screen saver, I wanted a screensaver that can consume images published on [theSilentCamera](https://theSilentCamera.com/).

# Compiling

1. Clone the repo and modify the [config file to suit your needs](../blob/master/screenSaverConfig.json)
2. Create a new environment variable that will hold the path to your screensaver's configuration file on your HDD
```
[System.Environment]::SetEnvironmentVariable("ELECTRON_SCREENSAVER_CONFIG_FILE", "ABSOLUTE_PATH_TO screenSaverConfig.json", "User")
```
3. Build and test the project
```
# For Windows
npm install; npm run build; npm start
```

# Installation

* Find the file package\electron-photo-screen-saver-win32-x64\electron-photo-screen-saver.scr

* Right-click the file and choose Install. When you go to the Windows screen saver settings, you'll see that electron-photo-screen-saver is now your selected screen saver.

# Configuration/Settings

Right now, there is no UI to modify the basic settings for this screensaver. You may modify the json file on your hard drive
```
# See where the config file is stored & modify it
[System.Environment]::GetEnvironmentVariable("ELECTRON_SCREENSAVER_CONFIG_FILE")
```
```
{
    // An array of the urls that will be used to get photos
    "sourceUrls": [
        "https://thesilentcamera.com/api/screen_saver/v1/"
    ],
    // The interval (in milliseconds) for fetching a new image
    "interval": 60000
}
```
The changes will take effect next time you run the screensaver

# What data should the API return?

* The API should return a json payload with a list of photos
```
{
    "status":"ok",
    "photos": [
        {
            "url": "",
            "credit": "",
            "date": "",
            "title": ""
        }
    ]
}
```

* See the interface defined by [photo.ts](../blob/master/src/photo.ts) for the fields expected for each photograph.
