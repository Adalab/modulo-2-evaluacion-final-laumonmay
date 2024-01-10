'use strict';

console.log('>> Ready :)');

// QUERY-SELECTOR

const listCharactersCards = document.querySelector('.js_listCharactersCards');

const listFavorites = document.querySelector('.js_listFavorites');
const form = document.querySelector('.js_form');
const inputSearch = document.querySelector('.js_inputSearch');
const buttonSearch = document.querySelector('.js_buttonSearch');


// VARIABLES GLOBALES


let charactersData = [];  // variable de personajes con array vacio
let favoritesData = [];  // variable de favoritos con array vacio

// FUNCIONES

function renderOne(charactersData) {
    // para pintar un personaje

    const favoritesIdEqual = favoritesData.findIndex(  oneCharacter => oneCharacter._id === charactersData._id );
    
    if(favoritesIdEqual === -1) {
        listCharactersCards.innerHTML += `
          <li class="js_liCharacters" data-id="${charactersData._id}"> 
              <h3>${charactersData.name}</h3>
              <img src="${charactersData.imageUrl}" alt="Imagen de un personaje Disney">
          </li>
      `;
    }
    else {
        listCharactersCards.innerHTML += `
            <li class="js_liCharacters characters__favorites--selected" data-id="${charactersData._id}"> 
                <h3>${charactersData.name}</h3>
                <img src="${charactersData.imageUrl}" alt="Imagen de un personaje Disney">
            </li>
        `;
    }
  

}
function renderAll() {
  // para pintar todos los personajes
  listCharactersCards.innerHTML = "";
  // HAGO UN BUCLE
  for (let i = 0; i < charactersData.length; i++) {
    //código que queremos que se repita
    renderOne(charactersData[i]); //utilizo la i para que se ejecute renderOne tantas veces como elementos haya en la variable charactersData
  }

  const liCharacters = document.querySelectorAll(".js_liCharacters"); // selecciono todos los li una vez se cargan en la página, no antes.Esta variable solo puede estar dentro de esta funcion o dentro de fetch, porque fuera aun no se habria cargado los elementos.

  for (const liCharacter of liCharacters) {
    // bucle para repetir el addeventlistener por cada elemento
    liCharacter.addEventListener("click", handleClickCharacter); // invoco funcion manejeadora cada vez que se hace click
  }
}

function renderOneFavorite(favoritesData){
    listFavorites.innerHTML += `
        <li class="js_liCharacters"> 
            <h3>${favoritesData.name}</h3>
            <img src="${favoritesData.imageUrl}" alt="Imagen de un personaje Disney">
        </li>
    `;
}

function renderFavorites (){
    listFavorites.innerHTML = "";

    for( let i=0; i<favoritesData.length; i++ ) {
      renderOneFavorite(favoritesData[i]);
    };
}


// FUNCIONES MANEJADORAS
    function handleClickCharacter (event) {   //declaro la funcion manejadora
    
        const clickCharacter = event.currentTarget;

        clickCharacter.classList.toggle('characters__favorites--selected');

        const clickCharacterId = parseInt(clickCharacter.dataset.id); // atributo gancho

        console.log(clickCharacterId);

        // Busca en la variable del array de personajes, uno que su id sea igual al id al que se hace click y lo guardo en una variable.

        const characterIdEqual = charactersData.find(  oneCharacter => oneCharacter._id === clickCharacterId);

        // Busca en la variable del array de favoritos, un personaje que su id sea igual al id al que se hace click y lo guardo en una variable.

        const favoritesIdEqual = favoritesData.findIndex(  oneCharacter => oneCharacter._id === clickCharacterId );

        console.log(favoritesIdEqual);

        if(favoritesIdEqual===-1){

            
            favoritesData.push(characterIdEqual);// añadir en favoritos los personajes con mismo id
        }
        else {
            favoritesData.splice(favoritesIdEqual, 1)
        };

        renderFavorites(); // llamo a la funcion para pintar los favoritos

        localStorage.setItem('charactersFavorite', JSON.stringify(favoritesData)); // // Almaceno los los favoritos en el LocalStorage
    };
  const characterFavoritesLS = JSON.parse(localStorage.getItem('charactersFavorite'));  // almaceno la variable del localStorage
      if(characterFavoritesLS){
      favoritesData  = characterFavoritesLS;

      renderFavorites();

      };

// EVENTOS

form.addEventListener('submit',(event) => {
  event.preventDefault();

  fetch(`//api.disneyapi.dev/character?name=${inputSearch.value}`)
  .then( response => response.json() )
  .then( data => {
    if (Array.isArray(data.data)){
        charactersData = data.data;
    }
    else {
        charactersData = [];
        charactersData.push(data.data);
    }

    renderAll();
  
  })

});


// CÓDIGO CUANDO CARGA LA PÁGINA

const characterLs = JSON.parse(localStorage.getItem('characters')); // almaceno la variable del localStorage

if(characterLs === null){
fetch("//api.disneyapi.dev/character?pageSize=50") // FETCH para coger todos los personajes de la API en un array
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data; // asigno a la variable vacia el valor de los datos de la API
  
    localStorage.setItem('characters',JSON.stringify(charactersData));   // Almaceno los datos del fetch en el LocalStorage

    renderAll(); // llamo a la funcion que pinta todos los personajes
  });
}
else{
  charactersData = characterLs;

  renderAll(charactersData);
};





