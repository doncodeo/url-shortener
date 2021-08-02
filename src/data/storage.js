// import fs from 'fs'
const fs = require('fs')

const Storage = {
    data: fs.existsSync("storage.json") 
        ? JSON.parse(fs.readFileSync("storage.json", "utf8"))
        : JSON.parse(
            fs.readFileSync(
                "storage.json",
                fs.appendFileSync("storage.json", '{ "links": [] }')
            )
        ),

    write: () =>
        fs.existsSync("storage.json")
            ? fs.writeFileSync("storage.json", JSON.stringify(Storage.data, null, 2))
            : fs.appendFileSync(
                "storage.json",
                JSON.stringify(Storage.data, null, 2)
            ),
};

module.exports = Storage
