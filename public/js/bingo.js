

const login = document.querySelector('#login');
const container = document.querySelector('#container');
const btn = document.querySelector('#btn');

class Brett{
  constructor(){
    this.numbers = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 'X', 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]

    //creates a list with numbers 1-75
    let a = [];
    for (let i = 1; i < 76; i++) {
      a.push(i);
    }

    let table = document.createElement('table');

    //sets the numbers on the board to numbers in the list
    for (let j = 0; j < this.numbers.length; j++) {
      let tr = document.createElement('tr');
      for (let k = 0; k < this.numbers[j].length; k++) {
        let td = document.createElement('td');
        
        if (this.numbers[j][k] != 'X'){
          let r = Math.floor(Math.random() * a.length);
          this.numbers[j][k] = a[r];
          a.splice(r, 1);
        } else {this.numbers[j][k] = ''}
        td.textContent = this.numbers[j][k];
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    container.appendChild(table);

    //finner cellen i tabellen
    for (let rs = 0; rs < table.rows.length; rs++) {
      for (let ds = 0; ds < table.rows[rs].cells.length; ds++) {
        table.rows[rs].cells[ds].onclick = function (e) {
          var rIndex = this.parentElement.rowIndex;
          var cIndex = this.cellIndex;
          if (table.rows[rs].cells[ds].className == 'held') {
            table.rows[rs].cells[ds].className = 'notheld';
          } else {
            table.rows[rs].cells[ds].className = 'held';
          }
        }
      }
    }


  }
}

btn.addEventListener('click', nytt)


function nytt(){
  container.innerHTML = '';
  new Brett();
}

let liste = document.querySelector('#liste');

function createListPoint(text) {
  liste = document.querySelector('#liste');
  let oldNum = document.createElement('p');
  oldNum.textContent = text;
  liste.appendChild(oldNum);

}


const sock = io();
const p = document.querySelector('#tallet');
let tidligere = [];

sock.on('message', () => {
  console.log(brukt);
  p.textContent = brukt[0];
  liste.innerHTML = '';
  for (const punkt in brukt) {
    createListPoint(brukt[punkt]);
  }
  
});


const roomP = document.querySelector('#roomP');
const roomInp = document.querySelector('#roomInp');
const roomBtn = document.querySelector('#roomBtn');

roomBtn.onclick = () => {
  let room = roomInp.value;
  roomInp.value = '';
  if(room == ''){
    room = 0;
  }
  sock.emit('join_room', room);
  roomP.textContent = room;
  login.style.display = 'none';
}








