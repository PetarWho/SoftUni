function solve() {
   let checkoutButton = document.getElementsByClassName('checkout')[0];

   let productsSet = new Set();
   let prizes = [];
   const products = Array.from(document.getElementsByClassName('add-product'));

   for(let product of products) {

      product.addEventListener('click', addAndMessage);

   }

   checkoutButton.addEventListener('click', function() {

      document.getElementsByTagName('textarea')[0].textContent += `You bought ${Array.from(productsSet).join(', ')} for ${prizes.reduce((a, b) => a + b, 0).toFixed(2)}.`;
      Array.from(document.getElementsByTagName('button')).forEach(x => x.disabled = true);
      
   });

   function addAndMessage(e) {

      let prize = Number(e.target.parentNode.parentNode.children[3].textContent);
      let product = e.target.parentNode.parentNode.children[1].children[0].textContent;
      let string = `Added ${product} for ${prize.toFixed(2)} to the cart.\n`;
      document.getElementsByTagName('textarea')[0].disabled = false;
      document.getElementsByTagName('textarea')[0].textContent += string;
      productsSet.add(product);
      prizes.push(prize);
  }
}