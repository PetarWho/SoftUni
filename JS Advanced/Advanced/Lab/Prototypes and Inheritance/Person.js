class Person{
    constructor(first, last){
        this.firstName = first;
        this.lastName = last;
        this.fullName = `${this.firstName} ${this.lastName}`;
    }
    get firstName(){
        return this._firstName;
    }
    set firstName(value){
        this._firstName = value;
    }

    get lastName(){
        return this._lastName;
    }
    set lastName(value){
        this._lastName = value;
    }

    get fullName(){
        return `${this.firstName} ${this.lastName}`;
    }
    set fullName(value){
        let info = value.split(' ');
        if(info.length==2){
            this.firstName = info[0];
            this.lastName = info[1];
        }
    }
}
