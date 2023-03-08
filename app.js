let pieces = JSON.parse(window.localStorage.getItem("pieces"));

var color = ["#ca7", "#7ac", "#77c", "#aac", "#a7c", "#ac7"];
var label = ["Try Again", "200", "50", "100", "5", "500"];

var stopAngel = []; // stop angels starting from label index 1(0...label.length)
var slices = pieces.length;
var sliceDeg = 360 / slices;
var deg = 260;
var speed = 5;
var slowDownRand = 0;
var ctx = document.getElementById("canvas").getContext("2d");
var width = document.getElementById("canvas").width; // size
var center = width / 2; // center
// var center = 150;
var isStopped = false;
var lock = false;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function oddEven(num) {
  return num % 2 ? true : false;
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}

function drawSlice(index, deg, color) {
  var sAngel;
  var current = index <= 0 ? deg : stopAngel[index - 1];
  if (oddEven(index)) {
    if (current <= 0) {
      sAngel = Math.abs(Math.floor(260 + sliceDeg + 10));
    } else {
      sAngel = Math.abs(Math.floor(current - sliceDeg + 10));
    }
    current = sAngel;
    stopAngel.push(current);
  } else {
    if (current <= 0) {
      sAngel = Math.abs(Math.floor(260 + sliceDeg - 10));
    } else {
      sAngel = Math.abs(Math.floor(current - sliceDeg - 10));
    }
    current = sAngel;
    stopAngel.push(current);
  }
  stopAngel.push;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, center, deg2rad(deg), deg2rad(deg + sliceDeg), false);
  ctx.lineTo(center, center);
  ctx.fill();
}

// function drawSliceOut(index, deg, color){
//   // alert("call")
//   ctx.beginPath();
//   console.log(ctx);
//   ctx.fillStyle = '#6e4d4b';
//   ctx.moveTo(160, 160);
//   ctx.arc(150, 150, 150, 0, 360,false);
//   ctx.lineTo(150, 150);
//   ctx.fill();
// }

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg));
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = "14px";
  ctx.fillText(text, 130, 10);
  ctx.restore();
}

function drawImg() {
  //ctx.clearRect(0, 0, width, width);
  // drawSliceOut();
  for (let i = 0; i < slices; i++) {
    drawSlice(i, deg, pieces[i].color);
    drawText(deg + sliceDeg / 2, pieces[i].label);
    deg += sliceDeg;
  }

  console.log("Stop Angel " + stopAngel);
}

// ctx.rotate(360);

function anim() {
  isStopped = true;
  deg += speed;
  deg %= 360;

  // Increment speed
  if (!isStopped && speed < 3) {
    speed = speed + 1 * 0.1;
  }
  // Decrement Speed
  if (isStopped) {
    if (!lock) {
      lock = true;
      slowDownRand = rand(0.9, 0.998);
    }
    speed = speed > 0.2 ? (speed *= slowDownRand) : 0;
  }
  // Stopped!
  if (lock && !speed) {
    // console.log("deg " + deg);
    //     console.log("slicedeg " + sliceDeg);
    // console.log("calc " + Math.floor(((360 - 208 - 90) % 360) / sliceDeg))
    // var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
    // console.log(slices)
    // ai = (slices+ai)%slices; // Fix negative index
    // return alert("You got:\n"+ label[ai] ); // Get Array Item from end Degree
    // ctx.arc(150,150,150,8.85131263511415, 9.748910536139757);
    //   ctx.fill();
    deg = 0;
    // drawImg();
  }
  drawImg();
  window.requestAnimationFrame(anim);
}

function start() {
  // anim();
  var ele = document.getElementById("canvas");
  ele.classList.add("spin-wheel");
  setTimeout(function () {
    ele.classList.remove("spin-wheel");
    deg = stopAngel[5];
    drawImg();
  }, 3000);
}

function addItem() {
  // Parametros
  let label = document.getElementById("name").value;
  let color = document.getElementById("color").value;

  // Recebe o que já tem salvo no localStorage
  let items = JSON.parse(window.localStorage.getItem("pieces"));

  // Se ja tem algo ele insere
  if (items && items.length) {
    items.push({
      label,
      color,
    });
    window.localStorage.setItem("pieces", JSON.stringify(items));
  } /* Se não tem, ele insere o primeiro */ else {
    window.localStorage.setItem(
      "pieces",
      JSON.stringify([
        {
          label,
          color,
        },
      ])
    );
  }
  clearInputs();
}

function removeAll() {
  window.localStorage.removeItem("pieces");
  pieces = [];
  ctx.clearRect(0, 0, width, width);
}

function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("color").value = "";
}

drawImg();
