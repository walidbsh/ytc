const express = require('express');
//const readline = require('readline');
//const path = require('path');
//const bodyParser = require('body-parser');
//const fs = require('fs');
const ytdl = require('ytdl-core');
const http = require('http');


const app = express(); 

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://your-frontend.com"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.get("/api/video/:id", async (req, res) => { 
    let id = req.params.id;
    let video_url = "https://www.youtube.com/watch?v=" + id;
  
    ytdl.getInfo(video_url).then(info => {
        let audioFormat = ytdl.chooseFormat(info.formats, {quality: 'highestaudio', filter: 'audioonly' });
        res.send( audioFormat.url );   
    });
})

const port = process.env.PORT || 5000; 
app.listen(port, () => console.log("Server Listen to 127.0.0.1:", port));


/*mkdir actions-runner && cd actions-runner
curl -o actions-runner-linux-x64-2.314.1.tar.gz -L https://github.com/actions/runner/releases/download/v2.314.1/actions-runner-linux-x64-2.314.1.tar.gz
echo "6c726a118bbe02cd32e222f890e1e476567bf299353a96886ba75b423c1137b5  actions-runner-linux-x64-2.314.1.tar.gz" | shasum -a 256 -c
tar xzf ./actions-runner-linux-x64-2.314.1.tar.gz
./config.sh --url https://github.com/walidbsh/yt --token BHFARIYYL75KKSK3FBLEIOTF7M5BE*/
