class VegetableStore {
    constructor(owner, location) {
        this.owner = owner;
        this.location = location;
        this.availableProducts = [];
    }
    loadingVegetables = function (vegetables) {
        let addedNew = [];
        for (const veggie of vegetables) {
            let [type, quantity, price] = veggie.split(' ');
            let notFound = true;

            for (const innerVeggie of this.availableProducts) {
                let [innerType, innerQuantity, innerPrice] = innerVeggie.split(' ');
                if (type === innerType) {
                    notFound = false;
                    if (price > innerPrice){
                        let index = this.availableProducts.indexOf(`${innerType} ${innerQuantity} ${innerPrice}`);
                        this.availableProducts[index] = `${type} ${Number(quantity) + Number(innerQuantity)} ${price}`;
                    }
                    else
                        this.availableProducts[index] = `${type} ${Number(quantity) + Number(innerQuantity)} ${innerPrice}`;
                    break;
                }
            }

            if (notFound) {
                this.availableProducts.push(`${type} ${quantity} ${price}`);
                addedNew.push(type);
            }
        }

        return `Successfully added ${addedNew.join(', ')}`;
    }

    buyingVegetables = function (selectedProducts) {
        let totalPrice = 0.00;
        for (const veggie of selectedProducts) {
            let notFound = true;
            let enough = true;
            let [type, quantity] = veggie.split(' ');

            let innerIndex = -1;
            for (const innerVeggie of this.availableProducts) {
                let [innerType, innerQuantity, innerPrice] = innerVeggie.split(' ');
                innerIndex++;
                if (type === innerType) {
                    if (Number(quantity) <= Number(innerQuantity)) {
                        totalPrice += Number(innerPrice) * Number(quantity);
                        this.availableProducts[innerIndex] = `${innerType} ${Number(innerQuantity) - Number(quantity)} ${innerPrice}`;
                    }
                    notFound = false;
                    if (Number(innerQuantity) < Number(quantity)) {
                        enough = false;
                    }
                    break;
                }
            }
            if (notFound) {
                throw new Error(`${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }
            if (!enough) {
                throw new Error(`The quantity ${quantity} for the vegetable ${type} is not available in the store, your current bill is $${totalPrice.toFixed(2)}.`)
            }
        }
        return `Great choice! You must pay the following amount $${totalPrice.toFixed(2)}.`;
    }

    rottingVegetable = function (type, quantity) {
        let notFound = true;
        let enough = true;

        let innerIndex = -1;
        for (const innerVeggie of this.availableProducts) {
            innerIndex++;
            let [innerType, innerQuantity, innerPrice] = innerVeggie.split(' ');
            if (type === innerType) {
                notFound = false;
                if (Number(innerQuantity) < Number(quantity)) {
                    this.availableProducts[innerIndex] = `${innerType} 0 ${innerPrice}`;
                    enough = false;
                }
                else {
                    this.availableProducts[innerIndex] = `${innerType} ${Number(innerQuantity) - Number(quantity)} ${innerPrice}`;
                    return `Some quantity of the ${type} has been removed.`;
                }
                break;
            }
        }
        if (notFound) {
            throw new Error(`${type} is not available in the store.`);
        }
        if (!enough) {
            return `The entire quantity of the ${type} has been removed.`;
        }
    }

    revision = function () {
        class Vegetable {
            constructor(type, quantity, price) {
                this.type = type;
                this.quantity = quantity;
                this.price = price;
            }
            toString() {
                return `${this.type}-${this.quantity}-$${this.price}`;
            }
        }
        let resultArr = [];
        for (const veggie of this.availableProducts) {
            let [innerType, innerQuantity, innerPrice] = veggie.split(' ');
            let vegetable = new Vegetable(innerType, innerQuantity, innerPrice);
            resultArr.push(vegetable);
        }

        resultArr.sort((a, b) => Number(a.price) - Number(b.price));
        return `Available vegetables:\n${resultArr.join('\n')}\nThe owner of the store is ${this.owner}, and the location is ${this.location}.`;

    }

}


let vegStore = new VegetableStore('Jerrie Munro', '1463 Pette Kyosheta, Sofia');
console.log(vegStore.loadingVegetables(["Okra 2.5 3.5", "Beans 10 2.8", "Celery 5.5 2.2", "Celery 0.5 2.5"]));
console.log((vegStore.rottingVegetable("Okra",1)));
console.log((vegStore.rottingVegetable("Okra",2.5)));
console.log(vegStore.buyingVegetables(["Beans 8", "Celery 1.5"]));
console.log(vegStore.revision());