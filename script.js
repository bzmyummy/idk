const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scale = 20;
const rows = canvas.height / scale;
const cols = canvas.width / scale;

let snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
let dir = {x:0, y:0};
let apple = randomPos();
let grow = 0;

function randomPos(){
  return { x: Math.floor(Math.random()*cols), y: Math.floor(Math.random()*rows) };
}

function placeApple(){
  let p;
  do { p = randomPos(); } while(snake.some(s=>s.x===p.x && s.y===p.y));
  apple = p;
}

window.addEventListener('keydown', e=>{
  const k = e.key;
  if((k==='ArrowUp' || k==='w' || k==='W') && dir.y!==1) dir = {x:0,y:-1};
  if((k==='ArrowDown' || k==='s' || k==='S') && dir.y!==-1) dir = {x:0,y:1};
  if((k==='ArrowLeft' || k==='a' || k==='A') && dir.x!==1) dir = {x:-1,y:0};
  if((k==='ArrowRight' || k==='d' || k==='D') && dir.x!==-1) dir = {x:1,y:0};
});

function update(){
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
  if(dir.x===0 && dir.y===0) return;
  // collisions with walls
  if(head.x<0 || head.x>=cols || head.y<0 || head.y>=rows) { reset(); return; }
  // collision with self
  if(snake.some(s=>s.x===head.x && s.y===head.y)) { reset(); return; }

  snake.unshift(head);
  if(head.x===apple.x && head.y===apple.y){
    grow += 3; // grow by 3 segments
    placeApple();
  }
  if(grow>0) { grow--; } else { snake.pop(); }
}

function reset(){
  snake = [{x: Math.floor(cols/2), y: Math.floor(rows/2)}];
  dir = {x:0,y:0};
  grow = 0;
  placeApple();
}

function draw(){
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // apple
  ctx.fillStyle = 'red';
  ctx.fillRect(apple.x*scale, apple.y*scale, scale, scale);

  // snake
  for(let i=0;i<snake.length;i++){
    ctx.fillStyle = i===0 ? '#7CFC00' : '#00A000';
    ctx.fillRect(snake[i].x*scale, snake[i].y*scale, scale-1, scale-1);
  }
}

setInterval(()=>{ update(); draw(); }, 100);

placeApple();
