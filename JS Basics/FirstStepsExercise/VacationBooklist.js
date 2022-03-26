function VacationBookList(input){
    let pages = Number(input[0]);
    let pagesPerHour = Number(input[1]);
    let daysToRead = Number(input[2]);

    let time = pages/pagesPerHour;
    let days = time/daysToRead;

    console.log(days);
}
VacationBookList(["100", "20", "3"])