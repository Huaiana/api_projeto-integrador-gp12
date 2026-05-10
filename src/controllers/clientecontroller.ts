import { app } from "../server";
import { ClienteRepository } from "../repository/clienterepository";

export function clienteController() {
    const repository = new ClienteRepository(); 

    // GET: Listar ou filtrar por nome
    app.get("/clientes", async (req, res) => {
        const { nome } = req.query;

        if (nome) {
            // ADICIONADO O AWAIT AQUI
            const clientes = await repository.listarPorName(nome as string);
            
            // Agora o TypeScript entende que 'clientes' é o resultado final
            if (!clientes || (clientes as any).length === 0) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }
            return res.json(clientes);
        }

        // ADICIONADO O AWAIT AQUI TAMBÉM
        const todosClientes = await repository.findAll();
        return res.json(todosClientes);
    });

    // GET: Buscar por ID
    app.get("/clientes/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        // ADICIONADO O AWAIT
        const cliente = await repository.buscarPorId(id);
        if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
        
        return res.json(cliente);
    });

    // POST: Criar novo cliente
    app.post("/clientes", async (req, res) => { // Adicionado async aqui
        try {
            const { nome, email } = req.body;
            
            if (!nome || nome.trim().length === 0) {
                return res.status(400).json({ message: "O nome é obrigatório." });
            }
            if (!email || !email.includes("@")) {
                return res.status(400).json({ message: "Email inválido." });
            }

            // ADICIONADO O AWAIT
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