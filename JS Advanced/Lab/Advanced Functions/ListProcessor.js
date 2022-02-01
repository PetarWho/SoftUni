function listProcessor(arr){
    let result = [];
    const build = {
        add,
        remove,
        print
    }
    function add(name){
        result.push(name);
    }
    function remove(name){
        result = result.filter(x=>x!==name);
    }
    function print(){
        console.log(result.join(','));
    }
    arr.forEach(cmd => {
        let command = cmd.split(' ')[0];
        let value = cmd.split(' ')[1];
        switch(command){
            case "add":
                build.add(value);
                break;
            case "remove":
                build.remove(value);
                break;
            case "print":
                build.print();
                break;
        }
    });
}
