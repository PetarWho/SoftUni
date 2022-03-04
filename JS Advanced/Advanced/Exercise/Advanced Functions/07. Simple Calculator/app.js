function calculator() {
    let [selector1, selector2, resultSelector] = '';
    const calculate = {
        init: function(select1, select2, resultSelect){
            selector1 = document.querySelector(select1);
            selector2 = document.querySelector(select2);
            resultSelector = document.querySelector(resultSelect);
        },
        add: function(){
            resultSelector.value = Number(selector1.value) + Number(selector2.value);
        },
        subtract: function(){
            resultSelector.value = Number(selector1.value) - Number(selector2.value);
        }
    }
    return calculate;
}

//Remove these 2 lines or Judge tests will fail*
const calculate = calculator ();          
calculate.init ('#num1', '#num2', '#result'); 
//----------------------------------------------