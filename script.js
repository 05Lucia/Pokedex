let TypeColors = [
    { type: "normal", color: "#A8A8A8" },
    { type: "fire", color: "#FF8C00" },
    { type: "water", color: "#0070FF" },
    { type: "electric", color: "#FFD700" },
    { type: "grass", color: "#7ACC00" },
    { type: "ice", color: "#97D9D9" },
    { type: "fighting", color: "#C02942" },
    { type: "poison", color: "#A040A0" },
    { type: "ground", color: "#AB9879" },
    { type: "flying", color: "#94d9ed" },
    { type: "psychic", color: "#F85888" },
    { type: "bug", color: "#A7B723" },
    { type: "rock", color: "#a38c21" },
    { type: "ghost", color: "#70689F" },
    { type: "dragon", color: "#6F35FC" },
    { type: "dark", color: "#70574A" },
    { type: "steel", color: "#B7B7CE" },
    { type: "fairy", color: "#FFAE9A" },
];

const START_POKEMON = 0;
const END_POKEMON = 15;

let currentStartPokemon = START_POKEMON; // Track current starting index
let currentEndPokemon = END_POKEMON; // Track current ending index



let currentPokemon;

async function init() {
    const container = document.getElementById('pokeCardContanier');
    container.innerHTML = '';
    await lodePokemon()
    await renderPokemonInfo();
}

async function lodePokemon() {
    for (let i = START_POKEMON; i < END_POKEMON; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`
        const response = await fetch(url);
        currentPokemon = await response.json();
        renderPokemonInfo();
    }
}

function renderPokemonInfo() {
    const currentPokemonImg = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    const container = document.getElementById('pokeCardContanier');

    const firstType = currentPokemon['types'][0]; // Get the first type
    const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color

    const types = currentPokemon['types'].map(type => {
        const typeColor = TypeColors.find(color => color.type === type.type.name)?.color;
        return `<div class="type" style="background-color: ${typeColor}">${type.type.name}</div>`;
    }).join('');

    container.innerHTML += `
      <div class="pokeCard" style="background-color: ${typeColor}">
        <div class="top-card">
          <h3>${currentPokemon.name}</h3>
          <div>#${currentPokemon.id.toString().padStart(4, '0')}</div>
        </div>
        <div class="types">${types}</div>
        <img src="${currentPokemonImg}" alt="">
        <div class="bottom-box"></div>
      </div>
    `;
}

// function that lets you load 15 more Pokemon!
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
      const pokemonHTML = renderPokemonInfo(currentPokemon); // Call renderPokemonInfo with the Pokemon data
    }
  
    // Return a promise to indicate completion (optional)
    return new Promise((resolve) => resolve());
  }
