
function topInfoCard(clickedPokemon) {
    let content = document.getElementById('top-Section');

    const firstType = clickedPokemon['types'][0]; // Get the first type
    const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color
    const secondColor = TypeColors.find(color => color.type === firstType.type.name)?.backgroundColor;

    const types = clickedPokemon['types'].map(type => {
        const typeColor = TypeColors.find(color => color.type === type.type.name)?.color;
        return `<div class="type" style="background-color: ${typeColor}">${type.type.name}</div>`;
    }).join('');

    content.innerHTML += `
   <div class="info-card-top" style="background-image: linear-gradient(to bottom, ${typeColor}, ${secondColor});">
     <div class="top-card-info">
       <h2>${clickedPokemon.name}</h2>
       <p>ID: #${clickedPokemon.id.toString().padStart(4, '0')}</p>
     </div>
     <div class="types-Info">${types}</div>
     </div>
       <img src="${clickedPokemon['sprites']['other']['official-artwork']['front_default']}" alt="${clickedPokemon.name}">
   
     `;
}