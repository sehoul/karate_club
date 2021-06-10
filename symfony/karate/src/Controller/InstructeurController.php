<?php

namespace App\Controller;

use App\Entity\Actions;
use App\Entity\Instructeur;
use App\Repository\InstructeurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
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
    /**
     * @Route("/instructeur/update/{id}", name="Update_instructeur", methods={"POST"})
     */
    public function updateInstructeur(Request $request,$id): Response
    {
        $data=$request->getContent();
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $instructeur_data = $this->serializer->deserialize($data,Instructeur::class,'json');
        $instructeur=$this->instructeurRepository->findOneBy(['compteId' => $id]);
        if($user){
            if($instructeur){
                $instructeur
                    ->setNumLicenceFFK($instructeur_data->getNumLicenceFFK())
                    ->setNom($instructeur_data->getNom())
                    ->setPrenom($instructeur_data->getPrenom())
                    ->setDateNaissance($instructeur_data->getDateNaissance())
                    ->setGenre($instructeur_data->getGenre())
                    ->setTel1($instructeur_data->getTel1())
                    ->setTel1($instructeur_data->getTel2())
                    ->setEmail($instructeur_data->getEmail())
                    ->setAdresse($instructeur_data->getAdresse())
                    ->setCategorieFFK($instructeur_data->getCategorieFFK())
                    ->setGrade($instructeur_data->getGrade());
                $user
                    ->setEmail($instructeur_data->getEmail())
                    ->setNom($instructeur_data->getNom())
                    ->setPrenom($instructeur_data->getPrenom())
                    ->setTel($instructeur_data->getTel1());
                        $action=new Actions();
                        $action->setUser($user)
                        ->setType("Modification")
                        ->setDescription("Vous avez modifier votre profile");
                        $this->getDoctrine()->getManager()->persist($action);
                        $user->addAction($action);
                        $this->getDoctrine()->getManager()->flush();
                        return $this->json([
                            'status' => 200,
                            'message' => "Mise a jour du profile avec succes !"
                        ],200);
            }else{
                return $this->json(['message' => "Oups!...cet instructeur n'existe plus !"],404,);
            }

        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],400,);
        } 
    }
}
