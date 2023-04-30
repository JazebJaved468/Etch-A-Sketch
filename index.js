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
let inputColorDiv = document.querySelector('#set-color-div');
// let colorBtn = document.querySelector('#color-btn');
let eraseBtn = document.querySelector('#eraser');
let slider = document.querySelector('#slider');
let randomBtn = document.querySelector('#random-btn');
let rainbowBtn = document.querySelector('#rainbow-btn');

// default values
let num = 20; // grid default size
let setColor = '#3dd9b2';  // default color
inputColorDiv.classList.add('active'); // Middle button active by default
makeCanvas(num); // default grid on load 



// Function to get grid size, which is calling another function which will make a grid
function gridSize(e){
    num = +(slider.value);
    console.log(typeof num)

    showGridSize.textContent = `${num} x ${num}`;

    makeCanvas(num);
}

// Building a grid
function makeCanvas(num){
    // first clearing out the container so that whenever this function is called, it overwrites the same space and not take extra space
    container.textContent = '';

    for(let i =0; i<num;i++){
        let w = 500/num;          // dividing container into parts depending on grid dimension
        let flexDiv = document.createElement('div');
        flexDiv.style.cssText = `width:500px; height:${w}px;`;
        flexDiv.classList.add('flex-row');

        for(let j= 0; j<num ; j++){
            let newDiv = document.createElement('div');
            newDiv.style.cssText = `width:${w}px; height:${w}px;`;
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
}

function stopDrawing(){
    let divArray = document.querySelectorAll('.newDiv');
    divArray.forEach(div => {
        div.removeEventListener('mouseover',changeColor);
    }
    )
}

// Calculating random color in hexadecimal format
function anyColor(){
    const hexColorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
            setColor = hexColorCode;
}

// Removing that mouse over event which was implemented first time in rainbowColor function , it is necessary to remove it for the proper functionality of the other functions
function removeEvent(){
    let divArray = document.querySelectorAll('.newDiv');
    divArray.forEach(div => {
    div.removeEventListener('mouseover',anyColor)});
}

// Functionality to show the button is currently active on user interface.
function activate(button){
    let btnArray = [randomBtn, rainbowBtn, inputColorDiv, eraseBtn];
    btnArray.map(btn => {
        if(button === btn){
            button.classList.add('active');
        }
        else{
            btn.classList.remove('active');
        } 
    })
}

// Setting random color
function randomColor(){
    activate(randomBtn);
    removeEvent();
    anyColor();
    inputColor.value = setColor

}

// Setting rainbow color 
function rainbowColor(){
    activate(rainbowBtn);

    let divArray = document.querySelectorAll('.newDiv');
        divArray.forEach(div => {
        div.addEventListener('mouseover',anyColor)
        })
}

// Getting and setting customized color from input
function solidColor(){
    activate(inputColorDiv);

    setColor = inputColor.value;
    removeEvent();
    inputColor.addEventListener('input',()=>{
        setColor = `${inputColor.value}`;
    })
}

// Eraser functionality
function enableEraser(){
    activate(eraseBtn);

    removeEvent();
    let eraser = "#ffffff"
    inputColor.value = eraser;
    setColor = eraser;
}

// clear button functionality : when clear btn is pressed, it will delete content of container and make a brand new canvus
function clearCanvas(e){

    randomBtn.classList.remove('active')
    rainbowBtn.classList.remove('active')
    eraseBtn.classList.remove('active')
    inputColorDiv.classList.add('active')

    // emptying container
    container.textContent = '';
    // making brand new canvas
    makeCanvas(num);
    inputColor.value = "#3dd9b2"
    setColor = "#3dd9b2"
}


// Adding Events to the buttons
slider.addEventListener('input', gridSize);
clearBtn.addEventListener('click', clearCanvas);
inputColorDiv.addEventListener('click', solidColor);
eraseBtn.addEventListener('click', enableEraser);
randomBtn.addEventListener('click', randomColor);
rainbowBtn.addEventListener('click', rainbowColor);

