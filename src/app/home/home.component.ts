import { Component, OnInit } from '@angular/core';
import { Documento } from '../models/documento';
import { DocumentoService } from '../documento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  documentosData!: Documento[];

  constructor(private documentoServicio: DocumentoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  private obtenerDocumentos() {
    this.documentoServicio.obtenerDocumentos().subscribe(dato => {
      this.documentosData = dato;
      this.documentosData.forEach((element, index) => {
        if (element.fileName) {
          element.fileNameBlob = this.getFile(element.fileName, index)
          // this.getFile(element.fileName, index)
        }
      });
    });
  }

  actualizarDocumento(id: number) {
    this.router.navigate(['actualizar-documento', id]);
  }

  getFile(imagen: String, id: number) {
    return this.documentoServicio.getFile(imagen).subscribe(data => {
      const reader = new FileReader();
      reader.onload = () => {
        this.documentosData[id].fileNameBlob = reader.result as string;
        alert(this.documentosData[id].fileNameBlob)
      };
      reader.readAsDataURL(data);
    });
  }
}
