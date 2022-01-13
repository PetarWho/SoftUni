function previousDay(year, month, day){
        let dt = new Date(year,month,day);
        dt.setDate(dt.getDate()-1);
        console.log(`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`);
}