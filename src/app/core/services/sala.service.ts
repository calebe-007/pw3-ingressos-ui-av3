import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sala } from "../models";

@Injectable({
    providedIn: 'root'
})
export class SalaService {
    private http = inject(HttpClient);

    private apiURL = 'http://192.168.2.159:8080/salas';

    listar(): Observable<Sala[]> {
        return this.http.get<Sala[]>(this.apiURL)
;   
 }
    buscarPorId(id: number):
Observable<Sala> {
    return this.http.get<Sala>(`${this.apiURL}/${id}`);
}

    salvar(sala:Sala):
Observable<Sala> {
    const dados = {
        nome: sala.nome,
        preco: sala.preco,
    };

    if (sala.id && sala.id > 0){
        return this.http.put<Sala>(`${this.apiURL}/${sala.id}`, dados);     
    }
    return this.http.post<Sala>(this.apiURL, dados);
}
    excluir(id: number):
    Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/${id}`);
    }

}
