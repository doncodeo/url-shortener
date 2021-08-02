const validator = require('validator');
const Storage = require('./data/storage');

const Link = {
    cutUrl: async (req, res) => {
        const url = req.body.url

        if (!validator.isURL(url))
            return res.status(400).send("invalid URL!")

        const code = "xxxxx".replace(/x/g, () =>
            Math.floor(Math.random() * 16).toString(16)
        )

        Storage.data.links.push({
            url: req.body.url,
            code: code
        })

        Storage.write()

        res.status(200).send({
            code: code
        })
    },
    Redirect: async (req, res) => {
        const code = req.url.replace(/\//, "");
        let found = false;
        const storage = Storage.data.links;

        const isLinked = (linkUrl) => {
            if (linkUrl.code === code) {
                res.redirect(linkUrl.url)
                return linkUrl
            } else {
                if (!found) res.status(404).send("URL not found");
            }

        }

        const data = storage.find(isLinked);
    },
    deleteLink: async(req,res) => {
        const {url} = req.body;
        const storage = Storage.data.links;

        const findReq = (el) => {
        return el.url === url
        }

        const data = storage.find(findReq)

        function arrayRemove(arr, value) { 
            return arr.filter(function(ele){ 
                
                return ele != value; 
            });
        }
        console.log(storage)
        
        const result = arrayRemove(storage, data);
        res.json("link deleted!")

    }
}

module.exports = Link
