function getSuggestions(category, id) {
  console.log(category);
  $.get("/api/products/?category=" + category, function(data) {
    if (!data || !data.length) {
      console.log("No suggestions to display")
    }
    else {
      console.log(data);
    }
  });
}
