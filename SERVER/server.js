/* eslint-disable require-jsdoc */
const fs = require('fs')
const http = require('http')
// const qs = require('querystring')

const PORT = process.env.PORT || 3000
const PATH = process.cwd()
const SERV_ADDR = 'http://localhost:' + PORT

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
            if (file !== 'cover.jpg') {
                album.push( { 'file': file } )
            }
        })
        obj.files.push(album)
    })   

    return obj
}


function redirect(req, res) {
    let list

    switch (req.method) {
    case 'GET':
        list = readMusic()
        console.log(list)

        if (req.url.indexOf('.mp3') !== -1) {
            fs.readFile(PATH + '/static/mp3/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'audio/mpeg' })
                res.write(data)
                res.end()
            })
        } else if (req.url.indexOf('.css') !== -1) {
            fs.readFile(PATH + '/static/css/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'text/css' })
                res.write(data)
                res.end()
            })
        } else if (req.url.indexOf('.svg') !== -1) {
            fs.readFile(PATH + '/static/svg/' + decodeURI(req.url), function(err, data) {
                if (err) { return }
                res.writeHead(200, { 'Content-type': 'image/svg+xml' })
                res.write(data)
                res.end()
            })
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
            res.write(JSON.stringify(list, null, 2), 'utf-8')
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
    // res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' } )
    redirect(req, res)
})

const vue = http.createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    let site

    switch (req.method) {
    case 'GET':
        site = fs.readFileSync(PATH + '/../KLIENT/index.html', 'utf-8')
        
        if (req.url.indexOf('.mp3') !== -1) {
            let audio = '<source src="' + SERV_ADDR + req.url + '"'
            site = site.replace('<source', audio)
            res.write(site, 'utf-8')
            res.end()
        } else {
            res.write(site, 'utf-8')
            res.end()
        }
    
        // else {
        // res.end(JSON.stringify(obj, null, 2))
        // }
    
        break
    }
})

server.listen(PORT, function() {
    console.log('Server started on port:', PORT)
})

vue.listen(8080, function() {
    console.log('Server started on port:', 8080)
})