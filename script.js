const container = document.querySelector('.container');
const createBtn = document.querySelector('.create-grid');
const deleteBtn = document.querySelector('.delete-grid');
const colorPicker = document.querySelector('.cor');
const gridWidth = document.querySelector('#grid-width');
const gridHeight = document.querySelector('#grid-height');
const widthValue = document.querySelector('.width-value');
const heightValue = document.querySelector('.height-value');
const eraser = document.querySelector('.eraser');
const display = document.querySelector('.display');
const downloadBtn = document.querySelector('.downloadBtn')

display.addEventListener('mousedown', (e) => {
  drawing = true;
  draw(e);
});
display.addEventListener('mousemove', (e) => {
  if (drawing) draw(e);
});
display.addEventListener('mouseup', () => {
  drawing = false;
});
display.addEventListener('mouseleave', () => {
  drawing = false;
});

let drawing = false;
let erasing = false;
let deviceType = "";

const isTouchDevice = () => { // identifica o dispositivo
  try {
    document.createEvent('touchEvent');
    deviceType = 'touch';
    return true;
  } catch (e) {
    deviceType = 'mouse';
    return false;
  }
}

isTouchDevice();

createBtn.addEventListener('click', () => { // verifica se o botão foi clicado
  display.innerHTML = ""
  let count = 0;
  for (let i = 0; i < gridHeight.value; i++) {
    count += 2;
    let div = document.createElement('div');
    div.classList.add('gridRow')
    for (let j = 0; j < gridWidth.value; j++) {
      count += 2
      let col = document.createElement('div');
      col.classList.add('gridCol');
      col.setAttribute('id', `gridCol${count}`);
      div.appendChild(col);
    }
    display.appendChild(div);
  }
});

deleteBtn.addEventListener('click', () => {
  display.innerHTML = ""
})

eraser.addEventListener('click', () => {
  erasing = !erasing;
  const span = document.getElementById('span');
  if (erasing) {
    span.innerHTML = 'ink_eraser';
  } else {
    span.innerHTML = 'brush';
  }
})

gridWidth.addEventListener('input', () => {
  widthValue.innerHTML = gridWidth.value < 9 ? `0${gridWidth.value}` : gridWidth.value;
})

gridHeight.addEventListener('input', () => {
  heightValue.innerHTML = gridHeight.value < 9 ? `0${gridHeight.value}` : gridHeight.value;
})

window.onload = () => {
  gridHeight.value = 0;
  gridWidth.value = 0;
}

function draw(e) {
  const target = e.target;
  if (target.classList.contains('gridCol')) {
    target.style.backgroundColor = erasing ? 'transparent' : colorPicker.value;
  }
}

downloadBtn.addEventListener('click', () => { // verifica se o botão foi cliacado
  const canvas = document.createElement('canvas'); // cria um canvas
  const ctx = canvas.getContext('2d'); // pega o contexto
  const gridRows = document.querySelectorAll('.gridRow'); // pega todas as linhas do grid
  const gridCols = document.querySelectorAll('.gridCol'); // pega todas as colunas do grid

  const colWidth = gridCols[0].offsetWidth;
  const colHeight = gridCols[0].offsetHeight;

  canvas.width = colWidth * gridWidth.value;
  canvas.height = colHeight * gridHeight.value;

  gridRows.forEach((row, rowIndex) => {
    row.childNodes.forEach((col, colIndex) => {
      ctx.fillStyle = window.getComputedStyle(col).backgroundColor;
      ctx.fillRect(colWidth * colIndex, colHeight * rowIndex, colWidth, colHeight);
    });
  });

  const link = document.createElement('a');
  link.href = canvas.toDataURL();
  link.download = 'grid-drawing.png';
  link.click();
});