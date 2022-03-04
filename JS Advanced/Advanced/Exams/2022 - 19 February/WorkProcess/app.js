function solve() {
    let firstNameInput = document.getElementById('fname');
    let lastNameInput = document.getElementById('lname');
    let emailInput = document.getElementById('email');
    let birthInput = document.getElementById('birth');
    let positionInput = document.getElementById('position');
    let salaryInput = document.getElementById('salary');
    let addButton = document.getElementById('add-worker');
    let tBodyElement = document.getElementById('tbody');
    let sumEl = document.getElementById('sum');
    
    let salary = 0;

    addButton.addEventListener('click',function(e){
        e.preventDefault();
        let trEl = document.createElement('tr');

        if(firstNameInput.value.trim()=='' || lastNameInput.value.trim()=='' || emailInput.value.trim()=='' || birthInput.value.trim()=='' || positionInput.value.trim()=='' || salaryInput.value.trim()==''){
            return;
        }

        let fNameEl = document.createElement('td');
        fNameEl.textContent = firstNameInput.value;
        let lNameEl = document.createElement('td');
        lNameEl.textContent = lastNameInput.value;
        let emailEl = document.createElement('td');
        emailEl.textContent = emailInput.value;
        let birthEl = document.createElement('td');
        birthEl.textContent = birthInput.value;
        let positionEl = document.createElement('td');
        positionEl.textContent = positionInput.value;
        let salaryEl = document.createElement('td');
        salaryEl.textContent = salaryInput.value;

        salary+= Number(salaryEl.textContent);

        let buttonsTd = document.createElement('td');
        let firedBtn = document.createElement('button');
        firedBtn.setAttribute('class','fired');
        firedBtn.textContent = 'Fired';
        firedBtn.addEventListener('click', function(e){
            e.preventDefault();
            salary -= Number(salaryEl.textContent);
            firedBtn.parentElement.parentElement.remove();
            sumEl.textContent = salary.toFixed(2);
        })

        let editBtn = document.createElement('button');
        editBtn.setAttribute('class','edit');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click',function(e){
            e.preventDefault();
            firstNameInput.value = fNameEl.textContent;
            lastNameInput.value = lNameEl.textContent;
            emailInput.value = emailEl.textContent;
            birthInput.value = birthEl.textContent;
            positionInput.value = positionEl.textContent;
            salaryInput.value = salaryEl.textContent;

            salary-=Number(salaryEl.textContent);

            editBtn.parentElement.parentElement.remove();
            sumEl.textContent = salary.toFixed(2);
        })

        buttonsTd.appendChild(firedBtn);
        buttonsTd.appendChild(editBtn);

        trEl.appendChild(fNameEl);
        trEl.appendChild(lNameEl);
        trEl.appendChild(emailEl);
        trEl.appendChild(birthEl);
        trEl.appendChild(positionEl);
        trEl.appendChild(salaryEl);
        trEl.appendChild(buttonsTd);

        tBodyElement.appendChild(trEl);
        sumEl.textContent = salary.toFixed(2);

        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        birthInput.value = '';
        positionInput.value = '';
        salaryInput.value = '';
    })
}
solve()