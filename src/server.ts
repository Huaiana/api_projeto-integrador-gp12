import express from 'express'
import accepts from 'accepts'


import { clienteController } from './controllers/clientecontroller'
import { ProdutoController } from './controllers/produtocontroller'
import { pedidoController } from './controllers/pedidocontroller'
import { freteController } from './controllers/fretecontroller'
import { descontoController } from './controllers/descontocontroller'
import { acompanhamentoController } from './controllers/acompanhamentocontroller'
import { SuporteController } from './controllers/suportecontroller'


export const app = express()
app.use(express.json())

clienteController()
ProdutoController()
pedidoController()
freteController()
descontoController()
acompanhamentoController()
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
