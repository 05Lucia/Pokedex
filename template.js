
function topInfoCard(clickedPokemon) {
    let content = document.getElementById('top-Section');

    const firstType = clickedPokemon['types'][0]; // Get the first type
    const typeColor = TypeColors.find(color => color.type === firstType.type.name)?.color; // Find the matching color
    const secondColor = TypeColors.find(color => color.type === firstType.type.name)?.backgroundColor;

    const types = clickedPokemon['types'].map(type => {
        const typeColor = TypeColors.find(color => color.type === type.type.name)?.color;
        return `<div class="type" style="background-color: ${typeColor} ;">${type.type.name}</div>`;
    }).join('');
 
    // let pokemonBefor;
    // if (clickedPokemon.id !==1) {
    //   pokemonBefor = clickedPokemon.id--;
    //   return
    // }
    // let pokemonAfter; 
    // if (clickedPokemon.id !==1025) {
    //   pokemonAfter = clickedPokemon.id++;
    //   return
    // } not workin jet!!!

    content.innerHTML += `
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
   
     `;
}