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
    public function __construct(UserRepository $userRepository){
        $this->userRepository=$userRepository;
    }
    /**
     * @Route("/historique/{id}", name="historique", methods={"GET"})
     */
    public function getHistorique($id): Response
    {
        $user=$this->userRepository->findBy(["id"=>$id]);
        return $this->json($user->getActions(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','type','description']]);
    }
}
