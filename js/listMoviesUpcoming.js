const movieCarousel = document.querySelector('[data-movies-carousel]');
const indicatorsCarousel = document.querySelector('[data-movies-indicators]');


async function listMoviesUpcoming() {
    try {
        const movies = await fetch(`${URLSERVER}/movie/upcoming?language=es-ES`, options);

        const response = await movies.json();
        return response;

    } catch (error) {
        console.log(error);

    }
}


async function renderMoviesUpcoming() {
    const moviesUpcoming = await listMoviesUpcoming();
    const movies = moviesUpcoming.results

    const overview = `${moviesUpcoming.results[0].overview}`;

    const indicator1=  ` 
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
        class="active" aria-current="true" aria-label="Slide 1"></button>`;

    indicatorsCarousel.innerHTML = indicatorsCarousel.innerHTML + indicator1;

    const item1 =  `
    <div class="carousel-item active">
         <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movies[0].backdrop_path}" class="d-block w-100 img-bg-carousel" alt="${movies[0].title}">
         <div class="carousel-caption ">
            <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movies[0].poster_path}" class="d-block rounded" alt="${movies[0].title}">
            <div class="carousel-info">
                <h1 class="noto-font-bold">${movies[0].title}</h1>
                <h3 class="rubik-font-regular">${overview.substring(0,200)}...</h3>
                
            </div>
        </div>
    </div>`;

    movieCarousel.innerHTML = movieCarousel.innerHTML + item1;

    for(let i = 1; i < movies.length; i++){
        const item = `
        <div class="carousel-item">
            <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movies[i].backdrop_path}" class="d-block w-100 img-bg-carousel" alt="${movies[i].title}">
            <div class="carousel-caption ">
                <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${movies[i].poster_path}" class="d-block rounded" alt="${movies[i].title}">
                <div class="carousel-info">
                    <h1 class="noto-font-bold">${movies[i].title}</h1>
                    <h3 class="rubik-font-regular">${movies[i].overview.substring(0,200)}...</h3>
                    
                </div>
            </div>
        </div>`;

        const indicator = ` 
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"
        aria-label="Slide ${i}"></button>` ;

        indicatorsCarousel.innerHTML = indicatorsCarousel.innerHTML + indicator;
         movieCarousel.innerHTML = movieCarousel.innerHTML + item;

    }

   
}





renderMoviesUpcoming();