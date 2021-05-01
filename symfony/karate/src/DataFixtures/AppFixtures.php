<?php

namespace App\DataFixtures;

use App\Entity\Activite;
use App\Entity\Categorie;
use App\Entity\Instructeur;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Groupe;
use App\Entity\InformationMedicale;
use App\Entity\Membre;
use App\Entity\MembreActivite;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
      $faker= \Faker\Factory::create('fr_FR');
      $instructeur=new Instructeur();
       $instructeur
           ->setNumLicenceFFK($faker->word)
           ->setNom($faker->lastName)
           ->setPrenom($faker->firstName)
           ->setDateNaissance($faker->dateTime)
           ->setGenre($faker->randomElement($array = array ('Homme', 'Femme','Non precis')))
           ->setCategorieFFK($faker->word(3))
           ->setAdresse($faker->address)
           ->setTel1($faker->phoneNumber)
           ->setEmail($faker->email)
           ->setGrade($faker->word(5))
           ->setObservation($faker->sentence(7));

      $manager-> persist($instructeur);

    $groupe= new Groupe();
    $groupe->setNomGroupe($faker->word)
    ->setInstructeur($instructeur);

      $activite= new Activite();
      $activite-> setNomActivite('Karaté')
      ->addGroupe($groupe);
      $manager-> persist($activite);
      $activite= new Activite();
      $activite-> setNomActivite('Body Karaté')
      ->addGroupe($groupe);
      $manager-> persist($activite);
      $activite= new Activite();
      $activite-> setNomActivite('Self-Défense')
      ->addGroupe($groupe);
      $manager-> persist($activite);
      $activite= new Activite();
      $activite-> setNomActivite('Karaté-Souffle')
      ->addGroupe($groupe);
      $manager-> persist($activite);

      
      $categorie = new Categorie();
      $categorie-> setNomCategorie('Mini poussins');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Poussins');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('pupilles');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Benjamins');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Minimes');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Cadets');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Juniors');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Espoirs');
      $manager-> persist($categorie);
      $categorie=new Categorie();
      $categorie-> setNomCategorie('Séniors');
      $manager-> persist($categorie);
          

      for ($i=0;$i<10; $i++){
          $infoMedicale = new InformationMedicale();
          $infoMedicale->setCorrespondantMedical($faker->name)
          ->setAdresse($faker->address)
          ->setDatePremiereVisite($faker->dateTime)
          ->setEmail($faker->email)
          ->setTel1($faker->phoneNumber)
          ->setTel2($faker->phoneNumber)
          ->setObservation($faker->sentence(7));
          $manager-> persist($infoMedicale);

          $membre=new Membre();
          $membre->setNumLicenceFFK($faker->word)
                 ->setNom($faker->lastName)
                 ->setPrenom($faker->firstName)
                 ->setDateNaissance($faker->dateTime)
                 ->setGenre($faker->randomElement($array = array ('Homme', 'Femme','Non precis')))
                 ->setGroupe($faker->word(3))
                 ->setAdresse($faker->address)
                 ->setTelephone1($faker->phoneNumber)
                 ->setEmail($faker->email)
                 ->setNomParents($faker->lastName)
                 ->setPrenomParents($faker->firstName)
                 ->setTelephoneParents1($faker->phoneNumber)
                 ->setEmailParents($faker->email)
                 ->setCotisation($faker->numberBetween(180,200))
                 ->setDateInscription(new \DateTime())
                 ->setGrade($faker->word(5))
                 ->setObservation($faker->sentence(7))
                 ->setMalade($faker->randomElement($array= array (true,false)))
                 ->setCategorie($categorie)
                 ->setInformationMedicale($infoMedicale);

          $manager-> persist($membre);
        
          
          $membreActivite= new MembreActivite();
          $membreActivite->setAvtivite($activite)
          ->setMembre($membre)
          ->setDatePremiereInscription(new \DateTime())
          ->setCotisation($faker->numberBetween(80,220))
          ->setObservation($faker->sentence(7));
          $manager-> persist($membreActivite);
        }
        $manager->flush();
    }
}