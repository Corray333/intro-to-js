import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'

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
const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
setInterval(() => {
    let time = new Date()
    let date = time.getDate()
    let year = time.getFullYear()
    let month = months[time.getMonth()-1]
    let day = time.getDay()
    let hours = time.getHours()
    let minutes = time.getMinutes()
    let seconds = time.getSeconds()

    time_block.innerText = `${date} ${month} ${year}, ${days[(day)]} : ${hours}/${minutes}/${seconds}`
}, 1000)


// Task 2
let time = new Date()
let renderCalendar = (time)=>{
    const calendar = document.querySelector('.calendar')
    let month = time.getMonth()
    let i = 1
    time.setDate(1)
    time.setMonth(month)
    let row = 1
    let column = time.getDay()
    if (column == 0) column = 7

    const monthsNoEnding = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    let year = time.getFullYear()
    if (year % 4 == 0 && (year % 100 != 0 || (year % 100 == 0 && year % 400 == 0))){
        monthDays[1] = 29
    }
    document.querySelector('.calendar-container h2').innerText = monthsNoEnding[month]
    while (i<=monthDays[month]) {
        const dayBlock = document.createElement('div')
        dayBlock.classList.add('day')
        dayBlock.innerHTML = `<p>${i}</p>`
        dayBlock.style.gridRow = `${row}`
        dayBlock.style.gridColumn = `${column}`
        if (column == 6 || column == 7)dayBlock.classList.add('weekend')
        let a = i
        dayBlock.addEventListener('click', ()=>{
            alert(`${a} ${months[month]} ${year}`)
        })
        calendar.appendChild(dayBlock)
        if (column == 7){
            row++
        }

        if (column == 6) column = 7
        else column = (column+1)%7
        i++
    }
}
renderCalendar(time)
document.querySelector('.calendar-arrow-left').addEventListener('click', ()=>{
    time.setMonth(time.getMonth()-1)
    document.querySelector('.calendar').innerHTML = ''
    renderCalendar(time)
})
document.querySelector('.calendar-arrow-right').addEventListener('click', ()=>{
    time.setMonth(time.getMonth()+1)
    document.querySelector('.calendar').innerHTML = ''
    renderCalendar(time)
})


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

// Task 9-10
const sendBtn = document.querySelector("#sendBtn")
sendBtn.addEventListener('click', ()=>{
    const email = document.querySelector("#email")
    const username = document.querySelector("#email")
    const phone = document.querySelector("#phone")
    const about = document.querySelector("#about")
    const password = document.querySelector("#password")
    const passwordAgain = document.querySelector("#passwordAgain")
    let error = ''
    if (password.value != passwordAgain.value || password.value == ''){
        error += "Пароли должны совпадать и не быть пусты\n"
    }
    const emeilRX = /[A-Za-z0-9]{2,}@([A-Za-z0-9]{2,}\.)+[A-Za-z]+/
    if (!emeilRX.test(email.value)){
        error += "Некорректный email\n"
    }
    const phoneRX = /(\+7|8)\d{10}/
    console.log(`"${phone.value}"`)
    console.log(phoneRX.exec(phone.value))
    if (!phoneRX.test(phone.value)){
        error += "Некорректный номер телефона\n"
    }
    if (error != ''){
        alert(error)
    } else {
        alert("Все поля заполнены корректно")
    }
})

let eye1 = document.querySelector('.eye1')
let eye2 = document.querySelector('.eye2')
let x1e1 = eye1.offsetTop
let y1e1 = eye1.offsetLeft
let x1e2 = eye2.offsetTop
let y1e2 = eye2.offsetLeft

document.querySelectorAll('.task9 input,textarea').forEach((el)=>{
    el.addEventListener('focus', ()=>{
        let x2 = el.offsetTop
        let y2 = el.offsetLeft-200
        let angle1 = Math.atan2(y2 - y1e1, x2 - x1e1)*2;
        let dx1 = Math.cos(angle1) * 10;
        let dy1 = Math.sin(angle1) * 10;
        let angle2 = Math.atan2(y2 - y1e2, x2 - x1e2)*2;
        let dx2 = Math.cos(angle2) * 10;
        let dy2 = Math.sin(angle2) * 10;
        eye1.style.transform = `translate(${dy1}px, ${dx1}px)`;
        eye2.style.transform = `translate(${dy2}px, ${dx2}px)`;
    })
    el.addEventListener('focusout', ()=>{
        eye1.style.transform = `translate(0px, 0px)`;
        eye2.style.transform = `translate(0px, 0px)`;
    })
})



// Test
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


const renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        alpha: true
    }
)
renderer.setSize(800, 800)


const scene = new THREE.Scene()
// const geometry = new THREE.SphereGeometry(1, 64, 64)
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

const loader = new GLTFLoader();


loader.load( 'assets/base.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );
let gitPushed = false
loader.load( 'assets/git.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load( 'assets/in.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load( 'assets/mail.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );
loader.load( 'assets/tg.glb', function ( gltf ) {
	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );



const pointLight = new THREE.PointLight(0xffffff, 200, 100)
pointLight.position.set(5, 5, 5)
scene.add(pointLight)

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
camera.position.z = 2
camera.position.x = 2
camera.position.y = 2
scene.add(camera)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.update()

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const transitionDown = (el, from, to, time)=>{
    let step = (to-from)/time
    let i = 0
    let interval = setInterval(() => {
        el.position.y += step
        i++
        if (i>time) {
            clearInterval(interval)
            if (from> to) transitionDown(el, el.position.y, from, time)
        }
    }, 1);
}
let link
let cPointLabel
window.addEventListener('click', onClick, false)
function onClick(event) {
    const canvas = document.querySelector('canvas');
    mouse.x = ( (event.clientX - canvas.offsetLeft) / canvas.clientWidth ) * 2 - 1;
    mouse.y = ( (event.clientY - canvas.offsetTop) / canvas.clientHeight ) * -2 + 1;

    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(scene.children, true)
    if (intersects.length == 0) return
    if (intersects[0].object.userData.name == 'base') {
        return
    }
    if (intersects[0].object.position.y < 0.56) transitionDown(intersects[0].object, intersects[0].object.position.y, intersects[0].object.position.y+0.15, 50)
    else transitionDown(intersects[0].object, intersects[0].object.position.y, intersects[0].object.position.y-0.15, 50)
    // Create the HTML content
    link = document.createElement('a')
    link.style.fontSize = '20px'
    link.style.color = 'white'
    if (cPointLabel != undefined) scene.remove(cPointLabel)
    cPointLabel = new CSS2DObject(link);
    switch (intersects[0].object.userData.name) {
        case 'git':
            link.href = 'https://github.com/Corray333'
            link.textContent = 'Мой GitHub'
            cPointLabel.position.set(1, 0.6, 1)
            break
        case 'tg':
            link.href = 'https://t.me/corray9'
            link.textContent = 'Мой Telegram'
            cPointLabel.position.set(-1, 0.6, 1)
            break
        case 'in':
            link.href = 'https://linkedin.com'
            link.textContent = 'Мой Linkedin'
            cPointLabel.position.set(-1, 0.6, -1)
            break
        case 'mail':
            link.href = ''
            link.textContent = 'mark.corray.off@gmail.com'
            cPointLabel.position.set(1, 0.6, -1)
            break
    }
    scene.add(cPointLabel);
}

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(800, 800);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.right = '200px';
document.body.appendChild(labelRenderer.domElement);


// HDRI
const pmremGenerator = new THREE.PMREMGenerator( renderer );

const hdriLoader = new RGBELoader()
hdriLoader.load( 'assets/ml_gradient_freebie_02.hdr', function ( texture ) {
  const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
  texture.dispose(); 
  scene.environment = envMap
} );


function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );
    labelRenderer.render(scene, camera);

}
animate()

// renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)
