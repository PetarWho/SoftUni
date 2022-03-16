window.onload = attachEvents;

function attachEvents() {
    const url = `http://localhost:3030/jsonstore/collections/students`;

    const tableBody = document.getElementById('results').children[1];
    const formElement = document.getElementById('form');
    formElement.addEventListener('submit', createStudentRecord);

    loadStudents();

    async function createStudentRecord(e) {
        e.preventDefault();
        let form = new FormData(e.target);

        let studentRequestBody = {
            firstName: form.get('firstName'),
            lastName: form.get('lastName'),
            facultyNumber: form.get('facultyNumber'),
            grade: form.get('grade')
        }

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(studentRequestBody)
        });

        loadStudents();
    }

    async function loadStudents() {
        let studentsResponse = await fetch(url);
        let studentsResult = await studentsResponse.json();
        tableBody.innerHTML = '';

        for (const student in studentsResult) {
            let trElement = document.createElement('tr');
            tableBody.appendChild(trElement);

            let tdFirstNameElement = document.createElement('td');
            tdFirstNameElement.textContent = studentsResult[student].firstName;
            trElement.appendChild(tdFirstNameElement);

            let tdLastNameElement = document.createElement('td');
            tdLastNameElement.textContent = studentsResult[student].lastName;
            trElement.appendChild(tdLastNameElement);

            let tdFNumberElement = document.createElement('td');
            tdFNumberElement.textContent = studentsResult[student].facultyNumber;
            trElement.appendChild(tdFNumberElement);

            let tdGradeElement = document.createElement('td');
            tdGradeElement.textContent = studentsResult[student].grade;
            trElement.appendChild(tdGradeElement);
        }
    }
}