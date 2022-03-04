async function loadRepos() {
	let inputElement = document.getElementById('username');
	let ulElement = document.getElementById('repos');
	let user = inputElement.value;
	ulElement.innerHTML = '';
	const url = `https://api.github.com/users/${user}/repos`;
	let errorHandler = '';

	try {
		let repos = await fetch(url);
		errorHandler = `Status: ${repos.status} ${repos.statusText}`;
		let data = await repos.json();
		data.forEach(repo =>{
			let fullname = repo.full_name;
			let url = repo.html_url;

			let liElement = document.createElement('li');
			ulElement.appendChild(liElement);

			let hyperlink = document.createElement('a');
			hyperlink.href = `${url}`;
			hyperlink.textContent = `${fullname}`;
			liElement.appendChild(hyperlink);
		})

	} catch {
		let liElement = document.createElement('li');
		ulElement.appendChild(liElement);
		liElement.textContent=errorHandler;
	}
}