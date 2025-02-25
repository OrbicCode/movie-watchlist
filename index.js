const searchBtn = document.getElementById('search-btn')
const searchInput = document.getElementById('search-input')
const form = document.getElementById('search-bar')
let movieInfo = []

form.addEventListener('submit', handleSearch)

function handleSearch(e) {
    e.preventDefault()
    
    fetch(`http://www.omdbapi.com/?apikey=5a669f50&s=${searchInput.value}`)
    .then(res => res.json())
    .then(movies => getIds(movies))
}

function getIds(movies) {
    const movieIds = movies.Search.slice(0, 4).map((movie) => {
        return movie.imdbID
    })
    getMovieInfo(movieIds)
}

function getMovieInfo(movieIds) {
    movieIds.forEach((movieId) => {
        fetch(`http://www.omdbapi.com/?apikey=5a669f50&i=${movieId}`)
            .then(res => res.json())
            .then(movies => movieInfo.push(movies))
    })
    renderSearches(movieInfo)
}

function renderSearches(movieInfo) {
    if (movieInfo.length > 0) {
        const html = movieInfo.map((movie) => {
            return `
                <div class="movie-box">
                    <img class="poster" src="${movie.Poster}">
                    <div class="movie-info">
                        <div class="movie-title-rating">
                            <h2>${movie.Title}</h2>
                            <p class="rating">⭐️ ${movie.Ratings[0].Value}</p>
                        </div>
                        <div class="movie-time-genre">
                            <p class="runtime">${movie.Runtime}</p>
                            <p class="genre">${movie.Genre}</p>
                            <div class="add-remove-section">
                                <img class="add-remove-btn" src="/images/icon-2.png">
                                <p class="add-remove-text">Watchlist</p>
                            </div>
                        </div>
                        <p class="plot">${movie.Plot}</p>
                    </div>
                </div>`
        }).join('')

        document.getElementById('results').innerHTML = html
    } else {
        html = `
            <p>Unable to find what you’re looking for. Please try another search.</p>`

        document.getElementById('results').innerHTML = html
    }
}