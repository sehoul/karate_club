<?php

namespace App\DataFixtures;


use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\User;

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
        
        $manager->flush();
    }
}