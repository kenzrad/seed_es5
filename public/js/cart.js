$(document).ready(function() {
    var cart = $("#cartItems")
    var item
    //add something to the cart
    $("#inventory-view").on("click", ".add-to-cart", function(e) {
        e.preventDefault();
        if($(this).data("cart")) {
            console.log("already in cart")
        }
        else {
            $(this).data("cart", "true");
            var dataId = $(this).data("id");
            item = {
                SeedId: dataId,
                quantity: 1
            }
            $(this).empty();
            $(this).append('<i class="icons fas fa-check mx-1 fa-2x my-0 py-0"></i>')
            addToCart(item);
        }
    });


    //open the cart modal
    $('#cartLink').on('click', function(e) {
        console.log("clicked!")
        e.preventDefault();
        getCart();
        

        
    });


    function addToCart(item) {
        $.post("/api/cart", item, function() {
            console.log("new item add to cart");
        });
    }

    function getCart() {
        $.get("/api/cart", function(cartItems) {
        console.log("cart", cartItems);
        if (!cartItems || !cartItems.length) {
            console.log("There's nothing in your cart!")
            $("#emptyCart").modal('show');
        }
        else {
            makeCartTable(cartItems)
            $("#cartModal").modal('show');
        }
        });
    }

    function makeCartTable(items) {
        var rows = [];

        for (i = 0 ; i < items.length; i++) {
            var id = items[i].SeedId;
            var name = items[i].Seed.name;
            var price = items[i].Seed.price;
            var salePercent = items[i].Seed.salePercent
            var onSale = items[i].Seed.onSale;
            var picture = items[i].Seed.plantPicture;
            var quantity = items[i].quantity;

            var row = [
                '<tr>',
                '<th scope="row">',
                    '<img class="img-thumbnail" src="img/',
                    'defaultPlant.jpg',
                    '">',
                '</th>',
                '<td>',
                    name,
                '</td>',
                '<td><i class="reduce icons fas fa-minus-square mr-2"></i>',
                    quantity,
                '  <i class="increase icons fas fa-plus-square ml-2"></i></td>',
                '<td>',
                    price,
                '</td>',
                '</tr>'
            ];

            rows.push(row.join(''));
        };

        displayTable(rows.join(''));

    };

    function displayTable(rows) {
        cart.append(rows);
    }
});