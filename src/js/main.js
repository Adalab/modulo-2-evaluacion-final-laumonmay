'use strict';

console.log('>> Ready :)');

// QUERY-SELECTOR

const listCharactersCards = document.querySelector('.js_listCharactersCards');

const listFavorites = document.querySelector('.js_listFavorites');

// VARIABLES GLOBALES


let charactersData = [];  // variable de personajes con array vacio
let favoritesData = [];  // variable de favoritos con array vacio


const characterFavoritesLS = JSON.parse(localStorage.getItem('charactersFavorite'));
        if(characterFavoritesLS){
          favoritesData  = characterFavoritesLS;

          renderFavorites(listFavorites);

        }



// FUNCIONES

function renderOneCharacter(charactersData) {   // para pintar un personaje
    listCharactersCards.innerHTML += `
        <li class="js_liCharacters" data-id="${charactersData._id}"> 
            <h3>${charactersData.name}</h3>
            <img src="${charactersData.imageUrl}" alt="Imagen de un personaje Disney">
        </li>
    `;
};

function renderAllCharacters () {         // para pintar todos los personajes
    // HAGO UN BUCLE
    for( let i=0; i<charactersData.length; i++ ) {
        //código que queremos que se repita
        renderOneCharacter(charactersData[i]); //utilizo la i para que se ejecute renderOne tantas veces como elementos haya en la variable charactersData
    };

    const liCharacters = document.querySelectorAll('.js_liCharacters'); // selecciono todos los li una vez se cargan en la página, no antes.Esta variable solo puede estar dentro de esta funcion o dentro de fetch, porque fuera aun no se habria cargado los elementos.

    for( const liCharacter of liCharacters ) {   // bucle para repetir el addeventlistener por cada elemento
        liCharacter.addEventListener('click', handleClickCharacter);  // invoco funcion manejeadora cada vez que se hace click
      
    };
    
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

           
        }
         
          localStorage.setItem('charactersFavorite', JSON.stringify(favoritesData));



        renderFavorites(); // llamo a la funcion para pintar los favoritos


        /* pinto los personajes en favoritos
        listFavorites.innerHTML += `
        <li class="js_liCharacters">
            <h3>${characterIdEqual.name}</h3>
            <img src="${characterIdEqual.imageUrl}" alt="Imagen de un personaje Disney">
        </li>
    `;*/


    };


// EVENTOS


// CÓDIGO CUANDO CARGA LA PÁGINA

const characterLs = JSON.parse(localStorage.getItem('characters')); // 

if(characterLs === null){

fetch("https://api.disneyapi.dev/character?pageSize=50") // FETCH para coger todos los personajes de la API en un array
  .then((response) => response.json())
  .then((data) => {
    charactersData = data.data; // asigno a la variable vacia el valor de los datos de la API
    
    localStorage.setItem('characters',JSON.stringify(charactersData));   // Almaceno los datos del fetch en el LocalStorage
  
  
    renderAllCharacters(charactersData); // llamo a la funcion que pinta todos los personajes
    });
}
else{
  charactersData = characterLs;

  renderAllCharacters(charactersData);
}





