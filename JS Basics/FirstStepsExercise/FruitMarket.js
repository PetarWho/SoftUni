function FruitMarket(input){

    let strawberriesPricePerKg = Number(input[0]);
    let bananasKg = Number(input[1]);
    let orangesKg = Number(input[2]);
    let raspberriesKg = Number(input[3]);
    let strawberriesKg = Number(input[4]);

    let rasperriesPricePerKg = strawberriesPricePerKg/2;
    let orangesPricePerKg = rasperriesPricePerKg - rasperriesPricePerKg * 0.4;
    let bananasPricePerKg = rasperriesPricePerKg - rasperriesPricePerKg * 0.8;

    let strawberriesPrice = strawberriesPricePerKg * strawberriesKg;
    let orangesPrice = orangesKg * orangesPricePerKg;
    let rasperriesPrice = rasperriesPricePerKg * raspberriesKg;
    let bananasPrice = bananasPricePerKg * bananasKg;

    let totalPrice = strawberriesPrice + orangesPrice + rasperriesPrice + bananasPrice;

    console.log(totalPrice);
}
FruitMarket(["48", "10", "3.3", "6.5", "1.7"])