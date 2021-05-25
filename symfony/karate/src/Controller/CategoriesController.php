<?php

namespace App\Controller;

use App\Entity\Categorie;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
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
        return $this->json($this->categorieRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','nomCategorie','Description']]);
    }
     /**
     * @Route("/categories/delete/{id}", name="delete_categories", methods={"GET"})
     */
    public function deleteCategories($id): Response
    {
        return $this->json(['message' => "Oups!...cette categorie n'est plus disponible!"],404,);
    }
}
