function fromJSONToHTMLTable(input){
    let arrJSON = JSON.parse(input);
    let result = ['<table> '];
    result.push(header(arrJSON));
    arrJSON.forEach(el => result.push(record(el)));
    result.push('</table>');
    console.log(result.join('\n'));

    function header(array) {
        let result = '   <tr>';
        Object.keys(array[0]).forEach(key => {
            result += `<th>${escape(key)}</th>`
        });
        result += '</tr>'
        return result;
    }

    function record(records) {
        let result = '   <tr>';
        Object.values(records).forEach(x => {
            result += `<td>${escape(x)}</td>`;
        });
        result += '</tr>';
        return result;
    }

    function escape(value) {
        return value
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
}