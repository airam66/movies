

const movieContainer = document.querySelector('[data-movie]');


async function listMovies() {
    try {
        const movies = await fetch(`${URLSERVER}/movie/top_rated?language=es-ES`, options);

        const response = await movies.json();
        return response;

    } catch (error) {
        console.log(error);

    }

}



// crea una card con la pelicula
function createCard(movie) {
    const card = document.createElement('a');
    const date = `${movie.release_date}`;
    card.innerHTML = `
    <a id="${movie.id}" href="pelicula.html?id=${movie.id}">
        <figure class="figure card-img">
            <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}"
                    alt="${movie.title}" class="w-100 rounded">
            <div class="card-data rounded">
                <h3 class="card-title"> ${movie.title}</h3>
                <h6>${date.substring(0,4)}</h6>
                <span class="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                    class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg> ${movie.vote_average}</span>
               
            </div>
        </figure>
    </a>`;

    return card;

}



// muestra la lista de peliculas

async function renderMovies() {
    try {
        const movies = await listMovies();

        movies.results.forEach(movie => {
            movieContainer.appendChild(
                createCard(
                    movie
                )
            )

        });

    } catch (error) {
        console.log(error);
    }
}



renderMovies();






