function walking(steps, footprint, speed){
    let distance = steps*footprint;
    let metersPerSec = speed * (1000/3600);
    let time = distance/metersPerSec;
    let rests = Math.floor(distance/500);
    time+=60*rests;
    let minutes = Math.floor(time/60);
    let hours = Math.floor(minutes/60);
    let seconds = time - minutes*60;
    console.log(`${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+Math.round(seconds):Math.round(seconds)}`);
}