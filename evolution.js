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

async function eevee(evolvesTo, content, evolutionJson) {
  // Check if the evolution chain corresponds to Eevee (8 evolutions)
  if (evolvesTo.length === 8) {
    // Fetch Eevee's base data
    const eeveeData = await fetchEeveeBaseData(evolutionJson);
    const eeveeImg = eeveeData.sprites.other['official-artwork'].front_default;

    // Fetch data for all Eevee evolutions
    const evolutionData = await fetchEeveeEvolutions(evolvesTo);

    // Update content with the Eevee template
    content.innerHTML += eeveeTemplate(
      evolutionJson,
      evolvesTo,
      evolutionData.eeveeFairyImg,
      evolutionData.eeveeIceImg,
      evolutionData.eeveeGrassImg,
      evolutionData.eeveeFairyEvo1,
      evolutionData.eeveeFairyEvo2,
      evolutionData.eeveeIceEvo,
      evolutionData.eeveeGrassEvo,
      evolutionData.eeveeDarkImg,
      evolutionData.eeveeDarkEvo,
      eeveeImg,
      evolutionData.eeveeWaterImg,
      evolutionData.eeveeElectricityImg,
      evolutionData.eeveeFireImg,
      evolutionData.eeveeWaterEvo,
      evolutionData.eeveeElectricityEvo,
      evolutionData.eeveeFireEvo,
      evolutionData.eeveePsyImg,
      evolutionData.eeveePsyEvo
    );
  }
}

async function fetchEeveeBaseData(evolutionJson) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${evolutionJson.chain.species.name}`
  );
  return await response.json();
}

async function fetchEeveeEvolutions(evolvesTo) {
  // Initialize an object to store evolution data
  const evolutionData = {};

  // Map evolution indices to variable names
  const evolutionMap = {
    0: { name: 'Water', imgKey: 'eeveeWaterImg', evoKey: 'eeveeWaterEvo' },
    1: { name: 'Electricity', imgKey: 'eeveeElectricityImg', evoKey: 'eeveeElectricityEvo' },
    2: { name: 'Fire', imgKey: 'eeveeFireImg', evoKey: 'eeveeFireEvo' },
    3: { name: 'Psy', imgKey: 'eeveePsyImg', evoKey: 'eeveePsyEvo' },
    4: { name: 'Dark', imgKey: 'eeveeDarkImg', evoKey: 'eeveeDarkEvo' },
    5: { name: 'Grass', imgKey: 'eeveeGrassImg', evoKey: 'eeveeGrassEvo', evoDetailIndex: 3 },
    6: { name: 'Ice', imgKey: 'eeveeIceImg', evoKey: 'eeveeIceEvo', evoDetailIndex: 3 },
    7: {
      name: 'Fairy',
      imgKey: 'eeveeFairyImg',
      evoKey1: 'eeveeFairyEvo1',
      evoKey2: 'eeveeFairyEvo2',
    },
  };

  // Loop through each of Eevee's evolutions
  for (let i = 0; i < evolvesTo.length; i++) {
    const speciesName = evolvesTo[i].species.name;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${speciesName}`
    );
    const evolution = await response.json();
    const evolutionImg =
      evolution.sprites.other['official-artwork'].front_default;

    const evoDetailIndex = evolutionMap[i].evoDetailIndex || 0;
    const evolutionDetails = evolvesTo[i].evolution_details;

    // Assign image and evolution details to the evolutionData object
    evolutionData[evolutionMap[i].imgKey] = evolutionImg;

    if (i === 7) {
      // Handle the special case for Fairy evolution with multiple evolution details
      evolutionData[evolutionMap[i].evoKey1] = evolutionDetails[0];
      evolutionData[evolutionMap[i].evoKey2] = evolutionDetails[1];
    } else {
      evolutionData[evolutionMap[i].evoKey] = evolutionDetails[evoDetailIndex];
    }
  }

  return evolutionData;
}

function evolutionDetails(pokemon) {
  if (!pokemon) {
    return 'Unknown';
  }

  const details = [];

  addMinHappiness(pokemon, details);
  addMinAffection(pokemon, details);
  addItemUsage(pokemon, details);
  addTimeOfDay(pokemon, details);
  addLocation(pokemon, details);
  addMinLevel(pokemon, details);
  addTurnUpsideDown(pokemon, details);
  addTriggerOther(pokemon, details);
  addHeldItem(pokemon, details);
  addKnownMove(pokemon, details);
  addNeedsOverworldRain(pokemon, details);
  addTriggerTrade(pokemon, details);

  return details;
}

function addMinHappiness(pokemon, details) {
  // Check for minimum happiness
  if (pokemon.min_happiness) {
    const minHappiness = pokemon.min_happiness;
    details.push(`Happiness Level: ${minHappiness}`);
  }
}

function addMinAffection(pokemon, details) {
  // Check for minimum affection
  if (pokemon.min_affection) {
    const affection = pokemon.min_affection;
    details.push(`Min Affection: ${affection}`);
  }
}

function addItemUsage(pokemon, details) {
  // Check for item usage
  if (pokemon.item && pokemon.item.name) {
    const item = pokemon.item.name;
    details.push(`Use ${item}`);
  }
}

function addTimeOfDay(pokemon, details) {
  // Check for time of day
  if (pokemon.time_of_day) {
    const time = pokemon.time_of_day;
    details.push(`Time ${time}`);
  }
}

function addLocation(pokemon, details) {
  // Check for location
  if (pokemon.location && pokemon.location.name) {
    const location = pokemon.location.name;
    details.push(`Go to ${location}`);
  }
}

function addMinLevel(pokemon, details) {
  // Check for minimum level
  if (pokemon.min_level) {
    const lvl = pokemon.min_level;
    details.push(`Level ${lvl}+`);
  }
}

function addTurnUpsideDown(pokemon, details) {
  // Check if needs to turn upside down
  if (pokemon.turn_upside_down === true) {
    details.push(`Turn upside down`);
  }
}

function addTriggerOther(pokemon, details) {
  // Check if trigger is 'other'
  if (pokemon.trigger && pokemon.trigger.name === 'other') {
    details.push(`Other`);
  }
}

function addHeldItem(pokemon, details) {
  // Check for held item
  if (pokemon.held_item && pokemon.held_item.name) {
    const item = pokemon.held_item.name;
    details.push(`Use ${item}`);
  }
}

function addKnownMove(pokemon, details) {
  // Check for known move
  if (pokemon.known_move && pokemon.known_move.name) {
    const move = pokemon.known_move.name;
    details.push(`Level up knowing ${move}`);
  }
}

function addNeedsOverworldRain(pokemon, details) {
  // Check if needs overworld rain
  if (pokemon.needs_overworld_rain === true) {
    details.push(`In Rain`);
  }
}

function addTriggerTrade(pokemon, details) {
  // Check if trigger is 'trade'
  if (pokemon.trigger && pokemon.trigger.name === 'trade') {
    const trade = pokemon.trigger.name;
    details.push(` ${trade}`);
  }
}
