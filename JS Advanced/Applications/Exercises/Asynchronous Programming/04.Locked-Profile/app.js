async function lockedProfile() {

    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    const mainElement = document.getElementById('main');

    let profilesResponse = await fetch(url);
    let profilesResult = await profilesResponse.json();
    mainElement.innerHTML = '';
    
    let i = 0;
    for (const key in profilesResult) {

        let template = `<div class="profile">
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${++i}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${i}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${i}Username" value="${profilesResult[key].username}" disabled readonly />
            <div class="hiddenInfo" disabled readonly>
                <hr>
                <label>Email:</label>
                <input type="email" name="user${i}Email" value="${profilesResult[key].email}"/>
                <label>Age:</label>
                <input type="email" name="user${i}Age" value="${profilesResult[key].age}"/>
            </div>
    
            <button>Show more</button>
        </div>`;

        mainElement.innerHTML += template + '\n';

    }

    mainElement.innerHTML.trimEnd();

    let buttons = Array.from(document.getElementsByTagName('button'));
    buttons.forEach(x => x.addEventListener('click', showHide));
    function showHide(e) {

        if(e.target.parentNode.children[2].checked) {
            return;
        }
        
        if(e.target.textContent === 'Show more') {
            e.target.parentNode.children[9].style.display = 'inline';
            e.target.parentNode.children[9].classList.remove('hiddenInfo');
            e.target.parentNode.children[9].children[2].style.display = 'inline';
            e.target.parentNode.children[9].children[3].style.display = 'inline';
            e.target.textContent = 'Hide it';
        } else {
            e.target.parentNode.children[9].style.display = 'none';
            e.target.parentNode.children[9].classList.add('hiddenInfo');
            e.target.textContent = 'Show more'
        }
    }
}