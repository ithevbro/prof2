export function startSnake() {
    let canvas = document.getElementById('canvas')
    let ctx = canvas.getContext('2d')
    let width = canvas.width
    let height = canvas.height
    let x = 0
    let y = 0
    let xPlus = 20
    let yPlus = 0
    let count = 1
    let arr = []
    let body = document.body
    let eat = true

    function grid(size) {
        for (let x = 0; x < width; x += size) {
            ctx.beginPath()
            ctx.strokeStyle = 'green'
            ctx.moveTo(x, 0)
            ctx.lineTo(x, height)
            ctx.stroke()
        }
        for (let y = 0; y < height; y += size) {
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(width, y)
            ctx.stroke()
        }
    }

    function drawSegment(x, y, color) {
        ctx.beginPath()
        ctx.rect(x, y, 20, 20)
        ctx.fillStyle = color
        ctx.fill()
        ctx.stroke()
    }

    function head() {
        ctx.beginPath()
        ctx.rect(x, y, 20, 20)
        ctx.fillStyle = 'blue'
        ctx.fill()
        ctx.stroke()
    }

    function addTail() {
        arr.push({ x: x, y: y })
        if (arr.length > count) {
            arr.shift()
        }
    }

    function drawTail() {
        for (let i = 0; i < arr.length; i++) {
            let segment = arr[i]
            let color = 'black'
            drawSegment(segment.x, segment.y, color)
        }
    }

    let foodX
    let foodY
    function food() {
        let rx, ry;
        do {
            rx = Math.floor(Math.random() * a.length);
            ry = Math.floor(Math.random() * a.length);
        } while (isBodySegment(rx, ry));

        foodX = a[rx];
        foodY = a[ry];
    }

    function isBodySegment(rx, ry) {
        for (let i = 0; i < arr.length; i++) {
            let segment = arr[i];
            if (segment.x === a[rx] && segment.y === a[ry]) {
                return true;
            }
        }
        return false;
    }

    function arey() {
        let arr = []
        for (let i = 0; i < width; i += 20) {
            arr.push(i)
        }
        return arr
    }
    let a = arey()

    function gameEnd() {
        for (let i = 0; i < arr.length - 1; i++) {
            let segment = arr[i]
            if (x === segment.x && y === segment.y) {
                confirm('The end press f5 to restart')
                return true
            }
        }
    }

    function update() {
        ctx.clearRect(0, 0, width, height)
        grid(20)
        drawTail()
        head()
        if (x == foodX && y == foodY) {
            eat = true
            ++count
        }
        if (eat) {
            food()
            eat = false
        }
        ctx.fillStyle = 'red'
        ctx.fillRect(foodX, foodY, 20, 20)
    }

    function moveX() {
        x += xPlus
        if (x > width - 20) {
            x = 0
        }
        if (x < 0) {
            x = width - 20
        }
    }

    function moveY() {
        y += yPlus
        if (y > height - 20) {
            y = 0
        }
        if (y < 0) {
            y = height - 20
        }
    }

    let prev = ''
    body.onkeydown = function (e) {
        if (e.key === 'ArrowRight' && prev === 'ArrowLeft') {
            return
        }
        if (e.key === 'ArrowLeft' && prev === 'ArrowRight') {
            return
        }
        if (e.key === 'ArrowUp' && prev === 'ArrowDown') {
            return
        }
        if (e.key === 'ArrowDown' && prev === 'ArrowUp') {
            return
        }
        if (e.key === 'ArrowDown') {
            xPlus = 0
            yPlus = 20
            prev = e.key
        } else if (e.key === 'ArrowUp') {
            xPlus = 0
            yPlus = -20
            prev = e.key
        } else if (e.key === 'ArrowRight') {
            xPlus = 20
            yPlus = 0
            prev = e.key
        } else if (e.key === 'ArrowLeft') {
            xPlus = -20
            yPlus = 0
            prev = e.key
        }
    }

    let start = setInterval(() => {
        moveX()
        moveY()
        addTail()
        update()
        if (gameEnd()) {
            clearInterval(start)
        }
    }, 100)
}