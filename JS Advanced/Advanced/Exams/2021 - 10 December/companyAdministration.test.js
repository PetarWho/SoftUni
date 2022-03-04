let expect = require('chai').expect
const companyAdministration = require('./companyAdministration');

describe("Tests …", function () {
    describe("hiringEmployee Tests", function () {
        it("throws an error if position is not programmer", function () {
            expect(()=>companyAdministration.hiringEmployee('Ivan', 'Not programmer', 10)).to.throw('We are not looking for workers for this position.');
            expect(()=>companyAdministration.hiringEmployee('Ivan', 'Butcher', 10)).to.throw(`We are not looking for workers for this position.`);
        });

        it("returns the right required string", () => {
            expect(companyAdministration.hiringEmployee('Ivan','Programmer',1)).to.be.equal(`Ivan is not approved for this position.`);
            expect(companyAdministration.hiringEmployee('Ivan','Programmer',3)).to.be.equal(`Ivan was successfully hired for the position Programmer.`);
            expect(companyAdministration.hiringEmployee('Ivan','Programmer',5)).to.be.equal(`Ivan was successfully hired for the position Programmer.`);
        });
    });

    describe("calculateSalary Tests", function () {
        it("accepts only positive numbers",()=>{
            expect(companyAdministration.calculateSalary(1)).to.equal(15);
            expect(()=>companyAdministration.calculateSalary('ten')).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary(-1)).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary([])).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary({})).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary(true)).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary(false)).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary(undefined)).to.throw("Invalid hours");
            expect(()=>companyAdministration.calculateSalary(null)).to.throw("Invalid hours");
        });

        it("pays correct amount", ()=>{
            expect(companyAdministration.calculateSalary(10)).to.be.equal(150);
            expect(companyAdministration.calculateSalary(160)).to.be.equal(2400);
            expect(companyAdministration.calculateSalary(161)).to.be.equal(3415);
        });
    });

    describe("firedEmployee Tests", function () {
        it("index is a positive integer", ()=>{
            expect(companyAdministration.firedEmployee(['Ivan', 'George'],0)).to.be.equal('George');
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'],-1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'],2)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'],'one')).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], 1.5)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], [])).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], {})).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], true)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], false)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], undefined)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(['Ivan', 'George'], null)).to.throw("Invalid input");
        })

        it("takes only an array as first parameter",()=>{
            expect(companyAdministration.firedEmployee(['Ivan', 'George'],0)).to.be.equal('George');
            expect(companyAdministration.firedEmployee(['Ivan', 'George'],1)).to.be.equal('Ivan');
            expect(companyAdministration.firedEmployee(['Ivan', 'George', 'Dan'],1)).to.be.equal('Ivan, Dan');
            expect(()=>companyAdministration.firedEmployee({},1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee('Ivan',1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(undefined,1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(null,1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(true,1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(false,1)).to.throw("Invalid input");
            expect(()=>companyAdministration.firedEmployee(3,1)).to.throw("Invalid input");
        })
    });
});
