function roadRadar(speed, road){
    let maxSpeed;
    switch(road){
        case 'motorway':maxSpeed=130; break;
        case 'interstate':maxSpeed=90; break;
        case 'city':maxSpeed=50; break;
        case 'residential':maxSpeed=20; break;
    }
    let speedDiff = speed-maxSpeed;
    if(Number(speed)<=maxSpeed){
        console.log(`Driving ${speed} km/h in a ${maxSpeed} zone`);
    }
    else if(Number(speed)>maxSpeed){
        if(speedDiff<=20){
            console.log(`The speed is ${speedDiff} km/h faster than the allowed speed of ${maxSpeed} - speeding`);
        }
        else if(speedDiff<=40){
            console.log(`The speed is ${speedDiff} km/h faster than the allowed speed of ${maxSpeed} - excessive speeding`);
        }
        else{
            console.log(`The speed is ${speedDiff} km/h faster than the allowed speed of ${maxSpeed} - reckless driving`);
        }
    }
}