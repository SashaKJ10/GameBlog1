const express = require("express")
const router = express.Router()
const games = [
    {
        id: 1,
        image: "URL",
        name: "Game1",
        genres: ["Shooter"],
        platforms: ["PC"],
        description: "Some details about the Game1"
    },
    {
        id: 2,
        image: "URL",
        name: "Game2",
        genres: ["Shooter","Fantasy"],
        platforms: ["PC","Nintendo"],
        description: "Some details about the Game2"
    },
]

// GET:/games
router.get("/games", (req,res) => {
    res.json(games)
})
// GET:/games/:id
router.get("/games/:id", (req, res) => {
    const game = games.find(g => g.id === parseInt(req.params.id))
    if(!game) return res.status(404).send("Game not found")
    res.json(game)
})
// POST:/games
router.post("/games", (req, res) => {
    const gameExists = games.find(g => g.name === req.body.name)
    if(gameExists) return res.status(400).send("Game already exists")
    const game = {
        id: games.length + 1,
        image: req.body.image,
        name: req.body.name,
        genres: req.body.genres,
        platforms:req.body.platforms,
        description: req.body.description
    }
    games.push(game)
    res.json(game)
})

// PUT: /games/:id
router.put("/games/:id", (req, res) => {
    const game = games.find(g => g.id === parseInt(req.body.id))
    if(!game) return res.status(404).send("Game not found")
    const gameExists = games.find(g => g.name === req.body.name && g.id !== parseInt(req.params.id))
    if(gameExists) return res.status(400).send("Game already exits")
    game.image = req.body.image
    game.name = req.body.name
    game.genres = req.body.genres
    game.platforms = req.body.platforms
    game.description = req.body.description
    res.json(game)
})

// DELETE: /games/:id
router.delete('/games/:id', (req, res) => {
    const index = games.findIndex(g => g.id === parseInt(req.params.id))
    if(index === -1) return res.status(404).send("Game not found")
    const game = games.splice(index, 1)
    res.json(game[0])
})
module.exports = router