function CharityCampaign(input){
    let days = Number(input[0]);
    let cooks = Number(input[1]);
    let cakes = Number(input[2]);
    let waffles = Number(input[3]);
    let pancakes = Number(input[4]);

    const cake = 45;
    const waffle = 5.8;
    const pancake = 3.2;

    let cakePrice = cakes * cake;
    let wafflePrice = waffle * waffles;
    let pancakePrice = pancakes * pancake;

    let sum = (cakePrice + wafflePrice + pancakePrice) * cooks;
    let totalSum = sum * days;
    let finalPrice = totalSum - (totalSum * 1/8);

    console.log(finalPrice);
}
CharityCampaign(["23", "8", "14", "30", "16"])