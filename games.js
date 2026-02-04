const gamesData = [
    {
        title: "Smashbit",
        description: "An arcade-defense clicker game with fun, simple gameplay and satisfying sound effects.",
        image: "images/smashbit.jpg",
        link: "/games/smashbit/",
        lastUpdated: "Last Updated: 17 Sep 2025"
    },
    {
        title: "SHAPE-buster", 
        description: "A quick, colorful and satisfying clicker game where you pop the SHAPES before time runs out. Yeah, that's it.",
        image: "images/shape-buster.jpg",
        link: "/games/shape-buster/",
        lastUpdated: "Last Updated: 5 Feb 2026"
    }
];

function generateGameCards() {
    const gamesContainer = document.querySelector('.games-container');
    
    if (!gamesContainer) {
        console.error('Games container not found!');
        return;
    }
    
    gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        const bannerContent = game.image 
            ? `<img src="${game.image}" alt="${game.title}">`
            : `<div class="placeholder-banner">Coming Soon</div>`;
        
        gameCard.innerHTML = `
            <a href="${game.link}" class="game-banner">
                ${bannerContent}
            </a>
            <div class="game-info">
                <h3 class="game-title">${game.title}</h3>
                <p class="game-description">${game.description}</p>
                <p class="last-updated">${game.lastUpdated}</p>
            </div>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

document.addEventListener('DOMContentLoaded', generateGameCards);