document.getElementById('recipe-submit').addEventListener('click', function (event) {
  event.preventDefault();
  var req = new XMLHttpRequest();
  //Get values from form
  let item = document.getElementById('recipe-query').value;
  let cuisine = document.getElementById('recipe-cuisine').value;
  let diet = document.getElementById('recipe-diet').value;
  let number = document.getElementById('recipe-number').value;
  req.open("GET", "https://pantry-recipes-server.herokuapp.com/search?item=" +
    item + "&cuisine=" + cuisine + "&diet=" + diet + "&number=" + number, true);
  req.addEventListener('load', function () {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      if (response.code === 400) {
        //Render error message
        document.getElementById('recipe-result').textContent = "No results found. Please try another search.";
      } else {
        //Render results onto page
        createRecipe(response);
        linkListen(response);
      }
    } else {
      //Render error message
      document.getElementById('recipe-result').textContent = "No results found. Please try another search.";
    }
  });
  req.send(null);
});

document.getElementById('recipe-random').addEventListener('click', function (event) {
  event.preventDefault();
  var req = new XMLHttpRequest();
  let number = document.getElementById('recipe-number').value;
  req.open("GET", "https://pantry-recipes-server.herokuapp.com/randomize?number=" + number, true);
  req.addEventListener('load', function () {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      //Render results onto page
      createRecipe(response);
      linkListen(response);
    } else {
      //Render error message
      document.getElementById('recipe-result').textContent = "No results found. Please try another search.";
    }
  });
  req.send(null);
});

//Get recipe title
function recipeTitle(response, count) {
  var title = response[count].title;
  var name = document.createElement("h3")
  name.classList.add("recipe-title");
  name.innerHTML = title;
  return title;
}

//Add link for more details to title
function recipeLink(response, count, title) {
  var id = response[count].id;
  var link = document.createElement('a');
  link.classList.add("recipe-link")
  link.innerHTML = title;
  link.href = "./details.html"
  link.setAttribute("id", id);
  link.setAttribute("name", count);
  return link;
}

//Add recipe image to page
function recipeImage(response, count) {
  var image = response[count].image;
  var img = document.createElement("IMG");
  img.classList.add("recipe-image");
  img.setAttribute("src", image);
  return img;
}

//Create container for each recipe
function recipeContainer(response, count, link, img) {
  var container = document.createElement("div");
  container.classList.add("recipe-container");
  var breaker = document.createElement("br");
  container.append(link);
  container.append(breaker);
  container.append(img);
  return container;
}

//Render all recipes returned as individual containers
function createRecipe(response) {
  var results = document.getElementById('recipe-result');
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
  for (let count = 0; count < response.length; count++) {
    var title = recipeTitle(response, count);
    var link = recipeLink(response, count, title);
    var img = recipeImage(response, count);
    var container = recipeContainer(response, count, link, img);

    results.append(container);
  }
}

//Add event listener to redirect to details page
function linkListen(response) {
  links = document.querySelectorAll('.recipe-link');
  console.log(links);
  links.forEach((link) => {
    link.addEventListener('click', function (event) {
      let id = this.id;
      let name = this.name;
      recipe = response[name];
      sessionStorage.setItem('recipeDetails', JSON.stringify(recipe));
      window.location = './details.html';
    }, false);
  });
}
