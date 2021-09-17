const divPokemones  = document.querySelector('#pokemones_estatico');
const divPokeBuscar = document.querySelector('#pokemones_buscar');
const divPokeTodos  = document.querySelector('#pokemones');
const input         = document.querySelector('#buscador');
const divBuscador   = document.querySelector('#divBuscador');
const boton         = document.querySelector('#boton');
const body          = document.body;

let idPoke  = '';
const crearPokeHtmlEstatico = (pokemon) => {
    const pokeHtml = `
    <img src="${pokemon.sprites.front_default}" alt="">
    <div class="pokemon_caracteristicas">
        <h2>Nombre: ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</h2>
        <p>Altura: ${pokemon.height/10 } mts</p>
        <p>Peso: ${pokemon.weight/10}  kg</p>
    </div>
    `;
    const divPoke = document.createElement('div');
    divPoke.innerHTML = pokeHtml;
    divPoke.classList.add('pokemones_pokemon');
    divPoke.id = pokemon.name;
    divPokemones.append(divPoke);

}
const crearPokeHtmlBuscar = (pokemon) => {
    const pokeHtml = `
    <img src="${pokemon.sprites.front_default}" alt="imagen pokemon">
    <h2>Nombre: ${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</h2>
    <div class="pokemon_caracteristicas">
        <p>Altura: ${pokemon.height/10 } mts</p>
        <p>Peso: ${pokemon.weight/10}  kg</p>
    </div>
    `;
    const divPoke = document.createElement('div');
    divPoke.innerHTML += pokeHtml;
    divPoke.classList.add('pokemones_pokemon');
    divPoke.id = pokemon.name
    divPokeBuscar.append(divPoke);

}

const filtrarPokes = (arregloPok) => {

    if (input.value != '') {
        // console.log(arregloPok);

        const inputBus = input.value.toLowerCase();
        let pokitos = [];
        // console.log(pokitos);
        divPokeBuscar.innerHTML = '';
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
            } else {
                pokitos.push(pokemon.name);

                // console.log(pokitos);
            }

        }
        if ( divPokeBuscar.innerHTML == '') {
            divPokemones.style.display = 'none'
            // console.log('pokemon no encontrado');
            if (!(divBuscador.children > 1)) {
                const h2Error = document.createElement('h3');
                h2Error.innerHTML = 'No se ha encontrado el Pokemon';
                divPokeBuscar.append(h2Error);

                // console.log('no tiene el mensaje de error');
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
        for (let i=0;i <= 59; i++) {
            fetch(`${pokemones[i].url}`).then(resp => resp.json()).then( pokemon => {
                arrPokes.push(pokemon)
                crearPokeHtmlEstatico(pokemon)
                if (arrPokes.length >=60 ) {
                    // console.log(arrPokes);
                    input.addEventListener('keyup', (e) => {
                        filtrarPokes(arrPokes)

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

const crearTarjetaPoke = (pokemon) => {
    const pokeHtml = `
    <div class="pokemonCarta">
        <h2 class="pokemonCarta_nombre">${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</h2>
        <div class="pokemonCarta_imagen">
        <img src="${pokemon.sprites.front_default}" alt="imagenFrente pokemon">
        <img src="${pokemon.sprites.back_default}" alt="imagenDetras pokemon">
        </div>
        <div class="pokemonCarta_stats">
            <h3>Salud: <span class="span1">✚ ${pokemon.stats[0].base_stat} puntos</span></h3>
            <h3>Ataque: <span class="span2">⚔ ${pokemon.stats[1].base_stat} puntos</span></h3>
            <h3>Defensa: <span class="span3">🛡 ${pokemon.stats[2].base_stat} puntos</span></h3>
            <h3>Velocidad: <span class="span4">🗲 ${pokemon.stats[5].base_stat} puntos</span></h3>
        </div>
    </div>
    `;
    const divPokeCarta = document.createElement('div');
    divPokeCarta.classList.add('overlay');
    divPokeCarta.innerHTML = pokeHtml;
    body.append(divPokeCarta);
    divPokeCarta.onclick = function() {
        divPokeCarta.remove();
    }

}

divPokeTodos.addEventListener('click', e => {
    // console.log(e.path);
    if (e.path.length > 6) {
        e.path.forEach( tarjeta => {
            if (tarjeta.classList == 'pokemones_pokemon') {
                // console.log(tarjeta)
                fetch(`https://pokeapi.co/api/v2/pokemon/${tarjeta.id}`)
                .then(resp => resp.json())
                .then(data => {
                    // console.log(data);
                    crearTarjetaPoke(data) 
                    
                })
            }
        })
    }
})
