export function go() {
    let volume = document.getElementById('volume')
    let volumeRange = document.getElementById('volumeRange')
    let sound = document.getElementById('sound')
    let play = document.getElementById('play')
    let audio = document.getElementById('audio')
    let trackLInput = document.getElementById('trackLInput')
    let playerCurrent = document.getElementById('playerCurrent')
    let playerDuration = document.getElementById('playerDuration')
    let mute = false
    let canvas2 = document.getElementById('canvas2')
    let ctx = canvas2.getContext('2d')
    let loop = document.getElementById('loop')
    let songName = document.getElementById('songName')

    let toMinutesAndSeconds = sec => `${Math.trunc(sec / 60)}:${Math.trunc(sec % 60)}`
    audio.onloadedmetadata = function () {
        playerDuration.innerText = toMinutesAndSeconds(audio.duration)
        playerCurrent.innerText = toMinutesAndSeconds(audio.currentTime)[0] + ':0' + toMinutesAndSeconds(audio.currentTime)[2]
        trackLInput.min = 0
        trackLInput.max = audio.duration
    };

    volume.onmousemove = () => {
        volumeRange.style.display = 'block'
    }
    volume.onclick = () => {
        if (!mute) {
            audio.volume = 0
            volume.children[0].className = 'bi bi-volume-mute-fill'
            volumeRange.value = 0
            mute = !mute
        }
        else {
            audio.volume = 1
            volume.children[0].className = 'bi bi-volume-up-fill'
            volumeRange.value = 1
            mute = !mute
        }
    }
    sound.onmouseleave = () => {
        volumeRange.style.display = ''
    }

    let e
    let on = true
    play.addEventListener('click', function () {
        playerDuration.innerText = toMinutesAndSeconds(audio.duration)
        trackLInput.max = audio.duration
        if (on) {
            audio.play()
            play.children[0].className = 'bi bi-pause-fill'
            on = !on
            e = setInterval(equlizer, 100);
        }
        else {
            audio.pause()
            play.children[0].className = 'bi bi-play-fill'
            on = !on
            clearInterval(e)
        }
    })


    audio.addEventListener("timeupdate", () => {
        let n = toMinutesAndSeconds(audio.currentTime).slice(toMinutesAndSeconds(audio.currentTime).indexOf(':') + 1,)
        if (n.length == 1) {
            playerCurrent.innerText = toMinutesAndSeconds(audio.currentTime)[0] + ':0' + toMinutesAndSeconds(audio.currentTime)[2]
            toMinutesAndSeconds(audio.currentTime)
        }
        else {
            playerCurrent.innerText = toMinutesAndSeconds(audio.currentTime)
            toMinutesAndSeconds(audio.currentTime)
        }
        trackLInput.value = audio.currentTime
        if (audio.currentTime == audio.duration) {
            play.children[0].className = 'bi bi-play-fill'
            on = !on
            clearInterval(e)
            ctx.clearRect(0, 0, 220, 150)
        }
    })
    trackLInput.addEventListener('input', function () {
        audio.currentTime = trackLInput.value
    })

    volumeRange.addEventListener('input', function () {
        audio.volume = volumeRange.value
        if (volumeRange.value == 0) {
            volume.children[0].className = 'bi bi-volume-mute-fill'
        }
        else if (volumeRange.value < 0.6) {
            volume.children[0].className = 'bi bi-volume-down-fill'
        }
        else {
            volume.children[0].className = 'bi bi-volume-up-fill'
        }
    })

    function getRandom(min, max) {
        return Math.random() * (max - min) + min
    }

    function equlizer() {
        ctx.clearRect(0, 0, 220, 150)
        for (let i = 0; i < 15; i++) {
            let r = getRandom(2, 150)
            ctx.fillStyle = 'darkcyan'
            ctx.fillRect(15 * i, 150 - r, 10, r)
        }
    }

    loop.onclick = function () {
        audio.loop = !audio.loop
        if (audio.loop) {
            loop.style.color = 'darkcyan'
        }
        else {
            loop.style.color = ''
        }
    }

    next.onclick = () => {
        audio.currentTime += 5
    }
    prev.onclick = () => {
        audio.currentTime -= 5
    }
}