function extractText() {
    let items = document.querySelectorAll('#items li');
    let result = '';
    for (const item of items) {
        result+=item.textContent +'\n';
    }
    document.getElementById('result').textContent = result;
}