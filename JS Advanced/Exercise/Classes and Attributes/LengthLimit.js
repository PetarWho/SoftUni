class Stringer {
    constructor(string, length) {
        this.innerString = string;
        this.innerLength = Number(length) < 0 ? 0 : Number(length);
    }

    increase(length) {
       this.innerLength += Number(length);
    }

    decrease(length) {
        this.innerLength -= Number(length);
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }

    toString() {
        return this.innerLength === 0 ? '...' : this.innerLength >= this.innerString.length - 1 ? this.innerString : this.innerString.slice(0, this.innerLength) + '...';
    }
}