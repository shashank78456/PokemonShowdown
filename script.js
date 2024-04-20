class Pokemon {
    constructor(name, form, stats, sound){
        this.name = name;
        this.form = form;
        this.stats = stats;
        this.sound = sound;
    }
}

class Player {
    constructor(name, pokemons){
        this.name = name;
        this.pokemonNumber = 3;
        this.pokemons = pokemons;
    }
}

let Pokemon11 = new Pokemon();
let Pokemon12 = new Pokemon();
let Pokemon13 = new Pokemon();
let Pokemon21 = new Pokemon();
let Pokemon22 = new Pokemon();
let Pokemon23 = new Pokemon();
let Player1 = new Player(null, [Pokemon11, Pokemon12, Pokemon13]);
let Player2 = new Player(null, [Pokemon21, Pokemon22, Pokemon23]);

document.getElementById("play-btn").addEventListener("click",startGame);

function startGame() {
    document.getElementsByClassName("instructions")[0].style.display = "none";
    
    document.body.style.paddingTop = "10%";
    document.getElementsByClassName("player-init")[0].style.display = "flex";
    document.getElementsByClassName("player-init")[0].style.flexDirection = "column";
    document.getElementsByName("player")[0].addEventListener("submit", function(event) {

        event.preventDefault();
        const player1name = document.getElementById("player1").value;
        const player2name = document.getElementById("player2").value;
        if(player1name===null || player2name==null) {

        }
        Player1.name = player1name;
        Player2.name = player2name;
        document.getElementsByClassName("player-init")[0].style.display = "none";

        selectPokemons();
    });
}

async function selectPokemons() {
    document.getElementsByClassName("select-pokemon")[0].style.display = "flex";
    document.getElementById("player1-name").innerHTML = Player1.name;
    document.getElementById("player2-name").innerHTML = Player2.name;
    document.getElementById("player1-name").style.color = "orange";
    document.getElementById("player2-name").style.color = "orange";  
    
    const pokelist = await getPokemonList();
    for(let i=0; i<pokelist.length; i++) {
        let pokemon = pokelist[i];
        let opt = document.createElement("option");
        opt.value = pokemon;
        opt.text = pokemon;
        document.getElementById("pokemon11").append(opt);
    }
    for(let i=0; i<pokelist.length; i++) {
        let pokemon = pokelist[i];
        let opt = document.createElement("option");
        opt.value = pokemon;
        opt.text = pokemon;
        document.getElementById("pokemon12").append(opt);
    }
    for(let i=0; i<pokelist.length; i++) {
        let pokemon = pokelist[i];
        let opt = document.createElement("option");
        opt.value = pokemon;
        opt.text = pokemon;
        document.getElementById("pokemon13").append(opt);
    }
    for(let i=0; i<pokelist.length; i++) {
        let pokemon = pokelist[i];
        let opt = document.createElement("option");
        opt.value = pokemon;
        opt.text = pokemon;
        document.getElementById("pokemon21").append(opt);
    }
    for(let i=0; i<pokelist.length; i++) {
        let pokemon = pokelist[i];
        let opt = document.createElement("option");
        opt.value = pokemon;
        opt.text = pokemon;
        document.getElementById("pokemon22").append(opt);
    }
    for(let i=0; i<pokelist.length; i++) {
        let pokemon = pokelist[i];
        let opt = document.createElement("option");
        opt.value = pokemon;
        opt.text = pokemon;
        document.getElementById("pokemon23").append(opt);
    }

    document.getElementById("selector").addEventListener("submit", (event) => {

        event.preventDefault();
        let pokemon11 = document.getElementById("ipokemon11").value;
        let pokemon12 = document.getElementById("ipokemon12").value;
        let pokemon13 = document.getElementById("ipokemon13").value;
        let pokemon21 = document.getElementById("ipokemon21").value;
        let pokemon22 = document.getElementById("ipokemon22").value;
        let pokemon23 = document.getElementById("ipokemon23").value;

        let flag = false;
        for(i of pokelist) {if(pokemon11===i){flag=true;break;}else{flag=false;}}
        if(flag) {
        for(i of pokelist) {if(pokemon12===i){flag=true;break;}else{flag=false;}}
        if(flag) {
        for(i of pokelist) {if(pokemon13===i){flag=true;break;}else{flag=false;}}
        if(flag) {
        for(i of pokelist) {if(pokemon21===i){flag=true;break;}else{flag=false;}}
        if(flag) {
        for(i of pokelist) {if(pokemon22===i){flag=true;break;}else{flag=false;}}
        if(flag) {
        for(i of pokelist) {if(pokemon23===i){flag=true;break;}else{flag=false;}}
        }}}}}

        const pokemons1 = [pokemon11, pokemon12, pokemon13];
        const pokemons2 = [pokemon21, pokemon22, pokemon23];
        if(flag) {
            playMatch(pokemons1, pokemons2);
        }
        else{
            window.alert("Pokemon Does Not Exist!!! Please choose from drop-down list only.");
        }
    })

}

async function playMatch(pokemons1, pokemons2) {
    document.getElementsByClassName("select-pokemon")[0].style.display = "none";

    document.body.style.paddingTop = "5%";
    document.getElementsByClassName("main")[0].style.display = "flex";

    for(let i=0; i<3; i++) {
        let form = await getPokemonForm(pokemons1[i]);
        let stats = await getPokemonStats(pokemons1[i]);
        let sound = await getPokemonSound(pokemons1[i]);
        Player1.pokemons[i].name = pokemons1[i];
        Player1.pokemons[i].form = form;
        Player1.pokemons[i].stats = stats;
        Player1.pokemons[i].sound = sound;

    }
    for(let i=0; i<3; i++) {
        let form = await getPokemonForm(pokemons2[i]);
        let stats = await getPokemonStats(pokemons2[i]);
        let sound = await getPokemonSound(pokemons2[i]);
        Player2.pokemons[i].name = pokemons2[i];
        Player2.pokemons[i].form = form;
        Player2.pokemons[i].stats = stats;
        Player2.pokemons[i].sound = sound;
    }

    placePokemon(Player1.pokemons[0], 1);
    placePokemon(Player2.pokemons[0], 0);

    let currentPokemon1 = Player1.pokemons[0];
    let currentPokemon2 = Player2.pokemons[0];

    document.body.addEventListener("keydown", (e) => {
        key = e.key;

        if(key === "ArrowLeft" || key === "ArrowRight") {
            attack(currentPokemon2,0, currentPokemon1,1);
        }
        else if(key === "ArrowUp") {
            move(currentPokemon2, 0, "up");            
        }
        else if(key === "ArrowDown") {
            move(currentPokemon2, 0, "down");
        }
    });

    document.body.addEventListener("keydown", (e) => {
        key = e.key;

        if(key === "a" || key === "d") {
            attack(currentPokemon1,1, currentPokemon2,0);
        }
        else if(key === "w") {
            move(currentPokemon1, 1, "up"); 
        }
        else if(key === "s") {
            move(currentPokemon1, 1, "down");
        }
    });

    if(Player1.pokemonNumber==0 && Player2.pokemonNumber==0){showResult("draw");}
    else if(Player1.pokemonNumber==0){showResult(Player1.name);}
    else if(Player2.pokemonNumber==0){showResult(Player2.name);}
}

function showResult(verdict) {

}

function placePokemon(pokemon, side){
    const area = document.getElementById("fight-area");

    const image = document.createElement("img");
    image.id = `poke${Math.abs(side)}`;
    image.src = pokemon.form[side];

    image.style.left = (side===1)?'0rem':'36rem';
    image.style.top = '11.5rem';  
    
    area.appendChild(image);
}

function move(pokemon, id, direction) {
    let pokeimg = document.getElementById(`poke${id}`);
    let steps = (pokemon.stats.speed/100);
    if(direction==="up"){
        if(parseFloat(pokeimg.style.top.substring(0,pokeimg.style.top.length-3))>0){
            let pos = parseFloat(pokeimg.style.top.substring(0,pokeimg.style.top.length-3)) - steps;
            if(pos>0){pokeimg.style.top = pos + "rem";}            
        }
    }
    else if(direction==="down"){
        if(parseFloat(pokeimg.style.top.substring(0,pokeimg.style.top.length-3))<23){
            let pos = parseFloat(pokeimg.style.top.substring(0,pokeimg.style.top.length-3)) + steps;
            if(pos<23){pokeimg.style.top = pos + "rem";}            
        }
    }
}

function attack(attacker,aid, defender,did) {
    if(Math.round(parseFloat(document.getElementById(`poke${aid}`).style.top.substring(0,document.getElementById(`poke${aid}`).style.top.length-3))) === Math.round(parseFloat(document.getElementById(`poke${did}`).style.top.substring(0,document.getElementById(`poke${did}`).style.top.length-3)))) {
        defender.hp-=attacker.attack;
    }
}

{/* <div id="logo">
<img src="assets/imgbin_pokemon-logo-png.png">
</div> 



Put this logo*/}
