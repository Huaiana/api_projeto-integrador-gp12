import { Interface } from "node:readline";  
import { Request, Response } from "express";
import { Suporte } from "../models/suporte";    

export class SuporteController {
    public async criarSuporte(req: Request, res: Response): Promise<Response> {
        try {
            const { cliente_id, assunto, mensagem } = req.body;

            if (typeof cliente_id !== 'number' || typeof assunto !== 'string' || typeof mensagem !== 'string') {
                return res.status(400).json({ error: 'Cliente ID deve ser um número, assunto e mensagem devem ser strings.' });
            }   

            const novoSuporte: Suporte = {
                id: Date.now(),
                cliente_id,
                assunto,
                mensagem,   
                data_criacao: new Date().toISOString(),
                status: 'Aberto'
            };  

            // Aqui você pode adicionar o novo suporte a um banco de dados ou a uma lista em memória

            return res.status(201).json(novoSuporte);
        }   

        catch (error) {
            console.error('Erro ao criar suporte:', error);
            return res.status(500).json({ error: 'Ocorreu um erro ao criar o suporte.' });
        }   

    }
}   

