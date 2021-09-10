const divPokemones  = document.querySelector('#pokemones_estatico');
const divPokeBuscar = document.querySelector('#pokemones_buscar');
const input         = document.querySelector('#buscador');
const divBuscador   = document.querySelector('#divBuscador');
const boton         = document.querySelector('#boton');
const body          = document.body;

const crearPokeHtmlEstatico = (pokemon) => {
    const pokeHtml = `
    <img src="${pokemon.sprites.front_default}" alt="">
    <h2>Nombre: ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</h2>
    <div class="pokemon_caracteristicas">
        <p>Altura: ${pokemon.height/10 } mts</p>
        <p>Peso: ${pokemon.weight/10}  kg</p>
    </div>
    `;
    const divPoke = document.createElement('div');
    divPoke.innerHTML = pokeHtml;
    divPoke.classList.add('pokemones_pokemon');
    divPokemones.append(divPoke);

}
const crearPokeHtmlBuscar = (pokemon) => {
    const pokeHtml = `
    <img src="${pokemon.sprites.front_default}" alt="">
    <h2>Nombre: ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</h2>
    <div class="pokemon_caracteristicas">
        <p>Altura: ${pokemon.height/10 } mts</p>
        <p>Peso: ${pokemon.weight/10}  kg</p>
    </div>
    `;
    const divPoke = document.createElement('div');
    divPoke.innerHTML += pokeHtml;
    divPoke.classList.add('pokemones_pokemon');
    divPokeBuscar.append(divPoke);

}
const filtrarPokes = (arregloPok) => {

    if (input.value != '') {
        // console.log(arregloPok);

        const inputBus = input.value.toLowerCase();
        let pokitos = [];
        for ( pokemon of arregloPok) {
            if (pokemon.name.indexOf(inputBus) != -1 ) {
                if (divPokeBuscar.innerHTML != '') {
                    // divPokeBuscar.innerHTML = '';
                    // console.log('ya se hizo la busqueda');
                } else {
                    divPokemones.style.display = 'grid'
                }
                divPokemones.style.display = 'none'
                crearPokeHtmlBuscar(pokemon)
                pokitos.push(pokemon)
            } else {

            }

        }
        
    } else {
        // console.log('esta vacio guey');
        if (divPokeBuscar.children.length > 0) {
            // console.log('ya hay pokemones creados');
            divPokeBuscar.innerHTML = ''
            // console.log(divPokeBuscar.children)
        } else {
            // console.log('aun no hay ');
        }
    }
}
const recuperarDatos = () => {
    let arrPokes    = [];
    fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150')
    .then( resp => resp.json())
    .then(data => {
        pokemones = data.results;
        for (let i=0;i <= 49; i++) {
            fetch(`${pokemones[i].url}`).then(resp => resp.json()).then( pokemon => {
                arrPokes.push(pokemon)
                crearPokeHtmlEstatico(pokemon)
                if (arrPokes.length >=50 ) {
                    // console.log(arrPokes);
                    input.addEventListener('keyup', (e) => {
                        // filtrarPokes(arrPokes)

                        if (e.target.value != '') {

                            if (e.keyCode == 13) {
                                filtrarPokes(arrPokes)
                            }
                        } else {
                            divPokemones.style.display = 'grid'
                            filtrarPokes()
                        }

                    })
                    boton.addEventListener('click', () => {
                        filtrarPokes(arrPokes)
                    })
                }
            })
        }

    })
    .catch(err => console.log(err))


}

recuperarDatos();