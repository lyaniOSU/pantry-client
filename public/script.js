document.getElementById('recipe-submit').addEventListener('click', function (event) {
  event.preventDefault();
  var req = new XMLHttpRequest();
  let item = document.getElementById('recipe-query').value;
  let cuisine = document.getElementById('recipe-cuisine').value;
  let diet = document.getElementById('recipe-diet').value;
  let number = document.getElementById('recipe-number').value;
  req.open("GET", "http://127.0.0.1:5000/search?item=" +item + "&cuisine=" + cuisine + "&diet=" + diet + "&number=" + number, true);
  req.addEventListener('load', function() {
    if (req.status >= 200 && req.status < 400) {
      var response = JSON.parse(req.responseText);
      console.log("Successful")
      console.log(req);
      console.log(response);
      //console.log(response.results[0])
      var res = response;
      console.log(res);
      createRecipe(res);
      //document.getElementById('recipe-result').textContent = response.results[0].title;
    } else {
      document.getElementById('recipe-result').textContent = "Error";
      console.log("Not Successful");
    }
  });
  req.send(null);
  /*res = [{
    "id": 864592,
    "title": "Black Bean Mushroom Burgers with Chipotle Mayo",
    "readyInMinutes": 25,
    "servings": 6,
    "sourceUrl": "http://littlespicejar.com/black-bean-mushroom-burgers-with-chipotle-mayo/",
    "openLicense": 0,
    "image": "black-bean-mushroom-burgers-with-chipotle-mayo-864592.jpg"
  }, {
    "id": 1093080,
    "title": "5-a-day burger",
    "readyInMinutes": 75,
    "servings": 2,
    "sourceUrl": "https://www.bbcgoodfood.com/recipes/5-day-burger",
    "openLicense": 0,
    "image": "5-a-day-burger-1093080.jpg"
  }, {
    "id": 1133479,
    "title": "Lentil Burger Recipe",
    "readyInMinutes": 40,
    "servings": 8,
    "sourceUrl": "https://www.foodfanatic.com/recipes/lentil-burger-recipe/",
    "openLicense": 0,
    "image": "lentil-burger-recipe-1133479.jpg"
  }, {
    "id": 1114276,
    "title": "Roasted Garlic Black Bean Quinoa Burger",
    "readyInMinutes": 50,
    "servings": 6,
    "sourceUrl": "https://fitfoodiefinds.com/roasted-garlic-black-bean-quinoa-burger/",
    "openLicense": 0,
    "image": "roasted-garlic-black-bean-quinoa-burger-1114276.jpg"
  }, {
    "id": 636595,
    "title": "Butternut Squash Quinoa Burgers",
    "readyInMinutes": 45,
    "servings": 4,
    "sourceUrl": "https://www.foodista.com/recipe/WTTVRVNH/butternut-squash-quinoa-burgers",
    "openLicense": 2,
    "image": "Butternut-Squash-Quinoa-Burgers-636595.jpg"
  }, {
    "id": 664929,
    "title": "Walnut Lentil Burgers with Tarragon",
    "readyInMinutes": 45,
    "servings": 12,
    "sourceUrl": "https://www.foodista.com/recipe/JGTMTSR6/walnut-lentil-burgers-with-tarragon",
    "openLicense": 2,
    "image": "Walnut-Lentil-Burgers-with-Tarragon-664929.png"
  }, {
    "id": 1076227,
    "title": "Sweet Potato Burgers with Chipotle Cream Cheese Spread",
    "readyInMinutes": 40,
    "servings": 5,
    "sourceUrl": "https://www.greensnchocolate.com/2019/02/sweet-potato-burgers-with-chipotle-cream-cheese-spread/",
    "openLicense": 0,
    "image": "sweet-potato-burgers-with-chipotle-cream-cheese-spread-1076227.jpg"
  }, {
    "id": 1091250,
    "title": "Miso burgers with mint & pomegranate slaw",
    "readyInMinutes": 40,
    "servings": 4,
    "sourceUrl": "https://www.bbcgoodfood.com/recipes/miso-burgers-mint-pomegranate-slaw",
    "openLicense": 0,
    "image": "miso-burgers-with-mint-pomegranate-slaw-1091250.jpg"
  }, {
    "id": 1111691,
    "title": "Baked Falafel Burgers",
    "readyInMinutes": 40,
    "servings": 4,
    "sourceUrl": "https://www.diannesvegankitchen.com/baked-vegan-falafel-burgers/",
    "openLicense": 0,
    "image": "baked-falafel-burgers-1111691.jpg"
  }, {
    "id": 1113207,
    "title": "Vegan Sweet Potato Burgers",
    "readyInMinutes": 35,
    "servings": 4,
    "sourceUrl": "https://www.ambitiouskitchen.com/vegan-sweet-potato-burgers/",
    "openLicense": 0,
    "image": "vegan-sweet-potato-burgers-1113207.jpg"
  }]
  createRecipe(res);
  linkListen(res);*/
  //event.preventDefault();
});

function createRecipe(response) {
  var results = document.getElementById('recipe-result');
  while (results.firstChild) {
    results.removeChild(results.firstChild);
  }
  console.log(response);
  for (let count = 0; count < response.length; count++) {
    var container = document.createElement("div");
    container.classList.add("recipe-container");

    var id = response[count].id;
    console.log(id);

    var title = response[count].title;
    var name = document.createElement("h3")
    name.classList.add("recipe-title");
    name.innerHTML = title;

    var link = document.createElement('a');
    link.classList.add("recipe-link")
    link.innerHTML = title;
    link.href = "../public/details.html"
    link.setAttribute("id", id);

    //var image = "https://spoonacular.com/recipeImages/" + response[count].image;
    var image = response[count].image;
    var img = document.createElement("IMG");
    img.classList.add("recipe-image");
    img.setAttribute("src", image);

    container.append(link);
    container.append(img);

    results.append(container);
  }
}

function linkListen(response) {
  links = document.querySelectorAll('.recipe-link');
  console.log(links);
  links.forEach((link) => {
    link.addEventListener('click', function(event) {
      let id = this.id;
      var req = new XMLHttpRequest();
      //req.open('GET', "http://127.0.0.1:5000/details?id=" + id, true);
      /*req.addEventListener('load', function() {
        if (req.status >= 200 && req.status < 400) {
          console.log(req);
          var response = JSON.parse(req.responseText);
          console.log("Successful")
          console.log(response);
          console.log(response[0])
          var res = response[0];
          console.log(res);
          //renderDetails(res);
        } else {
          document.getElementById('recipe-result').textContent = "Error";
          console.log("Not Successful");
        }
      });*/
      //req.send(null);
      //event.preventDefault();
      req.open('GET', "http://127.0.0.1:5000/details?id=" + id, true);
      req.addEventListener('load', function() {
        event.preventDefault();
        if (req.status >= 200 && req.status < 400) {
          var res = JSON.parse(req.responseText);
          console.log(res);
          sessionStorage.setItem('recipeDetails', JSON.stringify(res));
        }
      });
      req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
          window.location = '../public/details.html';
        }
      }
      req.send();
    }, false);
  });
}
