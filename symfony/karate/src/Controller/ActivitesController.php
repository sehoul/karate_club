<?php

namespace App\Controller;

use App\Entity\Actions;
use App\Entity\Activite;
use App\Entity\Groupe;
use App\Entity\User;
use App\Repository\ActiviteRepository;
use App\Repository\GroupeRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Constraints\Length;
use function Symfony\Component\String\u;

class ActivitesController extends AbstractController
{
    public function __construct(ActiviteRepository $activiteRepository,SerializerInterface $serializer,UserRepository $userRepository){
        $this->activiteRepository=$activiteRepository;
        $this->serializer=$serializer;
        $this->userRepository=$userRepository;
        
    }
    /**
     * @Route("/activites", name="Activites", methods={"GET"})
     */
    public function getActivites(): Response
    {
        return $this->json($this->activiteRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','nomActivite','cotisation','Groupe'=>['id','NomGroupe']]]);
    }
    /**
     * @Route("/activites/delete/{id}", name="delete_activitee", methods={"POST"})
     */
    public function deleteActivites($id,Request $request): Response
    {
        $data=$request->getContent();
        $user=$this->serializer->deserialize($data,User::class,'json');
        $user=$this->userRepository->findOneBy(['id' => $user->getId()]);
        $activite= $this->activiteRepository->findOneBy(['id' => $id]);
        $all_activite= $this->activiteRepository->findAll();
        if($user){

            if($activite){
                if((count($all_activite) > 1) && !((u(u($activite->getNomActivite())->lower())->trim())->replace('é', 'e')=="karate")){

                    foreach( $activite->getGroupe() as $Groupe){
                        foreach($Groupe->getEmploiDuTemps() as $crenau){
                            $Groupe->removeEmploiDuTemp($crenau);
                            $this->getDoctrine()->getManager()->remove($crenau);
                        }
                        foreach($Groupe->getMembresGroupe() as $membregroupe){
                            $Groupe->removeMembresGroupe($membregroupe);
                            $this->getDoctrine()->getManager()->remove($membregroupe);
                        }
                        $activite->removeGroupe($Groupe);
                        $this->getDoctrine()->getManager()->remove($Groupe);
                    }
                    foreach($activite->getMembreActivites() as $membreActiv){
                        $activite->removeMembreActivite($membreActiv);
                        $this->getDoctrine()->getManager()->remove($membreActiv);
                    }
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Suppression")
                    ->setDescription("Vous avez supprimé l'activitée \" ". ($activite->getNomActivite()) ." \"");
                     $this->getDoctrine()->getManager()->persist($action);
                    $user->addAction($action);
                    $this->getDoctrine()->getManager()->flush();
                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($activite);
                    $entityManager->flush();
                    return $this->json(['success'=>true,'message'=>'Activite a été supprimée '], 200, []);
                }else{
                    return $this->json(['message' => "Oups!...Vous ne pouvez pas supprimer toutes les activitées et l'activitée karaté!"],404,);
                }
            }else{
                return $this->json(['message' => "Oups!...Cette activitée n'existe plus!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
    /**
     * @Route("/activites/update/{id}", name="update_activitee", methods={"POST"})
     */
    public function updateActivites($id,Request $request): Response
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $activite_req=$this->serializer->deserialize($data,Activite::class,'json');
        $activite= $this->activiteRepository->findOneBy(['id' => $activite_req->getId()]);
        if($user){
            if($activite){
              if($activite_req) {
                  $activite->setNomActivite($activite_req->getNomActivite())
                  ->setCotisation($activite_req->getCotisation());
                $action=new Actions();
                $action->setUser($user)
                ->setType("Modification")
                ->setDescription("Vous avez modifié l'activitée \" ". ($activite->getNomActivite()) ." \"");
                 $this->getDoctrine()->getManager()->persist($action);
                  $this->getDoctrine()->getManager()->flush();
                  return $this->json(['success'=>true,'message'=>'Activitée a été bien modifiée '], 200, []);
              }else{
                return $this->json(['message' => "Oups!...une erreur est survenue!"],500,);
              }
            }else{
                return $this->json(['message' => "Oups!...Cette activitée n'existe plus'!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
    /**
     * @Route("/activites/add/{id}", name="add_activite", methods={"POST"})
     */
    public function addActivite($id,Request $request): Response
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $activite_req=$this->serializer->deserialize($data,Activite::class,'json');
        $activite_existe=$this->activiteRepository->findOneBy(['nomActivite' => $activite_req->getNomActivite()]);
        $activite= new Activite();
        if($user){
              if($activite_req) {
                  if($activite_existe){
                    return $this->json(['message' => "Oups!...cette activité deja existe!"],400,);
                  }else{
                      $activite->setNomActivite($activite_req->getNomActivite())
                      ->setCotisation($activite_req->getCotisation());
                    $groupe= new Groupe();
                    $groupe->setNomGroupe('groupe: inconnu (' . ($activite->getNomActivite()) . ')')
                    ->setActivite($activite);
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Ajout")
                    ->setDescription("Vous avez ajouté une nouvelle activitée \" ". ($activite->getNomActivite()) ." \"");
                     $this->getDoctrine()->getManager()->persist($action);
                     $this->getDoctrine()->getManager()->persist($groupe);
                     $this->getDoctrine()->getManager()->persist($activite);
                      $this->getDoctrine()->getManager()->flush();
                      return $this->json(['success'=>true,'message'=>'Activite a été bien ajoutée avec la creation d\'un groupe inconnu'], 200, []);
                  }
              }else{
                return $this->json(['message' => "Oups!...une erreur est survenue!"],500,);
              }
           
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
  
}
