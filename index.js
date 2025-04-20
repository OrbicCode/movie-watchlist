const form = document.getElementById("form")
const searchInput = document.getElementById("search-input")
const results = document.getElementById('results')
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = searchInput.value.toLowerCase().trim()
    results.innerHTML = ""
    
    fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.Search) {
                data.Search.slice(0, 3).forEach(movie => {
                    fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`)
                        .then(res => res.json())
                        .then(movieData => {
                            results.innerHTML += `
                                <div class="movie-box" id=${movieData.imdbID}>
                                    <img class="poster" src=${movieData.Poster}>
                                    <div>
                                        <div class="title-rating">
                                            <h2>${movieData.Title}</h2>
                                            <p class="rating">⭐️ ${movieData.Ratings[0].Value.slice(0, 3)}</p>
                                        </div>
                                        <div class="runtime-genre-watchlist">
                                            <p>${movieData.Runtime}</p>
                                            <p>${movieData.Genre}</p>
                                            <div class="watchlist-btn">
                                                <img src="images/icon-4.png" data-movie-id="${movieData.imdbID}">
                                                <p>Watchlist</p>
                                            </div>
                                        </div>
                                        <p class="plot">${movieData.Plot}</p>
                                    </div>
                                </div>
                            `;
                        })
                })
            }}) 

})

document.addEventListener('click', (e) => {
    const watchlistBtnId = e.target.dataset.movieId
    if (watchlistBtnId) {
        const movieBox = document.getElementById(watchlistBtnId);
        
        if (movieBox) {
            saveToWatchlist(watchlistBtnId, movieBox.outerHTML);
        }
    }

    
})

function saveToWatchlist(movieId, movieBox) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || {}
    
    if (!watchlist[movieId]) {
        watchlist[movieId] = movieBox
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    } else {
        alert('Movie is already in your watchlist!');
    }
}

