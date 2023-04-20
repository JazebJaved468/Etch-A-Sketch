// Analogy
// let pattern = ''
// for(let i = 0; i<4; i++){
//     pattern = ''
//     for(let j=0;j<4;j++){
//         pattern += '*  '
//     }
//     console.log(pattern)
// }


let gridInput = document.querySelector('input');
let showBtn = document.querySelector('#show-grid');     //show button name changed to 'Apply' on UI
let container = document.querySelector('.container');
let clearBtn = document.querySelector('#clear');
let showGridSize = document.querySelector('#mention-grid-size');
let inputColor = document.querySelector('#set-color');
// let colorBtn = document.querySelector('#color-btn');
let eraseBtn = document.querySelector('#eraser');
let slider = document.querySelector('#slider');
let randomBtn = document.querySelector('#random-btn');
let rainbowBtn = document.querySelector('#rainbow-btn');

// default values
let num = 20; // grid default size
let setColor = 'rgb(0, 0, 0)';  // default color
makeCanvas(num); // default grid on load 

// getting random color
function randomColor(e){
    // Generate random color in hexadecimal format
    const hexColorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor = hexColorCode;
    // Print the hexadecimal color code
    // console.log(`Hexadecimal color code: ${hexColorCode}`);

    // e.target.style.backgroundColor = `${setColor}`
}

function rainbowColor(){
    let divArray = document.querySelectorAll('.newDiv');
    divArray.forEach(div => {
        div.addEventListener('mouseover',randomColor);
    }
    )
}

// Getting customized color from input
function getColor(){
    console.log(inputColor.value);
    setColor = `${inputColor.value}`;
}

// Function to get grid size, which is calling another function which will make a grid
function gridSize(e){
    num = +(slider.value);
    console.log(typeof num)

    showGridSize.textContent = `${num} x ${num}`;

    makeCanvas(num);

    // num = +(gridInput.value);
    // if( num === 0){
    //     showGridSize.textContent = `${num} x ${num} (Doesn't exist obviouslyy!! Enter a natural number)`;
    //     makeCanvas(num);
    //     return;
    // }
    // else{
    // showGridSize.textContent = `${num} x ${num}`;

    // makeCanvas(num);
    // }

    // console.log(e.target); // for debugging
    // console.log(num)
    // console.log(typeof num);
}

// Building a grid
function makeCanvas(num){
    // first clearing out the container so that whenever this function is called, it overwrites the same space and not take extra space
    container.textContent = '';

    for(let i =0; i<num;i++){
        let w = 500/num;          // dividing container into parts depending on grid dimension
        let flexDiv = document.createElement('div');
        flexDiv.style.cssText = `width:500px; height:${w}px`;
        flexDiv.classList.add('flex-row');

        for(let j= 0; j<num ; j++){
            let newDiv = document.createElement('div');
            newDiv.style.cssText = `width:${w}px; height:${w}px`;
            newDiv.classList.add('newDiv');
            flexDiv.appendChild(newDiv);

        }
        container.appendChild(flexDiv);
    }

    enableDrawing();
}

// function to enable drawing on click
function enableDrawing(){
    let divArray = document.querySelectorAll('.newDiv');
    divArray.forEach(div => {
    div.addEventListener('mousedown',drawCanvas);
    div.addEventListener('mouseup', stopDrawing);
    }
    );
}

// function to start coloring the boxes
function drawCanvas(e){
    // console.log(e)
    let divArray = document.querySelectorAll('.newDiv');
    divArray.forEach(div => {
        div.addEventListener('mouseover',changeColor);
    }
    )

    // To color the box which is clicked at first (in previous function call)
    e.target.style.backgroundColor = `${setColor}`

}   

function changeColor(e){
    e.target.style.backgroundColor = `${setColor}`
    // e.target.addEventListener('click',stopDrawing);
}

function stopDrawing(){
    let divArray = document.querySelectorAll('.newDiv');
    divArray.forEach(div => {
        div.removeEventListener('mouseover',changeColor);
    }
    )

    console.log("enable");
}

// clear button functionality : when clear btn is pressed, it will delete content of container and make a brand new canvus
function clearCanvas(e){
    // emptying container
    container.textContent = '';
    // making brand new canvas
    makeCanvas(num);
}


// Eraser functionality
function enableEraser(){
    let eraser = "#ffffff"
    inputColor.value = eraser;
    setColor = eraser;
}

// Adding Events to the buttons
slider.addEventListener('input', gridSize);
clearBtn.addEventListener('click', clearCanvas);
inputColor.addEventListener('input',getColor);
eraseBtn.addEventListener('click', enableEraser);
randomBtn.addEventListener('click', randomColor);
rainbowBtn.addEventListener('click', rainbowColor);


// let divArray = document.querySelectorAll('.newDiv');
// divArray.forEach(div => {
//     div.addEventListener('mouseover',drawCanvas);
// });
