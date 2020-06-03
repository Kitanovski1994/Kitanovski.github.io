// write your code here
// use one of the following urls to get the products
// https://json-project3.herokuapp.com/products
// https://bikes-app.herokuapp.com/products // if you use this one you don't need img folder :)
// Method to get element
const getElement = selector => {
    return document.querySelector(selector);
}

let cardContainer = getElement('.card-container');
let leGrand = getElement('#leGrand');
let showAll = getElement('#showAll');
let male = getElement('#male');
let female = getElement('#female');
// array
let allCards = [];
let maleArr = [];
let femaleArr = [];
let leGrandArr = [];
let krossArr = [];
let expolorerArr = [];
let visitorArr = [];
let ponyArr = [];
let forceArr = [];
let eBikesArr = [];
let idealArr = [];
let brendArray = [];
// Geting the filters elements to set value in the span tag 
let showAllspan = getElement('#showAllspan');
let maleValue = getElement('.maleValue');
let femaleValue = getElement('.femaleValue');
let leGrandValue = getElement('.leGrandValue');
let krossValue = getElement('.krossValue');
let explorerValue = getElement('.explorerValue');
let visitorValue = getElement('.visitorValue');
let ponyValue = getElement('.ponyValue');
let forceValue = getElement('.forceValue');
let eBikesValue = getElement('.eBikesValue');
let idealValue = getElement('.idealValue');

// geting all gender btn
let genderBtn = document.querySelectorAll('.gender p');
console.log(genderBtn);
// geting all brend btn
let brendBtn = document.querySelectorAll('.brand p');


// Geting the JSON 
let dataRequest = new XMLHttpRequest();
dataRequest.open('GET', 'https://bikes-app.herokuapp.com/products');
dataRequest.onload = function () {

    if (dataRequest.status >= 200 && dataRequest.status < 400) {
        dataRequest = JSON.parse(dataRequest.responseText);
        // console.log(dataRequest);
        createCard(dataRequest);
        maleArr = filterGenderCards("MALE");
        console.log('maleArray', maleArr);
        femaleArr = filterGenderCards("FEMALE");
        leGrandArr = filterBrandCards('LE GRAND BIKES');
        krossArr = filterBrandCards('KROSS');
        expolorerArr = filterBrandCards('EXPLORER');
        visitorArr = filterBrandCards('VISITOR');
        ponyArr = filterBrandCards('PONY');
        forceArr = filterBrandCards('FORCE');
        eBikesArr = filterBrandCards('E-BIKES');
        idealArr = filterBrandCards('IDEAL');

        // setting new brend array
        let newBrendArray = [];
        for (let j = 0; j < dataRequest.length; j++) {
            newBrendArray.push(dataRequest[j].brand);
        }

        //removing the duplicates in the brend array
        newBrendArray = removeDups(newBrendArray);


        // added event 
        showAll.addEventListener('click', function () {
            createCard(allCards);
            setActive(showAll);
        })

        male.addEventListener('click', function () {
            appendCard(maleArr);
            setActive(male);
        });

        female.addEventListener('click', function () {
            appendCard(femaleArr);
            setActive(female);
        });


        //dynamically setting the data-brend in the filter buttons
        for (let o = 0; o < brendBtn.length; o++) {
            brendBtn[o].setAttribute('data-brand', newBrendArray[o]);
        }

        // added click evenet on the fillter buttons
        brendBtn.forEach(element => element.addEventListener('click', function (e) {
            e.preventDefault();
            renderCards(this.getAttribute('data-brand'));
            setActive(this);
        }));
        setFilterValue();
    } else {
        console.log("Error connect to the server");
    }
}

// Show error
dataRequest.onerror = function () {
    console.log("Connection Error");
}

// Sending the data
dataRequest.send();


// seting the filter value lenght in the FE value
function setFilterValue() {
    maleValue.innerHTML = maleArr.length;
    femaleValue.innerHTML = femaleArr.length;
    leGrandValue.innerHTML = leGrandArr.length;
    krossValue.innerHTML = krossArr.length;
    explorerValue.innerHTML = expolorerArr.length;
    visitorValue.innerHTML = visitorArr.length;
    ponyValue.innerHTML = ponyArr.length;
    forceValue.innerHTML = forceArr.length;
    eBikesValue.innerHTML = eBikesArr.length;
    idealValue.innerHTML = idealArr.length;

}

// Create all card 
function createCard(data) {
    allCards = [];
    showAllspan.innerHTML = data.length;
    for (let i = 0; i < data.length; i++) {
        // console.log(allCards);
        allCards.push(data[i]);
    }
    // console.log("data", data);
    // console.log("all", allCards);

    appendCard(allCards);
}

// function for filter gender cards 
function filterGenderCards(str) {
    let filterCards = [];
    // console.log("filter cards");
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].gender === str) {
            filterCards.push(allCards[i]);
        }
    }
    // console.log("ALL CARDS: ", allCards);
    // console.log("MALE CARDS: ", maleCards);
    return filterCards;
}

// function for brand cards 
function filterBrandCards(str) {
    let filterBrandCardsArr = [];
    for (let i = 0; i < allCards.length; i++) {
        if (allCards[i].brand === str) {
            filterBrandCardsArr.push(allCards[i]);
        }
    }
    return filterBrandCardsArr;
}

// Create gender cards
function appendCard(data) {
    cardContainer.innerHTML = '';
    // console.log("APPEND FUNCTION", data.length);
    for (let i = 0; i < data.length; i++) {
        cardContainer.innerHTML += `<div class="col-md-4 col-sm-4 card" data-gender="${data[i].gender}" data-brand="${data[i].brand}">
                                <div class="thumbnail">
                                    <img src="${data[i].image}" alt="..." class="img-card">
                                <div class="caption">
                                    <h1 class="card-heading">${data[i].name}</h1>
                                    <p>${data[i].price} $</p>
                                </div>
                                </div>
                                </div>`

    }
}

// fuction set class active on clicked element 
function setActive(element) {
    let
        elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
        el.classList.remove("active");
    });
    element.classList.add('active');
}


// Function for filters 
function renderCards(paramOne) {
    paramOne = filterBrandCards(paramOne);
    appendCard(paramOne);
}

// function to remove duplicates in given array
function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
        if (!unique[i]) {
            unique[i] = true;
        }
    });
    return Object.keys(unique);
}