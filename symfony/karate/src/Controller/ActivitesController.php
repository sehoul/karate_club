<?php

namespace App\Controller;

use App\Entity\Groupe;
use App\Repository\ActiviteRepository;
use App\Repository\GroupeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class ActivitesController extends AbstractController
{
    public function __construct(ActiviteRepository $activiteRepository){
        $this->activiteRepository=$activiteRepository;
    }
    /**
     * @Route("/activites", name="Activites", methods={"GET"})
     */
    public function getActivites(): Response
    {

        $table=[];
        
        return $this->json($this->activiteRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','nomActivite','cotisation','Groupe'=>['NomGroupe']]]);
    }
}
