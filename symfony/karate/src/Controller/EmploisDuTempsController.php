<?php

namespace App\Controller;

use App\Entity\Actions;
use App\Entity\EmploiDuTemps;
use App\Repository\EmploiDuTempsRepository;
use App\Repository\GroupeRepository;
use App\Repository\InstructeurRepository;
use App\Repository\UserRepository;
use Symfony\Component\Validator\Constraints\DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;


class EmploisDuTempsController extends AbstractController
{
    public function __construct(EmploiDuTempsRepository $emploiDuTempsRepository,SerializerInterface $serializer,UserRepository $userRepository,InstructeurRepository $instructeurRepository,GroupeRepository $groupeRepository){
        $this->emploiDuTempsRepository=$emploiDuTempsRepository;
        $this->instructeurRepository=$instructeurRepository;
        $this->groupeRepository=$groupeRepository;
        $this->serializer=$serializer;
        $this->userRepository=$userRepository;
        
    }
    /**
     * @Route("/emploisDuTemps", name="emplois_du_temps", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->json($this->emploiDuTempsRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['start','end','event','groupe'=>['nomGroupe'],'instructeur'=>['nom']]]);

    }
     /**
     * @Route("/emploisDuTemps/{id}", name="emplois_du_temps_instructeur", methods={"GET"})
     */
    public function instructeurCrenau($id): Response
    {
        return $this->json($this->emploiDuTempsRepository->findBy(['instructeur'=>$this->instructeurRepository->findOneBy(['compteId' => $id])]), 200, [],[AbstractNormalizer::ATTRIBUTES => ['start','end','event','groupe'=>['nomGroupe'],'instructeur'=>['nom']]]);

    }
    /**
     * @Route("/emploisDuTemps/add/{id}", name="add_emplois_du_temps", methods={"POST"})
     */
    public function addcrenau($id,Request $request): Response
    {
        $data=$request->getContent();
        $data_crenau=$this->serializer->deserialize($data,EmploiDuTemps::class,'json');
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $groupe= $this->groupeRepository->findOneBy(['id' => $data_crenau->getGroupe()->getId()]);
        $instructeur=$this->instructeurRepository->findOneBy(['id' => $data_crenau->getInstructeur()->getId()]);
        $crenau_existe= $this->emploiDuTempsRepository->findBy(['instructeur'=>$instructeur,'start'=>$data_crenau->getStart(),'end'=>$data_crenau->getEnd(),'groupe'=>$groupe]);
        $crenau= new EmploiDuTemps();
        if($user){
            if($groupe && $instructeur){
                if($crenau_existe){
                    return $this->json(['message' => "Oups!...L'emplois du temps du \" " . $instructeur->getNom() . " \" est deja reservé pour ce crenau !"],400,);
                  }else{
                    $crenau->setEvent($data_crenau->getEvent())
                    ->setGroupe($groupe)
                    ->setInstructeur($instructeur)
                    ->setStart($data_crenau->getStart())
                    ->setEnd($data_crenau->getEnd());
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Ajout")
                    ->setDescription("Vous avez ajouté un crenau \" ". ($crenau->getEvent()) . " de " . $crenau->getStart() . " à " . $crenau->getEnd() ." \"");
                    $this->getDoctrine()->getManager()->persist($action);
                    $this->getDoctrine()->getManager()->persist($crenau);
                    $this->getDoctrine()->getManager()->flush();
                    return $this->json(['success'=>true,'message'=>'Crenau a été bien ajouté' . $crenau->getStart()], 200, []);
                }
            }else{
                  return $this->json(['message' => "Oups!...Ce groupe n'existe plus!"],400,);
              }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
}
