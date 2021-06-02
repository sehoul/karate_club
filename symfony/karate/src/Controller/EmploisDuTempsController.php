<?php

namespace App\Controller;

use App\Repository\EmploiDuTempsRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;


class EmploisDuTempsController extends AbstractController
{
    public function __construct(EmploiDuTempsRepository $emploiDuTempsRepository,SerializerInterface $serializer,UserRepository $userRepository){
        $this->emploiDuTempsRepository=$emploiDuTempsRepository;
        $this->serializer=$serializer;
        $this->userRepository=$userRepository;
        
    }
    /**
     * @Route("/emploisDuTemps", name="emplois_du_temps", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->json($this->emploiDuTempsRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','start','end','groupe'=>['NomGroupe','Activite']]]);

    }
}
