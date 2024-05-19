// Obtén la variable de la URL
const urlParams = new URLSearchParams(window.location.search);
const idMovie = urlParams.get('id');

//    console.log(decodeURIComponent(variableRecibida));

const URLSERVER = `https://api.themoviedb.org/3/movie/${idMovie}?language=es-ES`;
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};

const title = document.querySelector('[data-title]');
const info = document.querySelector('[data-info]');
const overview = document.querySelector('[data-overview]');
const image = document.querySelector('[data-image]');
const image2 = document.querySelector('[data-image2]');
const rated = document.querySelector('[data-rated]');
const genreContainer = document.querySelector('[data-genres]');

async function getMovie() {
    try {
        const movie = await fetch(URLSERVER, options);

        const response = await movie.json();
        console.log(response);
        return response;

    } catch (error) {
        console.log(error);

    }

}


async function showMovie(){
    try {
        const movie = await getMovie();

         title.innerHTML = movie.title;
         info.innerHTML= `
         ${movie.release_date}  • 
          <svg xmlns="http://www.w3.org/2000/svg" width="13"
         height="13" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
         <path
             d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
         <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
          </svg>${movie.runtime} min`;

          overview.innerHTML = `${movie.overview}`;
          image.innerHTML =  ` <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}"
          class="img-fluid rounded " alt="Alienoid">`;

          image2.setAttribute("src",`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`);

          rated.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor"
                                class="bi bi-star-fill" viewBox="0 0 16 16">
                                <path
                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>${movie.vote_average}`;

        // genero
        movie.genres.forEach(genre=> {
             const badge = 
             `<span class="badge rounded-pill text-badge-light">${genre.name}</span>` ;

             genreContainer.innerHTML = genreContainer.innerHTML + badge;
            
        });
          


    } catch (error) {
        console.log(error);

    }

}

showMovie();