/* eslint-disable require-jsdoc */
const fs = require('fs')
const http = require('http')
// const qs = require('querystring')

const PORT = process.env.PORT || 3000
const PATH = process.cwd() + '/'


function readMusic() {
    let obj = {
        'dirs': [],
        'files': []
    }

    let dirs = fs.readdirSync(PATH + 'static/mp3/')

    dirs.forEach((dir) => {
        obj.dirs.push(dir)
        let files = fs.readdirSync(PATH + 'static/mp3/' + dir)
        let album = []

        files.forEach((file) => {
            if (file !== 'cover.jpg') {
                album.push( { 'file': file } )
            }
        })
        obj.files.push(album)
    })   

    return obj
}


function redirect(req, res) {
    let obj, site

    switch (req.method) {
    case 'GET':
        site = fs.readFileSync(PATH + 'index.html', 'utf-8')
        obj = readMusic()

        if (req.url.indexOf('.mp3') !== -1) {
            fs.readFile(PATH + 'static/mp3/' + decodeURI(req.url), function(err, data) {
                if (err) {
                    return console.error(err)
                }
                res.writeHead(200, { 'Content-type': 'audio/mpeg' })
                res.write(data)
                res.end()
            })
        } else {
            res.write(site)
            res.end()
        }

        // else {
        // res.end(JSON.stringify(obj, null, 2))
        // }

        break

    case 'POST':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end()
        break

    case 'OPTIONS':
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end()

        break
    }
}

const server = http.createServer(function(req, res) {
    // res.writeHead(200, { 'content-type': 'application/json;charset=utf-8' } )
    redirect(req, res)
})


server.listen(3000, function() {
    console.log('Server started on port:', PORT)
})
