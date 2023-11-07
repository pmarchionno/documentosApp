import { Component, OnInit } from '@angular/core';
import { DocumentoService } from '../documento.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Documento } from '../models/documento';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-documento',
  templateUrl: './registrar-documento.component.html',
  styleUrls: ['./registrar-documento.component.css']
})
export class RegistrarDocumentoComponent implements OnInit {
  documento: Documento = new Documento();
  
   retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  fileName: any;

  constructor(private documentoServicio: DocumentoService, private router: Router, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  guardarDocumento() {
    //this.file.SaveAs(Server.MapPath("~/ImagenesSubidas/") + NombreImagen);
    const formData = new FormData();
    
    formData.append('title',this.documento.title);
    formData.append('description', this.documento.description);
    formData.append('docFile', this.selectedFile, this.selectedFile.name);
    
    this.documentoServicio.registrarDocumento(formData).pipe(
      tap(dato => {
        console.log("Operacion Exitosa", dato);
        this.goToHome();
      }),
      catchError(error => {
        console.error('Ha ocurrido un error:', error);
        throw error;
      })
    ).subscribe();
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  onSubmit() {
    this.guardarDocumento();

  }

  selectedFile!: File;
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);
    
    const uploadFileData = new FormData();
    uploadFileData.append('fileName', this.selectedFile, this.selectedFile.name);
  
    this.httpClient.post('http://localhost:8080/file/upload', uploadFileData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.message = 'File uploaded successfully';
        } else {
          this.message = 'File not uploaded successfully';
        }
      }
      );


  }

    getFile() {
    this.httpClient.get('http://localhost:8080/file/get/' + this.fileName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }
}
