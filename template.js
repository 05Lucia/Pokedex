function topInfoCardTemplate(clickedPokemon, typeColor, secondColor, types) {
  return `
   <div class="info-card-top" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor})">
   <div class="close-container"><img class="close" src="./img/close.png" alt="close" onclick="closeInfo()"></div>
     <div class="top-card-info">
       <h2>${clickedPokemon.name}</h2>
       <p>ID: #${clickedPokemon.id.toString().padStart(4, '0')}</p>
     </div>
     <div id="next-pokemon">
      <div class="other-pokemon"> </div>
      <div class="other-pokemon"> </div>
     </div>
     <div class="types-Info">${types}</div>
     </div>
       <img class="pokemon-img" style="filter: drop-shadow(0px 0px 4px ${typeColor})" src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}" alt="${clickedPokemon.name}">
     `
}


function infoSectionGenralTemplate (clickedPokemon, speciesJson, abilitiesHTML, shinyPokemonImg) {
  return `
  <div class="info-section" id="info-content">
  <h3>Infos</h3>
  <br>
  <div class="flavor text-big "><b>flavor text:</b> <br> ${flavorText(speciesJson)}</div>
  <br>
  <div class="general-Info">
    <div class="text-big row"> <b>Habitat: </b> ${habitat(speciesJson)} </div>
    <div  ><b>Weight:</b> ${(clickedPokemon.weight / 10).toFixed(1)} kg</div>
    <div><b>Height:</b> ${(clickedPokemon.height / 10).toFixed(1)} m</div>
    <div class="abilities text-big"> <b>Abilities:</b> ${abilitiesHTML} </div>
    <div class="text-big"> <b>Growth rate:</b> ${speciesJson.growth_rate.name} </div>
  </div>
  <br>
  <div class="infoPokemonImg">
  <b>Shiny version:</b>
  <img  src="${shinyPokemonImg}" alt="">
  </div>
  <br>
  </div>
  `
}

function renderPokemonCardTemplate (currentPokemon, typeColor, secondColor, types, currentPokemonImg) {
  return `
    <div class="pokeCard" id="pokeCard-${currentPokemon.id}" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor}); filter: drop-shadow(0px 0px 2px ${secondColor});">
      <div class="top-card">
        <h3>${currentPokemon.name}</h3>
        <div>#${currentPokemon.id.toString().padStart(4, '0')}</div>
      </div>
      <div class="types">${types}</div>
      <img src="${currentPokemonImg}" alt="">
      <div class="bottom-box"></div>
    </div>
  `
}