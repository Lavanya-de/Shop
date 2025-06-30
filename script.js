let cart = [];

function addToCart(productName, price) {
  cart.push({ name: productName, price: price });
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = total.toFixed(2);


}
