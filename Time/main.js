
// time and date function --------------
setInterval(() => {
    let dt = new Date();
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    let date = dt.getDate();
    let month = dt.getMonth();
    let year = dt.getFullYear();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    document.querySelector('.time1').innerHTML = `${hours}`;
    document.querySelector('.time2').innerHTML = `${minutes}`;
    document.querySelector('.time3').innerHTML = `${seconds}`;
    if (date < 10) date = '0' + date;
    if (month < 10) month = '0' + month;
    document.querySelector('.date-today').innerHTML = `${date}.${month + 1}.${year}`;
})

// stopwatch functions --------------
let watchHours = 0;
let watchMinutes = 0;
let watchSeconds = 0;
let watchMiliseconds1 = 0;
let watchMiliseconds2 = 0;
let watchMiliseconds3 = 0;

let miliOneId;
let miliTwoId;
let miliThreeId;

zeroTime = numb => {
    if (numb < 10) numb = '0' + numb;
    return numb;
}

function start() {
    document.querySelector('[value="START"]').setAttribute('disabled', 'true');
    document.querySelector('[value="START"]').classList.add('btn-focus');
    miliOneId = setInterval(() => {
        watchMiliseconds3++;
        if (watchMiliseconds3 == 10) {
            watchMiliseconds3 = 0;
        }
        document.querySelector('.miliThree').innerHTML = `${watchMiliseconds3}`;
    }, 1)

    miliTwoId = setInterval(() => {
        watchMiliseconds2++;
        if (watchMiliseconds2 == 10) {
            watchMiliseconds2 = 0;
        }
        document.querySelector('.miliTwo').innerHTML = `${watchMiliseconds2}`;
    }, 10)

    miliThreeId = setInterval(() => {
        if (watchMiliseconds1 < 9) {
            watchMiliseconds1++;
        } else {
            watchMiliseconds1 = 0;
            watchSeconds++;
        }
        if (watchSeconds == 60) {
            watchSeconds = 0;
            watchMinutes++;
        }
        if (watchMinutes == 60) {
            watchMinutes = 0;
            watchHours++;
        }
        document.querySelector('.miliOne').innerHTML = `${watchMiliseconds1}`;
        document.querySelector('.secondsW').innerHTML = `${zeroTime(watchSeconds)}`;
        document.querySelector('.minutesW').innerHTML = `${zeroTime(watchMinutes)}`;
        document.querySelector('.hoursW').innerHTML = `${zeroTime(watchHours)}`;
    }, 100)
}

function stop() {
    document.querySelector('[value="START"]').removeAttribute('disabled');
    document.querySelector('[value="START"]').classList.remove('btn-focus');
    clearInterval(miliOneId);
    clearInterval(miliTwoId);
    clearInterval(miliThreeId);
}

function loop() {
    let p = document.createElement('p');
    p.textContent = `${zeroTime(watchHours)}:${zeroTime(watchMinutes)}:${zeroTime(watchSeconds)}:${watchMiliseconds1}${watchMiliseconds2}${watchMiliseconds3}`;
    document.querySelector('.result').append(p);
}

function reset() {
    watchHours = 0;
    watchMinutes = 0;
    watchSeconds = 0;
    watchMiliseconds1 = 0;
    watchMiliseconds2 = 0;
    watchMiliseconds3 = 0;
    document.querySelector('.miliThree').innerHTML = `${watchMiliseconds3}`;
    document.querySelector('.miliTwo').innerHTML = `${watchMiliseconds2}`;
    document.querySelector('.miliOne').innerHTML = `${watchMiliseconds1}`;
    document.querySelector('.secondsW').innerHTML = `${zeroTime(watchSeconds)}`;
    document.querySelector('.minutesW').innerHTML = `${zeroTime(watchMinutes)}`;
    document.querySelector('.hoursW').innerHTML = `${zeroTime(watchHours)}`;
}

let btn = document.getElementsByTagName('input');
for (let elem of btn) {
    elem.addEventListener('focus', () => {
        elem.classList.add('btn-focus');
    })
    elem.addEventListener('blur', () => {
        elem.classList.remove('btn-focus');
    })
}

// timer functions --------------
let count = +(document.querySelector('.remains').innerHTML);

function plus() {
    if (count < 25) {
        document.querySelector('.minus').removeAttribute('disabled', 'true');
        count++;
        timerMinutes = count;
        document.querySelector('.remains').innerHTML = zeroTime(count);
    } else {
        document.querySelector('.plus').setAttribute('disabled', 'true');
    }
}

function minus() {
    if (count > 1) {
        document.querySelector('.plus').removeAttribute('disabled', 'true');
        count--;
        timerMinutes = count;
        document.querySelector('.remains').innerHTML = zeroTime(count);
    } else {
        document.querySelector('.minus').setAttribute('disabled', 'true');
    }
}

let timerSeconds = 60;
let timerMinutes = count;
let timerId;

function timerStart() {
    document.querySelector('.timerMinutes').innerHTML = zeroTime(timerMinutes);
    if (timerMinutes == count) {
        timerMinutes--;
    }
    timerId = setInterval(() => {
        if (timerMinutes >= 0 && timerSeconds > 0) {
            timerSeconds--;
            if (timerSeconds == -1) {
                timerSeconds = 59;
                timerMinutes--;
            }
            document.querySelector('.timerSeconds').innerHTML = zeroTime(timerSeconds);
            document.querySelector('.timerMinutes').innerHTML = zeroTime(timerMinutes);
        }

    }, 1000)
}

function timerStop() {
    clearInterval(timerId);
}

function timerReset() {
    timerSeconds = 60;
    timerMinutes = count;
    document.querySelector('.timerSeconds').innerHTML = '00';
    document.querySelector('.timerMinutes').innerHTML = '00';
}




