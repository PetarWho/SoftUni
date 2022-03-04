function heroicInventory(arr) {
    let listOfHeroes = [];

    for (let i = 0; i < arr.length; i++) {
        let [name, level, items] = arr[i].split(' / ');
        let hero = {
            name,
            level:Number(level),
            items: items? items.split(', '):[],
        }
        listOfHeroes.push(hero);
    }
    let output = JSON.stringify(listOfHeroes);
    console.log(output);
}
