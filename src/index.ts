import express, { Request, Response } from 'express'
import accepts from 'accepts'

const app = express()

app.get('/', (req: Request, res: Response) => {
  const accept = accepts(req)

  res.send({
    tiposAceitos: accept.types(),
    linguagem: accept.languages(),
    encoding: accept.encodings()
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000')
})
