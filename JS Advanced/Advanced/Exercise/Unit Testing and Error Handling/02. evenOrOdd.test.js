describe('Even or Odd Tests', () => {

    it('returns undefined when given arguement is not a string', () => {

        expect(isOddOrEven(9)).to.equal(undefined);
        expect(isOddOrEven({})).to.equal(undefined);

    })

    it('returns odd when given string is with odd number of letters', () => {

        expect(isOddOrEven('oof')).to.equal('odd');
        expect(isOddOrEven('asdfghj')).to.equal('odd');

    })

    it('returns even when given string is with even number of letters', () => {

        expect(isOddOrEven('even')).to.equal('even');
        expect(isOddOrEven('isThisEven')).to.equal('even');

    })
})