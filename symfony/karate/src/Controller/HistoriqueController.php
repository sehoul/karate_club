<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\ActionsRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HistoriqueController extends AbstractController
{
    public function __construct(UserRepository $userRepository,ActionsRepository $actionsRepository){
        $this->userRepository=$userRepository;
        $this->actionsRepository=$actionsRepository;
    }
    /**
     * @Route("/historique/{id}", name="historique", methods={"GET"})
     */
    public function getHistorique($id): Response
    {
        $user=$this->userRepository->findOneBy(["id"=>$id]);
        $actions=$this->actionsRepository->findby(["User"=>$user->getId()],["id"=>"DESC"],7);
        return $this->json($actions, 200, [],[AbstractNormalizer::ATTRIBUTES => ['type','description']]);
    }
}
