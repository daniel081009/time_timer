var el = document.getElementById('displayer');

var interval = null;
var interout = null;
var intertime = null;

var start = document.getElementById('start');
var stop = document.getElementById('stop');
var unstop = document.getElementById('unstop');

var mn = document.getElementById('min');
var sc = document.getElementById('sec');

var minutes;
var secondes;

var ftime = 0;
var ntime = 0;
var ttime = 0;
var ctime = 0;

var run_lock_d = 1;
var run_lock_t = 1;


var options = {
    size:document.body.clientWidth/2.1
}

var color = '#f90000';

var radius = options.size / 2;
var rad = 0;

var stp = 0;
var toPi = Math.PI / 180;

var canvas = document.createElement('canvas');
canvas.id = "canvas";

if (typeof(G_vmlCanvasManager) !== 'undefined') {
    G_vmlCanvasManager.initElement(canvas);
}

var ctx = canvas.getContext('2d');
canvas.width = canvas.height = options.size;

el.appendChild(canvas);

ctx.translate(options.size / 2, options.size / 2);



function dingeling (){
  var x = document.getElementById("audio"); 
  x.play();
}

function overOut() {
    if (rad <= radius){
        ctx.clearRect(
            -1/2 * canvas.width, 
            -1/2 * canvas.height, 
            canvas.width*2, 
            canvas.height*2
        );
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, rad, 0, stp, false);
        ctx.arc(0, 0, radius, stp, 0, true);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        rad -= 2;
        interout = setTimeout(overOut, 10);
    } else {

        ctx.clearRect(
            -1/2 * canvas.width, 
            -1/2 * canvas.height, 
            canvas.width*2, 
            canvas.height*2
        );

        clearTimeout(interout);

    }
}


function fadeOut() {
    if (run_lock_d == 1) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, -0.5 * Math.PI, (-0.5 + 2 ) * Math.PI);
        ctx.closePath();
        ctx.fill();
        interout = setTimeout(fadeOut, 50);
    }
}
// function drawCircle() {
//     ctx.clearRect(-0.5 * canvas.width, -0.5 * canvas.height, canvas.width, canvas.height);
//     ctx.beginPath();
//     // 시작 각도 변경
//     ctx.arc(0, 0, radius, 0, -1*stp);
//     console.log(stp);
//     ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
//     ctx.lineWidth = 68;
//     ctx.stroke();
//     ctx.closePath();
//     ctx.rotate((Math.PI / 180) * 90);
//     ctx.font = 'bold 48px sans-serif';
//     ctx.fillStyle = 'white';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     ctx.fillText(ftime - ttime, 0, 0);
// }

// function drawTime (){
//     if (run_lock_d == 0){
//         if (ttime < ftime){
//             ttime++;
//             stp = 2 * Math.PI - ntime * ttime * toPi; // 변경된 부분
//             drawCircle();
//         } else {
//             run_lock_d = 1;
//             ttime = 0;
//             ntime = 0;
//             stop.style.display = 'none';
//             start.style.display = 'block';
//             interout = setTimeout(fadeOut, 200);
//             dingeling();
//             mn.disabled = false;
//             sc.disabled = false;
//         }
//     }
// }
function drawTime() {
    if (run_lock_d == 0) {
        if (ttime < ftime) {
            ttime++;
            stp = 2 * Math.PI - ntime * ttime * toPi;
            drawCircle();
        } else {
            run_lock_d = 1;
            ttime = 0;
            ntime = 0;
            stop.style.display = 'none';
            start.style.display = 'block';
        }
    }
}
  
function drawCircle() {
    ctx.clearRect(-0.5 * canvas.width, -0.5 * canvas.height, canvas.width, canvas.height);
    ctx.save();
    ctx.rotate((Math.PI / 180) * 90);
    ctx.font = 'bold 86px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
  
    let timeString = `${minutes}:${secondes}`;
    ctx.fillText(timeString, 0, 0);

    ctx.font = 'bold 48px sans-serif';
    let msg = document.getElementById("mission")
    ctx.fillText(msg.value, 0, 100)
  
    ctx.restore();
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 1 * stp);
    ctx.strokeStyle = 'rgba(255, 0, 0, 1)';
    ctx.lineWidth = 128;
    ctx.stroke();
    ctx.closePath();
  }

function changeTime(){
    if (run_lock_t == 0){
        if ((ctime % 100) == 0){
            if (secondes > 0){
                secondes --;
                if (sc.value < 10){
                    sc.value = '0' + secondes;
                } else {
                    sc.value = secondes;
                }
            } else if (minutes > 0) {
                minutes --;
                if (mn.value < 10){
                    mn.value = '0' + minutes;
                } else {
                    mn.value = minutes;
                }
                secondes = 59;
                sc.value = secondes;
            } else {
                sc.value = '00';
                run_lock_t = 1;
            }
            ctime = 0;
        }
        ctime ++;
    }
}

function init (){

    minutes = parseInt(mn.value);
    secondes = parseInt(sc.value);

    var time = (minutes * 60) + secondes;

    if (time <= 1){

        time = 1;
        ftime = 50;

    } else {
    
        ftime = (time - 1) * 100;

    }

    ntime = 360 / ftime;

    ctime = 0;
    ttime = 0;

    rad = 0;
}

function over (){
            
    run_lock_d = 1;
    run_lock_t = 1;

    ttime = 0;
    ntime = 0;

    stop.style.display = 'none';
    unstop.style.display = 'none';
    start.style.display = 'block';

    interout = setTimeout(overOut, 200);

    mn.value = "00";
    sc.value = "00";

    mn.disabled = false;
    sc.disabled = false;

}

function pause (){

    stop.style.display = 'none';
    unstop.style.display = 'block';

    run_lock_d = 1;
    run_lock_t = 1;
    
}

function replay (){

    unstop.style.display = 'none';
    stop.style.display = 'block';

    run_lock_d = 0;
    run_lock_t = 0;

}

function play (){

    start.style.display = 'none';
    stop.style.display = 'block';

    mn.disabled = true;
    sc.disabled = true;

    init();

    run_lock_d = 0;
    run_lock_t = 0;

}

interTime = setInterval(changeTime, 10);
interval = setInterval(drawTime, 10);

function zeroFirst (e){

    var val = e.target.value;
    if (val < 10){
        e.target.value = '0' + val;
    }
}

sc.addEventListener('input', zeroFirst);
mn.addEventListener('input', zeroFirst);