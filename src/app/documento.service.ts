import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documento } from './models/documento';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private baseURL = "http://localhost:8080/api/v1/documentos";

  constructor(private httpClient: HttpClient){}

  obtenerDocumentos(): Observable<Documento[]>{
    return this.httpClient.get<Documento[]>(`${this.baseURL}`);
  }

  registrarDocumento(formData: FormData): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, formData);
  }

  // este metodo sirve para actualizar un documento 
  actualizarDocumento(id: number, documento: Documento): Observable<Object> {
    return this.httpClient.put<Documento>(`${this.baseURL}/${id}`, documento);
  }
  // este metodo sirve para obtener o buscar un documento 
  obtenerDetalleDocumento(id: number): Observable<Documento> {
    return this.httpClient.get<Documento>(`${this.baseURL}/${id}`);
  }

  eliminarDocumento(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getFile(fileName: String): Observable<Blob>{
    return this.httpClient.get(`${this.baseURL}/file/${fileName}`, { responseType: 'blob' });
  }
}
