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

    document.body.style.paddingTop = "3%";
    document.getElementsByClassName("main")[0].style.display = "flex";

    const mainarea = document.getElementsByClassName("main")[0];
    const wait = document.createElement("div");
    wait.innerHTML = "Loading... Please Wait";
    wait.style.fontSize = "2rem";
    mainarea.append(wait);

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

    document.getElementById("1ball1").src = Player1.pokemons[1].form[1];
    document.getElementById("1ball2").src = Player1.pokemons[2].form[1];


    document.getElementById("2ball1").src = Player2.pokemons[1].form[0];
    document.getElementById("2ball2").src = Player2.pokemons[2].form[0];

    setTimeout(()=>{},500);

    mainarea.removeChild(wait);

    const mainArea = document.getElementsByClassName("main")[0];
    const enter = document.createElement("div");
    enter.innerHTML = "Press any key to Continue";
    enter.style.fontSize = "2rem";
    mainArea.append(enter);

    placePokemon(Player1.pokemons[0], 1, true);
    placePokemon(Player2.pokemons[0], 0, true);

    let currentPokemon1 = Player1.pokemons[0];
    let currentPokemon2 = Player2.pokemons[0];

    document.body.addEventListener("keydown", (e) => {
        key = e.key;

        enter.style.display = "none";

        if(key === "ArrowLeft" || key === "ArrowRight") {
            attack(currentPokemon2,0, currentPokemon1,1);
        }
        else if(key === "ArrowUp") {
            move(currentPokemon2, 0, "up");            
        }
        else if(key === "ArrowDown") {
            move(currentPokemon2, 0, "down");
        }

        if(key === "a" || key === "d") {
            attack(currentPokemon1,1, currentPokemon2,0);
        }
        else if(key === "w") {
            move(currentPokemon1, 1, "up"); 
        }
        else if(key === "s") {
            move(currentPokemon1, 1, "down");
        }

        const poke1Name = document.getElementById("poke1-name");
        const hpBar1 = document.getElementById("poke1-hp");
        const hpBar2 = document.getElementById("poke2-hp");
        const poke2Name = document.getElementById("poke2-name");

        
        poke1Name.innerHTML = currentPokemon1.name.toUpperCase();
        hpBar1.innerHTML = `${currentPokemon1.stats.hp} HP`;
        poke2Name.innerHTML = currentPokemon2.name.toUpperCase();
        hpBar2.innerHTML = `${currentPokemon2.stats.hp} HP`;

        if(currentPokemon1.stats.hp===0 && Player1.pokemonNumber>0){
            Player1.pokemonNumber-=1;
            removePokemon(1);
            if(Player1.pokemonNumber!==0){document.getElementById("player-number1").removeChild(document.getElementById(`1ball${Player1.pokemonNumber}`));}
            currentPokemon1 = Player1.pokemons[Player1.pokemonNumber];
            if(Player1.pokemonNumber!=0){placePokemon(currentPokemon1, 1, false);}
        }
        if(currentPokemon2.stats.hp===0 && Player2.pokemonNumber>0){
            Player2.pokemonNumber-=1;
            removePokemon(0);
            if(Player2.pokemonNumber!==0){document.getElementById("player-number2").removeChild(document.getElementById(`2ball${Player2.pokemonNumber}`));}
            currentPokemon2 = Player2.pokemons[Player2.pokemonNumber];
            if(Player2.pokemonNumber!=0){placePokemon(currentPokemon2, 0, false);}
        }

        if(Player1.pokemonNumber===0 && Player2.pokemonNumber===0){showResult("draw");}
        else if(Player1.pokemonNumber===0){showResult(Player2.name);}
        else if(Player2.pokemonNumber===0){showResult(Player1.name);}
    });
}

function showResult(verdict) {
    document.getElementById("fight-area").style.display = "none";
    document.getElementById("poke-number").style.display = "none";
    document.getElementById("hp-bars").style.display = "none";
    const results  = document.getElementById("results");
    results.style.display = "flex";
    results.innerHTML = "DRAW";
    if(verdict===Player1.name || verdict===Player2.name) {
        results.innerHTML = `${verdict} is the Winner!!!`;
    }
    const replay  = document.getElementById("replay");
    replay.style.display = "flex";
    replay.style.padding = "2rem";
    replay.style.fontSize = "1.5rem";
    replay.innerHTML = "Press Enter to Replay";

    document.body.addEventListener("keydown", (e) => {
        key = e.key;
        if(key==="Enter"){location.reload();}
    } )
}

function placePokemon(pokemon, side, first){
    const area = document.getElementById("fight-area");

    const image = document.createElement("img");
    image.id = `poke${Math.abs(side)}`;
    image.src = pokemon.form[side];

    image.style.left = (side===1)?'0rem':'36rem';
    image.style.top = '11.5rem';
    
    area.appendChild(image);
}

function removePokemon(id) {
    const area = document.getElementById("fight-area");
    const pokemon = document.getElementById(`poke${id}`);
    area.removeChild(pokemon);
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
    let start = (aid===1)?2:34;
    let end = (aid===1)?34:2;
    throwBall(start, end, parseFloat((document.getElementById(`poke${aid}`).style.top.substring(0,document.getElementById(`poke${aid}`).style.top.length-3))));
    if(Math.abs(Math.round(parseFloat((document.getElementById(`poke${aid}`).style.top.substring(0,document.getElementById(`poke${aid}`).style.top.length-3))) - Math.round(parseFloat(document.getElementById(`poke${did}`).style.top.substring(0,document.getElementById(`poke${did}`).style.top.length-3)))))<=1.5) {
        defender.stats.hp-=attacker.stats.attack;
        if(defender.stats.hp<0){defender.stats.hp=0;}
    }
}

function throwBall(start, end, top) {
    const ball = document.getElementById("ball");
    ball.style.display = "block";
    ball.style.top = `${top+3.5}rem`;
    ball.style.width = `2rem`;
    ball.style.height = `2rem`;
    if(start<end){
        let i = start;
        let animation = setInterval(()=>{i++; console.log(i); ball.style.left = `${i}rem`;         if(i>=end){clearInterval(animation);        ball.style.display = "none";}}, 50);
    }
    else { 
        let i = start;
        let animation = setInterval(()=>{i--; console.log(i); ball.style.left = `${i}rem`;        if(i<=end){clearInterval(animation);        ball.style.display = "none";}}, 50);
    }
}

