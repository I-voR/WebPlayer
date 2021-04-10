document.getElementById('audio').src = 'http://localhost:3000/Pawe%C5%82%20Kosza%C5%82ka/Wr%C3%B3%C4%87.mp3'
document.getElementById('audio').load()

document.getElementById('audio').onloadedmetadata = () => {
    document.getElementById('input').max = document.getElementById('audio').duration
}
