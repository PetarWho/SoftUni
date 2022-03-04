async function loadCommits() {
    let user = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;
    let ulCommits = document.getElementById('commits');

    let errorHandler = '';
    const url = `https://api.github.com/repos/${user}/${repo}/commits`;

    try {
        let commits = await fetch(url);
        errorHandler = `Status: ${commits.status}`;
        let data = await commits.json();

        data.forEach(commit => {
            let liElement = document.createElement('li');
            liElement.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            ulCommits.appendChild(liElement);
        })

    } catch {
        let liElement = document.createElement('li');
        liElement.textContent = `Error: ${errorHandler} (Not Found)`;
        ulCommits.appendChild(liElement);   
    }
}