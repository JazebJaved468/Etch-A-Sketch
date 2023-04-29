let container = document.querySelector('.container');
let inputColor = document.querySelector('#set-color');
let randomBtn = document.querySelector('#random-btn');
let rainbowBtn = document.querySelector('#rainbow-btn');

inputColor.addEventListener('click', solidColor);
randomBtn.addEventListener('click', randomColor);
rainbowBtn.addEventListener('click', rainbowColor);


function solidColor(){
    setColor = inputColor.value;
    let divArray = document.querySelectorAll('.newDiv');
        divArray.forEach(div => {
        div.removeEventListener('mouseover',anyColor)});

    inputColor.addEventListener('input',()=>{
        setColor = `${inputColor.value}`;
    })
}



function rainbowColor(){
    let divArray = document.querySelectorAll('.newDiv');
        divArray.forEach(div => {
        div.addEventListener('mouseover',anyColor)
        })
}

function anyColor(){
    const hexColorCode = '#' + Math.floor(Math.random() * 16777215).toString(16);
            setColor = hexColorCode;
}

// getting random color in hexadecimal format
function randomColor(){

    let divArray = document.querySelectorAll('.newDiv');
        divArray.forEach(div => {
        div.removeEventListener('mouseover',anyColor)});
    
    anyColor();
}


// default values
let num = 20; // grid default size
let setColor = '#3dd9b2';  // default color
makeCanvas(num); // default grid on load 

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

function gridSize(e){
    num = +(slider.value);
    console.log(typeof num)

    showGridSize.textContent = `${num} x ${num}`;

    makeCanvas(num);
}