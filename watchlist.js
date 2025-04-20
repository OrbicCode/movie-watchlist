document.addEventListener('DOMContentLoaded', () => {
    const watchlistContainer = document.getElementById('watchlist-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || {};

    if (Object.keys(watchlist).length === 0) {
        watchlistContainer.innerHTML = `
            <div>
                <p class="watchlist-empty">Your watchlist is empty. Add some movies!</p>
            </div>
        `;
        return;
    }

    for (const movieId in watchlist) {
        const movieHTML = watchlist[movieId].replace(
            '<p>Watchlist</p>',
            '<p>Remove</p>'
        )
        .replace('images/icon-4.png', 'images/icon-5.png');
        watchlistContainer.innerHTML += movieHTML;
    }
});

document.addEventListener('click', (e) => {
    const movieId = e.target.dataset.movieId;
    if (e.target.parentElement.innerHTML.includes('Remove')) {
        removeFromWatchlist(movieId);
    }
});

function removeFromWatchlist(movieId) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || {};
    
    if (watchlist[movieId]) {
        delete watchlist[movieId];
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        
        location.reload();
    }
}