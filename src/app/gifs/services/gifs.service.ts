import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private APIkey: string = "ERlNMjb3MEHVjdRqkwYFlHhT3SOHXWHV";
  private _historial: string[] = [];

  //TO DO: hay que cambiar el any por el tipo correspondiente
  public resultados: Gif[] = [];

  get historial() {

    return [...this._historial];
  }

  constructor(private argumento1: HttpClient) { }

  buscarGifs(argumento: string = '') {
    argumento = argumento.trim().toLocaleLowerCase();
    if (!this._historial.includes(argumento)) {
      this._historial.unshift(argumento);

    }
    //esto cortara el arreglo para que no acepte mas de 10
    this._historial = this._historial.splice(0, 10);
    console.log(this._historial);

    //peticion tipo GET 
    this.argumento1.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=ERlNMjb3MEHVjdRqkwYFlHhT3SOHXWHV&q=${argumento}&limit=10`)
      .subscribe((respuesta) => {
        console.log(respuesta.data);
        this.resultados = respuesta.data;
      });

  }
}
