//add something to the cart
$("#inventory-view").on("click", ".add-to-cart", function(e) {
    e.preventDefault();
    if($(this).data("cart")) {
        console.log("already in cart")
    }
    else {
        $(this).data("cart", "true");
        var dataId = $(this).data("id");
        var item = {
            SeedId: dataId,
            quantity: 1
        }
        $(this).empty();
        $(this).append('<i class="icons fas fa-check mx-1 fa-2x my-0 py-0"></i>')
        addToCart(item);
    }
});

//API call to post to cart
function addToCart(item) {
    $.post("/api/cart", item, function() {
        console.log("new item add to cart");
    });
}

//open the cart modal
$('#cartLink').on('click', function(e) {
    e.preventDefault();
    getCart();  
});







function getCart() {
    $("#cartItems").empty();
    $.get("/api/cart", function(cartItems) {
    if (!cartItems || !cartItems.length) {
        $("#cartModal").modal('hide');
        $("#emptyCart").modal('show');
    }
    else {
        makeCartTable(cartItems)
        $("#emptyCart").modal('hide');
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
        var category = items[i].Seed.category;
        var inventory = items[i].Seed.inventory;
        
        console.log(category);
        var row = [
            '<tr class="text-center" data-id="',
            id,
            '">',
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
            '<td><i class="deleteBtn icons fas fa-trash mr-2"></i></td>',
            '</tr>'
        ];

    rows.push(row.join(''));
    };

    $("#cartItems").append(rows.join(''));
    getSuggestions(category, id);

};


//delete item from carts
$('table').on('click', '.deleteBtn', function(e) {
    e.preventDefault();
    var id = $(this).parent("td").parent("tr").data("id");
    removeFromCart(id);
});

//API call to remove items from carts
function removeFromCart(id) {
    $.ajax({
        method: "DELETE",
        url: "/api/cart/" + id
    })
    .then(function() {
        getCart(); 
    });
};