import { Feature } from "./Feature";

export class Robot{
    constructor(public id:number , public name:string, public description:string,public price:number, public madeIn:string, public material:string, public image:string, public color:string,public connections: Feature[] = [],public allC: Feature[] = []){}
}