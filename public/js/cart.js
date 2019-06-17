var cart = $("#cartItems")
var item
//add something to the cart
$("#inventory-view").on("click", ".add-to-cart", function(e) {
    console.log("clicked add to cart");
    e.preventDefault();
    var dataId = $(this).data("id");
    item = {
        SeedId: dataId,
        quantity: 1
    }
    console.log(item);
});


//open the cart modal
$('#cartLink').on('click', function(e) {
    console.log("clicked!")
    e.preventDefault();
    $("#cartModal").modal('show');

    getCart();
});

function getCart() {
    $.get("/api/cart", function(cartItems) {
      console.log("cart", cartItems);
      if (!cartItems || !cartItems.length) {
        console.log("There's nothing in your cart!")
      }
      else {
        displayCart(cartItems)
      }
    });
}

function addToCart(item) {
    $.post("/api/cart", item, function() {
        console.log("new item add to cart");
    });
}