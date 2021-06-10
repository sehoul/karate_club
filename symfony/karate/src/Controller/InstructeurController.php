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
     * @Route("/instructeur/mini-info", name="instructeur_miniInfo", methods={"GET"})
     */
    public function getInstructeurMiniInfo(): Response
    {
        return $this->json($this->instructeurRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NumLicenceFFK','Nom','Prenom']]);
    }
    /**
     * @Route("/instructeur/{id}", name="instructeur_get", methods={"GET"})
     */
    public function getInstructeur($id): Response
    {
        return $this->json($this->instructeurRepository->findOneBy(['compteId' => $id]), 200, [],[AbstractNormalizer::ATTRIBUTES => ['NumLicenceFFK','Nom','Prenom','dateNaissance','Genre','CategorieFFK','Adresse','tel1','tel2','Email','Grade']]);
    }
}
