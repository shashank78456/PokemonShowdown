async function getPokemonDataAPI(pokemon) {
    return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(response => {
        if(!response.ok) {
            console.error("Network Error");
        }
        resolve(response.json());
    })
    .then(data => console.log(data))
    .catch(error => console.error("Problem with fetch", error));
    });
}

async function getPokemonListAPI() {
    return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302`)
    .then(response => {
        if(!response.ok) {
            console.error("Network Error");
        }
        resolve(response.json());
    })
    .then(data => console.log(data))
    .catch(error => console.error("Problem with fetch", error));
    });
}

async function getPokemonFormAPI(pokemon) {
    return new Promise((resolve) => {
    fetch(`https://pokeapi.co/api/v2/pokemon-form/${pokemon}`)
    .then(response => {
        if(!response.ok) {
            console.error("Network Error");
        }
        return resolve(response.json());
    })
    .then(data => console.log(data))
    .catch(error => console.error("Problem with fetch", error));
    });
}

async function getPokemonList() {
    pokelist = [];
    const response = await getPokemonListAPI();
    dictList = response.results;
    return new Promise((resolve) => {
    for(let i=0; i<dictList.length; i++) {
        pokelist.push(dictList[i].name);
    }
    resolve(pokelist);
    });
}

async function getPokemonForm(pokemon) {
    const response = await getPokemonFormAPI(pokemon);
    const front = response.sprites.front_default;
    const back = response.sprites.back_default;
    const form = [front, back];
    return new Promise((resolve) => {
        resolve(form);
    });
}

async function getPokemonStats(pokemon) {
    const response = await getPokemonDataAPI(pokemon);
    const hp = response.stats[0].base_stat * 4;
    const attack = response.stats[1].base_stat;
    const defense = response.stats[2].base_stat;
    const speed = response.stats[3].base_stat;
    const stats = { hp: hp, attack: attack, defense: defense, speed: speed };
    return new Promise((resolve) => {
        resolve(stats);
    })
} 

async function getPokemonSound(pokemon) {
    const response = await getPokemonDataAPI(pokemon);
    const sound = response.cries.legacy;
    return new Promise((resolve) => {
        resolve(sound);
    })
}