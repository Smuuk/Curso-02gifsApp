import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private APIkey: string = "ERlNMjb3MEHVjdRqkwYFlHhT3SOHXWHV";
  private gifsUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //TO DO: hay que cambiar el any por el tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial];
  }
 
  constructor(private argumento1: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs(argumento: string = '') {
    argumento = argumento.trim().toLocaleLowerCase();
    if (!this._historial.includes(argumento)) {
      this._historial.unshift(argumento);

    }
    //esto cortara el arreglo para que no acepte mas de 10
    this._historial = this._historial.splice(0, 10);
    // console.log(this._historial);


    //almacenando lo buscado en el localStorage
    localStorage.setItem('historial',JSON.stringify(this._historial)) //los argumentos que lleva setItem, debe ser de tipo string; si dejamos el cursos sobre setItem, nos dira los tipos de argumentos que debe recibir
  

    //utilizando HTTP PARAMS 
    const params = new HttpParams()
    .set('api_key', this.APIkey)
    .set('limit', '10')
    .set('q', argumento );
    //peticion tipo GET 
    this.argumento1.get<SearchGifsResponse>(`${this.gifsUrl}/search`, {params})
      .subscribe((respuesta) => {
        console.log(respuesta.data);
        this.resultados = respuesta.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados))
      });

  }
}
