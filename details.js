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
    //addEquipment(results);
    //addWine(results);
});

function addTitle(res) {
    var title = res.title;
    console.log(title);
    var parent = document.getElementById('recipe');
    var titleChild = document.createElement('h3');
    titleChild.classList.add("recipe-title");
    titleChild.innerHTML = title;
    parent.appendChild(titleChild);
}

function addImage(res) {
    var image = res.image;
    var parent = document.getElementById('recipe');
    var imageChild = document.createElement("IMG");
    imageChild.classList.add("recipe-image");
    imageChild.classList.add("mx-auto");
    imageChild.setAttribute("src", image);
    parent.appendChild(imageChild);
}

function addDescription(res) {
    var desc = res.summary;
    console.log(desc);
    var parent = document.getElementById('recipe');
    var descChild = document.createElement("p");
    descChild.classList.add("recipe-desc");
    descChild.innerHTML = desc;
    parent.appendChild(descChild);
}

function addIngredients(res) {
    var ingredients = res.extendedIngredients;
    console.log(ingredients);
    var parent = document.getElementById('recipe');
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
    var parent = document.getElementById('recipe');
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
    var parent = document.getElementById('recipe');
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
        //el.setAttribute("id", "ingredient");
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
        //event.preventDefault();
        var req = new XMLHttpRequest();
        let item = document.getElementById('ingredient').value;
        var wineDiv = document.getElementById("recipe-wine");
        while (wineDiv.lastChild.id !== 'wine-submit') {
            wineDiv.removeChild(wineDiv.lastChild);
        }
        var wineName = "Pinot Noir";
        var wineImage = "https://www.totalwine.com/dynamic/x490,sq/media/sys_master/twmmedia/he5/h5c/12336190586910.png";
        var header = document.createElement("h6");
        header.innerHTML = wineName;
        var image = document.createElement("IMG");
        image.classList.add("wine-image");
        image.setAttribute("src", wineImage);
        wineDiv.appendChild(header);
        wineDiv.appendChild(image);
        /*req.open("GET", "http://flip1.engr.oregonstate.edu:41574/pairing/" + item + "/", true);
        req.addEventListener('load', function () {
            if (req.status >= 200 && req.status < 400) {
                var response = JSON.parse(req.responseText);
                console.log(req);
                console.log(response);
                var res = response.results;
                var res = JSON.parse(res);
                console.log(res);
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
        req.send(null);*/
        event.preventDefault();
    });
};


/*function addEquipment(res) {
    var equipment = res.analyzedInstructions.equipment;
    console.log(equipment);
    var parent = document.getElementById('recipe');
    var header = document.createElement('h5');
    header.innerHTML = "Equipment";
    var list = document.createElement("li");
    for (i=0; i<equipment.length; i++) {
        var eqpChild = document.createElement('ul');
        var text = equipment[i].name;
        eqpChild.innerHTML = text;
        list.appendChild(eqpChild);
    }
    parent.appendChild(header);
    parent.appendChild(list);
}*/

/*function addWine(res) {
    var wine = res.winePairing.pairedWines;
    console.log(wine);
    if (wine) {
        var parent = document.getElementById('recipe');
        var header = document.createElement("h5");
        header.innerHTML = "Wine Pairings";
        var list = document.createElement("li");
        for (i=0; i < wine.length; i++) {
            var wineChild = document.createElement('ul');
            var text = wine[i];
            wineChild.innerHTML = text;
            list.appendChild(wineChild);
        }
        parent.appendChild(header);
        parent.appendChild(list);
    }
}*/