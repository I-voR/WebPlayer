/* eslint-disable require-jsdoc */
const fs = require('fs')
const http = require('http')
const Crypto = require('crypto')
const formidable = require('formidable')

const PORT = process.env.PORT || 3000
const PATH = process.cwd().replace(/\\/g, '/')

function readMusic() {
    let obj = {
        'dirs': [],
        'files': []
    }

    let dirs = fs.readdirSync(PATH + '/static/mp3/')
    let files, arr, stats

    dirs.forEach((dir) => {
        if (dir !== 'temp') {
            obj.dirs.push(dir)
            arr = []

            files = fs.readdirSync(PATH + '/static/mp3/' + dir)
    
            files.forEach((file) => {
                if (file.indexOf('.jpg') === -1) {
                    stats = fs.statSync(PATH + '/static/mp3/' + dir + '/' + file)
                    arr.push({ 'file': file, 'size': stats.size })
                }
            })
    
            obj.files.push(arr)
        }
    })

    return obj
}

function fileUpload(fields, files) {
    let oldPath, newPath
    let dir = PATH + '/static/mp3/upload-'
    dir += Crypto.randomBytes(16).toString('base64').slice(0, 16).replace(/\//g, '0').replace(/\\/g, '0')
    dir += '/'

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    for (let i = 0; i < fields.length; i++) {
        let name = 'file' + i
        oldPath = files[name].path
        newPath = dir + files[name].name

        if (files[name].name.indexOf('jpg') !== -1) {
            newPath = dir + 'cover.jpg'
        }

        fs.rename(oldPath, newPath, function(err) {
            if (err) return
        })
    }
}

function formHandler(req, res) {
    let form = formidable.IncomingForm()

    if (!fs.existsSync(PATH + '/static/mp3/temp/')) {
        fs.mkdirSync(PATH + '/static/mp3/temp/')
    }

    form.uploadDir = PATH + '/static/mp3/temp/'

    form.parse(req, function(err, fields, files) {
        if (err) { return }

        if (fields.action === 'UPLOAD') {
            fileUpload(fields, files)
            res.writeHead(200)
            res.end()
        }
        else {
            let list = readMusic()
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.writeHead(200)
            res.end(JSON.stringify(list, null, 2))
        }
    })
}

function redirect(req, res) {
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
            if (req.url === '/admin' || req.url === '/admin.html') {
                fs.readFile(PATH + '/admin.html', function(err, data) {
                    if (err) { return }
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
                    res.write(data, 'utf-8')
                    res.end()
                })
            }
            break
        }

        break

    case 'POST':
        formHandler(req, res)

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
    // eslint-disable-next-line no-console
    console.log('Server started on port:', PORT)
})
