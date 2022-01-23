function lowestPricesInCities(arr){
    const productArray = [];
    for(let product of arr) {
        let [town, productName, price] = product.split(' | ');
        let objProduct = {
            product: productName,
            price: Number(price),
            town
        };

        if(!productArray.some(p => p.product === productName)) {
            productArray.push(objProduct);
        }
        const objToCompare = productArray.find(p => p.product === productName);
            if(price < objToCompare.price) {
                objToCompare.price = price;
                objToCompare.town = town;
            }
    }
    for(let product of productArray) {
        console.log(`${product.product} -> ${product.price} (${product.town})`);
    }
}