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
        return $this->json($this->activiteRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','nomActivite','cotisation','Groupe'=>['NomGroupe']]]);
    }
    /**
     * @Route("/activites/delete/{id}", name="delete_activitee", methods={"GET"})
     */
    public function deleteActivites($id): Response
    {
        $activite= $this->activiteRepository->findOneBy(['id' => $id]);
        if($activite){
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($activite);
            $entityManager->flush();
            return $this->json(['success'=>true,'message'=>'activite supprimée avec succee'], 200, []);
        }else{
            return $this->json(['message' => "Oups!...cette activitee n'est plus disponible!"],404,);
        }
    }
}
