window.addEventListener('load', calendarView);

function calendarView() {
    let monthCalendarElements = document.getElementsByClassName('monthCalendar');
    let daysCalendarElements = document.getElementsByClassName('daysCalendar');

    let monthCalendarArray = Array.from(monthCalendarElements);
    let daysCalendarArray = Array.from(daysCalendarElements);

    monthCalendarArray.forEach((x) => x.style.display = "none");
    daysCalendarArray.forEach((x) => x.style.display = "none");

    let sectionYears = document.getElementById('years');
    let tableYears = sectionYears.children[0];
    let tbodyYears = tableYears.children[1];
    let trElementsYears = [tbodyYears.children[1], tbodyYears.children[2]];
    let tdElementsYears = [trElementsYears[0].children[0], trElementsYears[0].children[1], trElementsYears[1].children[0], trElementsYears[1].children[1]]
    let tdElementsYearsArray = Array.from(tdElementsYears);

    let yearsShowArray = ['year-2020', 'year-2021', 'year-2022', 'year-2023']

    tdElementsYearsArray.forEach(x => x.addEventListener('click', (e) => {
        let indexYears = tdElementsYearsArray.indexOf(e.target);
        sectionYears.style.display = "none";
        document.getElementById(yearsShowArray[indexYears]).style.display = "flex";
        document.getElementById(yearsShowArray[indexYears]).children[0].children[0].addEventListener('click', (e) => {
            document.getElementById(yearsShowArray[indexYears]).style.display = "none";
            sectionYears.style.display = "flex";
        });
    let tdElementsMonthsArray = Array.from(document.getElementById(yearsShowArray[indexYears]).children[0].children[1].children[1].children);
        document.getElementById(yearsShowArray[indexYears]).children[0].children[1].addEventListener('click', (e) => {
            let indexMonths = tdElementsMonthsArray.indexOf(e.target);
            console.log(document.getElementById(yearsShowArray[indexMonths]));
        })
    }))
}