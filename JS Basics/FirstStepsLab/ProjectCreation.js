function projectCreation(input){
    let name = input[0];
    let projects = Number(input[1]);
    let timeRequired = projects * 3;
    
    console.log(`The architect ${name} will need ${timeRequired} hours to complete ${projects} project/s.`)
}
projectCreation(['George', '4'])