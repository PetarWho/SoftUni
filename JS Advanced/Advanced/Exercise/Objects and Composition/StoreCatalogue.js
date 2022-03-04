function catalogue(arr){
    let finalArr = [];
    for (const item of arr) {
        let [name, price] = item.split(' : ')
        const obj = {
            name,
            price: Number(price),
        }
        finalArr.push(obj);
    }
    finalArr.sort((a, b)=>(a.name).localeCompare(b.name))
    let previousLetter = '';
    for (const item of finalArr) {
        if(item.name[0]!=previousLetter){
            console.log(item.name[0]);
            previousLetter=item.name[0];
        }
        console.log(`  ${item.name}: ${item.price}`);
    }
}

catalogue(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
)