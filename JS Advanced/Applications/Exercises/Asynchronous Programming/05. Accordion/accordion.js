async function solution() {
    const baseUrl = `http://localhost:3030/jsonstore/advanced/articles`;

    let mainElement = document.getElementById('main');
    mainElement.innerHTML = '';

    let articlesResponse = await fetch(`${baseUrl}/list`);
    let ariclesResult = await articlesResponse.json();

    ariclesResult.forEach(async(article)=>{
        const articleEndpoint = `${baseUrl}/details/${article._id}`;

        let articleResponse = await fetch(articleEndpoint);
        let articleResult = await articleResponse.json();

        let divAccordion = document.createElement('div');
        divAccordion.classList.add('accordion');

        let divHead = document.createElement('div');
        divHead.classList.add('head');
        divAccordion.appendChild(divHead);

        let spanElement = document.createElement('span');
        spanElement.textContent = articleResult.title;
        divHead.appendChild(spanElement);

        let buttonElement = document.createElement('button');
        buttonElement.classList.add('button');
        buttonElement.id = articleResult._id;
        buttonElement.textContent = 'More';
        buttonElement.addEventListener('click', showHide);
        divHead.appendChild(buttonElement);

        let divExtra = document.createElement('div');
        divExtra.classList.add('extra');
        divAccordion.appendChild(divExtra);

        let pElement = document.createElement('p');
        pElement.textContent = articleResult.content;
        divExtra.appendChild(pElement);

        mainElement.appendChild(divAccordion);

        function showHide(e){
            switch(e.target.textContent) {
                case 'More':
                    e.target.textContent = 'Less';
                    e.target.parentNode.nextSibling.style.display = 'block';
                    break;
                case 'Less':
                    e.target.textContent = 'More';
                    e.target.parentNode.nextSibling.style.display = 'none';
                    break;
            }
        }
    })
}
solution();