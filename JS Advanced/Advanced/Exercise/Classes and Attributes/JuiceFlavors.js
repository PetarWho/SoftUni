function juiceFlavors(arr) {
    
    const initial = new Map();
    const result = new Map();

    arr.forEach(juice => {
        const [fruit, quantity] = juice.split(' => ');
        if (!initial.has(fruit)) { 
            initial.set(fruit, 0);
        }

        initial.set(fruit, initial.get(fruit) + Number(quantity));
        while (initial.get(fruit) >= 1000) { 
            initial.set(fruit, initial.get(fruit) - 1000);
            result.set(fruit, (result.get(fruit) || 0) + 1);
        }
    });

    for (const [key, value] of result) {
        console.log(`${key} => ${value}`);
    }

}
