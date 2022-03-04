class Company {
    constructor() {
        this.departments = {};
    }
    addEmployee(name, salary, position, department) {
        validate([name, salary, position, department]);
        if (salary < 0)
            throw new Error('Invalid input!');

        if (!this.departments[department]) {
            this.departments[department] = {};
            this.departments[department].employees = [];
        }
        const employee = Object.assign({ name, salary: Number(salary), position });
        this.departments[department].employees.push(employee);
        return `New employee is hired. Name: ${name}. Position: ${position}`;
        function validate(elements) {
            for (const element of elements) {
                if (!element || element == '') {
                    throw new Error('Invalid input!');
                }
            }
        }
    }
    
    bestDepartment() {

        let bestDepartmentAvgSalary = 0;
        let bestDepartment;
        let bestDepartmentName;

        for (const department in this.departments) {
            this.departments[department].avgSalary = (this.departments[department].employees.reduce((a, b) => a + b.salary, 0) / this.departments[department].employees.length) || 0;

            if (this.departments[department].avgSalary > bestDepartmentAvgSalary) { 
                bestDepartmentAvgSalary = this.departments[department].avgSalary;
                bestDepartment = this.departments[department];
                bestDepartmentName = department;
            }
        }

        bestDepartment.employees.sort((a, b) => b.salary - a.salary || a['name'].localeCompare(b['name']));

        return `Best Department is: ${bestDepartmentName}\nAverage salary: ${bestDepartmentAvgSalary.toFixed(2)}\n${bestDepartment.employees.map(x => `${x.name} ${x.salary} ${x.position}`).join('\n')}`;
    }
}
