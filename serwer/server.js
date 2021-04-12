/* eslint-disable require-jsdoc */
const fs = require('fs')
const http = require('http')
const Crypto = require('crypto')
// const qs = require('querystring')

const PORT = process.env.PORT || 3000
const PATH = process.cwd().replace(/\\/g, '/')

function readMusic() {
    let obj = {
        'dirs': [],
        'files': []
    }

    let dirs = fs.readdirSync(PATH + '/static/mp3/')

    dirs.forEach((dir) => {
        obj.dirs.push(dir)
        let files = fs.readdirSync(PATH + '/static/mp3/' + dir)
        let album = []

        files.forEach((file) => {
            if (file.indexOf('.jpg') !== -1) {
                album.push( { 'file': file } )
            }
        })
        obj.files.push(album)
    })   

    return obj
}

function redirect(req, res) {
    let list
    res.setHeader('Access-Control-Allow-Origin', '*')

    switch (req.method) {
    case 'GET':
        switch (req.url.substr(req.url.lastIndexOf('.') + 1)) {
        case 'mp3':
            fs.readFile(PATH + '/static/mp3/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                let stats = fs.statSync(PATH + '/static/mp3/' + decodeURI(req.url))
                res.writeHead(200, {
                    'Content-type': 'audio/mpeg',
                    'Content-Length': stats.size,
                    'Accept-Ranges': 'bytes' 
                })
                res.write(data)
                res.end()
            })
            break
        
        case 'svg':
            fs.readFile(PATH + '/static/img/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'image/svg+xml' })
                res.write(data)
                res.end()
            })
            break
        
        case 'jpg':
            fs.readFile(PATH + '/static/mp3/' + decodeURI(req.url).replace('.jpg', '') + '/cover.jpg', function(err, data) {
                if (err) {
                    fs.readFile(PATH + '/static/img/default.jpg', function(err, defaultData) {
                        if (err) { return }
                        
                        res.writeHead(200, { 'Content-type': 'image/jpeg' })
                        res.write(defaultData)
                        res.end()
                    })
                } else {
                    res.writeHead(200, { 'Content-type': 'image/jpeg' })
                    res.write(data)
                    res.end()
                }
            })
            break

        case 'png':
            fs.readFile(PATH + '/static/img/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'image/png' })
                res.write(data)
                res.end()
            })
            break

        case 'js':
            fs.readFile(PATH + '/static/js/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'text/javascript; charset=utf-8' })
                res.write(data)
                res.end()
            })
            break

        case 'css':
            fs.readFile(PATH + '/static/css/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'text/css; charset=utf-8' })
                res.write(data)
                res.end()
            })
            break

        case 'ico':
            fs.readFile(PATH + '/favicon.ico', function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'image/vnd.microsoft.icon' })
                res.write(data)
                res.end()
            })
            break

        default:
            console.log(req.url)

            if (req.url === '/admin' || req.url === '/admin.html') {
                fs.readFile(PATH + '/admin.html', function(err, data) {
                    if (err) { return }
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(data, 'utf-8')
                    res.end()

                    let dir = PATH + '/' + 
                        Crypto
                            .randomBytes(16)
                            .toString('base64')
                            .slice(0, 16)
                            .replace(/\//g, ' ')
                            .replace(/\\/g, ' ') // Crypto random string

                    console.log(dir) 

                    // if (!fs.existsSync(dir)){
                    //     fs.mkdirSync(dir)
                    // }
                })
            }
            break
        }

        break

    case 'POST':
        console.log(req)
        list = readMusic()
        console.log(list)

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' } )
        res.write(JSON.stringify(list, null, 2), 'utf-8')

        res.end()
        break

    case 'OPTIONS':
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
        res.end()

        break
    }
}

const server = http.createServer(function(req, res) {
    redirect(req, res)
})

server.listen(PORT, function() {
    console.log('Server started on port:', PORT)
})
