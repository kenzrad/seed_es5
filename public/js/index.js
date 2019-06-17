$(document).ready(function() {
  var cardDiv = $("#inventory-view");
  var cards = [];

  getAllProducts();
  function getAllProducts() {
    $.get("/api/products", function(data) {
      console.log("products", data);
      products = data;
      if (!products || !products.length) {
        console.log("Product display error")
      }
      else {
        createCardVariables(products)
      }
    });
  }

  function createCardVariables(products) {
    for (i=0; i < products.length; i++) {
      var product = products[i].name;
      var id = products[i].id;
      var price = products[i].price;
      var onSale = products[i].onSale;
      var salePercent = products[i].salePercent;
      var salePrice = (price - (price * salePercent)).toFixed(2);
      var priceDisplay;
      var inventory = products[i].inventory;
      var overlay;

      var productDisplay = '<h5 class="product card-title mr-auto my-2">' + product + '</h5>';

      var imgOne = [
        '<img ',
        'class = "d-block w-100"',
        'src = "img/',
        'defaultSeed.jpg',
        '"',
        'alt = "',
        name,
        '-img1">'
      ];

      var imgTwo = [
        '<img ',
        'class = "d-block w-100"',
        'src = "img/',
        'defaultPlant.jpg',
        '"',
        'alt = "',
        name,
        '-img2">'
      ];

      if(inventory != 0) {
        overlay = [
          '<div class="cart-overlay card-img-overlay d-flex">',
          '<a class="add-to-cart ml-auto btn btn-default btn-xs p-0 my-1" data-id="',
            id,
            '" data-cart="false">',
            '<i class="icons fas fa-shopping-bag mx-1 fa-2x my-0 py-0"></i>',
          '</a>',
          '</div>'
        ];

        overlay.join('')

        if(onSale) {
          priceDisplay = '<h6 class="saleprice card-text ml-auto mx-0 my-2">$' + salePrice + '</h6> <h6 class="onsale card-text ml-1 mx-0 my-2">$' + price + '</h6>';
        }
        else {
          priceDisplay = '<h6 class="price card-text ml-auto my-2">$' + price + '</h6>';
        }
        
      }
      else {
        overlay = '';
        priceDisplay ='<h6 class="price card-text ml-auto my-2">Out of Stock</h6>';
      }

      createCard(imgOne.join(''), imgTwo.join(''), overlay, id, productDisplay, priceDisplay);
    }
      
    displayProductCards(cards.join(''));

  };
  
  function createCard(imgOne, imgTwo, overlay, id, product, price) {
    var cardTemplate = [
      '<div id="card-',
        id,
        '" class="card my-5">',
        '<div class="card-img-top carousel slide" data-ride="carousel">',
          '<div class="carousel-inner">',
            '<div class="carousel-item active">',
              imgOne || "img/defaultSeed.jpg",
            '</div>',
            '<div class="carousel-item">',
              imgTwo || "img/defaultPlant.jpg",
            '</div>',
          '</div>',
        '</div>',
          overlay,
        '<div class = "card-body d-flex py-0 px-3">',
          product,
          price,
        '</div>',
      '</div>'
    ];
      
    cards.push(cardTemplate.join(''));
    
  };

  function displayProductCards(cards) {
    cardDiv.append(cards);
  }

});

