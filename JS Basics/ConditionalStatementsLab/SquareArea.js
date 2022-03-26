function squareArea (input){
    let figure = input[0];
    let result = 0; 
    let a=0;
    let b=0;
    switch (figure)
    {
        case "square":
            a = Number(input[0]);
            result = a*a;
            break;
        case "rectangle":
            a = Number(input[0]);
            b = Number(input[1]);
            result = a*b;
            break;
        case "circle":
            a = Number(input[0]);
            result = a*Math.PI;
            break;
        case "triangle":
            a = Number(input[0]);
            b = Number(input[1]);
            result = a*b/2;
            break;
    }
    console.log(result.toFixed(3));
}