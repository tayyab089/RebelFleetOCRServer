const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

const {createWorker} = require('tesseract.js')

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.post('/',(req,res)=>{

    const { createWorker } = require('tesseract.js');

    var base64 = req.body.base64;
    let imageBuffer = Buffer.from(base64, "base64");


    const worker = createWorker();

    (async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imageBuffer);
    await worker.terminate();
    res.send(JSON.stringify(text));
    })();

    // Tesseract.recognize(
    //     './Public/Images/testimg.png',
    //     'eng',
    //     { logger: m => console.log(m) }
    //   ).then(({ data: { text } }) => {
    //     console.log(text);
    //   })
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});