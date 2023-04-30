import express from 'express'
import {v4 as uuidv4} from "uuid"
const router = express.Router()
let users = []

router.get('/', (req, res) => {
    console.log(users)
    res.send(users)
})

router.post('/', (req, res) => {
    let userData = req.body
    const userId = uuidv4()
    const userWithId = {...userData, id: userId}
    users.push(userWithId)
    console.log(users)
    console.log(userData)
    res.send(userData?.name)
})
router.get('/:id', (req, res) => {
    const {id} = req.params
    console.log("---------------------------")
    console.log(req.params)
    console.log("---------------------------")

   const foundUser =  users.find((user) => user.id === id)
    res.send(foundUser)
})
router.delete('/:id', (req, res) => {
    const {id} = req.params
    users = users.filter(user => user.id !== id)
    res.send(`User with am id ${id} was deleted from the database`)
})
router.patch('/:id', (req, res) => {
    const {id} = req.params
    const {name, age} = req.body
    const usersEntity = users.find(user => user.id === id)
    if(name) usersEntityname = name
    if(age) usersEntity.age = age
    res.send(`User with the ${id} has been updated`)
})
export default router