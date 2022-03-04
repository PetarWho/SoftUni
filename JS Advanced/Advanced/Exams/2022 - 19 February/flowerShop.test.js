const { expect } = require("chai");
const flowerShop = require("./flowerShop");

describe("Tests …", function () {
    describe("calcPriceOfFlowers tests", function () {
        it("should throw an error if flower is not string", function () {
            expect(() => flowerShop.calcPriceOfFlowers(12, 12, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers([], 12, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers({}, 12, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers(null, 12, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers(undefined, 12, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers(true, 12, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers(false, 12, 12)).to.throw('Invalid input!');
        });

        it("should throw an error if price is not an integer", () => {
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 'ten', 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', [], 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', {}, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', undefined, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', null, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', true, 12)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', false, 12)).to.throw('Invalid input!');
        });

        it("should throw an error if quantity is not an integer", () => {
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, 'ten')).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, [])).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, {})).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, undefined)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, null)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, true)).to.throw('Invalid input!');
            expect(() => flowerShop.calcPriceOfFlowers('Poppy', 12, false)).to.throw('Invalid input!');
        });

        it("should returns the right product of price*quantity", () => {
            expect(flowerShop.calcPriceOfFlowers('Poppy', 12, 10)).to.equal(`You need $120.00 to buy Poppy!`);
            expect(flowerShop.calcPriceOfFlowers('Poppy', 1, 10)).to.equal(`You need $10.00 to buy Poppy!`);
        });

        it("final price should be rounded the the second decimal point", () => {
            expect(flowerShop.calcPriceOfFlowers('Poppy', 12, 10)).to.equal(`You need $120.00 to buy Poppy!`);
            expect(flowerShop.calcPriceOfFlowers('Poppy', 12, 10)).to.not.equal(`You need $120 to buy Poppy!`);
        });
    });

    describe("checkFlowersAvailable tests", function () {
        it("garderArr includes all available flowers", () => {
            expect(flowerShop.checkFlowersAvailable('Poppy', ['Dandelion', 'Lily', 'Poppy'])).to.equal(`The Poppy are available!`);
            expect(flowerShop.checkFlowersAvailable('Lily', ['Dandelion', 'Lily', 'Poppy'])).to.equal(`The Lily are available!`);
            expect(flowerShop.checkFlowersAvailable('Dandelion', ['Dandelion', 'Lily', 'Poppy'])).to.equal(`The Dandelion are available!`);
        });

        it("expected flower is in the array", () => {
            expect(flowerShop.checkFlowersAvailable('Poppy', ['Dandelion', 'Lily', 'Poppy'])).to.equal(`The Poppy are available!`);
            expect(flowerShop.checkFlowersAvailable('Lily', ['Dandelion', 'Lily', 'Poppy'])).to.equal(`The Lily are available!`);
            expect(flowerShop.checkFlowersAvailable('Dandelion', ['Dandelion', 'Lily', 'Poppy'])).to.equal(`The Dandelion are available!`);
        });

        it("if it is not in the array return correct message", ()=>{
            expect(flowerShop.checkFlowersAvailable('Poppy', ['Dandelion', 'Lily'])).to.equal(`The Poppy are sold! You need to purchase more!`);
        });
    });

    describe("sellFlower tests", function () {
        it("removes the correct space", () => {
            expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"],1)).to.equal('Rose / Orchid');
            expect(flowerShop.sellFlowers(["Rose", "Lily", "Orchid"],0)).to.equal('Lily / Orchid');
        });

        it("throws an error if gardenArr in not an array", ()=>{
            expect(()=>flowerShop.sellFlowers('rose', 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(123, 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers([], 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers({}, 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(undefined, 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(null, 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(true, 1)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(false, 1)).to.throw('Invalid input!');
        });

        it("throws an error if space is not an integer", ()=>{
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 'ten')).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], [])).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], {})).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], undefined)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], null)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], false)).to.throw('Invalid input!');
            expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], true)).to.throw('Invalid input!');
        });
    });

    it("throws an error if space is less than 0 or bigger than the array length", ()=>{
        expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], -1)).to.throw('Invalid input!');
        expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 3)).to.throw('Invalid input!');
        expect(()=>flowerShop.sellFlowers(["Rose", "Lily", "Orchid"], 123)).to.throw('Invalid input!');
    });
});
