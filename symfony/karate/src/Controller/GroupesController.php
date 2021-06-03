<?php

namespace App\Controller;

use App\Entity\Actions;
use App\Entity\Groupe;
use App\Entity\User;
use App\Repository\ActiviteRepository;
use App\Repository\GroupeRepository;
use App\Repository\InstructeurRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\UserRepository;

class GroupesController extends AbstractController
{
    public function __construct(GroupeRepository $groupeRepository,SerializerInterface $serializer,UserRepository $userRepository,InstructeurRepository $instructeurRepository, ActiviteRepository $activiteRepository){
        $this->groupeRepository=$groupeRepository;
        $this->serializer=$serializer;
        $this->userRepository=$userRepository;
        $this->instructeurRepository=$instructeurRepository;
        $this->activiteRepository=$activiteRepository;
    }
    /**
     * @Route("/groupes", name="groupes", methods={"GET"})
     */
    public function getGroupes(): Response
    {
        return $this->json($this->groupeRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NomGroupe','activite'=>['nomActivite']]]);
    }
     /**
     * @Route("/groupes/delete/{id}", name="delete_groupe", methods={"POST"})
     */
    public function deletegroupes($id,Request $request): Response
    {
        $data=$request->getContent();
        $user=$this->serializer->deserialize($data,User::class,'json');
        $user=$this->userRepository->findOneBy(['id' => $user->getId()]);
        $groupes= $this->groupeRepository->findOneBy(['id' => $id]);
        if ($user){
            if($groupes){
               foreach( $groupes->getMembresGroupe() as $membreGroupe){
                   $this->getDoctrine()->getManager()->remove($membreGroupe);
               }
               $action=new Actions();
               $action->setUser($user)
               ->setType("Suppression")
               ->setDescription("Suppression du groupe \" ". ($groupes->getNomGroupe()) ." \"");
                $this->getDoctrine()->getManager()->persist($action);
               $user->addAction($action);
                $this->getDoctrine()->getManager()->flush();
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->remove($groupes);
                $entityManager->flush();
                return $this->json(['success'=>true,'message'=>'groupe supprimé avec succee'], 200, []);
            }else{
                return $this->json(['message' => "Oups!...ce groupe n'est plus disponible!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
     /**
     * @Route("/groupes/update/{id}", name="update_groupe", methods={"POST"})
     */
    public function updategroupes($id,Request $request): Response
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Groupe::class,'json');
        $groupe= $this->groupeRepository->findOneBy(['id' => $data->getId()]);
        $activite= $this->activiteRepository->findOneBy(['nomActivite' => $data->getActivite()->getNomActivite()]);
        if ($user){
            if($activite){
                if($groupe){
                    $groupe->setNomGroupe($data->getNomGroupe())
                            ->setActivite($activite);
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Modification")
                    ->setDescription("Modification du groupe \" ". ($groupe->getNomGroupe()) ." \"");
                    $this->getDoctrine()->getManager()->persist($action);
                    $user->addAction($action);
                    $this->getDoctrine()->getManager()->flush();
                    return $this->json(['success'=>true,'message'=>'groupe modifié avec succee'], 200, []);
                }else{
                    return $this->json(['message' => "Oups!...ce groupe n'est plus disponible!"],404,);
                }

            }else{
                return $this->json(['message' => "Oups!...cette activité n'est plus disponible!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
     /**
     * @Route("/groupes/add/{id}", name="add_groupe", methods={"POST"})
     */
    public function addgroupe($id,Request $request): Response
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Groupe::class,'json');
        $instructeur=$this->instructeurRepository->findOneBy(["id"=>$data->getInstructeur()->getId()]);
        $activite=$this->activiteRepository->findOneBy(["id"=>$data->getActivite()->getId()]);
        $groupe=new Groupe();
        if ($user){
            if($data){
                if($instructeur && $activite){

                    $groupe->setNomGroupe($data->getNomGroupe())
                    ->setActivite($activite)
                    ->setInstructeur($instructeur);
                    $this->getDoctrine()->getManager()->persist($groupe);
    
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Ajout")
                    ->setDescription("Ajout du groupe \" ". ($groupe->getNomGroupe()) ." \"");
                    $this->getDoctrine()->getManager()->persist($action);
                    $user->addAction($action);
                    $this->getDoctrine()->getManager()->flush();
                    return $this->json(['success'=>true,'message'=>'groupe modifié avec succee'], 200, []);
                    return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
                }else{
                }
            }else{
                return $this->json(['message' => "Oups!...ce groupe n'est plus disponible!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }
    }
}
