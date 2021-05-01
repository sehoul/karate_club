<?php

namespace App\DataFixtures;

use App\Entity\Activite;
use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Groupe;
use App\Entity\InformationMedicale;
use App\Entity\Membre;



class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
      $faker= \Faker\Factory::create('fr_FR');
      $activite= new Activite();
      $categorie = new Categorie();
      $infoMedicale = new InformationMedicale();

      $categorie-> setNomCategorie('Mini poussins');
      $categorie-> setNomCategorie('Poussins');
      $categorie-> setNomCategorie('pupilles');
      $categorie-> setNomCategorie('Benjamins');
      $categorie-> setNomCategorie('Minimes');
      $categorie-> setNomCategorie('Cadets');
      $categorie-> setNomCategorie('Juniors');
      $categorie-> setNomCategorie('Espoirs');
      $categorie-> setNomCategorie('Séniors');
      
      
        
        
        
        
        
        
        

          

      for ($i=0;$i<10; $i++){
          $membre=new Membre();
          $membre->setNumLicenceFFK($faker->word)
                 ->setNom($faker->lastName)
                 ->setPrenom($faker->firstName)
                 ->setDateNaissance($faker->date)
                 ->setGenre($faker->randomElement($array = array ('Homme', 'Femme','Non precis')))
                 ->setGroupe($faker->word(3))
                 ->setAdresse($faker->address)
                 ->setTelephone1($faker->phoneNumber)
                 ->setEmail($faker->email)
                 ->setNomParents($faker->lastName)
                 ->setPrenomParents($faker->firstName)
                 ->setTelephoneParents1($faker->phoneNumber)
                 ->setEmailParents($faker->email)
                 ->setCotisation($faker->number)
                 ->setDateInscription($faker->date)
                 ->setGrade($faker->word(5))
                 ->setObservation($faker->sentence(7))
                 ->setMalade($faker->randomElement($array= array (true,false)))
                 ->setCategorie($categorie)
                 ->setInformationMedicale($infoMedicale)
                 ->addActivite($activite);

          $manager-> persist($membre);
        
      }
        $manager->flush();
    }
}