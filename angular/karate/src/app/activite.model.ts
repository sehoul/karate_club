export class Activite {
  public id:number
  public nomactivite:string
  public Cotisation:number


  public constructor(id:number
    , nomactivite:string
    , Cotisation:number){
    this.id = id
    this.nomactivite = nomactivite
    this.Cotisation = Cotisation
  }
}
