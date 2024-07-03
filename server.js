import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())
const port = 3000


app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany() // essa função ele vai na tabela de usuario e procura tudo que tiver e me retorna e guarda na variavel 

    res.status(200).json(users) // vou listar para quem buscar 
})

app.post('/usuarios', async (req, res) => {

    const user = await prisma.user.create({
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }

    })


    res.status(201).json(user) // vou responder com status 
})

app.put('/usuarios/:id', async (req, res) => {

    req.params.id // tudo que ele ecnontar aqui ('/usuarios/:id' .  ele vai chegar dentro de req.params.id
    const user = await prisma.user.update({

        where: {  // A ONDE EU QUERO ATUALIZAR TENHO QUE USAR O WHERE 
            id: req.params.id
        },
        data: {
            email: req.body.email,
            age: req.body.age,
            name: req.body.name
        }

    })

    res.status(201).json(user)

})

app.delete('/usuarios/:id', async (req, res) => {
    
    await prisma.user.delete({
        where: {
            id: req.params.id
        },

    })

    res.status(200).json({ message: 'Usuário deletado com sucesso !!' })

})






app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`) // quando atualizo,  aqui vai mostrar no terminal quando foi atualizado e qual porta 
})