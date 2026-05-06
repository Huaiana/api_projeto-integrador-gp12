import { Database } from "better-sqlite3";
export class AcompanhamentoController {
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }
    public getAcompanhamentoById(id: number) {
        const stmt = this.db.prepare("SELECT * FROM acompanhamento WHERE id = ?");
        return stmt.get(id);
    }
    public createAcompanhamento(data: any) {
        const stmt = this.db.prepare("INSERT INTO acompanhamento (field1, field2) VALUES (?, ?)");
        const info = stmt.run(data.field1, data.field2);
        return info.lastInsertRowid;
    }
    public updateAcompanhamento(id: number, data: any) {
        const stmt = this.db.prepare("UPDATE acompanhamento SET field1 = ?, field2 = ? WHERE id = ?");
        stmt.run(data.field1, data.field2, id);
    }
    public deleteAcompanhamento(id: number) {
        const stmt = this.db.prepare("DELETE FROM acompanhamento WHERE id = ?");
        stmt.run(id);
    }
}

