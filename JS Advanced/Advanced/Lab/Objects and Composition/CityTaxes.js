function cityTaxes(name, population, treasury){
    let city = {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes() {
            this.treasury += this.population*this.taxRate;
        },
        applyGrowth(percentage){
            this.population*= (percentage/100) +1;
            Math.floor(this.population);
        },
        applyRecession(percentage){
            this.treasury*= 1- (percentage/100);
            Math.floor(this.treasury);
        },
    }
    return city;
}