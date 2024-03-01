let TypeColors = [
  { type: "normal", color: "#BEBEBE", backgroundColor: "#e6e6e6" }, // Based on light beige
  { type: "fire", color: "#FF7F5E", backgroundColor: "#ffc3b3" }, // Lighter orange
  { type: "water", color: "#63B3FF", backgroundColor: "#b3ceff" }, // Lighter blue
  { type: "electric", color: "#FFD700", backgroundColor: "#ffebd3" }, // Remains as original
  { type: "grass", color: "#77C763", backgroundColor: "#c3e3b3" }, // Lighter green
  { type: "ice", color: "#97D9D9", backgroundColor: "#d3e3e3" }, // Remains as original
  { type: "fighting", color: "#C74040", backgroundColor: "#e3b3b3" }, // Lighter red
  { type: "poison", color: "#A065FC", backgroundColor: "#d3b3d3" }, // Lighter purple
  { type: "ground", color: "#C2A18C", backgroundColor: "#d3c3b3" }, // Lighter brown
  { type: "flying", color: "#87CEEB", backgroundColor: "#c3e3ef" }, // Lighter sky blue
  { type: "psychic", color: "#F48FB3", backgroundColor: "#ffe3e3" }, // Lighter pink
  { type: "bug", color: "#B0C04E", backgroundColor: "#d3e3b3" }, // Lighter green
  { type: "rock", color: "#8C8B8A", backgroundColor: "#c3b3b3" }, // Lighter gray
  { type: "ghost", color: "#8080BE", backgroundColor: "#c3c3d3" }, // Lighter purple
  { type: "dragon", color: "#5C41C9", backgroundColor: "#c3b3ef" }, // Lighter blue
  { type: "dark", color: "#6B5451", backgroundColor: "#c3b3b3" }, // Lighter gray
  { type: "steel", color: "#B7B7B7", backgroundColor: "#d3d3d3" }, // Remains as original
  { type: "fairy", color: "#FFC8C8", backgroundColor: "#ffe3e3" }, // Lighter pink
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

async function renderPokemonInfo(cardId) {
  const content = document.getElementById('info-card');

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${cardId}`);
  const clickedPokemon = await response.json();
  // Build HTML content based on clickedPokemon information

  const firstType = clickedPokemon['types'][0]; // Get the first type
  const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color
  const secondColor = TypeColors.find(color => color.type === firstType.type.name)?.backgroundColor;

  const types = clickedPokemon['types'].map(type => {
  const typeColor = TypeColors.find(color => color.type === type.type.name)?.color;
  return `<div class="type" style="background-color: ${typeColor}">${type.type.name}</div>`;
  }).join('');

  content.innerHTML = `
  <div class="info-card-top" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor});">
    <div class="top-card">
      <h2>${clickedPokemon.name}</h2>
      <p>ID: #${clickedPokemon.id.toString().padStart(4, '0')}</p>
    </div>
    <div class="types">${types}</div>
    </div>
      <img src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}" alt="${clickedPokemon.name}">
  
    `;
}

async function loadMorePokemon() {
  currentStartPokemon += 15;
  currentEndPokemon += 15;

  // Check for more Pokemon
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + (END_POKEMON + 1));
  if (!response.ok) {
    console.warn("No more Pokemon to load.");
    return;
  }

  // Render the new Pokemon (using a loop outside the function)
  for (let i = currentStartPokemon; i < currentEndPokemon; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    const response = await fetch(url);
    currentPokemon = await response.json();
    const pokemonHTML = renderPokemonCard(currentPokemon); // Call renderPokemonInfo with the Pokemon data
  }
}




