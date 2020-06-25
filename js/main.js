

let hamburger = document.getElementById('hamburger');
let submenu = document.getElementById('submenu');
hamburger.addEventListener('click',cross)


function cross (){
    let hamburger = document.getElementById('hamburger');
let submenu = document.getElementById('submenu');
    
    hamburger.classList.toggle('cross');
    // submenu.style.display = 'flex';
    submenu.classList.toggle('opensubmenu');
    // submenu.classList.remove('opensubmenu');

};

// /shopping cart strat from here
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}


var addcartbuttons = document.getElementsByClassName('btn-success');

// console.log(addcartbuttons);

function ready(){
for(var i = 0; i < addcartbuttons.length ;i++){
 var addcartbutton = addcartbuttons[i];
 addcartbutton.addEventListener('click',addToCart);
 document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
};
var removeCartItemButtons = document.getElementsByClassName('btn-danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart-quantity-input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

}


function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCart(event){
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = shopItem.getElementsByClassName('producttitle')[0].innerText;
  var price = shopItem.getElementsByClassName('productprice')[0].innerText;
  var productImage =shopItem.getElementsByClassName('productimage')[0].src;
  addItemToCart(title,price,productImage)
  updateCartTotal();
};

function addItemToCart(title,price,productImage){
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
     var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${productImage}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;

}

// function myFunction(x) {
// let submenu = document.getElementById('submenu');

//     if (x.matches) { // If media query matches
//     //   submenu.style.display = 'none';
//     submenu.classList.add('mediamenu')
//     } else {
//         // submenu.style.display = 'block';
      
//     }
//   }
  
//   var x = window.matchMedia("(max-width: 980px)")
//   myFunction(x) // Call listener function at run time
//   x.addListener(myFunction) // Attach listener function on state changes 