<?php

namespace App\Controller;

use App\Entity\Membre;
use App\Repository\MembreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class MembreController extends AbstractController
{
    public function __construct(MembreRepository $membreRepository){
        $this->membreRepository=$membreRepository;
    }

    /**
     * @Route("/membres", name="membre" , methods={"GET"})
     */
    public function index(): Response
    {
        $table=[];
        $membres=$this->membreRepository->findAll();
        //foreach($membres as $membre){
        //    $table[]=$membre->getNom();
        //    $table[]=$membre->getPrenom();
        //}
        return $this->json($membres, 200, [],array('groups' => array('membre:info','categories')));
    }
}
