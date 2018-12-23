// Get current time and format
function getTime() {
  let date = new Date(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    hour = date.getHours();
  return "" +
    (hour < 10 ? ("0" + hour) : hour) + ":" +
    (min < 10 ? ("0" + min) : min) + ":" +
    (sec < 10 ? ("0" + sec) : sec);
}

window.onload = () => {
  let xhr = new XMLHttpRequest();
  // Request to open weather map for Belgrade, Serbia
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?id=792680&units=metric&appid=2167c4200e7e10943e498f3ad426df20');
  xhr.onload = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let json = JSON.parse(xhr.responseText);
        console.log(json);
        document.getElementById("temp").innerHTML = json.main.temp.toFixed(0) + " &#8451;";
        document.getElementById("weather-description").innerHTML = json.weather[0].description;
      } else {
        console.log('error msg: ' + xhr.status);
      }
    }
  }
  xhr.send();
  // Set up the clock
  document.getElementById("clock").innerHTML = getTime();
  // Set clock interval to tick clock
  setInterval(() => {
    document.getElementById("clock").innerHTML = getTime();
  }, 100);
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Making the canvas full screen
canvas.height = document.body.clientHeight + 73;
canvas.width = document.body.clientWidth + 5;

var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
chinese = chinese.split("");

var font_size = 10;
var columns = canvas.width / font_size; // Number of columns for the rain

// An array of drops - one per column
var drops = [];
var dropped = [];

// x below is the x coordinate
// 1 = y co-ordinate of the drop(same for every drop initially)
for (var x = 0; x < columns; x++) {
  drops[x] = 1;
  dropped[x] = 0;
}

function draw() {
  // Black BG for the canvas
  // Translucent BG to show trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    var text = chinese[Math.floor(Math.random() * chinese.length)];

    if (Math.random() > 0.975 || dropped[i] == 1) {
      ctx.fillText(text, i * font_size, drops[i] * font_size);
      drops[i]++;
      dropped[i] = 1;
    }

    if (drops[i] * font_size > canvas.height && Math.random() > 0.975)
      drops[i] = 1;
  }
}

setInterval(draw, 33);
