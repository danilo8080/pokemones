document.addEventListener("DOMContentLoaded", () => {
    const buscarBoton        = document.getElementById("buscarBoton");
    const idPokemonInput     = document.getElementById("idPokemon");
    const infoPokemon        = document.getElementById("infoPokemon");
    const nombrePokemon      = document.getElementById("nombrePokemon");
    const imagenPokemon      = document.getElementById("imagenPokemon");
    const tiposPokemon       = document.getElementById("tiposPokemon");
    const habilidadesPokemon = document.getElementById("habilidadesPokemon");

    buscarBoton.addEventListener("click", () => {
        const idPokemon = idPokemonInput.value.trim().toLowerCase();

        if (idPokemon === "") {
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${idPokemon}/`, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data                = JSON.parse(xhr.responseText);
                    nombrePokemon.textContent = data.name;
                    imagenPokemon.src         = data.sprites.front_default;

                    const tipos       = data.types.map((tipo) => tipo.type.name);
                    const habilidades = data.abilities.map((habilidad) => habilidad.ability.name);

                    tiposPokemon.innerHTML       = tipos.map((tipo) => `<li>${tipo}</li>`).join("");
                    habilidadesPokemon.innerHTML = habilidades.map((habilidad) => `<li>${habilidad}</li>`).join("");

                    infoPokemon.classList.remove("oculto");
                } else {
                    alert("Pokémon no encontrado. Por favor, verifica el ID o Nombre.");
                    nombrePokemon.textContent    = "";
                    imagenPokemon.src            = "";
                    tiposPokemon.innerHTML       = "";
                    habilidadesPokemon.innerHTML = "";
                    infoPokemon.classList.add("oculto");
                }
                idPokemonInput.value = "";
            }
        };

        xhr.send();
    });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/pokemones/sw.js")
        .then((registration) => {
          console.log("Service worker registered! 😎");
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
}
