function filterEmployees(jsonEmployees, criteria){
    let employees = JSON.parse(jsonEmployees);
    const key = criteria.split('-')[0];
    const value = criteria.split('-')[1];
    let counter = 0;

    if (key === 'all') {
        console.log(employees.map(e => `${counter++}. ${e.first_name} ${e.last_name} - ${e.email}`).join('\r\n'));
        return;
    }

    employees = employees.filter(e => e[key] === value);
    console.log(employees.map(e => `${counter++}. ${e.first_name} ${e.last_name} - ${e.email}`).join('\r\n'));
}