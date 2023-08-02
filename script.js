import { startSnake } from './snake.js'
import { curCon } from './cc.js'
import { go } from './player.js'
startSnake()
curCon()
go()
let carouselitem = document.getElementsByClassName('carouselitem');
let headerCarousel = document.getElementById('headerCarousel');
let index = 0
let change
let menuOn = false
let prevScroll = 0
let zagal = document.querySelector('.zagal')
let page3 = document.querySelector('.page3')
let page4 = document.querySelector('.page4')
let page5 = document.querySelector('.page5')
let star = document.getElementById('star')

function opacity() {
    for (let i = 0; i < carouselitem.length; i++) {
        if (i == index) {
            carouselitem[i].style.opacity = 1
        }
        else {
            carouselitem[i].style.opacity = 0
        }
    }
}
opacity()

function startCarouselInterval() {
    change = setInterval(() => {
        index++
        if (index >= carouselitem.length) {
            index = 0
        }
        opacity()
    }, 2000)
}

startCarouselInterval();

headerCarousel.addEventListener('click', function () {
    index++
    if (index >= carouselitem.length) {
        index = 0;
    }
    opacity()
    clearInterval(change)
    startCarouselInterval()
})

let burgMenu = document.getElementById('burgMenu')
let burgerList = document.getElementById('burgerList')
let main = document.getElementById('main')
let overlay = document.getElementById('overlay')
let burger = document.getElementById('burger')

function overlayGo() {
    overlay.style.zIndex = '99'
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
}

function overlayOut() {
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    setTimeout(function () {
        overlay.style.zIndex = '-99'
    }, 400)
}

function hideMenuList() {
    burgMenu.style.height = '25px'
    burgerList.style.width = '0px'
    burgerList.style.paddingLeft = '0px'
}
main.addEventListener('click', function () {
    hideMenuList()
    overlayOut()
    menuOn = false
});

burgMenu.addEventListener('click', function () {
    menuOn = true
    burgMenu.style.height = '3px'
    burgerList.style.width = '300px'
    burgerList.style.paddingLeft = '30px'
    overlayGo()
});

let photo = document.getElementById('photo')

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

setInterval(() => {
    let b1 = getRandom(10, 80)
    let b2 = getRandom(10, 80)
    let b3 = getRandom(10, 80)
    let b4 = getRandom(10, 80)
    photo.style.borderRadius = `${b1}% ${b2}% ${b3}% ${b4}%`
}, 1000);

let num = document.getElementsByClassName('num');
let arr = [];
for (let i = 0; i < num.length; i++) {
    arr.push(num[i].getAttribute('max'));
}

function scrollHeader() {
    if (!menuOn) {
        let currentScroll = window.scrollY
        if (prevScroll > currentScroll) {
            burger.style.transform = "translateY(0)"
        }
        else {
            burger.style.transform = "translateY(-100%)"
        }
        prevScroll = currentScroll
    }
}

star.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    hideMenuList()
    overlayOut()
    menuOn = false
}
burgerList.children[0].onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    hideMenuList()
    overlayOut()
    menuOn = false
}
burgerList.children[1].onclick = function () {
    let a = zagal.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
        top: a,
        behavior: "smooth"
    });
    hideMenuList()
    overlayOut()
    menuOn = false
}
burgerList.children[2].onclick = function () {
    let a = page3.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
        top: a,
        behavior: "smooth"
    });
    hideMenuList()
    overlayOut()
    menuOn = false
}
burgerList.children[3].onclick = function () {
    let a = page4.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
        top: a,
        behavior: "smooth"
    });
    hideMenuList()
    overlayOut()
    menuOn = false
}
burgerList.children[4].onclick = function () {
    let a = page5.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
        top: a,
        behavior: "smooth"
    });
    hideMenuList()
    overlayOut()
    menuOn = false
}


window.addEventListener('scroll', function () {
    scrollHeader()
    showHeader()
    fillInfo1()
    fillInfo2()
    doTheCount()
});

function fillProgress() {
    let nums = document.getElementsByClassName('progFill')
    for (let i = 0; i < arr.length; i++) {
        nums[i].style.width = arr[i] + '%'
    }
}

function fillInfo1() {
    let hidden = document.querySelectorAll('.hidden')
    for (let i = 0; i < hidden.length; i++) {
        let windowHeight = window.innerHeight
        let revealTop = hidden[i].getBoundingClientRect().top
        if (revealTop < windowHeight - 100) {
            hidden[i].classList.add('active')
        }
    }
}

function showHeader() {
    let hiddenheader = document.querySelectorAll('.hiddenheader')
    for (let i = 0; i < hiddenheader.length; i++) {
        let windowHeight = window.innerHeight
        let revealTop = hiddenheader[i].getBoundingClientRect().top
        if (revealTop < windowHeight) {
            hiddenheader[i].classList.add('active2')
        }
    }
}
function fillInfo2() {
    let sklad = document.getElementById('info2')
    let windowHeight = window.innerHeight
    let revealTop = sklad.getBoundingClientRect().top
    if (revealTop < windowHeight - 450) {
        fillProgress()
    }
}

function doTheCount() {
    for (let i = 0; i < num.length; i++) {
        let windowHeight = window.innerHeight
        let revealTop = num[i].getBoundingClientRect().top
        if (num[i].classList.contains('counting')) {
            continue
        }
        else if (revealTop < windowHeight - 50) {
            num[i].classList.add('counting')
            let c = 0;
            let fill = setInterval(() => {
                num[i].textContent = c + '%';
                c++;
                if (c > arr[i]) {
                    clearInterval(fill);
                }
            }, 1500 / arr[i]);
        }
    }
}

let btnSnake = document.getElementById('btnSnake')
let showProject = document.getElementById('showProject')
let cross = document.getElementById('cross')

function showProj() {
    showProject.querySelector('#cross').style.display = 'block'
    showProject.style.width = '100%'
    document.body.style.overflow = 'hidden'
}

btnSnake.addEventListener('click', function () {
    showProject.querySelector('#canvas').style.display = 'block'
    showProj()
})

cross.addEventListener('click', function () {
    showProject.querySelector('#canvas').style.display = ''
    showProject.querySelector('#cross').style.display = ''
    showProject.querySelector('#cc').style.display = ''
    showProject.querySelector('#player3').style.display = ''
    showProject.style.height = ''
    showProject.style.width = ''
    document.body.style.overflow = ''
})

let curencyConverter = document.getElementById('curencyConverter')

curencyConverter.addEventListener('click', function () {
    showProject.querySelector('#cc').style.display = 'block'
    showProj()
})

let startP = document.getElementById('startP')

startP.addEventListener('click', function () {
    showProject.querySelector('#player3').style.display = 'block'
    showProj()
})

function audioAnimation() {
    let raduga = document.getElementById('raduga')
    let size = []
    for (let i = 0; i < 50; i++) {
        size.push(getRandom(100, 200))
    }

    for (let i = 0; i < size.length; i++) {
        let div = document.createElement('div')
        div.classList.add('polosa')
        div.style.height = size[i] + 'px'
        raduga.append(div)
    }

    let curent = 0
    let direction = 1
    setInterval(() => {
        let div = raduga.children[curent]
        let styl = "linear-gradient(55deg, hsl(270deg 100% 7%) 0%, hsl(219deg 50% 18%) 20%, hsl(205deg 49% 27%) 37%, hsl(196deg 38% 36%) 49%, hsl(186deg 24% 48%) 55%, hsl(171deg 24% 62%) 62%, hsl(148deg 32% 79%) 77%, hsl(104deg 100% 95%) 100%)";
        let styl2 = "linear-gradient(342deg, hsl(300deg 100% 10%) 0%, hsl(208deg 71% 30%) 30%, hsl(188deg 71% 39%) 67%, hsl(150deg 44% 72%) 81%, hsl(120deg 67% 77%) 87%, hsl(83deg 93% 69%) 94%, hsl(60deg 100% 50%) 100%)";
        div.style.backgroundImage = styl
        if (direction === 1) {
            div.style.transform = 'scale(1.4)'
            curent++
            if (curent === size.length) {
                curent--
                direction = -1
            }
        } else {
            div.style.backgroundImage = styl2
            div.style.transform = 'scale(1)'
            curent--
            if (curent < 0) {
                curent++
                direction = 1
            }
        }
    }, 30)
}

audioAnimation()

let drag = false
let move = document.querySelector('.move')
let brands = document.getElementById('brands')
let carouselSlider = document.getElementById('carouselSlider')
let items = document.getElementsByClassName('carouselItem')
let itemwidth = items[0].offsetWidth
let width = move.offsetWidth
let x = 0
let x2 = 0
let x3 = width
let sum = 0
let clone = move.cloneNode(true)
carouselSlider.append(clone)

brands.ondragstart = function () {
    return false
}

brands.onmousedown = function (e) {
    x = e.clientX
    drag = true
    brands.style.cursor = 'grab'
}

document.onmouseup = function () {
    sum += x2
    drag = false
    brands.style.cursor = ''
}

brands.onmousemove = function (e) {
    x2 = e.clientX - x
    let move1 = x2 + sum
    let move2 = x3 + (x2 + sum)
    if (drag) {
        if (move1 > 0) {
            move2 = -x3 + (x2 + sum)
        }
        move.style.left = `${move1}px`
        clone.style.left = `${move2}px`
        if (width <= Math.abs(move1)) {
            sum = 0 - x2
        }
    }
}

let map;


async function initMap() {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(document.getElementById("map"), {
        center: { lat: 37.4239163, lng: -122.0947209 },
        zoom: 17,
        mapId: "4504f8b37365c3d0",
    });

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Create a marker at the user's current location.
            const marker = new AdvancedMarkerElement({
                map,
                position: { lat: userLat, lng: userLng },
            });

            // Optionally, you can center the map to the user's location.
            map.setCenter({ lat: userLat, lng: userLng });
        },
        (error) => {
            console.error("Error getting current position:", error);
        }
    );
}

initMap();

let imtop = document.getElementsByClassName('imtop')
for (let i = 0; i < imtop.length; i++) {
    imtop[i].parentElement.parentElement.onmouseleave = function () {
        imtop[i].parentElement.parentElement.children[0].style.opacity = 0
    }
    imtop[i].onmouseenter = function () {
        imtop[i].parentElement.parentElement.children[0].style.opacity = 1
    }
}