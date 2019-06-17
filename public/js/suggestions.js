$(document).ready(function() {
    function getSuggestions(category, id) {
        category = "/?category=" + category;
        id = "/?id=" + id;
        $.get("/api/cart/" + category + id, function(data) {
          console.log(":cateogory/:id", data);
          if (!data || !data.length) {
            console.log("No suggestions to display")
          }
          else {
            console.log(data);
          }
        });
    }
});