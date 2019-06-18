getAllProducts();

var cardDiv = $("#inventory-view");
var cards = [];

function getAllProducts() {
  $.get("/api/products", function(data) {
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
    var category = products[i].category;
    var overlayIcon = "check"
    var seedImage = products[i].seedPicture;
    var plantImage = products[i].plantPicture;

    if (products[i].Cart == null ) {
      overlayIcon = "shopping-bag"
    };

    var productDisplay = '<h5 class="product card-title mr-auto my-2">' + product + '</h5>';

    var imgOne = [
      '<img ',
      'class = "d-block w-100"',
      'src = "img/',
      seedImage,
      '"',
      'alt = "',
      name,
      '-img1">'
    ];

    var imgTwo = [
      '<img ',
      'class = "d-block w-100"',
      'src = "img/',
      plantImage,
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
          '<i class="icons fas fa-',
          overlayIcon,
          ' mx-1 fa-2x my-0 py-0"></i>',
          '</a>',
        '</div>'
      ];
        
      if(onSale) {
        priceDisplay = '<h6 class="saleprice card-text ml-auto mx-0 my-2">$' + salePrice + '</h6> <h6 class="onsale card-text ml-1 mx-0 my-2">$' + price + '</h6>';
      }
      else {
        priceDisplay = '<h6 class="price card-text ml-auto my-2">$' + price + '</h6>';
      }
        
    }
    else {
      overlay = [];
      priceDisplay ='<h6 class="price card-text ml-auto my-2">Out of Stock</h6>';
    }
    var cardTemplate = [
      '<div data-id="',
        id,
        '" data-category="',
        category,
        '" class="card my-5">',
        '<div class="card-img-top carousel slide" data-ride="carousel">',
          '<div class="carousel-inner">',
            '<div class="carousel-item active">',
            imgOne.join('') || "img/defaultSeed.jpg",
            '</div>',
            '<div class="carousel-item">',
            imgTwo.join('') || "img/defaultPlant.jpg",
            '</div>',
          '</div>',
        '</div>',
          overlay.join(''),
        '<div class = "card-body d-flex py-0 px-3">',
          productDisplay,
          priceDisplay,
        '</div>',
      '</div>'
    ];
    cards.push(cardTemplate.join(''));
  }
  displayProductCards(cards.join(''));
};

function displayProductCards(cards) {
  cardDiv.append(cards);
}

