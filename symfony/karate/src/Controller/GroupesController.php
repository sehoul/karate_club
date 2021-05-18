<?php

namespace App\Controller;

use App\Entity\Groupe;
use App\Repository\GroupeRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class GroupesController extends AbstractController
{
    public function __construct(GroupeRepository $groupeRepository){
        $this->groupeRepository=$groupeRepository;
    }
    /**
     * @Route("/groupes", name="groupes", methods={"GET"})
     */
    public function getGroupes(): Response
    {
        return $this->json($this->groupeRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NomGroupe','activite'=>['nomActivite']]]);
    }
}
