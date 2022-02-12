class List{
    constructor() {
        this.list = [];
        this.size = this.list.length;
    }
    add(element){
        this.list.push(element);
        this.list.sort((a, b) => a - b);
        this.size++;
    }
    remove(index){
        if (index < 0 || index >= this.list.length) {
            throw new Error('Index out of range');
        }
        this.list.splice(index, 1);
        this.list.sort((a, b) => a - b);
        this.size--;
    }
    get(index){
        return this.list[index];
    }
}
