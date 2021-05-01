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
          $membre->setNom($faker->word)
                 ->setPrenom($faker->word);
                 
          $manager-> persist($membre);
        // $product = new Product();
        // $manager->persist($product);
      }
        $manager->flush();
    }
}