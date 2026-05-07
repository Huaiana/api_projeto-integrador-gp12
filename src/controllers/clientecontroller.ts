import { app } from "../server";
import { ClienteController } from "../repository/clienterepository"; // Considere renomear para ClienteRepository

export function clienteController() {
    const repository = new ClienteController(); // Instância única para as rotas

    // GET: Listar ou filtrar por nome
    app.get("/clientes", async (req, res) => {
        const { nome } = req.query;

        if (nome) {
            const clientes = repository.buscarPorName(nome as string);
            if (!clientes || (Array.isArray(clientes) && clientes.length === 0)) {
                return res.status(404).json({ message: "Cliente não encontrado" });
            }
            return res.json(clientes);
        }

        return res.json(repository.findAll());
    });

    // GET: Buscar por ID
    app.get("/clientes/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const cliente = repository.buscarPorId(id);
        if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
        
        return res.json(cliente);
    });

    // POST: Criar novo cliente
    app.post("/clientes", (req, res) => {
        try {
            const { nome, email } = req.body;
            
            if (!nome || nome.trim().length === 0) {
                return res.status(400).json({ message: "O nome é obrigatório." });
            }
            if (!email || !email.includes("@")) {
                return res.status(400).json({ message: "Email inválido." });
            }

            // Correção: usando a instância 'repository' e não 'Repository'
            const cliente = repository.salvar({ nome, email });
            return res.status(201).json(cliente);
            
        } catch (err) {
            const mensagem = err instanceof Error ? err.message : "Erro interno.";
            return res.status(500).json({ message: mensagem });
        }
    });
}