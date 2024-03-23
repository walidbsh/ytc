const express = require('express');
//const readline = require('readline');
//const path = require('path');
//const bodyParser = require('body-parser');
//const fs = require('fs');
const ytdl = require('yt-dlp-wrap');
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
    else
     res.send("test working");
})

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log("Server Listen to 127.0.0.1:", port));


/*mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.314.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.314.1/actions-runner-linux-x64-2.314.1.tar.gz
echo "6c726a118bbe02cd32e222f890e1e476567bf299353a96886ba75b423c1137b5  actions-runner-linux-x64-2.314.1.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.314.1.tar.gz
./config.sh --url https://github.com/walidbsh/yt --token BHFARIYYL75KKSK3FBLEIOTF7M5BE*/
