import { Imagen } from "./imagen";

export class Producto
{
    id:number;
    precio: number;
    desc:string;
    nombre:string;
    imagen:Array<Imagen>;
    tiempo: number; //<----Nuevo
    opciones: any;
}