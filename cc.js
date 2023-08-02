export function curCon() {
    let from = document.getElementById('from')
    let to = document.getElementById('to')
    let btn1 = document.getElementById('btn1')
    let date = document.getElementById('date')
    let output1 = document.getElementById('output1')

    async function valuta(from, to) {
        let response = await fetch('https://api.exchangerate.host/latest')
        let res = await response.json()
        let rates = res.rates
        for (const key in rates) {
            let o = document.createElement('option')
            o.text = key
            from.append(o)
        }
        for (const key in rates) {
            let o = document.createElement('option')
            o.text = key
            to.append(o)
        }
    }

    valuta(from, to)

    btn1.onclick = () => {
        fetch(`https://api.exchangerate.host/${date.value}?base=${from.value}&symbols=${to.value}`)
            .then(response => {
                return response.json()
            })
            .then(d => {
                output1.textContent = d.rates ? d.rates[to.value] : 'choose date'
            })
    }

    let latest = document.getElementById('latest')
    let tb2 = document.getElementById('tb2')
    let prev = document.getElementById('prev')
    let next = document.getElementById('next')
    let btncont = document.getElementById('btncont')
    let more = 0
    let px = 0
    function addRates() {
        fetch('https://api.exchangerate.host/latest')
            .then(response => response.json())
            .then(d => {
                tb2.innerHTML = ''
                btncont.innerHTML = ''
                let rates = d.rates
                latest.textContent = 'Latest: ' + d.date
                let counter = 0
                let keys = Math.floor(Object.keys(rates).length / 10) * 10
                if (more > keys) {
                    more = keys
                }
                for (let i = 10; i <= keys + 10; i += 10) {
                    let b = document.createElement('button')
                    b.textContent = i / 10
                    btncont.append(b)
                }
                for (const key in rates) {
                    if (counter >= more && tb2.rows.length < 10) {
                        let tr = document.createElement('tr')
                        let td = document.createElement('td')
                        let td2 = document.createElement('td')
                        td.textContent = key
                        td2.textContent = rates[key]
                        tr.append(td)
                        tr.append(td2)
                        tb2.append(tr)
                    }
                    counter++
                }
                let buttons = btncont.getElementsByTagName('button')
                buttons[more / 10].style.backgroundColor = 'darkcyan'
                buttons[more / 10].style.color = 'white'
            })
    }

    addRates()

    btncont.addEventListener('click', function (e) {
        let target = e.target.closest('button')
        if (!target) {
            return
        }
        else {
            more = target.textContent * 10 - 10
        }
        addRates()
    })


    next.addEventListener('click', function () {
        more += 10
        addRates()
    })
    prev.addEventListener('click', function () {
        if (more < 10) {
            more = 0
        }
        else {
            more -= 10
        }
        addRates()
    })

    let from2 = document.getElementById('from2')
    let to2 = document.getElementById('to2')
    let btn2 = document.getElementById('btn2')
    let date2 = document.getElementById('date2')
    let th3 = document.getElementById('th3')
    let tb3 = document.getElementById('tb3')
    let output2 = document.getElementById('output2')

    valuta(from2, to2)

    btn2.onclick = () => {
        let d = date2.value
        let year = d.slice(0, d.indexOf('-'))
        let month = +d.slice(d.indexOf('-') + 1,) + 1
        if (month < 10) {
            month = '0' + month
        }
        fetch(`https://api.exchangerate.host/timeseries?base=${from2.value}&symbols=${to2.value}&start_date=${date2.value}-1&end_date=${year}-${month}-0`)
            .then(response => response.json())
            .then(d => {
                output2.innerHTML = ''
                let rates = d.rates
                let arr = []
                for (const key in rates) {
                    if (rates[key][to2.value]) {
                        arr.push(rates[key][to2.value])
                    }
                }
                let tr = document.createElement('tr')
                let td = document.createElement('td')
                let c = document.createElement('canvas')
                let m = date2.value
                let q = m.slice(m.indexOf('-') + 1,)
                td.append(c)
                tr.append(td)
                output2.append(tr)
                let ctx = c.getContext('2d')
                c.height = 600
                c.width = 1300
                let width = c.width - 10
                let height = c.height - 30
                let max = Math.max(...arr)
                let scale = height / max
                let spacing = 15
                let width2 = (width - (spacing * (arr.length - 1))) / arr.length

                for (let i = 0; i < arr.length; i++) {
                    ctx.fillStyle = 'darkcyan';
                    ctx.fillRect(i * (width2 + spacing), height - (arr[i] * scale), width2, arr[i] * scale)

                    ctx.save();
                    ctx.fillStyle = 'white';
                    ctx.font = '20px Arial';
                    ctx.textAlign = 'center';
                    ctx.translate(i * (width2 + spacing) + width2 / 2, 300);
                    ctx.rotate(-Math.PI / 2);
                    ctx.fillText(arr[i], 0, 7);
                    ctx.restore();

                    ctx.save();
                    ctx.fillStyle = 'black';
                    ctx.font = '15px Arial';
                    ctx.textAlign = 'center';
                    ctx.fillText(i + 1 + '.' + q, i * (width2 + spacing) + width2 / 2, 585)
                    ctx.restore();
                }
            })
    }
}