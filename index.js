function getCartData() {
  var numItems = document.querySelector(".minicart-quantity").innerText;
  var cartTotal = document.querySelector(".order-value").innerText;
  var itemImages = document.getElementsByClassName("mini-cart-image");
  var imageUrls = new Array;

  for(i = 0; i < itemImages.length; i++) {
    imageUrls.push(itemImages.item(i).querySelector("img").src);
  }
  
  // console.log("Number of items: ", numItems);
  // console.log("Cart total: ", cartTotal);
  // console.log("Item images: ", itemImages);
  // console.log("Image Url: ", imageUrls);
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

    if(scrollTrigger < scrollY && overlayTriggered === false) {
      showOverlay(document.body.clientHeight);
    }
  })

  function showOverlay(clientHeight) {
    console.log("The 10%");
    overlayTriggered = true;

    var overlayWrap = document.createElement("div");
    var overlayStyle = overlayWrap.style;
    
    overlayWrap.className = "overlay-wrap";
    overlayStyle.background = "#000";
    overlayStyle.height = clientHeight + "px";
    overlayStyle.left = "0";
    overlayStyle.opacity = "0.6";
    overlayStyle.position = "absolute";
    overlayStyle.top = "0";
    overlayStyle.width = "100vw";
    overlayStyle.zIndex = "100";

    overlayWrap.innerText = "HELLO WORLD!";

    document.body.appendChild(overlayWrap);

    var modal = document.createElement("div");
    var modalStyle = modal.style;
    var modalHeight = 400;
    var modalWidth = 400;
    
    modal.className = "overlay-modal";
    modalStyle.background = "#fff";
    modalStyle.height = modalHeight + "px";
    modalStyle.left = "50%";
    modalStyle.position = "fixed";
    modalStyle.top = "50%";
    modalStyle.width = modalWidth + "px";
    modalStyle.zIndex = "101";
    modalStyle.marginTop = "-" + (modalHeight / 2) + "px";
    modalStyle.marginLeft = "-" + (modalWidth / 2) + "px";

    modal.innerText = "THIS IS THE MODAL";

    document.body.appendChild(modal);
  }

}

var overlayTriggered = false;
getCartData();
setTrigger();