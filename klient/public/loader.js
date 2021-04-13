document.getElementById('audio').src = 'http://localhost:3000/Pawe%C5%82%20Kosza%C5%82ka/Wr%C3%B3%C4%87.mp3'
document.getElementById('audio').load()

document.getElementById('audio').onloadedmetadata = () => {
    document.getElementById('inputProgress').max = document.getElementById('audio').duration
}

document.getElementById('audio').ontimeupdate = function () {
    document.getElementById('inputProgress').value = parseInt(document.getElementById('audio').currentTime)
}

document.getElementById('audio').onended = function () {
    document.getElementById('inputProgress').value = 0
    this.playing = false
    console.log('stopped, playing next')
}
