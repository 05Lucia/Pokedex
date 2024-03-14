let TypeColors = [
  { type: "normal", color: "#BEBEBE", backgroundColor: "#e6e6e6", icon: "./img/normal.png" },
  { type: "fire", color: "#FF7F5E", backgroundColor: "#fae1d8", icon: "./img/fire.png" },
  { type: "water", color: "#63B3FF", backgroundColor: "#e2effa", icon: "./img/water.png" },
  { type: "electric", color: "#FFD700", backgroundColor: "#fff9da", icon: "./img/electric.png" },
  { type: "grass", color: "#77C763", backgroundColor: "#eafdeb", icon: "./img/grass.png" },
  { type: "ice", color: "#97D9D9", backgroundColor: "#e9fcfc", icon: "./img/ice.png" },
  { type: "fighting", color: "#C74040", backgroundColor: "#f8d2d2", icon: "./img/fighting.png" },
  { type: "poison", color: "#A065FC", backgroundColor: "#e9ddfd", icon: "./img/poison.png" },
  { type: "ground", color: "#C2A18C", backgroundColor: "#ffefe6", icon: "./img/ground.png" },
  { type: "flying", color: "#87CEEB", backgroundColor: "#e7f7fd", icon: "./img/flying.png" },
  { type: "psychic", color: "#F48FB3", backgroundColor: "#ffe3e3", icon: "./img/psychic.png" },
  { type: "bug", color: "#B0C04E", backgroundColor: "#f4f8da", icon: "./img/bug.png" },
  { type: "rock", color: "#8C8B8A", backgroundColor: "#d6d6d6", icon: "./img/rock.png" },
  { type: "ghost", color: "#8080BE", backgroundColor: "#d7d7fb", icon: "./img/ghost.png" },
  { type: "dragon", color: "#5C41C9", backgroundColor: "#d3c9fb", icon: "./img/dragon.png" },
  { type: "dark", color: "#6B5451", backgroundColor: "#bfb5b4", icon: "./img/dark.png" },
  { type: "steel", color: "#B7B7B7", backgroundColor: "#e2e5e7", icon: "./img/steel.png" },
  { type: "fairy", color: "#FFC8C8", backgroundColor: "#ffe3e3", icon: "./img/fairy.png" },
];

const START_POKEMON = 0;
const END_POKEMON = 50;

let currentStartPokemon = START_POKEMON; // Track current starting index
let currentEndPokemon = END_POKEMON; // Track current ending index


let response
let currentPokemon = null;

async function init() {
  loadedPokemon = [];
  const container = document.getElementById('pokeCardContanier');
  container.innerHTML = '';
  await lodePokemon()
  await renderPokemonCard();
}

async function lodePokemon() {
  for (let i = START_POKEMON; i < END_POKEMON; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
    const response = await fetch(url);
    currentPokemon = await response.json();
    loadedPokemon.push(currentPokemon); // Add Pokemon data to array
    renderPokemonCard();
  }
}

let loadedPokemon = [];

function renderPokemonCard() {
  const currentPokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
  const container = document.getElementById('pokeCardContanier');

  const firstType = currentPokemon['types'][0]; // Get the first type
  const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color
  const secondColor = TypeColors.find(color => color.type === firstType.type.name)?.backgroundColor;

  const types = currentPokemon['types'].map(type => {
    const typeColor = TypeColors.find(color => color.type === type.type.name)?.color;
    return `<div class="type" style="background-color: ${typeColor}">${type.type.name}</div>`;
  }).join('');

  container.innerHTML += `
    <div class="pokeCard" id="pokeCard-${currentPokemon.id}" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor});">
      <div class="top-card">
        <h3>${currentPokemon.name}</h3>
        <div>#${currentPokemon.id.toString().padStart(4, '0')}</div>
      </div>
      <div class="types">${types}</div>
      <img src="${currentPokemonImg}" alt="">
      <div class="bottom-box"></div>
    </div>
  `;
  addCardClick()
}

async function search() {
  let query = document.getElementById('search').value.toLowerCase();
  const container = document.getElementById('pokeCardContanier');
  let hasMatch = false; // Flag to track if any match is found

  if (!query) {
    window.location.reload()
    return; // Exit the function if no query is present
  }

  // Loop through all Pokemon cards
  for (const card of container.querySelectorAll('.pokeCard')) {
    const cardName = card.querySelector('h3').textContent.toLowerCase();
    const cardId = card.id.replace('pokeCard-', '') // Extract ID from card ID attribute
    const isMatch = cardName.includes(query) || cardId === query;
    if (isMatch) {
      hasMatch = true;
      card.style.display = 'flex'; // Show matching card
    } else {
      card.style.display = 'none'; // Hide non-matching card
    }
  }

  // Check for no matches after looping through existing cards
  if (!hasMatch) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) { // Check for successful response (status code 200)
        throw new Error('Pokemon not found'); // Throw error for non-existent Pokemon
      }
      currentPokemon = await response.json();
      loadedPokemon.push(currentPokemon); // Add Pokemon data to array
      renderPokemonCard(currentPokemon); // Render the newly fetched Pokemon
    } catch (error) {
      container.innerHTML = 'The Pokemon you are looking for does not exist!'; // Display error message
    }
  }
}


function addCardClick() {
  const container = document.getElementById('pokeCardContanier');
  const pokeCards = container.querySelectorAll('.pokeCard');

  pokeCards.forEach(pokeCard => {
    pokeCard.addEventListener('click', function () {
      const cardId = pokeCard.id.replace('pokeCard-', ''); // Extract Pokemon ID from card ID
      document.getElementById('body-overlay').classList.remove('d-none')
      document.getElementById('info-card').classList.remove('d-none')
      renderPokemonInfo(cardId); // Pass card ID as argument
    });
  });
}

function closeInfo() {
  document.getElementById('body-overlay').classList.add('d-none')
  document.getElementById('info-card').classList.add('d-none')
}

function doNotClose(event) {
  event.stopPropagation();
}

async function renderPokemonInfo(cardId,) {
  const content = document.getElementById('info-card');
  content.innerHTML = `
  <div id="top-Section"></div>
  <div id="Info-Section"></div>
  `;

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${cardId}`);
  const clickedPokemon = await response.json();
  // Build HTML content based on clickedPokemon information

  topInfoCard(clickedPokemon);
  InfoCardButton(clickedPokemon);
  infoSectionGenral(clickedPokemon); // up to 3 evolution
}

function InfoCardButton(clickedPokemon) {
  let content = document.getElementById('top-Section');

  // Create the button container element
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('info-btn');

  // Define function references for event listeners
  const infoClick = () => infoSectionGenral(clickedPokemon);
  const evolutionClick = () => evolutinInfo();
  const statsClick = () => stautsInfo(clickedPokemon);
  const movesClick = () => movesInfo(clickedPokemon);

  // Create and add buttons with event listeners
  const infoButton = document.createElement('button');
  infoButton.textContent = 'Info';
  infoButton.addEventListener('click', infoClick);
  buttonContainer.appendChild(infoButton);

  const evolutionButton = document.createElement('button');
  evolutionButton.textContent = 'Evolution';
  evolutionButton.addEventListener('click', evolutionClick);
  buttonContainer.appendChild(evolutionButton);

  const statsButton = document.createElement('button');
  statsButton.textContent = 'Stats';
  statsButton.addEventListener('click', statsClick);
  buttonContainer.appendChild(statsButton);

  const movesButton = document.createElement('button');
  movesButton.textContent = 'Moves';
  movesButton.addEventListener('click', movesClick);
  buttonContainer.appendChild(movesButton);

  // Append the button container to the content section
  content.appendChild(buttonContainer);
}

let speciesJson;

async function infoSectionGenral(clickedPokemon) {
  let content = document.getElementById('Info-Section');
  content.innerHTML = '';

  let abilitiesHTML = "";
  for (const ability of clickedPokemon.abilities) {
    abilitiesHTML += `<div>${ability.ability.name} </div>`; // Extract and display ability name
  }

  const url = clickedPokemon.species.url;
  const species = await fetch(url);
  speciesJson = await species.json();

  const shinyPokemonImg = clickedPokemon['sprites']['other']['official-artwork']['front_shiny'];

  content.innerHTML += `
  <div class="info-section" id="info-content">
  <h3>Infos</h3>
  <br>
  <div class="flavor text-big"><b>flavor text:</b> <br> ${speciesJson['flavor_text_entries']['10']['flavor_text']}</div>
  <br>
  <div class="general-Info">
  <div class="text-big"> <b>Habitat</b> ${speciesJson.habitat.name} </div>
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
  `;
  // infoSectionTypes(clickedPokemon);
}

async function evolutinInfo() {
  let content = document.getElementById('Info-Section');
  content.innerHTML = '';

  const url = speciesJson.evolution_chain.url;
  const evolution = await fetch(url);
  const evolutionJson = await evolution.json();

  const evolvesTo = evolutionJson['chain']['evolves_to'];

  noEvolution(evolvesTo, content);
  normalEvolution(evolvesTo, content, evolutionJson);
  multiplEvolutions(evolvesTo, content, evolutionJson);
  eevee(evolvesTo, content, evolutionJson);
}

function noEvolution(evolvesTo, content) {
  if (evolvesTo.length === 0) {
    content.innerHTML += `
  <div class="info-section">
  <br>
  <h3>This Pokémon has no further evolutions.</h3>
  </div>`;

  }
}

async function normalEvolution(evolvesTo, content, evolutionJson) {
  if (evolvesTo.length === 1) {
    const response0 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionJson['chain']['species']['name']}`);
    const baseEvolution = await response0.json();
    const imgEvolution0 = baseEvolution['sprites']['other']['official-artwork']['front_default'];

    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['species']['name']}`);
    const firstEvolution = await response1.json();
    const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];

    content.innerHTML += `
    <div class="info-section" id="info-content">
      <div class="infoPokemonImg text-big">
        <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
        <img  src="${imgEvolution0}" alt="${evolutionJson['chain']['species']['name']}">
      </div>
      <br>
      <b>Evolves To:</b>
      <br>
      <div class="first-evolution" id="first-evolution">
        <div class="infoPokemonImg text-big">
          <div><b>${evolvesTo['0']['species']['name']}</b></div>
          <img  src="${imgEvolution1} " alt="${evolvesTo['0']['species']['name']}">
        </div>
      </div>
      <br>
    </div>
    `;
    if (evolvesTo['0']['evolves_to'].length >= 1) {
      let content = document.getElementById('info-content');

      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['evolves_to']['0']['species']['name']}`);
      const secondEvolution = await response2.json();
      const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];

      content.innerHTML += `
      <div class="infoPokemonImg text-big">
        <b>Evolves To:</b>
        <br>
        <div><b>${evolvesTo['0']['evolves_to']['0']['species']['name']}</b></div>
        <img  src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['0']['species']['name']}">
      </div>
      `;
      secondSecondEvolution(evolvesTo);
    }
  }
}

async function secondSecondEvolution(evolvesTo) {
  if (evolvesTo['0']['evolves_to'].length === 2) { // so if ther is a 2. second evolution 
    let content = document.getElementById('info-content');

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['evolves_to']['1']['species']['name']}`);
    const secondEvolution = await response2.json();
    const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];

    content.innerHTML += `
    <div class="infoPokemonImg text-big">
    <b>Evolves To:</b>
    <br>
    <div><b>${evolvesTo['0']['evolves_to']['1']['species']['name']}</b></div>
    <img  src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['1']['species']['name']}">
  </div>
  `;
  }
}

async function multiplEvolutions(evolvesTo, content, evolutionJson) {
  if (evolvesTo.length > 1 && evolvesTo.length < 3) {
    const response0 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionJson['chain']['species']['name']}`);
    const baseEvolution = await response0.json();
    const imgEvolution0 = baseEvolution['sprites']['other']['official-artwork']['front_default'];

    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['species']['name']}`);
    const firstEvolution = await response1.json();
    const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];

    content.innerHTML += `
    <div class="info-section" id="info-content">
      <div class="infoPokemonImg text-big">
        <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
        <img  src="${imgEvolution0}" alt="${evolutionJson['chain']['species']['name']}">
      </div>
      <br>
      <b>Evolves To:</b>
      <br>
      <div class="first-evolution" id="first-evolution">
        <div class="infoPokemonImg text-big">
          <div><b>${evolvesTo['0']['species']['name']}</b></div>
          <img  src="${imgEvolution1} " alt="${evolvesTo['0']['species']['name']}">
        </div>
      </div>
      <br>
    </div>
    `;
    if (evolvesTo['0']['evolves_to'].length === 1) {
      let content = document.getElementById('info-content');

      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['evolves_to']['0']['species']['name']}`);
      const secondEvolution = await response2.json();
      const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];

      content.innerHTML += `
      <div class="infoPokemonImg text-big">
        <b>Evolves To:</b>
        <br>
        <div><b>${evolvesTo['0']['evolves_to']['0']['species']['name']}</b></div>
        <img  src="${imgEvolution2} " alt="${evolvesTo['0']['evolves_to']['0']['species']['name']}">
      </div>
      `;
    } if (evolvesTo.length >= 2 && evolvesTo.length < 3) {
      let content = document.getElementById('first-evolution');

      const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['1']['species']['name']}`);
      const firstEvolution = await response1.json();
      const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];

      content.innerHTML += `
          <div class="infoPokemonImg text-big">
            <div><b>${evolvesTo['1']['species']['name']}</b></div>
            <img  src="${imgEvolution1}" alt="${evolvesTo['1']['species']['name']}">
          </div>
          `;

      if (evolvesTo['1']['evolves_to'].length === 1) {
        let content = document.getElementById('info-content');

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['1']['evolves_to']['0']['species']['name']}`);
        const secondEvolution = await response2.json();
        const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];

        content.innerHTML += `
            <div class="infoPokemonImg text-big">
              <b>Evolves To:</b>
              <br>
              <div><b>${evolvesTo['1']['evolves_to']['0']['species']['name']}</b></div>
              <img  src="${imgEvolution2} " alt="${evolvesTo['1']['evolves_to']['0']['species']['name']}">
            </div>
            `;
      }
    } if (evolvesTo.length === 3) {
      let content = document.getElementById('first-evolution');

      const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['2']['species']['name']}`);
      const firstEvolution = await response1.json();
      const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];

      content.innerHTML += `
          <div class="infoPokemonImg text-big">
            <div><b>${evolvesTo['2']['species']['name']}</b></div>
            <img  src="${imgEvolution1}" alt="${evolvesTo['2']['species']['name']}">
          </div>
          `;

      if (evolvesTo['2']['evolves_to'].length === 1) {
        let content = document.getElementById('info-content');

        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['2']['evolves_to']['0']['species']['name']}`);
        const secondEvolution = await response2.json();
        const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];

        content.innerHTML += `
            <div class="infoPokemonImg text-big">
              <b>Evolves To:</b>
              <br>
              <div><b>${evolvesTo['2']['evolves_to']['0']['species']['name']}</b></div>
              <img  src="${imgEvolution2} " alt="${evolvesTo['2']['evolves_to']['0']['species']['name']}">
            </div>
            `;
      }
    }
  }
}


async function eevee(evolvesTo, content, evolutionJson) {// https://pokeapi.co/api/v2/evolution-chain/67/ --> eevee's evolution chain!!
  if (evolvesTo.length === 8) {
    const response0 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionJson['chain']['species']['name']}`);
    const eevee = await response0.json();
    const eeveeImg = eevee['sprites']['other']['official-artwork']['front_default'];

    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['species']['name']}`);
    const eeveeWater = await response1.json();
    const eeveeWaterImg = eeveeWater['sprites']['other']['official-artwork']['front_default'];
    const eeveeWaterEvo = evolvesTo['0']['evolution_details']['0'];

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['1']['species']['name']}`);
    const eeveeElectricity = await response2.json();
    const eeveeElectricityImg = eeveeElectricity['sprites']['other']['official-artwork']['front_default'];
    const eeveeElectricityEvo = evolvesTo['1']['evolution_details']['0'];

    const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['2']['species']['name']}`);
    const eeveeFire = await response3.json();
    const eeveeFireImg = eeveeFire['sprites']['other']['official-artwork']['front_default'];
    const eeveeFireEvo = evolvesTo['2']['evolution_details']['0'];


    const response4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['3']['species']['name']}`);
    const eeveePsy = await response4.json();
    const eeveePsyImg = eeveePsy['sprites']['other']['official-artwork']['front_default'];
    const eeveePsyEvo = evolvesTo['3']['evolution_details']['0'];

    const response5 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['4']['species']['name']}`);
    const eeveeDark = await response5.json();
    const eeveeDarkImg = eeveeDark['sprites']['other']['official-artwork']['front_default'];
    const eeveeDarkEvo = evolvesTo['4']['evolution_details']['0'];

    const response6 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['5']['species']['name']}`);
    const eeveeGrass = await response6.json();
    const eeveeGrassImg = eeveeGrass['sprites']['other']['official-artwork']['front_default'];
    const eeveeGrassEvo = evolvesTo['5']['evolution_details']['3']

    const response7 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['6']['species']['name']}`);
    const eeveeIce = await response7.json();
    const eeveeIceImg = eeveeIce['sprites']['other']['official-artwork']['front_default'];
    const eeveeIceEvo = evolvesTo['6']['evolution_details']['3']

    const response8 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['7']['species']['name']}`);
    const eeveeFairy = await response8.json();
    const eeveeFairyImg = eeveeFairy['sprites']['other']['official-artwork']['front_default'];
    const eeveeFairyEvo1 = evolvesTo['7']['evolution_details']['0'] // ther is a problem with this Json and the next. 
    const eeveeFairyEvo2 = evolvesTo['7']['evolution_details']['1']


    content.innerHTML += `
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
      <div>${evolutionDetails(eeveeWaterEvo)}</div>
      <div>${evolutionDetails(eeveeElectricityEvo)}</div>
      <div>${evolutionDetails(eeveeFireEvo)}</div>
    </div>
    <br>
    <div class="canter-row">
      <div class="eeveeImg">
        <div><b>${evolvesTo['3']['species']['name']}</b></div>
        <img  src="${eeveePsyImg} " alt="${evolvesTo['3']['species']['name']}">
      </div>
      <div>${evolutionDetails(eeveePsyEvo)}</div>
      <div class="eeveeImg">
        <div><b>${evolutionJson['chain']['species']['name']}</b> </div>
        <img  src="${eeveeImg}" alt="${evolutionJson['chain']['species']['name']}">
      </div>
      <div>${evolutionDetails(eeveeDarkEvo)}</div>
      <div class="eeveeImg">
        <div><b>${evolvesTo['4']['species']['name']}</b></div>
        <img  src="${eeveeDarkImg} " alt="${evolvesTo['4']['species']['name']}">
      </div>
    </div>
    <br>
    <div class="arrow-row">
      <div>${evolutionDetails(eeveeGrassEvo)} or go to one of thes Location: eterna forest, pinwheel forest, kalos route 20</div>
      <div>${evolutionDetails(eeveeIceEvo)}</div>
      <div> ${evolutionDetails(eeveeFairyEvo2)} or ${evolutionDetails(eeveeFairyEvo1)}</div>
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
    `;
  }
}


function evolutionDetails(pokemon) {
  if (!pokemon) {
    return 'Details not available';
  }

  const details = [];

  if (pokemon['min_happiness']) { // to check if the feeld exist in the Pokemon JSON
    minHappiness = pokemon.min_happiness;
    details.push(`Happines Level: ${minHappiness}`);
  } if (pokemon.min_affection) {
    affection = pokemon.min_affection;
    details.push(`Min Affection: ${affection}`);
  } if (pokemon.item && pokemon.item.name) {
    item = pokemon.item.name;
    details.push(`Use ${item}`);
  } if (pokemon.time_of_day) {
    time = pokemon.time_of_day;
    details.push(`time ${time}`);
  } if (pokemon.location && pokemon.location.name) {
    location = pokemon.location.name;
    details.push(`Go to ${location}`);
  } if (pokemon.min_level) {
    lvl = pokemon.min_level;
    details.push(`Level up ${lvl}`);
  } if (pokemon.trigger.name === trade) {
    trade = pokemon.trigger.name;
    details.push(`${trade}`);
  } if (pokemon.turn_upside_down === true) {
    details.push(`Turn upside down`);
  } if (pokemon.trigger.name === other) {
    details.push(`Other`);
  } if (pokemon.held_item && pokemon.held_item.name) {
    item = pokemon.held_item.name
    details.push(`Use ${item}`);
  } if (pokemon.known_move && pokemon.known_move.name) {
    move = pokemon.known_move.name;
    details.push(`Level up knowing ${move}`);
  } if (pokemon.needs_overworld_rain === true) {
    details.push(`in Rain`);
  }
  return details
}



// ---------------------------------------------------------------------------------------------------------

// Function to determine the number of Pokemon types
function getNumPokemonTypes(types) {
  return types.length; // length of types array gives the number of types
}

function findTypeIconUrl(typeData) {
  return TypeColors.find(typeObject => typeObject.type === typeData)?.icon;
}

// funktion has to be reviesed!! ---> Start from sratch!! -------------------------------------------------
async function infoSectionTypes(clickedPokemon) {
  let content = document.getElementById('info-content');

  let types = clickedPokemon.types;
  const numTypes = getNumPokemonTypes(types);

  // if (numTypes === 1) {
  //   let response = await fetch ( clickedPokemon['types']['0']['type']['url']); 
  //   let type01 = await response.json();

  //   const multipliers = [0.25, 0.5, 2, 4];

  //   let damageFromHtml = "";
  //   let damageToHtml = "";
  //   for (const multiplier of multipliers) {
  //     const iconUrl = findTypeIconUrl(typeData.name); // Assuming a function to find icon URL
  //     damageFromHtml += `<tr><td>${multiplier}x</td><td><img src="${iconUrl}" alt="${typeData.name} type icon"></td></tr>`;
  //     damageToHtml += `<tr><td>${multiplier}x</td><td><img src="${iconUrl}" alt="${typeData.name} type icon"></td></tr>`;
  //   }

  //   content.querySelector('.type-damage table:first-child').innerHTML = damageFromHtml;
  //   content.querySelector('.type-damage table:last-child').innerHTML = damageToHtml;

  // } else if (numTypes === 2) {
  //   let response = await fetch ( clickedPokemon['types']['0']['type']['url']);// for exampel url: https://pokeapi.co/api/v2/type/10/
  //   let type01 = await response.json();

  //   let response2 = await fetch ( clickedPokemon['types']['1']['type']['url']);// for exampel url: https://pokeapi.co/api/v2/type/3/
  //   let type02 = await response2.json();

  // } else {
  //   console.warn('Type table not possible for more than two types')
  // }



  content.innerHTML += `
  <div class="Info-section">
  <h3>Effectiveness of Types</h3><br>

  <div class="type-damage">
  <h4>Type damage from</h4>
    <table>
    </table> <br>

    <h4>Type damage to</h4>                
    <table>
    </table>
  </div>

  </div>
  `;
}

// Lode function for the bottom of the page with onclick fukction ---> is working woud be better with Scrolle fuktion look at that at the end!!! 
const ALL_POKEMON_COUNT = 1025;
const BUFFER_DISTANCE = 10;

async function loadMorePokemon() {
  // Check if all Pokemon are loaded
  if (currentEndPokemon >= ALL_POKEMON_COUNT) {
    console.warn("All Pokemon have been loaded.");
    return;
  }

  // Increase the starting and ending indices for loading
  currentStartPokemon += 50;
  currentEndPokemon = Math.min(currentEndPokemon + 50, ALL_POKEMON_COUNT); // Prevent exceeding total count

  for (let i = currentStartPokemon; i < currentEndPokemon; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    const response = await fetch(url);
    currentPokemon = await response.json();
    loadedPokemon.push(currentPokemon); // Add Pokemon data to array
    renderPokemonCard();
  }
}


// // Add event listener for scroll event
// const scrollElement = document.document.scrollingElement || window;
// scrollElement.addEventListener("scroll", () => {
//   const { scrollTop, scrollHeight, clientHeight } = scrollElement;

//   // Check if near bottom and all Pokemon are not loaded
//   if (scrollTop + clientHeight >= scrollHeight - BUFFER_DISTANCE && currentEndPokemon < ALL_POKEMON_COUNT) {
//     loadMorePokemon();
//   }
// });

