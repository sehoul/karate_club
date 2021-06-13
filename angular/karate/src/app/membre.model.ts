export class Membre{

     // Variables
  public id:number
  public LicenceFFK:string  
  public Nom:string
  public Prenom:string
  public DateNaissance:Date
  public Genre:string
  public categorie:string
  public Groupe:string
  public Adresse:string
  public Tel1:string
  public Tel2:string
  public Email:string
  public NomParent:string |null
  public PrenomParent:string |null
  public TelParent1:string |null
  public TelParent2:string |null
  public EmailParent:string |null
  public Cotisation:number 
  public DateInscription:Date
  public Grade:string
  public Observation:string

  //Constructeur
  public constructor(id:number
                    , LicenceFFK:string
                    , Nom:string
                    , Prenom:string
                    , DateNaissance:Date
                    , Genre:string 
                    , categorie:string
                    , Groupe:string
                    , Adresse:string
                    , Tel1:string
                    , Tel2:string
                    , Email:string
                    , NomParent:string | null
                    , PrenomParent:string | null
                    , TelParent1:string | null
                    , TelParent2:string | null
                    , EmailParent:string | null
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