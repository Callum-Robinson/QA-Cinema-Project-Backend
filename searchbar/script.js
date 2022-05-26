const movieCardTemplate = document.querySelector("[data-movie-template]")
const movieCardContainer = document.querySelector("[data-movie-cards-container]")
const searchInput = document.querySelector("[data-search")

searchInput.addEventListener("input", () => {
    const value = e.target.value
    console.log(value)
    
})

let movie = []

fetch("localhost:5000/movie")
.then(res => res.json())
.then(data => {
    movie = data.map(movie => {
        //fetches movies from database and then fills information into cards to display
        const card = movieCardTemplate.textContent.cloneNode(true).children[0]
        const header = card.querySelector("[data-header")
        const body = card.querySelector("[data-body")
        header.textContent = movie.title
        body.textContent = movie.description
        movieCardContainer.append(card)
        return { title: movie.title, description: movie.description, element: card }
    })    
})