import { v4 as uuidv4 } from 'uuid';

let maxCharLength, textLength, currentVal, currentChar, limit, textField, count, currentCount, lastWord, excess

let textMessages = []

let messagesCount = 0

textMessages = JSON.parse(localStorage.getItem("TEXTMESSAGE"))

if (textMessages) {
    loadList(textMessages)
} else {
    textMessages = []
}

function loadList(textMessages) {

    for (let el of textMessages) {
        let html = `<div class="messageBox" id=${el.id}>
                        <div class="textMessage">${el.message}
                         <div class="created">Posted on: ${el.posted}</div>
                            <button type="button" class="btn2" id="deleteButton">Delete message</button>
                        </div>
                    </div>
                   `
        document.querySelector('.message').insertAdjacentHTML('beforeend', html)
    }

    addScrollbarSpace()

    messagesCount = textMessages.length
    setMessageCount()
}


document.querySelector('#myTextBox').addEventListener('keyup', checkInput)
function checkInput() {

    maxCharLength = document.querySelector('.maxLength').value
    maxCharLength = parseInt(maxCharLength)
    textLength = document.querySelector('textarea').value.length
    textField = document.querySelector('textarea')
    currentVal = document.querySelector('textarea').value
    count = document.querySelector('.count')
    excess = document.querySelector('.excessNumber')
    lastWord = textField.value.replace(/[\[\]?.,"\/#!$%\^&\*;:{}=\\|_~()]/g, "").split(" ")
    lastWord = lastWord[lastWord.length - 1]
    currentCount = document.querySelector('.currentCount').textContent = lastWord


    if (maxCharLength <= 0 || isNaN(maxCharLength) || maxCharLength > 280) {
        clearFields()
        alert('Fill out max character length, You can\'t use more than 280 characters!')
        return
    } else {
        count.textContent = textLength + " / " + maxCharLength
    }

    if (textLength > maxCharLength) {
        document.querySelector('#myTextBox').style.color = 'red'
        excess.textContent = textLength - maxCharLength
        btn.disabled = true

    } else {
        document.querySelector('#myTextBox').style.color = 'white'
        excess.textContent = 0
        btn.disabled = false
    }
}


const btn = document.querySelector('.btn')
btn.addEventListener('click', addMessage)

function addMessage() {

    let ID = uuidv4()

    if (!maxCharLength || textField.value === "") {
        alert("Enter all required fields")
        clearFields()
        return
    }

    if (!isNaN(maxCharLength) && textLength > 0) {

        let html = `<div class="messageBox" id=${ID}>
                        <div class="textMessage">${textField.value}
                        <div class="created">Posted on: ${getTimeStamp()}</div>
                            <button type="button" class="btn2" id="deleteButton">Delete message</button>
                        </div>
                    </div>
                   `
        document.querySelector('.message').insertAdjacentHTML('beforeend', html)

        let obj = {
            id: ID,
            message: textField.value,
            posted: getTimeStamp()
        }
        console.log(obj)
        addScrollbarSpace()

        textMessages.push(obj)
        clearFields()
    }
    messagesCount++
    setMessageCount()
    localStorage.setItem("TEXTMESSAGE", JSON.stringify(textMessages))
}


document.querySelector('.message').addEventListener('click', deleteMessage)
function deleteMessage(e) {

    let ID = e.target.parentNode.parentNode.id
    console.log(ID)
    const message = e.target.parentNode.parentNode

    if (e.target.matches('.btn2')) {
        message.parentNode.removeChild(message)
        messagesCount--
        setMessageCount()
    }

    textMessages = textMessages.filter((el) => {
        return el.id != ID
    })

    localStorage.setItem("TEXTMESSAGE", JSON.stringify(textMessages))
}


function clearFields() {
    document.querySelector('.maxLength').value = ""
    textField.value = ""
    document.querySelector('.currentCount').textContent = "?"
    document.querySelector('.count').textContent = 0 + " / " + 0
}


function addScrollbarSpace() {
    if (document.querySelector('.message').scrollHeight > document.querySelector('.message').clientHeight) {
        document.querySelector('.message').classList.add('addSpace')
    } else {
        document.querySelector('.message').classList.remove('addSpace')
    }
}


function setMessageCount() {
    if (messagesCount === 1) {
        document.querySelector('.messagesCount').textContent = messagesCount + " message"
    } else {
        document.querySelector('.messagesCount').textContent = messagesCount + " messages"
    }
}


function getTimeStamp() {
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