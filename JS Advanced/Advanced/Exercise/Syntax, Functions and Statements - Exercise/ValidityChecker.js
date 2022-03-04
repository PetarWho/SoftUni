function validityChecker(x1, y1, x2, y2){

    let distanceBetweenPoints = function (a1,b1,a2,b2){
        return Math.sqrt(Math.pow((a2-a1),2)+Math.pow((b2-b1),2));
    }

    let validity='invalid';
    
    if(Number.isInteger(distanceBetweenPoints(x1,y1,0,0))){
        validity = 'valid';
    }
    console.log(`{${x1}, ${y1}} to {0, 0} is ${validity}`);

    if(Number.isInteger(distanceBetweenPoints(x2,y2,0,0))){
        validity = 'valid';
    }
    console.log(`{${x2}, ${y2}} to {0, 0} is ${validity}`);

    if(Number.isInteger(distanceBetweenPoints(x1,y1,x2,y2))){
        validity = 'valid';
    }
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${validity}`);
    

}