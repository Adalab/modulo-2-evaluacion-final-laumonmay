console.log(">> Ready :)");const i=document.querySelector(".js_listCharactersCards"),h=document.querySelector(".js_listFavorites"),f=document.querySelector(".js_form"),g=document.querySelector(".js_inputSearch");document.querySelector(".js_buttonSearch");let a=[],t=[];function m(e){t.findIndex(c=>c._id===e._id)===-1?i.innerHTML+=`
          <li class="characters__cards js_liCharacters" data-id="${e._id}"> 
              <h3 class="characters__text-card">${e.name}</h3>
              <img class="characters__img-card" src="${e.imageUrl}" alt="Imagen de un personaje Disney">
          </li>
      `:i.innerHTML+=`
            <li class="characters__cards js_liCharacters characters__favorites--selected" data-id="${e._id}"> 
                <h3 class="characters__text-card">${e.name}</h3>
                <img class="characters__img-card" src="${e.imageUrl}" alt="Imagen de un personaje Disney">
            </li>
        `}function l(){i.innerHTML="";for(let r=0;r<a.length;r++)m(a[r]);const e=document.querySelectorAll(".js_liCharacters");for(const r of e)r.addEventListener("click",v)}function S(e){h.innerHTML+=`
        <li class="characters__cards js_liCharacters"> 
            <h3 class="characters__text-card">${e.name}</h3>
            <img class="characters__img-card" src="${e.imageUrl}" alt="Imagen de un personaje Disney">
        </li>
    `}function _(){h.innerHTML="";for(let e=0;e<t.length;e++)S(t[e])}function v(e){const r=e.currentTarget;r.classList.toggle("characters__favorites--selected");const c=parseInt(r.dataset.id);console.log(c);const u=a.find(n=>n._id===c),s=t.findIndex(n=>n._id===c);console.log(s),s===-1?t.push(u):t.splice(s,1),_(),localStorage.setItem("charactersFavorite",JSON.stringify(t))}const o=JSON.parse(localStorage.getItem("charactersFavorite"));o&&(t=o,_());f.addEventListener("submit",e=>{e.preventDefault(),fetch(`//api.disneyapi.dev/character?name=${g.value}`).then(r=>r.json()).then(r=>{Array.isArray(r.data)?a=r.data:(a=[],a.push(r.data)),l()})});const d=JSON.parse(localStorage.getItem("characters"));d===null?fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{a=e.data,localStorage.setItem("characters",JSON.stringify(a)),l()}):(a=d,l());
//# sourceMappingURL=main.js.map
