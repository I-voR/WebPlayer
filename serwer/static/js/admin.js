/** 
* Add <DIV> elements which are representing files to upload
* @param {Array} files - Array of all files which are going to be send.
*/
function generateList(files) {
    let div, img, span

    setTimeout(function() {
        for (let i = 0; i < files.length; i++) {
            div = document.createElement('DIV')
            div.className = 'file'
            
            img = document.createElement('IMG')
            img.src = 'http://localhost:3000/'
            img.src += files[i].name.indexOf('mp3') !== -1 ? 'mp3.png' : 'jpg.png'

            span = document.createElement('SPAN')
            span.innerText = files[i].name

            div.append(img)
            div.append(span)
            document.querySelector('#files').append(div)
        }
    }, 500)
}

/** 
* Send a form to SERVER with files and additional data.
* @param {Array} files - Array of all files which are going to be send.
*/
function sendForm(files) {
    let formData = new FormData()

    formData.append('action', 'UPLOAD')
    formData.append('length', files.length)

    for (let i = 0; i < files.length; i++) {
        formData.append('file' + i, files[i], files[i].name)
    }

    let xhr = new XMLHttpRequest()
    xhr.open('POST', 'http://localhost:3000', true)

    xhr.send(formData)
}

document.querySelector('html').ondragover = function(e) {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('#dragndrop').innerText = 'Upuść tutaj'
}

document.querySelector('html').ondrop = function(e) {
    e.preventDefault()
    e.stopPropagation()
    document.querySelector('#dragndrop').innerText = 'Przeciągnij tutaj pliki'
}

document.querySelector('#dragndrop').ondragenter = function(e) {
    e.stopPropagation()
    e.preventDefault()
    document.querySelector('#dragndrop').innerText = 'Upuść'
}

document.querySelector('#dragndrop').ondragover = function(e) {
    e.stopPropagation()
    e.preventDefault()
}

document.querySelector('#dragndrop').ondragleave = function(e) {
    e.stopPropagation()
    e.preventDefault()
}

document.querySelector('#dragndrop').ondrop = function(e) {
    e.preventDefault()
    e.stopPropagation()

    document.querySelector('#dragndrop').innerText = 'Upload'
    document.querySelector('#dragndrop').style = 'cursor:pointer;'

    document.querySelector('#upload').style = 'display:block;'

    setTimeout(function() {
        document.querySelector('#upload').style = 'display:none;'
    }, 500)

    generateList(e.dataTransfer.files)
    sendForm(e.dataTransfer.files)
}
