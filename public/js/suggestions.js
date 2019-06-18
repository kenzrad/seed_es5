function getSuggestions(category, id) {
  query = "/api/products/?category=" + category
  $.get(query, function(data) {
    if (!data || !data.length) {
      console.log("No suggestions to display")
    }
    else {
      filterSuggestions(data, category);
    }
  });
}

function filterSuggestions(data, category) {
  var suggestions = [];
  for( i = 0; i < data.length; i++) {
    if(data[i].category === category) {
      suggestions.push(data[i]);
    }
  }
  suggestionVariables(suggestions);
}

function suggestionVariables(products) {
  for (i=0; i < products.length; i++) {
    var product = products[i].name;
    var id = products[i].id;
    var price = products[i].price;
    var onSale = products[i].onSale;
    var salePercent = products[i].salePercent;
    var salePrice = (price - (price * salePercent)).toFixed(2);
    var priceDisplay;
    var overlayIcon = "check"
    var inventory = products[i].inventory;
    var category = products[i].category;
    
    if (products[i].Cart == null ) {
      overlayIcon = "shopping-bag"
    };

    var productDisplay = '<h5 class="suggestion-product card-title m-0">' + product + '</h5>';

    var img = [
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
        '<div class="cart-overlay card-img-overlay d-flex p-0">',
        '<a class="add-to-cart ml-auto btn btn-default btn-xs p-0 m-0" data-id="',
        id,
        '" data-cart="false">',
        '<i class="icons fas fa-',
        overlayIcon,
        ' fa-1x m-0 f p-1"></i>',
        '</a>',
        '</div>'
      ];
      
      if(onSale) {
        priceDisplay = '<h6 class="suggestion-saleprice card-text mx-0 ml-1">$' + salePrice + '</h6>'
      }
      else {
        priceDisplay = '<h6 class="suggestion-price card-text ml-1">$' + price + '</h6>';
      }
      
    }
    else {
      overlay = [];
      priceDisplay ='<h6 class="suggestion-price card-text ml-auto my-1">Out of Stock</h6>';
    }

    createSuggestionCards(img.join(''), overlay.join(''), id, productDisplay, priceDisplay, category);
  }

};

function createSuggestionCards(img, overlay, id, product, price, category) {
  var suggestions = [];
  var cards = [
    '<div data-id="',
      id,
      '" data-category="',
      category,
      '" class="card mt-3 mx-3">',
      '<div class="card-img">',
        img || "img/defaultPlant.jpg",
      '</div>',
      overlay,
      '<div class = "suggestion-text card-body m-0 p-0">',
      product,
      '</div>',
      '<div class = "suggestion-text card-body m-0 p-0">',
        price,
      '</div>',
    '</div>'
  ];
    
  suggestions.push(cards.join(''));
  displaySuggestionCards(suggestions)
  
};

function displaySuggestionCards(suggestions) {
  $("#suggestions-div").append(suggestions);
}
