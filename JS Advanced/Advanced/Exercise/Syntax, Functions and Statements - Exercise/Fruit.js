function fruit(name, grams, pricePerKilo){
    console.log(`I need \$${((grams/1000) * pricePerKilo).toFixed(2)} to buy ${(grams/1000).toFixed(2)} kilograms ${name}.`);
}