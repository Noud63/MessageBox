import { messagesCount } from './app.js'

export function clearFields() {
    document.querySelector('.maxLength').value = ""
    document.querySelector('textarea').value = ""
    document.querySelector('.currentCount').textContent = "?"
    document.querySelector('.count').textContent = 0 + " / " + 0
}


export function addScrollbarSpace() {
    if (document.querySelector('.message').scrollHeight > document.querySelector('.message').clientHeight) {
        document.querySelector('.message').classList.add('addSpace')
    } else {
        document.querySelector('.message').classList.remove('addSpace')
    }
}


export function setMessageCount() {
    if (messagesCount === 1) {
        document.querySelector('.messagesCount').textContent = messagesCount + " message"
    } else {
        document.querySelector('.messagesCount').textContent = messagesCount + " messages"
    }
}


export function getTimeStamp() {
    let time = new Date();
    let day = time.getDate();
    let month = time.getMonth() + 1;
    let year = time.getFullYear();
    let hour = time.getHours();
    let minute = time.getMinutes();

    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }
    if (minute < 10) {
        minute = '0' + minute
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    let created = year + "-" + month + '-' + day + ' ' + hour + ':' + minute + 'h';
    return created;
}