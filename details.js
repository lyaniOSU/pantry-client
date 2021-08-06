window.addEventListener('load', (event) => {
    var res = sessionStorage.getItem('recipeDetails');
    console.log(res);
    var results = JSON.parse(res);
    addTitle(results);
    addImage(results);
    addDescription(results);
    addFacts(results);
    addIngredients(results);
    addWineSelection();
});

function getParent(id) {
    var parent = document.getElementById(id);
    return parent;
}

function addTitle(res) {
    var title = res.title;
    console.log(title);
    var parent = getParent('recipe');
    var titleChild = document.createElement('h3');
    titleChild.classList.add("recipe-title");
    titleChild.innerHTML = title;
    parent.appendChild(titleChild);
}

function addImage(res) {
    var image = res.image;
    var parent = getParent('recipe');
    var imageChild = document.createElement("IMG");
    imageChild.classList.add("recipe-image");
    imageChild.classList.add("mx-auto");
    imageChild.setAttribute("src", image);
    parent.appendChild(imageChild);
}

function addDescription(res) {
    var desc = res.summary;
    console.log(desc);
    var parent = getParent('recipe');
    var descChild = document.createElement("p");
    descChild.classList.add("recipe-desc");
    descChild.innerHTML = desc;
    parent.appendChild(descChild);
}

function addIngredients(res) {
    var ingredients = res.extendedIngredients;
    var parent = getParent('recipe');
    var container = document.createElement('div');
    container.classList.add("recipe-ingredients");
    var header = document.createElement('h5');
    header.innerHTML = "Ingredients";
    var list = document.createElement("li");
    for (i = 0; i < ingredients.length; i++) {
        var ingChild = document.createElement('ul');
        var text = ingredients[i].name + ": " + ingredients[i].amount + " " + ingredients[i].unit;
        ingChild.innerHTML = text;
        list.appendChild(ingChild);
    }
    container.appendChild(header);
    container.appendChild(list);
    parent.appendChild(container);
}

function addFacts(res) {
    var parent = getParent('recipe');
    var container = document.createElement("div");
    container.classList.add("recipe-facts");
    var header = document.createElement('h5');
    header.innerHTML = "Recipe Facts";
    var scoreHealth = res.healthScore;
    var scoreTotal = res.spoonacularScore;
    var likes = res.aggregateLikes;
    var scoreTitle = document.createElement("p");
    scoreTitle.innerHTML = "Total Score: " + scoreTotal + " | Health Score: " + scoreHealth;
    var likesTitle = document.createElement("p");
    likesTitle.innerHTML = "Likes: " + likes;

    container.appendChild(header);
    container.appendChild(scoreTitle);
    container.appendChild(likesTitle);
    parent.appendChild(container);
}

function addWineSelection() {
    var parent = getParent('recipe');
    var container = document.createElement('div');
    var header = document.createElement("h5");
    header.innerHTML = "Wine Pairing";
    container.classList.add("recipe-wine");
    container.setAttribute("id", "recipe-wine");
    var options = ["pork", "steak", "fish", "chicken", "shellfish", "turkey", "dessert"]
    var wineForm = document.createElement('form');
    wineForm.setAttribute("id", "wine-submit");
    var selector = document.createElement('select');
    selector.setAttribute("id", "ingredient");
    for (i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selector.appendChild(el);
    }
    var wineSubmit = document.createElement('INPUT');
    wineSubmit.setAttribute("type", "submit");
    wineSubmit.setAttribute("id", "wineSubmit");

    wineForm.appendChild(selector);
    wineForm.appendChild(wineSubmit);
    container.appendChild(header);
    container.appendChild(wineForm);
    parent.appendChild(container);
    wineListener();
}

function wineListener() {
    document.getElementById("wineSubmit").addEventListener('click', function (event) {
        event.preventDefault();
        var req = new XMLHttpRequest();
        let item = document.getElementById('ingredient').value;
        var wineDiv = getParent("recipe-wine");
        while (wineDiv.lastChild.id !== 'wine-submit') {
            wineDiv.removeChild(wineDiv.lastChild);
        }
        req.open("GET", "http://flip1.engr.oregonstate.edu:41574/pairing/" + item + "/", true);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                var res = JSON.parse(response.results);
                var wineDiv = document.getElementById("recipe-wine");
                while (wineDiv.lastChild.id !== 'wine-submit'){
                    wineDiv.removeChild(wineDiv.lastChild);
                }
                var wineName = res[0].wineName;
                var wineImage = res[0].wineImage;
                var header = document.createElement("h6");
                header.innerHTML = wineName;
                var image = document.createElement("IMG");
                image.classList.add("wine-image");
                image.setAttribute("src", wineImage);
                wineDiv.appendChild(header);
                wineDiv.appendChild(image);
            }
        });
        req.send(null);
        event.preventDefault();
    });
};