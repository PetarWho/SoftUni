function LargestNumber(num1, num2, num3) {
  let firstBig = num1 > num2 ? num1 : num2;
  let largest = firstBig>num3?firstBig:num3;
  console.log(`The largest number is ${largest}.`);
}
