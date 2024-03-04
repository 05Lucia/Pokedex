let TypeColors = [
  { type: "normal", color: "#BEBEBE", backgroundColor: "#e6e6e6" },
  { type: "fire", color: "#FF7F5E", backgroundColor: "#fae1d8" }, 
  { type: "water", color: "#63B3FF", backgroundColor: "#e2effa" }, 
  { type: "electric", color: "#FFD700", backgroundColor: "#fff9da" },
  { type: "grass", color: "#77C763", backgroundColor: "#eafdeb" },
  { type: "ice", color: "#97D9D9", backgroundColor: "#e9fcfc" },
  { type: "fighting", color: "#C74040", backgroundColor: "#f8d2d2" }, 
  { type: "poison", color: "#A065FC", backgroundColor: "#e9ddfd" }, 
  { type: "ground", color: "#C2A18C", backgroundColor: "#ffefe6" }, 
  { type: "flying", color: "#87CEEB", backgroundColor: "#e7f7fd" }, 
  { type: "psychic", color: "#F48FB3", backgroundColor: "#ffe3e3" }, 
  { type: "bug", color: "#B0C04E", backgroundColor: "#f4f8da" },
  { type: "rock", color: "#8C8B8A", backgroundColor: "#d6d6d6" }, 
  { type: "ghost", color: "#8080BE", backgroundColor: "#d7d7fb" }, 
  { type: "dragon", color: "#5C41C9", backgroundColor: "#d3c9fb" }, 
  { type: "dark", color: "#6B5451", backgroundColor: "#bfb5b4" }, 
  { type: "steel", color: "#B7B7B7", backgroundColor: "#e2e5e7" },
  { type: "fairy", color: "#FFC8C8", backgroundColor: "#ffe3e3" },
];

const START_POKEMON = 0;
const END_POKEMON = 15;

let currentStartPokemon = START_POKEMON; // Track current starting index
let currentEndPokemon = END_POKEMON; // Track current ending index


let response
let currentPokemon;

async function init() {
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
    renderPokemonCard();
  }
}

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

function addCardClick() {
  const container = document.getElementById('pokeCardContanier');
  const pokeCards = container.querySelectorAll('.pokeCard');

  pokeCards.forEach(pokeCard => {
    pokeCard.addEventListener('click', function () {
      const cardId = pokeCard.id.replace('pokeCard-', ''); // Extract Pokemon ID from card ID
      renderPokemonInfo( cardId); // Pass card ID as argument
    });
  });
}

function addCardScroll() {
 // Add event listener for scroll event
const scrollElement = window.document.scrollingElement || window; // Determine appropriate scrolling element
scrollElement.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = scrollElement;

  // Check if near bottom and all Pokemon are not loaded
  if (scrollTop + clientHeight >= scrollHeight - BUFFER_DISTANCE && currentEndPokemon < ALL_POKEMON_COUNT) {
    loadMorePokemon();
  }
});
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
  InfoCardButton(clickedPokemon)
  infoSection(clickedPokemon);
}

function InfoCardButton(clickedPokemon) {
  let content = document.getElementById('top-Section');
  content.innerHTML += `
  <div class="info-btn">
  <button onclick="infoSection(${clickedPokemon})">Info</button>
  <button onclick="">Evolution</button>
  <button onclick="">Stats</button>
  <button onclick="">Moves</button>
  </div>
  `;
}

async function infoSection(clickedPokemon) {
  let content = document.getElementById('Info-Section');

  let abilitiesHTML = "";
  for (const ability of clickedPokemon.abilities) {
    abilitiesHTML += `<div>${ability.ability.name} </div>`; // Extract and display ability name
  }

 const url = clickedPokemon.species.url;
 const species = await fetch (url);
 const speciesJson = await species.json();

  content.innerHTML += `
  <div class="Info-section">
  <h3>Infos</h3>
  <div class="general-Info">
    <div><b>Weight:</b> ${(clickedPokemon.weight/10).toFixed(1)} kg</div>
    <div><b>Height:</b> ${(clickedPokemon.height/10).toFixed(1)} m</div>
    <div class="abilities"> <b>Abilities:</b> ${abilitiesHTML} </div>
    <div><b>Weakness:</b> </div>
    <div><b>flavor text:</b> <br> ${speciesJson['flavor_text_entries']['10']['flavor_text']} </div>
  </div>
  <br>
  <h3>Effectiveness of Types</h3>
  </div>
  `;
}



const ALL_POKEMON_COUNT = 1025;
const BUFFER_DISTANCE = 10;

async function loadMorePokemon() {
  // Check if all Pokemon are loaded
  if (currentEndPokemon >= ALL_POKEMON_COUNT) {
    console.warn("All Pokemon have been loaded.");
    return;
  }

  // Increase the starting and ending indices for loading
  currentStartPokemon += 15;
  currentEndPokemon = Math.min(currentEndPokemon + 50, ALL_POKEMON_COUNT); // Prevent exceeding total count

  for (let i = currentStartPokemon; i < currentEndPokemon; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    const response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonCard(); 
  }
  addCardScroll()
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

