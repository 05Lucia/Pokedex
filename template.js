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


function infoSectionGenralTemplate(clickedPokemon, speciesJson, abilitiesHTML, shinyPokemonImg) {
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

function renderPokemonCardTemplate(currentPokemon, typeColor, secondColor, types, currentPokemonImg) {
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

function TamplateStatsTable() {
  return `
  <div class="stats-table" id="stats-table">
  </div>
  `
}

function stautsInfoTamplate(stat, percent, secondColor, typeColor, highestStat) {
  return `
    <div class="sats-collum">
      <div><b>${stat['stat']['name']}</b></div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width:${percent}%; background-image: linear-gradient(to right, ${secondColor}, ${typeColor});" aria-valuemax="${highestStat}"></div>
      </div>
      <div>${stat['base_stat']} </div>
    </div>
    `
}

function moveTableTamplate(typeColor, secondColor) {
  return `
  <div class="move-container">
    <table id="move-table" style="background-color: ${typeColor};">
      <tr class = "first-row">
        <td>Level</td>
        <td>Move</td>
        <td>Type</td>
        <td>Power</td>
        <td titel="Power Point">PP</td>
        <td titel="Accuracy">Acc</td>
        <td class="small-screen">Method</td>
      </tr>
      <tbody id="table-body" style="background-color: ${secondColor};">
      </tbody>
      <tr style="height:1rem;"></tr>
    </table>    
  </div>
  `
}

function moveTamplate(move, lvl, moveJson) {
  return `
    <tr>
      <td>${lvl}</td>
      <td>${move.move.name}</td>
      <td>${moveJson.type.name}</td>
      <td>${moveJson.power}</td>
      <td>${moveJson.pp}</td>
      <td>${moveJson.accuracy}</td>
      <td class="small-screen">${move.version_group_details['0'].move_learn_method.name}</td>
    </tr>
    `
}

// Evolutions Templates ------------------------------------------------------------------------------------------------------

function noEvolutionTemplate() {
  return `
    <div class="info-section">
    <br>
    <h3>This Pokémon has no further evolutions.</h3>
    </div>`
}

function normalEvolutionTemplateBaseAndFirst(evolutionJson, imgEvolution0, evolvesTo, imgEvolution1, trigerFirstEvolution) {
  return `
        <div class="info-section" id="info-content">
          <div class="infoPokemonImg text-big">
            <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
            <img  src="${imgEvolution0}" alt="${evolutionJson['chain']['species']['name']}">
          </div>
          <br>
          <div class="lvl-up-arrow-down">
            <div>${evolutionDetails(trigerFirstEvolution)}</div>
            <img src="./img/runter-50.png" alt="arrow down">
          </div>
          <br>
          <div class="first-evolution" id="first-evolution">
            <div class="infoPokemonImg text-big">
              <div><b>${evolvesTo['0']['species']['name']}</b></div>
              <img  src="${imgEvolution1} " alt="${evolvesTo['0']['species']['name']}">
            </div>
          </div>
          <br>
          <div class="multi-evo" id="mulitEvo"></div>
        </div>
        `
}

function normalFirstSecondEvolutionTmplate(trigerSecondEvolution, evolvesTo, imgEvolution2) {
  return `
        <div class="infoPokemonImg text-big">
          <div class="lvl-up-arrow-down">
           <div>${evolutionDetails(trigerSecondEvolution)}</div>
           <img src="./img/runter-50.png" alt="arrow down">
          </div>
          <br>   
          <div><b>${evolvesTo['0']['evolves_to']['0']['species']['name']}</b></div>
          <img  src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['0']['species']['name']}">
        </div>
        `
}

function normalSecondSecondEvolutionTempalte(evolvesTo, trigerSecondEvolution, imgEvolution2) {
  return `
      <div class="infoPokemonImg text-big">
        <div class="lvl-up-arrow-down">
          <div>${evolutionDetails(trigerSecondEvolution)}</div>
          <img src="./img/runter-50.png" alt="arrow down">
        </div>
        <br>
        <div><b>${evolvesTo['0']['evolves_to']['1']['species']['name']}</b></div>
        <img  src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['1']['species']['name']}">
      </div>
      <br>
      `
}