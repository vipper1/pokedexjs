const pokedex_container = document.getElementById('pokedex_container');
const pokemon_number = 493;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#A9DFF9',
	ground: '#F4E7DA',
	rock: '#D5D5D4',
	fairy: '#FCEAFF',
	poison: '#b9a8ed',
	bug: '#F8D5A3',
	dragon: '#97B3E6',
	psychic: '#FFCAE6',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
    normal: '#F5F5F5',
    dark: '#bdbbbf',
    ghost: '#aeaaf7',
    ice: '#86D6D8'
};

const main_types = Object.keys(colors);
console.log(main_types)

const fetchPokemons = async () => {
    for(let i=1; i<=pokemon_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

fetchPokemons()

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    
    const poke_types= pokemon.types.map(el => el.type.name).join(', ')
    const type = main_types.find(type => poke_types.indexOf(type) > -1 )
    const tipo = poke_types.charAt(0).toUpperCase() + poke_types.substr(1)
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
    const weight = pokemon.weight;
    const height = pokemon.height;
    const health = pokemon.stats[0].base_stat;
    const attack = pokemon.stats[1].base_stat;
    const defense = pokemon.stats[2].base_stat;
    


    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
        <div class="imagen_container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>

        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <h4 class="stats"><i>Estadísticas</i></h4>
            <small class="type"><b>Tipo:</b> <span id="pcolor">${poke_types.toUpperCase()}</span></small><br>
            <small class="height"><b>Altura:</b> <span>${height.toString().padStart(2, '0')}m</span></small><br>
            <small class="weight"><b>Peso:</b> <span>${weight}kg</span></small><br>
            <small class="health"><b>Salud:</b> <span>${health} hp</span></small><br>
            <small class="health"><b>Ataque:</b> <span>${attack}</span></small><br>
            <small class="health"><b>Defensa:</b> <span>${defense}</span></small><br>
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;
    pokedex_container.appendChild(pokemonEl);
}

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})





