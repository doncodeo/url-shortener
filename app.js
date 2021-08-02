const express = require('express')
const urlLink = require('./src/URL')
const Storage = require('./src/data/storage') 
const app = express();
const port = process.env.PORT || 6060;

app.use(express.json())

if(Storage.data.links === undefined){
    Storage.data.links = [];
    Storage.write();
}

app.get('/', (req, res) => {
	res.send("URL Shortener, clone code from this repository (https://github.com/doncodeo/url-shortener)")
})
app.post('/cut', urlLink.cutUrl /*callback*/)
app.get('/[a-f0-9]{5}', urlLink.Redirect)
app.post('/delete', urlLink.deleteLink)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
