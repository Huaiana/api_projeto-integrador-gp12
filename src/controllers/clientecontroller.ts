import { app } form "../sever";
import { ClienteController } from "../repository/clienterepository";

export function clienteController() {
    const clienteController = new ClienteController();

    app.get("/clientes", async (req, res) => {
        const { nome } = req.query;

        if (nome) {
            const clientes = clienteController.buscarPorName(nome as string);
            if (!clientes) return res.status(404).json({ message: "Cliente não encontrado" });
            return res.json(clientes);
        }

        res.json(clienteController.findAll());
    });

    app.get("/clientes/:id", async (req, res) => {
        const id = parseInt(req.params.id);
        const cliente = clienteController.buscarPorId(id);
        if (!cliente) return res.status(404).json({ message: "Cliente não encontrado" });
        res.json(cliente);
    });

    app.post("/clientes", (req, res) => {
      try {
        const { nome, email } = req.body;
        
        if (!nome || nome.trim().length === 0) throw new Error("O nome é obrigatório.");
        if (!email || !email.includes("@")) throw new Error("O email é obrigatório.");

        const cliente = Repository.salvar({ nome, email });
        res.status(201).json(cliente);
      } catch (err) {
        const mensagem = err instanceof Error ? err.message : "Erro interno.";
        res.status(400).json({ message: mensagem });    
    }
        
    });
}
