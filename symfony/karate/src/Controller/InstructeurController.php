<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InstructeurController extends AbstractController
{
    /**
     * @Route("/instructeur", name="instructeur")
     */
    public function index(): Response
    {
        return $this->render('instructeur/index.html.twig', [
            'controller_name' => 'InstructeurController',
        ]);
    }
}
