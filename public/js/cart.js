var cart = $("#cartItems")

$('#cartLink').on('click', function(e) {
    console.log("clicked!")
    e.preventDefault();
    $("#cartModal").modal('show');

    generateCart();
});

