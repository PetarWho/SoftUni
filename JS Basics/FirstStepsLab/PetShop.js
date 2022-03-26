function shop(input){
    let countOfDogs = Number(input[0]);
    let countOfAnimals = Number(input[1]);
    const DOGFOOD = 2.5;
    const ANIMALFOOD = 4;
    
    let priceForDogFood = countOfDogs * DOGFOOD;
    let priceForAnimalFood = countOfAnimals * ANIMALFOOD;

    console.log(`${priceForAnimalFood+priceForDogFood} lv.`)
}
shop(["5", "4"])