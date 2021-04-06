const fs = require('fs')

console.log(process.cwd())

fs.readdir(process.cwd(), (err, files) => {
    if (err) {
        return console.error(err)
    }
    files.forEach((fileName) => {
        console.log(fileName)
    })
})