<?php

namespace App\Controller;

use App\Entity\Instructeur;
use App\Repository\InstructeurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InstructeurController extends AbstractController
{
    public function __construct(InstructeurRepository $instructeurRepository){
        $this->instructeurRepository=$instructeurRepository;
    }
    /**
     * @Route("/instructeur/mini-info", name="instructeur", methods={"GET"})
     */
    public function getinstructeur(): Response
    {
        return $this->json($this->instructeurRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NumLicenceFFK','Nom','Prenom']]);
    }
}
