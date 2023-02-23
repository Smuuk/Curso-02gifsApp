import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  get historial(){
  
    return[...this._historial];
  }

  buscarGifs( argumento: string = ''){
    argumento = argumento.trim().toLocaleLowerCase();
    if( !this._historial.includes(argumento)){
      this._historial.unshift(argumento);

    }
    //esto cortara el arreglo para que no acepte mas de 10
    this._historial = this._historial.splice(0,10);
    console.log(this._historial);
  }
}
