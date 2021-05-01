<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use App\Entity\Groupe;
use App\Entity\Membre;



class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
      $faker= \Faker\Factory::create('fr_FR');
      for ($i=0;$i<4; $i++){
          $membre=new Membre();
          $membre->setNom($faker->Nom)
                 ->setPrenom($faker->Prenom)
                 ->setDateNaissance($faker->DateNaissance)
                 ->setGenre($faker->Genre)
                 ->setGroupe($faker->Groupe)
                 ->setAdresse($faker->Adresse)
                 ->setTelephone1($faker->Telephone1)
                 ->setTelephone2($faker->Telephone2)
                 ->setNomParents($faker->NomParents)
                 ->setPrenomParents($faker->PrenomParents)
                 ->setTelephoneParents1($faker->TelephoneParents1)
                 ->setTelephoneParents2($faker->TelephoneParents2)
                 ->setEmailParents($faker->EmailParents)
                 ->setCotisation($faker->Cotisation)
                 ->setDateInscription($faker->DateInscription)
                 ->setGrade($faker->Grade)
                 ->setObservation($faker->Observation)
                 ->setMalade($faker->malade)
                 ->setCategorie($faker->categorie)
                 ->setInformationMedicale($faker->informationMedicale)
                 ->setActivites($faker->activites);
          $manager-> persist($membre);
        // $product = new Product();
        // $manager->persist($product);
      }
        $manager->flush();
    }
}