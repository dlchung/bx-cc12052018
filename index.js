function getCartData() {
  var numItems = document.querySelector(".minicart-quantity").innerText;
  var cartTotal = document.querySelector(".order-value").innerText;
  var itemImages = document.getElementsByClassName("mini-cart-image");
  console.log("Number of items: ", numItems);
  console.log("Cart total: ", cartTotal);
  console.log("Item images: ", itemImages[0]);

  return "Hello";
}
getCartData();