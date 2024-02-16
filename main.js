const tasksNumber = 9
for (let i = 1; i<=tasksNumber; i++){
    const task_button = document.querySelector(`#task${i}-button`)
    if (task_button == null) continue
    task_button.addEventListener('click', ()=>{
        const task = document.querySelector(`.task${i}`)
        task.classList.toggle('hidden')
    })
}

const time_block = document.querySelector('#time')
const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']
setInterval(() => {
    let time = new Date()
    let date = time.getDate()
    let year = time.getFullYear()
    let month = months[time.getMonth()-1]
    let day = time.getDay()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    time_block.innerText = `${date} ${month} ${year}, ${day} : ${hours}/${minutes}/${seconds}`
}, 1000)


// Task 2
const calendar = document.querySelector('.calendar')
let time = new Date()
let date = time.getDate()
let month = time.getMonth()
let day = time.getDay()
let i = 1
time.setDate(1)
let row = 1
let column = time.getDay()

const monthsNoEnding = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
let year = time.getFullYear()
if (year % 4 == 0 && (year % 100 != 0 || (year % 100 == 0 && year % 400 == 0))){
    monthDays[1] = 29
}
document.querySelector('.calendar-container>h2').innerText = monthsNoEnding[month]
while (i<=monthDays[month]) {
    const dayBlock = document.createElement('div')
    dayBlock.classList.add('day')
    dayBlock.innerHTML = `<p>${i}</p>`
    dayBlock.style.gridRow = `${row}`
    dayBlock.style.gridColumn = `${column}`
    if (column == 6 || column == 7)dayBlock.classList.add('weekend')
    calendar.appendChild(dayBlock)
    if (column == 7){
        row++
    }

    if (column == 6) column = 7
    else column = (column+1)%7
    i++
}


// Task 3
const task3_button = document.querySelector('#task3-button')
task3_button.addEventListener('click', ()=>{
    let blocks = document.getElementsByTagName('div')
    document.querySelector('#numberOfBlocks').innerText = `Количество блоков: ${blocks.length}`    
})

// Task 4
const task4_button = document.querySelector('#task4-button')
let interval4 = null
let blockId
let blocks
task4_button.addEventListener('click', ()=>{
    if (interval4 != null){
        blocks[blockId].classList.toggle('notDisplay')
        clearInterval(interval4)
        interval4 = null
        return
    }
    blocks = document.getElementsByTagName('div')
    document.querySelector('#numberOfBlocks').innerText = `Количество блоков: ${blocks.length}`    
    blockId = Math.floor(Math.random() * blocks.length)
    interval4 = setInterval(() => {
        blocks[blockId].classList.toggle('notDisplay')
        blockId = Math.floor(Math.random() * blocks.length)
        blocks[blockId].classList.toggle('notDisplay')
}, 120);
})


// Task 5
const newListItemBtn = document.querySelector('#newListItemBtn')
let listEls
newListItemBtn.addEventListener('click', ()=>{
    const list = document.querySelector('.task5>ol')
    const newItem = document.createElement('li')
    newItem.innerText = prompt('Введите текст для нового элемента списка')
    list.appendChild(newItem)
    listEls = document.querySelectorAll('.task5>ol>li')
    let i = listEls.length-2
    if (i<=-1) return
    listEls[i].addEventListener('click', ()=>{
        let temp = listEls[i].innerText
        listEls[i].innerText = listEls[i+1].innerText
        listEls[i+1].innerText = temp
    })
})


// Task 6
const task6_pic = document.querySelector('.task6-img')
let counter6 = 0
task6_pic.addEventListener('mouseleave', ()=>{
    counter6 = (counter6+1)%4
    task6_pic.style.backgroundImage = `url("assets/pic${counter6}.png")`    
})

// Task 7
const task7_list = document.querySelector(".task7-list")
const task7_header = document.querySelector(".task7>p")
const task7_header_icon = document.querySelector(".task7>p>img")
let counter7 = 0
for (let i = 0; i<task7_list.children.length-1; i++){
    task7_list.children[i].addEventListener("click", ()=>{
        task7_list.children[i].style.display='none'
        counter7++
        if (counter7==3){
            document.querySelector("#endOfListItem").style.display = 'block'
        }
    })
}
task7_header.addEventListener("click", ()=>{
    task7_list.classList.toggle("hidden")
    task7_header_icon.classList.toggle("task7-icon_rotate")
})