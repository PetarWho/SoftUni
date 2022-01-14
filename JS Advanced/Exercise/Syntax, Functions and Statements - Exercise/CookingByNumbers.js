function cooking(num, operationA,operationB,operationC,operationD,operationE){

    num = Number(num);
    let arrOfOperations = [operationA,operationB,operationC,operationD,operationE];

    for(let i = 0; i<5;i++){
        switch(arrOfOperations[i]){
            case 'chop': num/=2; break;
            case 'dice': num = Math.sqrt(num); break;
            case 'spice': num+=1; break;
            case 'bake': num*=3; break;
            case 'fillet': num-=0.2*num; break;
        }
        console.log(num);
    }
}