function sortByTwoCriteria(arr) {

    function sorting(cur, next) {
        if (cur.length === next.length) {
            return cur.localeCompare(next);
        }
        return cur.length - next.length;
    }

    arr.sort(sorting);
    arr.forEach(x => console.log(x));
    }