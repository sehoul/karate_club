<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class EmploisDuTempsController extends AbstractController
{
    /**
     * @Route("/emplois/du/temps", name="emplois_du_temps")
     */
    public function index(): Response
    {
        return $this->render('emplois_du_temps/index.html.twig', [
            'controller_name' => 'EmploisDuTempsController',
        ]);
    }
}
