function getCartData() {
  var numItems = document.querySelector(".minicart-quantity").innerText;
  var cartTotal = document.querySelector(".order-value").innerText;
  var itemImages = document.getElementsByClassName("mini-cart-image");
  var imageUrls = new Array;
  
  for(i = 0; i < itemImages.length; i++) {
    imageUrls.push(itemImages.item(i).querySelector("img").src);
  }
  
  var dataObj = {
    numItems: numItems,
    cartTotal: cartTotal,
    itemImages: itemImages,
    imageUrls: imageUrls
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

  var overlayWrap = document.createElement("div");
  var overlayStyle = overlayWrap.style;
  
  overlayWrap.className = "overlay-wrap";
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

  var renderImages = dataObj.imageUrls.map(function(url) {
    return "<img src='" + url + "'" +
      "style='border: solid 2px #eee; margin: 5px;'" +
    " />";
  })

  var pStyle = "font-size: 1.3em; padding-bottom: 10px;";
  var renderCartData = "<div class='overlay-cart-data' style=''>" +
    "<p class='overlay-data' style='" + pStyle + "'>You've reached the end! Would you like to checkout?</p>" +
    "<p class='overlay-data' style='" + pStyle + "'>You have " + dataObj.numItems + " products in your cart.</p>" +
    "<p class='overlay-data' style='" + pStyle + "'>Total: " + dataObj.cartTotal + "</p>" +
  "</div>";

  var renderClose = "<div class='overlay-close-modal' style='color: #666; font-size: 18px; font-weight: bold; padding-bottom: 10px; text-align: right;'>" + 
    "<a style='background: #eee; border-radius: 10px; display: inline-block; padding: 5px 8px; text-align: center;'" +
    "class='overlay-close-btn'>X</a>" +
  "</div>";

  var renderCartBtn = "<div>" +
    "<button class='overlay-cart-btn' style='background: red; color: #fff; padding: 5px 10px; text-transform: uppercase;'>Go to Cart</button>" +
  "</div>";

  modal.innerHTML = (
    renderClose +
    renderCartData +
    renderImages +
    renderCartBtn
  );

  document.body.appendChild(modal);
  document.querySelector(".overlay-close-btn").onclick = hideOverlay;
}

function hideOverlay() {
  overlayTriggered = false;
  document.querySelector(".overlay-wrap").style.display = "none";
  document.querySelector(".overlay-modal").style.display = "none";
}

function showOverlay() {
  overlayTriggered = true;
  document.querySelector(".overlay-wrap").style.display = "inline";
  document.querySelector(".overlay-modal").style.display = "inline";
}

var overlayTriggered = false;
setTrigger();
renderOverlay(document.body.clientHeight);