<?php

namespace App\Controller;

use App\Entity\Actions;
use App\Entity\Saison;
use App\Repository\MembreRepository;
use App\Repository\SaisonRepository;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class SaisonController extends AbstractController
{
    public function __construct(MembreRepository $membreRepository,SaisonRepository $saisonRepository,UserRepository $userRepository,SerializerInterface $serializer){
        $this->membreRepository=$membreRepository;
        $this->saisonRepository=$saisonRepository;
        $this->userRepository=$userRepository;
        $this->serializer=$serializer;
    }
    /**
     * @Route("/saison", name="saison", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->json([$this->saisonRepository->findAll()], 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NomSaison','DateSaison','DateFinSaison']]);
    }
    /**
     * @Route("/saison/valid", name="Valid_Saison", methods={"GET"})
     */
    public function getValidSaison(): Response
    {
        return $this->json([$this->saisonRepository->SaisonValideForm(new \DateTime())], 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NomSaison','DateSaison','DateFinSaison']]);
    }
     /**
     * @Route("/saison/{id}", name="Membre_saison")
     */
    public function getMemberSaison($id): Response
    {
        if($id){
            return $this->json([$this->saisonRepository->findOneBy(['id' => $id])], 200, [],[AbstractNormalizer::ATTRIBUTES => ['saisonMembres'=>['Membre'=>['id','numLicenceFFK','nom','prenom','dateNaissance','genre','adresse','telephone1','telephone2','email','nomParents','prenomParents','telephoneParents1','telephoneParents2','emailParents','cotisation','dateInscription','grade','observation','categorie'=>['nomCategorie'],'groupesMembre'=>['Groupe'=>['nomGroupe']]]]]]);
        }
        else{
            return $this->json([$this->saisonRepository->findAll()], 200, [],[AbstractNormalizer::ATTRIBUTES => ['saisonMembres'=>['Membre'=>['id','numLicenceFFK','nom','prenom','dateNaissance','genre','adresse','telephone1','telephone2','email','nomParents','prenomParents','telephoneParents1','telephoneParents2','emailParents','cotisation','dateInscription','grade','observation','categorie'=>['nomCategorie'],'groupesMembre'=>['Groupe'=>['nomGroupe']]]]]]);

        }
    }
     /**
     * @Route("/saison/delete/{idsaison}/{id}", name="Membre_saison_delete", methods={"Get"})
     */
    public function deleteSaison($id,$idsaison)
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $saison= $this->saisonRepository->findOneBy(['id' => $idsaison]);
        if ($user){
            if($saison){

                foreach($saison->getSaisonMembres() as $saisonMembre){
                  
                        foreach ($saisonMembre->getMembre()->getMembreActivites() as $membreactivite) {
                            $this->getDoctrine()->getManager()->remove($membreactivite);
                        }
                        foreach ($saisonMembre->getMembre()->getGroupesMembre() as $membregroupe) {
                            $this->getDoctrine()->getManager()->remove($membregroupe);
                        }
                        if($saisonMembre->getMembre()->getInformationMedicale()){

                            $this->getDoctrine()->getManager()->remove($saisonMembre->getMembre()->getInformationMedicale());
                        }
                        foreach($saisonMembre->getMembre()->getSaisonMembres() as $membreSaison){
                            $this->getDoctrine()->getManager()->remove($membreSaison);
                        }
                    
                }
                $action=new Actions();
                $action->setUser($user)
                ->setType("Suppression")
                ->setDescription("Vous avez supprimé la  saison \" ". ($saison->getNomSaison()));
                $this->getDoctrine()->getManager()->persist($action);
                $user->addAction($action);
                $this->getDoctrine()->getManager()->remove($saison);
                $this->getDoctrine()->getManager()->flush();
                return $this->json(['success'=>true,'message'=>'saison a été bien supprimée'], 200, []);


            }else{
                return $this->json(['message' => "Oups!...saison n'existe plus'!"],404,);
            }
        }
        else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }    
    }
    /**
     * @Route("/saison/update/{id}", name="saison_update", methods={"POST"})
     */
    public function updateSaison($id,Request $request)
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Saison::class,'json');
        $saison= $this->saisonRepository->findOneBy(['id' => $data->getId()]);
        if ($user){
            if($data){
                 if($saison){
                    
                    $saison->setNomSaison($data->getNomSaison())
                    ->setDateSaison($data->getDateSaison())
                    ->setDateFinSaison($data->getDateFinSaison());

                     $action=new Actions();
                     $action->setUser($user)
                     ->setType("Modification")
                     ->setDescription("Vous avez Modifier la  saison \" ". ($saison->getNomSaison()));
                     $this->getDoctrine()->getManager()->persist($action);
                     $user->addAction($action);
                     $this->getDoctrine()->getManager()->flush();
                     return $this->json(['success'=>true,'message'=>'saison a été bien Modifiée'], 200, []);
     
                 }else{
                     return $this->json(['message' => "Oups!...saison n'existe plus!"],404,);
                 }
            }else{
                return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
            }
        }
        else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }    
    }
     /**
     * @Route("/saison/add/{id}", name="saison_add", methods={"POST"})
     */
    public function addSaison($id,Request $request)
    {
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Saison::class,'json');
        $saison_actuelle=$this->saisonRepository->ValidSaison($data->getDateSaison());
        $saison_nom_existe=$this->saisonRepository->findOneBy(['NomSaison' => $data->getNomSaison()]);
        $saison=new Saison();
        if ($user){
            if($data){
                if($saison_nom_existe){
                    return $this->json(['message' => "Nom de saison deja existe!"],404,);
                }else{

                    if($saison_actuelle){
                        return $this->json(['message' => "La date de debut de cette saison doit obligatoirement depasser la fin de la saison actuelle!"],404,);
                    }else{
                        $saison->setNomSaison($data->getNomSaison())
                        ->setDateSaison($data->getDateSaison())
                        ->setDateFinSaison($data->getDateFinSaison());
                        $this->getDoctrine()->getManager()->persist($saison);
        
                         $action=new Actions();
                         $action->setUser($user)
                         ->setType("Ajout")
                         ->setDescription("Vous avez Ajouter la saison \" ". ($saison->getNomSaison()) . " \" ");
                         $this->getDoctrine()->getManager()->persist($action);
                         $user->addAction($action);
                         $this->getDoctrine()->getManager()->flush();
                         return $this->json(['success'=>true,'message'=>'La saison a été bien Ajoutée'], 200, []);
                    }
                }             
            }else{
                return $this->json(['message' => "Oups!...erreur est survenus!"],400,);
            }
        }
        else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }    
    }
}
