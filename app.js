const pokedex_container = document.getElementById('pokedex_container');
const pokemon_number = 150;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#A9DFF9',
	ground: '#F4E7DA',
	rock: '#D5D5D4',
	fairy: '#FCEAFF',
	poison: '#E9E3FF',
	bug: '#F8D5A3',
	dragon: '#97B3E6',
	psychic: '#EAEDA1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
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

    const poke_types= pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1 );
    const tipo = type.charAt(0).toUpperCase() + type.substr(1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;
    const pokeInnerHTML = `
        <div class="imagen_container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
        </div>

        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${tipo}</span></small>
        </div>
    `;


    pokemonEl.innerHTML = pokeInnerHTML;
    pokedex_container.appendChild(pokemonEl);
}