<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
   
    public function __construct( UserPasswordEncoderInterface $userPasswordEncoder){
        $this->userPasswordEncoder=$userPasswordEncoder;
    }
    public function load(ObjectManager $manager)
    {
        $user=new User();
        $user->setEmail('admin')
        ->setNom('admin')
        ->setPrenom('admin')
        ->setRole('president')
        ->setPassword($this->userPasswordEncoder->encodePassword($user,'admin'));
     
        $manager->persist($user);
        
        $categorie = new Categorie();
        $categorie-> setNomCategorie('Mini poussins');
        $manager-> persist($categorie);
        $categorie=new Categorie();
        $categorie-> setNomCategorie('Poussins');
        $manager-> persist($categorie);
        $categorie=new Categorie();
        $categorie-> setNomCategorie('Pupilles');
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
        $manager->flush();
    }
}