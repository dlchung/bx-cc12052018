function getCartData() {
  var numItems = document.querySelector(".minicart-quantity").innerText;
  var cartTotal = document.querySelector(".order-value").innerText;
  var itemImages = document.getElementsByClassName("mini-cart-image");
  var imageUrls = new Array;
  var products = new Array;
  
  var productDiv = document.querySelectorAll(".mini-cart-product");
  // console.log(productDiv);
  // for(i = 0; i < itemImages.length; i++) {
  //   imageUrls.push(itemImages.item(i).querySelector("img").src);
  // }
  for(i = 0; i < productDiv.length; i++) {
    console.log(productDiv.item(i).querySelector(".mini-cart-price").innerText);
    var productObj = {
      name: productDiv.item(i).querySelector(".mini-cart-name a").innerText,
      imgUrl: productDiv.item(i).querySelector("img").src,
      quantity: productDiv.item(i).querySelector(".mini-cart-pricing .value").innerText,
      price: productDiv.item(i).querySelector(".mini-cart-price").innerText
    }
    // imageUrls.push(itemImages.item(i).querySelector("img").src);

    products.push(productObj);
  }
  
  var dataObj = {
    numItems: numItems,
    cartTotal: cartTotal,
    // itemImages: itemImages,
    // imageUrls: imageUrls,
    products: products
  }

  // console.log("Number of items: ", numItems);
  // console.log("Cart total: ", cartTotal);
  // console.log("Item images: ", itemImages);
  // console.log("Image Url: ", imageUrls);

  return dataObj;
}

function setTrigger() {
  window.addEventListener("scroll", function(event) {
    // console.log("pageYOffset ", event.path[1].pageYOffset)
    // console.log("scrollY ", event.path[1].scrollY);
    // console.log(event);
    // console.log("Client height: ", document.body.clientHeight);
    // console.log("Inner height: ", event.path[1].innerHeight);
    
    // var bottomScrollPos = event.path[1].scrollY + event.path[1].innerHeight;
    // this.console.log("scrollPos: ", bottomScrollPos);
    
    var scrollY = event.path[1].scrollY; // current scroll position
    var scrollPos = document.body.clientHeight - event.path[1].innerHeight; // total scrollable height
    var scrollTrigger = scrollPos - (scrollPos * 0.1); // triggered scroll pos

    // this.console.log(scrollY, scrollTrigger);

    if(scrollTrigger < scrollY && overlayTriggered === false) {
    // if(scrollTrigger < scrollY) {
      // renderOverlay(document.body.clientHeight);
      showOverlay();
    }
  })
}

function renderOverlay(clientHeight) {
  var dataObj = getCartData();
  console.log("logo", logo);

  var overlayWrap = document.createElement("div");
  var overlayStyle = overlayWrap.style;
  
  overlayWrap.className = "overlay-darken";
  overlayStyle.background = "#000";
  overlayStyle.display = "none";
  overlayStyle.height = clientHeight + "px";
  overlayStyle.left = "0";
  overlayStyle.opacity = "0.6";
  overlayStyle.position = "absolute";
  overlayStyle.top = "0";
  overlayStyle.width = "100vw";
  overlayStyle.zIndex = "100";

  document.body.appendChild(overlayWrap);

  var modal = document.createElement("div");
  var modalStyle = modal.style;
  var modalHeight = "500";
  var modalWidth = "500";
  var unit = "px";
  
  modal.className = "overlay-modal";
  modalStyle.background = "#fff";
  modalStyle.border = "solid 5px #ddd";
  modalStyle.borderRadius = "10px";
  modalStyle.boxSizing = "border-box";
  modalStyle.display = "none";
  modalStyle.left = "50%";
  modalStyle.height = modalHeight + unit;
  modalStyle.width = modalWidth + unit;
  modalStyle.padding = "10px";
  modalStyle.position = "fixed";
  modalStyle.top = "50%";
  modalStyle.zIndex = "101";
  modalStyle.marginTop = "-" + (modalHeight / 2) + "px";
  modalStyle.marginLeft = "-" + (modalWidth / 2) + "px";

  var logo = "<img src='" + document.querySelector(".logo-image").src + "' style='float: left; width: 100px;' />";

  var renderProduct = dataObj.products.map(function(product) {
    // return "<img src='" + url + "'" +
    //   "style='border: solid 2px #eee; margin: 5px;'" +
    // " />";
    return "<div class='overlay-product-wrap' style='display: table; border-collapse: collapse; font-family: ars_maquette_promedium, sans-serif; width: 100%;'>" +
      "<div style='display: table-row; width: 100%;'>" +
        "<div class='overlay-product-img' style='vertical-align: middle; display: table-cell; width: 25%;'><img src='" + product.imgUrl + "' style='border solid 3px #ddd;' /></div>" +
        "<div class='overlay-product-name' style='vertical-align: middle; display: table-cell; font-size: 22px;'><a href=''>" + product.name + "</a></div>" +
        "<div class='overlay-product-quantity' style='vertical-align: middle; display: table-cell; font-size: 22px; width: 10%;'>" + product.quantity + "</div>" +
        "<div class='overlay-product-price' style='vertical-align: middle; display: table-cell; font-size: 22px; width: 15%;'>" + product.price + 
        "</div>" +
      "</div>" +
    "</div>";
  });

  var pStyle = "font-size: 1.3em; padding-bottom: 10px;";
  var renderCartData = "<div class='overlay-cart-data' style='clear:both; font-family: ars_maquette_promedium, sans-serif;'>" +
    "<p class='overlay-data' style='" + pStyle + "'>You've reached the end! Would you like to checkout?</p>" +
    "<p class='overlay-data' style='" + pStyle + "'>You have " + dataObj.numItems + " products in your cart.</p>" +
    // "<p class='overlay-data' style='" + pStyle + "'>Total: " + dataObj.cartTotal + "</p>" +
  "</div>";

  var renderClose = "<div class='overlay-close-modal' style='color: #666; float:right; font-family: ars_maquette_promedium, sans-serif; font-size: 18px; font-weight: bold; padding-bottom: 10px; text-align: right;'>" + 
    "<a style='background: #eee; border-radius: 10px; display: inline-block; padding: 5px 8px; text-align: center;'" +
    "class='overlay-close-btn'>X</a>" +
  "</div>";

  var renderCartBtn = "<div>" +
    "<button class='overlay-cart-btn' style='background: #C62632; color: #fff; font-family: ars_maquette_probold,sans-serif; padding: 5px 10px; text-transform: uppercase;'>Go to Cart ></button>" +
  "</div>";

  modal.innerHTML = (
    logo +
    renderClose +
    renderCartData +
    renderProduct +
    renderCartBtn
  );

  document.body.appendChild(modal);
  document.querySelector(".overlay-close-btn").onclick = hideOverlay;
}

function hideOverlay() {
  overlayTriggered = false;
  document.querySelector(".overlay-darken").style.display = "none";
  document.querySelector(".overlay-modal").style.display = "none";
}

function showOverlay() {
  overlayTriggered = true;
  document.querySelector(".overlay-darken").style.display = "inline";
  document.querySelector(".overlay-modal").style.display = "inline";
}

var overlayTriggered = false;
setTrigger();
renderOverlay(document.body.clientHeight);