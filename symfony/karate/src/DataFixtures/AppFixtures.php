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
          $infoMedicale->setCorrespondantMedical($faker->name);
          $manager-> persist($infoMedicale);

          $infoMedicale = new InformationMedicale();
          $infoMedicale->setAdresse($faker->address);
          $manager-> persist($infoMedicale);

          $infoMedicale = new InformationMedicale();
          $infoMedicale->setDatePremiereVisite($faker->dateTime);
          $manager-> persist($infoMedicale);

          $infoMedicale = new InformationMedicale();
          $infoMedicale->setEmail($faker->email);
          $manager-> persist($infoMedicale);

          $infoMedicale = new InformationMedicale();
          $infoMedicale->setTel1($faker->phoneNumber);
          $manager-> persist($infoMedicale);

          $infoMedicale = new InformationMedicale();
          $infoMedicale->setTel2($faker->phoneNumber);
          $manager-> persist($infoMedicale);

          $infoMedicale = new InformationMedicale();
          $infoMedicale->setObservation($faker->sentence(7));
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
        
      }
        $manager->flush();
    }
}