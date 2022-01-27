function subtract() {
    let num1 = document.getElementById('firstNumber');
    let num2 = document.getElementById('secondNumber');

    document.getElementById('result').textContent = Number(num1.value)-Number(num2.value);
}