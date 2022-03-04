function destination(arr, criteria){
    class Ticket{
        constructor(destination, price, status){
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }
    let resultArr = [];
    for (const currentTicket of arr) {
        let [location, price, status] = currentTicket.split('|');
        let ticket = new Ticket(location,price,status);
        resultArr.push(ticket);
    }
    return criteria == 'price' ?resultArr.sort((a, b) => a[criteria] - b[criteria]) : resultArr.sort((a, b) => a[criteria].localeCompare(b[criteria]));
}
