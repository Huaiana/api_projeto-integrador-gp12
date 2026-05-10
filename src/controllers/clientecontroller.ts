import { app } from "../server";
import { ClienteRepository } from "../repository/clienterepository";

export function clienteController() {
    const repository = new ClienteRepository(); 

    //
    app.get("/clientes", async (req, res) => {
        const { nome } = req.query;

        if (nome) {
            
            const clientes = await repository.listarPorName(nome as string) as any;

            if (!clientes || clientes.length === 0) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }
            return res.json(clientes);
        }

       
        return res.json(await repository.findAll());
    });

   
    app.get("/clientes/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const cliente = await repository.buscarPorId(id);
        if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
        
        return res.json(cliente);
    });

    
    app.post("/clientes", async (req, res) => {
        try {
            const { nome, email } = req.body;
            
            if (!nome || nome.trim().length === 0) {
                return res.status(400).json({ message: "O nome é obrigatório." });
            }
            if (!email || !email.includes("@")) {
                return res.status(400).json({ message: "Email inválido." });
            }

           
            const cliente = await repository.salvar({
                nome, email,
                senha: "",
                data_nascimento: "",
                endereco: "",
                telefone: "",
                cpf: ""
            });
            return res.status(201).json(cliente);
            
        } catch (err) {
            const mensagem = err instanceof Error ? err.message : "Erro interno.";
            return res.status(500).json({ message: mensagem });
        }
    });
}
