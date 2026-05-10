import db from "../database/database";

export interface Frete {
    id: number;
    endereco_origem: string;
    valor_por_km: number;
    distancia_maxima: number;
}

export class FreteRepository {
  
    buscarConfiguracaoAtiva(): Frete | null {
        return (db.prepare("SELECT * FROM frete LIMIT 1").get() as Frete) ?? null;
    }

    
    atualizarPrecos(valorPorKm: number, distanciaMax: number): void {
        db.prepare("UPDATE frete SET valor_por_km = ?, distancia_maxima = ? WHERE id = 1")
          .run(valorPorKm, distanciaMax);
    }
}
