function topInfoCardTemplate(clickedPokemon, typeColor, secondColor, types,) {
  return `
   <div class="info-card-top" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor})">
   <div class="close-container"><img class="close" src="./img/close.png" alt="close" onclick="closeInfo()"></div>
     <div class="top-card-info">
       <h2>${clickedPokemon.name}</h2>
       <p>ID: #${clickedPokemon.id.toString().padStart(4, '0')}</p>
     </div>
     <div id="next-pokemon">
      <img src="img/links-50.png" alt="left" class="other-pokemon" onclick="nextPokemon(${clickedPokemon.id})">
      <img src="img/rechts-50.png" alt="right" class="other-pokemon" onclick="lastPokemon(${clickedPokemon.id})">
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
        <td class="small-screen-d-none">Method</td>
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
      <td class="small-screen-d-none">${move.version_group_details['0'].move_learn_method.name}</td>
    </tr>
    `
}

// Evolutions Templates ------------------------------------------------------------------------------------------------------

function noEvolutionTemplate() {
  return `
    <div class="info-section-evolution">
    <br>
    <h3>This Pokémon has no further evolutions.</h3>
    </div>`
}

function normalEvolutionTemplateBaseAndFirst(evolutionJson, imgEvolution0, evolvesTo, imgEvolution1, trigerFirstEvolution) {
  return `
        <div class="info-section-evolution" id="info-content">
          <div class="infoPokemonImg text-big">
            <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
            <img  src="${imgEvolution0}" alt="${evolutionJson['chain']['species']['name']}">
          </div>
          <br>
          <div class="lvl-up-arrow-down">
            <div>${evolutionDetails(trigerFirstEvolution)}</div>
            <img class="rotate" src="./img/runter-50.png" alt="arrow down">
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
           <img class="rotate" src="./img/runter-50.png" alt="arrow down">
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
          <img class="rotate" src="./img/runter-50.png" alt="arrow down">
        </div>
        <br>
        <div><b>${evolvesTo['0']['evolves_to']['1']['species']['name']}</b></div>
        <img  src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['1']['species']['name']}">
      </div>
      <br>
      `
}

function multiplEvolutionsBaseTemplate(evolutionJson, imgEvolution0, trigerFirstEvolution, evolvesTo, imgEvolution1) {
  return `
  <div class="info-section-evolution" id="info-content">
    <div class="infoPokemonImg text-big">
      <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
      <img  src="${imgEvolution0}" alt="${evolutionJson['chain']['species']['name']}">
    </div>
    <br>
    
    <div class="first-evolution" id="first-evolution">
      <div class="infoPokemonImg text-big small-screen" id="evoBranch1">
      <div class="lvl-up-arrow-down">
        <div>${evolutionDetails(trigerFirstEvolution)}</div>
        <img class="rotate" src="./img/runter-50.png" alt="arrow down">
        </div>
        <br>
        <div><b>${evolvesTo['0']['species']['name']}</b></div>
        <img class="small-screen-img" src="${imgEvolution1} " alt="${evolvesTo['0']['species']['name']}">
        <br>
      </div>
    </div>
  </div>
  `
}

function FirstBranchTemplate(trigerSecondEvolution, evolvesTo, imgEvolution2) {
  return `
          <div class="lvl-up-arrow-down">
            <div>${evolutionDetails(trigerSecondEvolution)}</div>
            <img class="rotate" src="./img/runter-50.png" alt="arrow down">
          </div>
          <br>
          <div><b>${evolvesTo['0']['evolves_to']['0']['species']['name']}</b></div>
          <img class="small-screen-img" src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['0']['species']['name']}">
        `
}

function SecondBranchFirstEvolutionTemplate(evolvesTo, imgEvolution1, trigerFirstEvolution) {
  return `
    <div class="infoPokemonImg text-big small-screen" id="evoBranch2">
      <div class="lvl-up-arrow-down">
        <div>${evolutionDetails(trigerFirstEvolution)}</div>
        <img class="rotate" src="./img/runter-50.png" alt="arrow down">
      </div>
      <br>
      <div><b>${evolvesTo['1']['species']['name']}</b></div>
      <img  class="small-screen-img" src="${imgEvolution1}" alt="${evolvesTo['1']['species']['name']}">
      <br>
    </div>
    `
}

function SecondBranchSecondEvolutionTemplate(evolvesTo, trigerSecondEvolution, imgEvolution2) {
  return `
    <div class="lvl-up-arrow-down">
      <div>${evolutionDetails(trigerSecondEvolution)}</div>
      <img class="rotate" src="./img/runter-50.png" alt="arrow down">
    </div>
    <br>
    <div><b>${evolvesTo['1']['evolves_to']['0']['species']['name']}</b></div>
    <img class="small-screen-img" src="${imgEvolution2} " alt="${evolvesTo['1']['evolves_to']['0']['species']['name']}">
    `
}

function ThirdBranchFirstEvolutionTemplate(evolvesTo, trigerFirstEvolution, imgEvolution1) {
  return `
  <div class="infoPokemonImg text-big small-screen" id="evoBranch3">
    <div class="lvl-up-arrow-down">
      <div>${evolutionDetails(trigerFirstEvolution)}</div>
      <img class="rotate" src="./img/runter-50.png" alt="arrow down">
    </div>
    <br>
    <div><b>${evolvesTo['2']['species']['name']}</b></div>
    <img class="small-screen-img" src="${imgEvolution1}" alt="${evolvesTo['2']['species']['name']}">
    <br>
  </div>
  `
}

function ThirdBranchSecondEvolutionTemplate(trigerSecondEvolution, evolvesTo, imgEvolution2) {
  return `
    <div class="infoPokemonImg text-big">
      <div class="lvl-up-arrow-down">
        <div>${evolutionDetails(trigerSecondEvolution)}</div>
        <img class="rotate" src="./img/runter-50.png" alt="arrow down">
      </div>
      <br>
      <div><b>${evolvesTo['2']['evolves_to']['0']['species']['name']}</b></div>
      <img class="small-screen-img" src="${imgEvolution2} " alt="${evolvesTo['2']['evolves_to']['0']['species']['name']}">
    </div>
    `
}

function eeveeTemplate(evolutionJson, evolvesTo, eeveeFairyImg, eeveeIceImg, eeveeGrassImg, eeveeFairyEvo1, eeveeFairyEvo2, eeveeIceEvo, eeveeGrassEvo, eeveeDarkImg, eeveeDarkEvo, eeveeImg, eeveeWaterImg, eeveeElectricityImg, eeveeFireImg, eeveeWaterEvo, eeveeElectricityEvo, eeveeFireEvo, eeveePsyImg, eeveePsyEvo) {
  return`
      <div class="info-section text-big" id="info-content">
      <br>
      <div class="eevee-row">
        <div class="eeveeImg">
          <div><b>${evolvesTo['0']['species']['name']}</b></div>
          <img  src="${eeveeWaterImg} " alt="${evolvesTo['0']['species']['name']}">
        </div>
        <div class="eeveeImg">
          <div><b>${evolvesTo['1']['species']['name']}</b></div>
          <img  src="${eeveeElectricityImg} " alt="${evolvesTo['1']['species']['name']}">
        </div>
        <div class="eeveeImg">
          <div><b>${evolvesTo['2']['species']['name']}</b></div>
          <img  src="${eeveeFireImg} " alt="${evolvesTo['2']['species']['name']}">
        </div>
      </div>
      <br>
      <div class="arrow-row">
        <div class="arrow">
          <img src="./img/oben-links-50 (1).png" alt="arrow up-left">
          <div>${evolutionDetails(eeveeWaterEvo)}</div>
        </div>
        <div class="arrow">
          <img src="./img/hoch-50.png" alt="arrow up">
          <div>${evolutionDetails(eeveeElectricityEvo)}</div>
        </div>
        <div class="arrow">
          <img src="./img/oben-rechts-50.png" alt="arrow up-right">
          <div>${evolutionDetails(eeveeFireEvo)}</div>
        </div>
      </div>
      <br>
      <div class="canter-row">
        <div class="eeveeImg">
          <div><b>${evolvesTo['3']['species']['name']}</b></div>
          <img  src="${eeveePsyImg} " alt="${evolvesTo['3']['species']['name']}">
        </div>
        <div class="arrow-center">
        <div>${evolutionDetails(eeveePsyEvo)}</div>
        <img src="./img/links-50.png" alt="arrow left">
        </div>
        <div class="eeveeImg">
          <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
          <img  src="${eeveeImg}" alt="${evolutionJson['chain']['species']['name']}">
        </div>
        <div class="arrow-center">
        <div>${evolutionDetails(eeveeDarkEvo)}</div>
        <img src="./img/rechts-50.png" alt="arrow right">
        </div>
        <div class="eeveeImg">
          <div><b>${evolvesTo['4']['species']['name']}</b></div>
          <img  src="${eeveeDarkImg} " alt="${evolvesTo['4']['species']['name']}">
        </div>
      </div>
      <br>
      <div class="arrow-row">
        <div class="arrow">
          <div>${evolutionDetails(eeveeGrassEvo)}</div>
          <img src="./img/unten-links-50.png" alt="arrow dowen-left">
        </div>
        <div class="arrow">
          <div>${evolutionDetails(eeveeIceEvo)}</div>
          <img src="./img/runter-50.png" alt="arrow dowen">
        </div>
        <div class="arrow">
          <div> ${evolutionDetails(eeveeFairyEvo2)}</div>
          <div> or ${evolutionDetails(eeveeFairyEvo1)}</div>
          <img src="./img/unten-rechts-50.png" alt="arrow dowen-right">
        </div>
      </div>
      <br>
      <div class="eevee-row">
        <div class="eeveeImg">
          <div><b>${evolvesTo['5']['species']['name']}</b></div>
          <img  src="${eeveeGrassImg} " alt="${evolvesTo['5']['species']['name']}">
        </div>
        <div class="eeveeImg">
          <div><b>${evolvesTo['6']['species']['name']}</b></div>
          <img  src="${eeveeIceImg} " alt="${evolvesTo['6']['species']['name']}">
        </div>
        <div class="eeveeImg">
          <div><b>${evolvesTo['7']['species']['name']}</b></div>
          <img  src="${eeveeFairyImg} " alt="${evolvesTo['7']['species']['name']}">
        </div>
      </div>
      </div>
      `
}