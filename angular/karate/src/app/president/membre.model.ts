export class Membre{

     // Variables
  private id:number
  private LicenceFFK:string  
  private Nom:string
  private Prenom:number
  private DateNaissance:Date
  private Genre:string
  private categorie:string
  private Groupe:string
  private Adresse:string
  private Tel1:string
  private Tel2:string
  private Email:string
  private NomParent:string
  private PrenomParent:string
  private TelParent1:string
  private TelParent2:string
  private EmailParent:string
  private Cotisation:number
  private DateInscription:Date
  private Grade:string
  private Observation:string

  //Constructeur
  public constructor(id:number
                    , LicenceFFK:string
                    , Nom:string
                    , Prenom:number
                    , DateNaissance:Date
                    , Genre:string 
                    , categorie:string
                    , Groupe:string
                    , Adresse:string
                    , Tel1:string
                    , Tel2:string
                    , Email:string
                    , NomParent:string
                    , PrenomParent:string
                    , TelParent1:string
                    , TelParent2:string
                    , EmailParent:string
                    , Cotisation:number
                    , DateInscription:Date
                    , Grade:string
                    , Observation:string){

    this.id = id
    this.LicenceFFK = LicenceFFK
    this.Nom = Nom
    this.Prenom = Prenom
    this.DateNaissance= DateNaissance 
    this.Genre= Genre
    this.categorie= categorie
    this.Groupe= Groupe
    this.Adresse= Adresse
    this.Tel1= Tel1
    this.Tel2= Tel2
    this.Email= Email
    this.NomParent= NomParent
    this.PrenomParent= PrenomParent
    this.TelParent1= TelParent1
    this.TelParent2= TelParent2
    this.EmailParent= EmailParent
    this.Cotisation= Cotisation
    this.DateInscription= DateInscription
    this.Grade= Grade
    this.Observation= Observation
  }



}