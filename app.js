const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const svg = document.getElementsByClassName('dot');
const save = document.getElementById('jsSave');
const roll = document.getElementById('jsRollBtn');

const INITIAL_COLOR = '#2c2c2c';

let painting = false;
let filling = false;
let albomToBook = false;
canvas.height = (window.screen.height / 100) * 50;
canvas.width = (window.screen.width / 100) * 50;
console.log(canvas.height);

function rollCanvas(){
    if(albomToBook === true){
        albomToBook = false;
        roll.innerText = 'Альбомная';
        canvas.height = (window.screen.height / 100) * 50;
        canvas.width = (window.screen.width / 100) * 50;
    } else {
        albomToBook = true;
        roll.innerText = 'Книжная';
        canvas.height = (window.screen.height / 100) * 70;
        canvas.width = (window.screen.width / 100) * 30;
    }
}

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;


function stopPainting() {
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event) {
    x = event.offsetX;
    y = event.offsetY;
    if(!filling){
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
}

function takeSizeBrush(event){
    ctx.lineWidth = event.target.value;
}

function onMouseDown(event) {
    painting = event.button === 0 ? true : false;
}

function changeColor(event) {
    const targetColor = event.target.style.backgroundColor;
    ctx.strokeStyle = targetColor;
    ctx.fillStyle = targetColor;
    Array.from(svg).forEach(dot => dot.style.backgroundColor = targetColor);
}

function handleModeClick(){
    
    if(filling === true){
        filling = false;
        mode.innerText = 'Рисование';
        count++;
    } else {
        filling = true;
        mode.innerText = 'Заливка';
        count++;
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextMenu(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS [Export]';
    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
}


Array.from(colors).forEach(color => color.addEventListener('click', changeColor));

if(range){
    range.addEventListener('input', takeSizeBrush);
}

if(mode){
    mode.addEventListener('click', handleModeClick);
}

if(save){
    save.addEventListener('click', handleSaveClick);
}

if(roll){
    roll.addEventListener('click', rollCanvas);
}
