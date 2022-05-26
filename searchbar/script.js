// thanks to Web Dev Simplified - https://youtu.be/TlP5WIxVirU 

const movie = require("../api/model/movie")

const movieCardTemplate = document.querySelector("[data-movie-template]")
const movieCardContainer = document.querySelector("[data-movie-cards-container]")
const searchInput = document.querySelector("[data-search")

searchInput.addEventListener("input", () => {
    const value = e.target.value.toLowerCase()
    movies.forEach(user => {
        const isVisible = movie.title.toLowerCase().includes(value) || 
        movie.description.toLowerCase().includes(value)
        movie.element.classList.toggle("hide", !isVisible)
    })
    
})

let movies = []

fetch("http://localhost:5000/movie")
.then(res => res.json())
.then(data => {
    movies = data.map(movie => {
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