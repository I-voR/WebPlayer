/* eslint-disable require-jsdoc */
/* eslint-disable no-console */

function generateList(files) {
    let div, img, span

    setTimeout(function() {
        for (let i = 0; i < files.length; i++) {
            console.log(files[i])
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

function createForm() {

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

    document.querySelector('#dragndrop').onclick = function() {
        console.log('upload')
    }

    document.querySelector('#upload').style = 'display:block;'

    setTimeout(function() {
        document.querySelector('#upload').style = 'display:none;'
    }, 500)

    generateList(e.dataTransfer.files)
}
