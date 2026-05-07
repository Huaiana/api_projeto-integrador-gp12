import express from 'express'
import accepts from 'accepts'


import { ClienteController } from './controllers/ClienteController'
import { ProdutoController } from './controllers/ProdutoController'
import { PedidoController } from './controllers/pedidoController'
import { FreteController } from './controllers/fretecontroller'
import { DescontoController } from './controllers/descontocontroller'
import { AcompanhamentoController } from './controllers/acompanhamentocontroller'
import { SuporteController } from './controllers/suportecontroller'


export const app = express()
app.use(express.json())

ClienteController()
ProdutoController()
PedidoController()  
FreteController()
DescontoController()
AcompanhamentoController()
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
