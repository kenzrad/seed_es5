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
  viewSuggestions(suggestions);
}

function viewSuggestions(suggestions) {
  console.log(suggestions);
}