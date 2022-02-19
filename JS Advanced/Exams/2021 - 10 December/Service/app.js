window.addEventListener('load', solve);

function solve() {
    let receivedOrdersElement = document.getElementById('received-orders');
    let submitButton = document.getElementById('right').children[1].lastElementChild;
    let completedOrdersElement = document.getElementById('completed-orders');
    let clearButton = document.getElementsByClassName('clear-btn')[0];

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();

        if (document.getElementById('description').value.trim() == '' || document.getElementById('client-name').value.trim() == '' || document.getElementById('client-phone').value.trim() == '') {
            return;
        }

        let containerDiv = document.createElement('div');
        containerDiv.setAttribute('class', "container");

        let h2El = document.createElement('h2');
        let h3El = document.createElement('h3');
        let h4El = document.createElement('h4');

        h2El.textContent = `Product type for repair: ${document.getElementById('type-product').value}`;
        h3El.textContent = `Client information: ${document.getElementById('client-name').value}, ${document.getElementById('client-phone').value}`;
        h4El.textContent = `Description of the problem: ${document.getElementById('description').value}`;

        let startBtn = document.createElement('button');
        let finishBtn = document.createElement('button');

        startBtn.setAttribute('class', 'start-btn');
        finishBtn.setAttribute('class', 'finish-btn');
        finishBtn.setAttribute('disabled', 'true');

        startBtn.textContent = 'Start repair';
        finishBtn.textContent = 'Finish repair';

        startBtn.addEventListener('click', function (e) {
            e.preventDefault();
            startBtn.setAttribute('disabled', 'true');
            finishBtn.removeAttribute('disabled');
        })

        finishBtn.addEventListener('click', function (e) {
            e.preventDefault();
            containerDiv.children[4].remove();
            containerDiv.children[3].remove();
            completedOrdersElement.appendChild(containerDiv);
        })

        containerDiv.appendChild(h2El);
        containerDiv.appendChild(h3El);
        containerDiv.appendChild(h4El);
        containerDiv.appendChild(startBtn);
        containerDiv.appendChild(finishBtn);

        receivedOrdersElement.appendChild(containerDiv);

        document.getElementById('description').value = '';
        document.getElementById('client-name').value = '';
        document.getElementById('client-phone').value = '';
    })

    clearButton.addEventListener('click', function (e) {
        e.preventDefault();
        while (completedOrdersElement.children.length > 3) {
            completedOrdersElement.children[3].remove();
        }
    })
}