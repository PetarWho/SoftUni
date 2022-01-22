function townPopulation(arr){
    let result = {};
    for (const town of arr) {
        let splitted = town.split(' <-> ');
        let name = splitted[0];
        let population = Number(splitted[1]);
        if(!result[name]){
            result[name] = 0;
        }
        result[name]+=population;
    }
    for (const town in result) {
        console.log(`${town} : ${result[town]}`);
    }
}