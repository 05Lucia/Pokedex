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
    content.innerHTML += noEvolutionTemplate();
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
    const trigerFirstEvolution = evolvesTo['0']['evolution_details']['0'];

    content.innerHTML += normalEvolutionTemplateBaseAndFirst(evolutionJson, imgEvolution0, evolvesTo, imgEvolution1, trigerFirstEvolution);

    normalFirstSecondEvolution(evolvesTo)
  }
}

async function normalFirstSecondEvolution(evolvesTo) {
  if (evolvesTo['0']['evolves_to'].length >= 1) {
    let content = document.getElementById('mulitEvo');

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['evolves_to']['0']['species']['name']}`);
    const secondEvolution = await response2.json();
    const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];
    const trigerSecondEvolution = evolvesTo['0']['evolves_to']['0']['evolution_details']['0'];

    content.innerHTML += normalFirstSecondEvolutionTmplate(trigerSecondEvolution, evolvesTo, imgEvolution2);
    normalSecondSecondEvolution(evolvesTo);
  }
}

async function normalSecondSecondEvolution(evolvesTo) {
  if (evolvesTo['0']['evolves_to'].length === 2) { // so if ther is a 2. second evolution 
    let content = document.getElementById('mulitEvo');

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['evolves_to']['1']['species']['name']}`);
    const secondEvolution = await response2.json();
    const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];
    const trigerSecondEvolution = evolvesTo['0']['evolves_to']['1']['evolution_details']['0'];

    content.innerHTML += normalSecondSecondEvolutionTempalte(evolvesTo, trigerSecondEvolution, imgEvolution2);
  }
}

async function multiplEvolutions(evolvesTo, content, evolutionJson) {
  if (evolvesTo.length > 1 && evolvesTo.length <= 3) {
    const response0 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionJson['chain']['species']['name']}`);
    const baseEvolution = await response0.json();
    const imgEvolution0 = baseEvolution['sprites']['other']['official-artwork']['front_default'];

    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['species']['name']}`);
    const firstEvolution = await response1.json();
    const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];
    const trigerFirstEvolution = evolvesTo['0']['evolution_details']['0'];

    content.innerHTML += multiplEvolutionsBaseTemplate(evolutionJson, imgEvolution0, trigerFirstEvolution, evolvesTo, imgEvolution1);

    // first branch ----------------------------------------------------
    await multiplEvolutionsFirstBranch(evolvesTo);
    // second branch ---------------------------------------------------
    await multiplEvolutionsSecondBranch(evolvesTo);
    // third branch ----------------------------------------------------
    await multiplEvolutionsThirdBranch(evolvesTo);
  }
}

async function multiplEvolutionsFirstBranch(evolvesTo) {
  if (evolvesTo['0']['evolves_to'].length === 1) {
    let container = document.getElementById('evoBranch1');

    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['0']['evolves_to']['0']['species']['name']}`);
    const secondEvolution = await response2.json();
    const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];
    const trigerSecondEvolution = evolvesTo['0']['evolves_to']['0']['evolution_details']['0'];

    container.innerHTML += FirstBranchTemplate(trigerSecondEvolution, evolvesTo, imgEvolution2);
  }
}

async function multiplEvolutionsSecondBranch(evolvesTo) {
  if (evolvesTo.length >= 2 && evolvesTo.length <= 3) {
    let content = document.getElementById('first-evolution');

    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['1']['species']['name']}`);
    const firstEvolution = await response1.json();
    const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];
    const trigerFirstEvolution = evolvesTo['1']['evolution_details']['0'];

    content.innerHTML += SecondBranchFirstEvolutionTemplate(evolvesTo, imgEvolution1, trigerFirstEvolution);

    if (evolvesTo['1']['evolves_to'].length === 1) {
      let content = document.getElementById('evoBranch2');

      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['1']['evolves_to']['0']['species']['name']}`);
      const secondEvolution = await response2.json();
      const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];
      const trigerSecondEvolution = evolvesTo['1']['evolves_to']['0']['evolution_details']['0'];

      content.innerHTML += SecondBranchSecondEvolutionTemplate(evolvesTo, trigerSecondEvolution, imgEvolution2);
    }
  }
}



async function multiplEvolutionsThirdBranch(evolvesTo) {
  if (evolvesTo.length === 3) {
    let content = document.getElementById('first-evolution');

    const response1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['2']['species']['name']}`);
    const firstEvolution = await response1.json();
    const imgEvolution1 = firstEvolution['sprites']['other']['official-artwork']['front_default'];
    const trigerFirstEvolution = evolvesTo['2']['evolution_details']['0'];

    content.innerHTML += ThirdBranchFirstEvolutionTemplate(evolvesTo, trigerFirstEvolution, imgEvolution1);

    if (evolvesTo['2']['evolves_to'].length === 1) {
      let content = document.getElementById('evoBranch3');

      const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolvesTo['2']['evolves_to']['0']['species']['name']}`);
      const secondEvolution = await response2.json();
      const imgEvolution2 = secondEvolution['sprites']['other']['official-artwork']['front_default'];
      const trigerSecondEvolution = evolvesTo['2']['evolves_to']['0']['evolution_details']['0'];

      content.innerHTML += ThirdBranchSecondEvolutionTemplate(trigerSecondEvolution, evolvesTo, imgEvolution2);
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

    content.innerHTML += eeveeTemplate(evolutionJson, evolvesTo, eeveeFairyImg, eeveeIceImg, eeveeGrassImg, eeveeFairyEvo1, eeveeFairyEvo2, eeveeIceEvo, eeveeGrassEvo, eeveeDarkImg, eeveeDarkEvo, eeveeImg, eeveeWaterImg, eeveeElectricityImg, eeveeFireImg, eeveeWaterEvo, eeveeElectricityEvo, eeveeFireEvo, eeveePsyImg, eeveePsyEvo);
  }
}

function evolutionDetails(pokemon) {
  if (!pokemon) {
    return 'Unknown';
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
    details.push(` time ${time}`);
  } if (pokemon.location && pokemon.location.name) {
    location = pokemon.location.name;
    details.push(`Go to ${location}`);
  } if (pokemon.min_level) {
    lvl = pokemon.min_level;
    details.push(`Level ${lvl}+`);
  } if (pokemon.turn_upside_down === true) {
    details.push(`Turn upside down`);
  } if (pokemon.trigger.name === 'other') {
    details.push(`Other`);
  } if (pokemon.held_item && pokemon.held_item.name) {
    item = pokemon.held_item.name
    details.push(`Use ${item}`);
  } if (pokemon.known_move && pokemon.known_move.name) {
    move = pokemon.known_move.name;
    details.push(`Level up knowing ${move}`);
  } if (pokemon.needs_overworld_rain === true) {
    details.push(`in Rain`);
  } if (pokemon.trigger.name === 'trade') {
    trade = pokemon.trigger.name;
    details.push(` ${trade}`);
  }
  return details
}
