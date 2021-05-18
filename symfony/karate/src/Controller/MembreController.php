<?php

namespace App\Controller;

use App\Entity\Membre;
use App\Repository\MembreRepository;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class MembreController extends AbstractController
{
    public function __construct(MembreRepository $membreRepository,SerializerInterface $serializer){
        $this->membreRepository=$membreRepository;
        $this->serializer=$serializer;
    }

    /**
     * @Route("/membres", name="membre" , methods={"GET"})
     */
    public function index(): Response
    { 
        return $this->json($this->membreRepository->findAll(), 200, [],array('groups' => array('membre:info','categories')));
    }
}
