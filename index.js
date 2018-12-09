// Returns cart data object
function getCartData() {
  var numItems = document.querySelector(".minicart-quantity").innerText;
  var cartTotal = document.querySelector(".order-value").innerText;
  var products = new Array;
  
  var productDiv = document.querySelectorAll(".mini-cart-product");
  for(i = 0; i < productDiv.length; i++) {
    var productObj = {
      name: productDiv.item(i).querySelector(".mini-cart-name a").innerText,
      productUrl: productDiv.item(i).querySelector(".mini-cart-name a").href,
      imgUrl: productDiv.item(i).querySelector("img").src,
      quantity: productDiv.item(i).querySelector(".mini-cart-pricing .value").innerText,
      price: productDiv.item(i).querySelector(".mini-cart-price").innerText
    }

    products.push(productObj);
  }
  
  var dataObj = {
    numItems: numItems,
    cartTotal: cartTotal,
    products: products
  }

  return dataObj;
}

// Sets scrolling trigger for overlay
function setTrigger() {
  var triggerPercent = 0.1 // Trigger percentage
  window.addEventListener("scroll", function(event) {    
    var scrollY = event.path[1].scrollY; // Current scroll position
    var scrollArea = document.body.clientHeight - event.path[1].innerHeight; // Total scrollable height
    var scrollTrigger = scrollArea - (scrollArea * triggerPercent); // Triggered scroll position

    // Trigger overlay when current scroll position is greater than scroll trigger
    if(scrollTrigger < scrollY && hasTriggered === false) {
      showOverlay();
    }
  })
}

function renderOverlay(clientHeight) {
  var dataObj = getCartData();
  console.log(dataObj);

  var overlayWrap = document.createElement("div");
  var overlayStyle = overlayWrap.style;
  
  overlayWrap.className = "overlay-darken";
  overlayStyle.background = "#000";
  overlayStyle.display = "none";
  overlayStyle.height = clientHeight + "px";
  overlayStyle.left = "0";
  overlayStyle.opacity = "0.6";
  overlayStyle.position = "fixed";
  overlayStyle.top = "0";
  overlayStyle.width = "100vw";
  overlayStyle.zIndex = "100";

  document.body.appendChild(overlayWrap);

  var modal = document.createElement("div");
  var modalStyle = modal.style;
  var modalHeight = "50";
  var modalWidth = "50";
  var unit = "vh";
  
  modal.className = "overlay-modal";
  modalStyle.background = "#fff";
  modalStyle.border = "solid 5px #ddd";
  // modalStyle.borderRadius = "10px";
  modalStyle.boxSizing = "border-box";
  modalStyle.display = "none";
  modalStyle.left = "50%";
  modalStyle.maxHeight = "600px";
  modalStyle.padding = "20px";
  modalStyle.position = "fixed";
  modalStyle.top = "50%";
  modalStyle.maxWidth = "600px";
  modalStyle.width = modalWidth + unit;
  modalStyle.zIndex = "101";
  modalStyle.marginTop = "-" + (modalHeight / 2) + "px";
  modalStyle.marginLeft = "-" + (modalWidth / 2) + "px";

  var logo = "<img src='" + document.querySelector(".logo-image").src + "' style='float: left; width: 100px;' />";

  function renderProduct() {
    var prodResult = ""
    dataObj.products.forEach(function(product) {
      prodResult += "<div class='overlay-product-wrap' style='display: table; border-collapse: collapse; font-family: ars_maquette_promedium, sans-serif; margin: 10px 0; padding: 10px; width: 100%;'>" +
        "<div style='display: table-row; width: 100%;'>" +
          "<div class='overlay-product-img' style='vertical-align: middle; display: table-cell; width: 25%;'><a href='" + product.productUrl + "'><img src='" + product.imgUrl + "' style='border solid 3px #ddd;' /></a></div>" +
          "<div class='overlay-product-name' style='vertical-align: middle; display: table-cell; font-size: 18px;'><a href='" + product.productUrl + "'>" + product.name + "</a></div>" +
          "<div class='overlay-product-quantity' style='vertical-align: middle; display: table-cell; font-size: 18px; width: 10%;'>" + product.quantity + "</div>" +
          "<div class='overlay-product-price' style='vertical-align: middle; display: table-cell; font-size: 18px; width: 15%;'>" + product.price + 
          "</div>" +
        "</div>" +
      "</div>";
    });

    return "<div class='overlay-product-list' style='clear: both; overflow: auto;'>" + prodResult + "</div>";
  }

  var pStyle = "font-size: 16px; font-weight: normal; padding-bottom: 10px;";
  var renderCartData = "<div class='overlay-cart-data' style='clear:both; font-family: ars_maquette_promedium, sans-serif;'>" +
    "<p class='overlay-data' style='" + pStyle + "'>You've reached the end! Would you like to checkout?</p>" +
    "<p class='overlay-data' style='" + pStyle + "'>You have " + dataObj.numItems + " products in your cart.</p>" +
    // "<p class='overlay-data' style='" + pStyle + "'>Total: " + dataObj.cartTotal + "</p>" +
  "</div>";

  var renderClose = "<div class='overlay-close-modal' style='color: #666; float:right; font-family: ars_maquette_promedium, sans-serif; font-size: 18px; font-weight: bold; padding-bottom: 10px; text-align: right;'>" + 
    "<a style='background: #eee; display: inline-block; padding: 5px 8px; text-align: center;'" +
    "class='overlay-close-btn'>X</a>" +
  "</div>";

  var renderCartBtn = "<div style='padding: 5px 0; text-align: right;'>" +
    "<span style='font-size: 16px; margin-right: 20px;'>Cart Total: " + dataObj.cartTotal + "</span>" +
    "<a href='/cart' class='overlay-cart-btn' style='background: #C62632; color: #fff; font-family: ars_maquette_probold,sans-serif; padding: 5px 10px; text-transform: uppercase;'>Go to Cart ></a>" +
  "</div>";

  modal.innerHTML = (
    logo +
    renderClose +
    renderCartData +
    renderProduct() +
    renderCartBtn
  );

  document.body.appendChild(modal);
  document.querySelector(".overlay-close-btn").onclick = hideOverlay;
}

function hideOverlay() {
  hasTriggered = false;
  document.querySelector(".overlay-darken").style.display = "none";
  document.querySelector(".overlay-modal").style.display = "none";
}

function showOverlay() {
  hasTriggered = true;
  document.querySelector(".overlay-darken").style.display = "inline";
  document.querySelector(".overlay-modal").style.display = "inline";

  // Dynamically adjust sizing and margins for overlay
  document.querySelector(".overlay-modal").style.marginTop = "-" + document.querySelector(".overlay-modal").clientHeight / 2 + "px";
  document.querySelector(".overlay-modal").style.marginLeft = "-" + document.querySelector(".overlay-modal").clientWidth / 2 + "px";
  document.querySelector(".overlay-product-list").style.height = document.querySelector(".overlay-modal").clientHeight / 1.5 + "px";
}

var hasTriggered = false; // Triggered flag
setTrigger();
renderOverlay(document.body.clientHeight);