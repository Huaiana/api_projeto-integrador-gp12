import express from 'express'
import accepts from 'accepts'


import { clienteController } from './controllers/clientecontroller'
import { ProdutoController } from './controllers/produtocontroller'
import { pedidoController } from './controllers/pedidocontroller'
import { freteController } from './controllers/fretecontroller'
import { descontoController } from './controllers/descontocontroller'
import { acompanhamentocontroller } from './controllers/acompanhamentocontroller'
import { SuporteController } from './controllers/suportecontroller'


export const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.sendStatus(204)
    return
  }
  next()
})

clienteController()
ProdutoController()
pedidoController()
freteController()
descontoController()
new acompanhamentocontroller().configurarRotas()
SuporteController() 


app.get('/', (req, res) => {
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
