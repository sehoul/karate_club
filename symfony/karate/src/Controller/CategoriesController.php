<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

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
        $categories=$this->categorieRepository->findAll();
        return $this->json($categories, 200, [],array('groups' => array('categories')));
    }
}
