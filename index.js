const express = require('express');
//const readline = require('readline');
//const path = require('path');
//const bodyParser = require('body-parser');
//const fs = require('fs');

const YTDlpWrap = require('yt-dlp-wrap').default;

//Get the data from the github releases API. In this case get page 1 with a maximum of 5 items

const http = require('http');

var cors = require('cors'); 

const app = express(); 
 
app.use(cors());
app.get("/api/video/:id", async (req, res) => { 
    let id = req.params.id;
    let video_url = "https://www.youtube.com/watch?v=" + id;

    let working=false;
    if(working)
    ytdl.getInfo(video_url).then(info => {
        let audioFormat = ytdl.chooseFormat(info.formats, {quality: 'highestaudio', filter: 'audioonly' });
        res.send( audioFormat.url );   
    });
    else{

    let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);

//Download the yt-dlp binary for the given version and platform to the provided path.
//By default the latest version will be downloaded to "./yt-dlp" and platform = os.platform().
await YTDlpWrap.downloadFromGithub(
    'path/to/yt-dlp/binary',
    '2020.06.16.1',
    'win32'
);

//Init an instance with a given binary path.
//If none is provided "yt-dlp" will be used as command.
const ytDlpWrap = new YTDlpWrap('path/to/yt-dlp/binary');
//The binary path can also be changed later on.
ytDlpWrap.setBinaryPath('path/to/another/yt-dlp/binary');

     //res.send("test working");
     let metadata = await ytDlpWrap.getVideoInfo('https://www.youtube.com/watch?v=aqz-KE-bpKQ');
     res.send(metadata.title);
     
    }
})

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log("Server Listen to 127.0.0.1:", port));


/*mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.314.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.314.1/actions-runner-linux-x64-2.314.1.tar.gz
echo "6c726a118bbe02cd32e222f890e1e476567bf299353a96886ba75b423c1137b5  actions-runner-linux-x64-2.314.1.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.314.1.tar.gz
./config.sh --url https://github.com/walidbsh/yt --token BHFARIYYL75KKSK3FBLEIOTF7M5BE*/
