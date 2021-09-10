const divPokemones = document.querySelector('#pokemones');
const input        = document.querySelector('#buscador');
const boton        = document.querySelector('#boton');
const body         = document.body;

const crearPokeHtml = (pokemon) => {
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
const filtrarPokes = (arregloPok) => {
    
    if (input.value != '') {
        // console.log(arregloPok);
        const inputBus = input.value.toLowerCase();
        for ( nombre of arregloPok) {
            if (nombre.indexOf(inputBus) != -1 ) {
                console.log(body);

                
            }
        }
        // const inputBus = input.value.toLowerCase();
        // for (nombre of arregloPok) {
        //     if (nombre.indexOf(inputBus) != -1) {
        //         console.log( nombre );
        //     }
        // }
    } else {
        console.log('esta vacio guey');
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
                arrPokes.push(pokemon.name)
                crearPokeHtml(pokemon)
                if (arrPokes.length >=50 ) {
                    console.log(arrPokes);
                    input.addEventListener('keyup', (e) => {
                        if (e.keyCode == 13) {
                            filtrarPokes(arrPokes)
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
// boton.addEventListener('click', filtrarPokes)
// input.addEventListener('keyup', (e) => {
//     if (e.keyCode == 13) {
//         filtrarPokes()
//     }
// })

recuperarDatos();