let TypeColors = [
  { type: "normal", color: "#BEBEBE", backgroundColor: "#e6e6e6", icon: "./img/normal.png" },
  { type: "fire", color: "#FF7F5E", backgroundColor: "#fae1d8", icon: "./img/fire.png" },
  { type: "water", color: "#63B3FF", backgroundColor: "#e2effa", icon: "./img/water.png" },
  { type: "electric", color: "#FFD700", backgroundColor: "#fff9da", icon: "./img/electric.png" },
  { type: "grass", color: "#81C784", backgroundColor: "#EEFFEF", icon: "./img/grass.png" },
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
    <div class="pokeCard" id="pokeCard-${currentPokemon.id}" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor}); filter: drop-shadow(0px 0px 2px ${secondColor});">
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

async function renderPokemonInfo(cardId) {
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
  <div class="flavor text-big "><b>flavor text:</b> <br> <div id="flavor_text"></div></div>
  <br>
  <div class="general-Info">
    <div class="text-big row"> <b>Habitat: </b> <div id="habitat"></div> </div>
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
  if (speciesJson['flavor_text_entries']['10']['flavor_text'] && speciesJson['flavor_text_entries']['10']['language']['name'] === 'en') {
    const container = document.getElementById('flavor_text')
    container.innerHTML = `
    ${speciesJson['flavor_text_entries']['10']['flavor_text']}
    `;
  } if (speciesJson['flavor_text_entries']['10']['language']['name'] !== 'en') {
    for (let i = 0; i < speciesJson['flavor_text_entries'].length; i++) {
      const entry = speciesJson['flavor_text_entries'][i];
      if (entry.language.name === 'en') {
        const container = document.getElementById('flavor_text');
        container.innerHTML = `
          ${entry.flavor_text}
        `;
        break; // Exit the loop once English flavor text is found
      }
    }
  } 

  if (speciesJson.habitat && speciesJson.habitat.name) {
    const container = document.getElementById('habitat')
    container.innerHTML = `
     ${speciesJson.habitat.name}
    `;
  } else {
    const container = document.getElementById('habitat')
    container.innerHTML = `
     unknown
    `;
  }
}

function stautsInfo(clickedPokemon) { // for exampel https://pokeapi.co/api/v2/pokemon/1
  let content = document.getElementById('Info-Section');
  content.innerHTML = '';

  const firstType = clickedPokemon['types'][0]; // Get the first type
  const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color
  const secondColor = TypeColors.find(color => color.type === firstType.type.name)?.backgroundColor;

  content.innerHTML += `
  <div class="stats-table" id="stats-table">
  </div>
  `;

  const table = document.getElementById('stats-table')
  let highestStat = 0; // Initialize highest stat

  // Find the highest base stat
  for (let i = 0; i < clickedPokemon['stats'].length; i++) {
    const stat = clickedPokemon['stats'][i];
    highestStat = Math.max(highestStat, stat['base_stat']);
  }

  for (let i = 0; i < clickedPokemon['stats'].length; i++) {
    const stat = clickedPokemon['stats'][i];

    const percent = Math.round((stat['base_stat'] / highestStat) * 100);

    table.innerHTML += `
    <div class="sats-collum">
      <div><b>${stat['stat']['name']}</b></div>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width:${percent}%; background-image: linear-gradient(to right, ${secondColor}, ${typeColor});" aria-valuemax="${highestStat}"></div>
      </div>
      <div>${stat['base_stat']} </div>
    </div>
    `;

  }
}

function movesInfo(clickedPokemon) {
  let content = document.getElementById('Info-Section');
  content.innerHTML = '';

  const firstType = clickedPokemon['types'][0]; // Get the first type
  const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color
  const secondColor = TypeColors.find(color => color.type === firstType.type.name)?.backgroundColor;

  content.innerHTML += `
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
  `;

  lodeMoves(clickedPokemon)
}

async function lodeMoves(clickedPokemon) {
  const container = document.getElementById('table-body');

  for (let i = 0; i < clickedPokemon.moves.length; i++) {
    const move = clickedPokemon.moves[i];

    let lvl

    if (move.version_group_details['0'].level_learned_at > 0) {
      lvl = move.version_group_details['0'].level_learned_at
    } else {
      lvl = '-'
    }

    const url = move.move.url
    const response = await fetch(url);
    const moveJson = await response.json()

    container.innerHTML += `
    <tr>
      <td>${lvl}</td>
      <td>${move.move.name}</td>
      <td>${moveJson.type.name}</td>
      <td>${moveJson.power}</td>
      <td>${moveJson.pp}</td>
      <td>${moveJson.accuracy}</td>
      <td class="small-screen">${move.version_group_details['0'].move_learn_method.name}</td>
    </tr>
    `;

  }

}

// ---------------------------------------------------------------------------------------------------------
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
