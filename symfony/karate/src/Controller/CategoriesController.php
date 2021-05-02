<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class CategoriesController extends AbstractController
{
    public function __construct(CategorieRepository $categorieRepository){
        $this->categorieRepository=$categorieRepository;
    }
    /**
     * @Route("/categories", name="categories", methods={"GET"})
     */
    public function getCategories(): Response
    {
        $table=[];
        $categories=$this->categorieRepository->findAll();
        foreach($categories as $categorie){
            $table[]=$categorie->getNomCategorie();
        }
        
        return $this->json($categories, 200, [],[ObjectNormalizer::ATTRIBUTES => ['nomCategorie','Description']]);
    }
}
