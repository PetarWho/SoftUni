function cooking(num, operationA,operationB,operationC,operationD,operationE){

    num = Number(num);

    switch(operationA){
        case 'chop': num/=2; break;
        case 'dice': num = Math.sqrt(num); break;
        case 'spice': num+=1; break;
        case 'bake': num*=3; break;
        case 'fillet': num-=0.2*num; break;
    }
    console.log(num);

    switch(operationB){
        case 'chop': num/=2; break;
        case 'dice': num = Math.sqrt(num); break;
        case 'spice': num+=1; break;
        case 'bake': num*=3; break;
        case 'fillet': num-=0.2*num; break;
    }
    console.log(num);

    switch(operationC){
        case 'chop': num/=2; break;
        case 'dice': num = Math.sqrt(num); break;
        case 'spice': num+=1; break;
        case 'bake': num*=3; break;
        case 'fillet': num-=0.2*num; break;
    }
    console.log(num);

    switch(operationD){
        case 'chop': num/=2; break;
        case 'dice': num = Math.sqrt(num); break;
        case 'spice': num+=1; break;
        case 'bake': num*=3; break;
        case 'fillet': num-=0.2*num; break;
    }
    console.log(num);

    switch(operationE){
        case 'chop': num/=2; break;
        case 'dice': num = Math.sqrt(num); break;
        case 'spice': num+=1; break;
        case 'bake': num*=3; break;
        case 'fillet': num-=0.2*num; break;
    }
    console.log(num);
}