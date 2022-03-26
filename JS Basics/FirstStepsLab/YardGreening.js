function yardGreening (input){
    let squareMeters = input[0];

    const pricePerMeter = 7.61;
    let total = pricePerMeter*squareMeters

    let discount = total * 0.18;

    let finalPrice = total -  discount;

    console.log(`The final price is: ${finalPrice} lv.`)
    console.log(`The discount is: ${discount} lv.`)
}
yardGreening([600])