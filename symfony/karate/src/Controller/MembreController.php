<?php

namespace App\Controller;

use Amp\Cache\Cache;
use App\Entity\Membre;
use App\Entity\Actions;
use App\Entity\Categorie;
use App\Entity\GroupeMembre;
use App\Entity\MembreActivite;
use App\Entity\Path;
use App\Repository\ActiviteRepository;
use App\Repository\CategorieRepository;
use App\Repository\GroupeRepository;
use App\Repository\MembreRepository;
use App\Repository\UserRepository;
use Exception;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\Request;
use function Symfony\Component\String\u;
use League\Csv\Reader;


class MembreController extends AbstractController
{
    public function __construct(MembreRepository $membreRepository,ActiviteRepository $activiteRepository,GroupeRepository $groupeRepository,CategorieRepository $categorieRepository,UserRepository $userRepository,SerializerInterface $serializer){
        $this->membreRepository=$membreRepository;
        $this->activiteRepository=$activiteRepository;
        $this->userRepository=$userRepository;
        $this->categorieRepository=$categorieRepository;
        $this->groupeRepository=$groupeRepository;
        $this->serializer=$serializer;
    }

    /**
     * @Route("/membres", name="membre" , methods={"GET"})
     */
    public function index(): Response
    { 
        return $this->json($this->membreRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NumLicenceFFK','Nom','Prenom','DateNaissance','Genre','Adresse','Telephone1','Telephone2','Email','NomParents','PrenomParents','TelephoneParents1','TelephoneParents2','EmailParents','Cotisation','DateInscription','Grade','Observation','categorie'=>['nomCategorie'],'GroupesMembre'=>['Groupe'=>['nomGroupe']]]]);
    }
    /**
     * @Route("/membres/add/{id}", name="add_membre" , methods={"POST"})
     */
    public function addMembre($id,Request $request): Response
    { 
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Membre::class,'json');
        $groupe=$this->groupeRepository->findOneBy(["id"=>$data->getGroupesMembre()[0]->getGroupe()->getId()]);
        $activite=$this->activiteRepository->findOneBy(["id"=>$groupe->getActivite()->getId()]);
        $categorie=$this->categorieRepository->findOneBy(["id"=>$data->getCategorie()->getId()]);
        $membre_existe=$this->membreRepository->findOneBy(["NumLicenceFFK"=>$data->getNumLicenceFFK()]);
        $membre=new Membre();
        $membreActivite= new MembreActivite();
        $membreGroupe= new GroupeMembre();
        if ($user){
            if($data){
                if($groupe && $activite){
                    if($membre_existe){
                        return $this->json(['message' => "Oups!...Numéro de licence FFK deja existe!"],400,);
                    }else{

                        $membre->setAdresse($data->getAdresse())
                        ->setNumLicenceFFK($data->getNumLicenceFFK())
                        ->setCategorie($categorie)
                        ->setCotisation($data->getCotisation())
                        ->setDateNaissance($data->getDateNaissance())
                        ->setEmail($data->getEmail())
                        ->setGenre($data->getGenre())
                        ->setGrade($data->getGrade())
                        ->setMalade(false)
                        ->setPrenom($data->getPrenom())
                        ->setNom($data->getNom())
                        ->setTelephone1($data->getTelephone1())
                        ->setTelephone2($data->getTelephone2())
                        ->setDateInscription($data->getDateInscription())
                        ->setEmailParents($data->getEmailParents())
                        ->setNomParents($data->getNomParents())
                        ->setPrenomParents($data->getPrenomParents())
                        ->setTelephoneParents1($data->getTelephoneParents1())
                        ->setTelephoneParents2($data->getTelephoneParents2())
                        ->setObservation($data->getObservation());
                        $this->getDoctrine()->getManager()->persist($membre);
                        
                        $membreActivite->setAvtivite($activite)
                        ->setCotisation($data->getCotisation())
                        ->setMembre($membre)
                        ->setDatePremiereInscription($data->getDateInscription());
                        $this->getDoctrine()->getManager()->persist($membreActivite);
    
                        $membreGroupe->setGroupe($groupe)
                        ->setMembre($membre);
                        $this->getDoctrine()->getManager()->persist($membreGroupe);
    
                        $action=new Actions();
                        $action->setUser($user)
                        ->setType("Ajout")
                        ->setDescription("Vous avez ajouté le membre \" ". ($membre->getNom()) . " " . ($membre->getPrenom()) ." \"");
                        $this->getDoctrine()->getManager()->persist($action);
                        $user->addAction($action);
                        $this->getDoctrine()->getManager()->flush();
                        return $this->json(['success'=>true,'message'=>'Membre a été bien ajouté'], 200, []);
                    }

                }else{
                    return $this->json(['message' => "Oups!...Activité ou Groupe n'existe plus'!"],404,);
                }
            }else{
                return $this->json(['message' => "Oups!...Ce groupe n'existe plus'!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }    
    }
     /**
     * @Route("/membres/delete/{id}/{idUser}", name="delete_membre" , methods={"GET"})
     */
    public function deleteMembre($id,$idUser,Request $request): Response
    { 
        $user=$this->userRepository->findOneBy(['id' => $idUser]);
        $membre=$this->membreRepository->findOneBy(["id"=>$id]);
        if ($user){
                    if($membre){

                        foreach ($membre->getMembreActivites() as $membreactivite) {
                            $this->getDoctrine()->getManager()->remove($membreactivite);
                        }
                        foreach ($membre->getGroupesMembre() as $membregroupe) {
                            $this->getDoctrine()->getManager()->remove($membregroupe);
                        }
                        if($membre->getInformationMedicale()){

                            $this->getDoctrine()->getManager()->remove($membre->getInformationMedicale());
                        }
                        $action=new Actions();
                        $action->setUser($user)
                        ->setType("Suppression")
                        ->setDescription("Vous avez supprimé le membre \" ". ($membre->getNom()) . " " . ($membre->getPrenom()) ." \"");
                        $this->getDoctrine()->getManager()->persist($action);
                        $user->addAction($action);
                        $this->getDoctrine()->getManager()->remove($membre);
                        $this->getDoctrine()->getManager()->flush();
                        return $this->json(['success'=>true,'message'=>'Membre a été bien supprimé'], 200, []);
                    }else{
                    return $this->json(['message' => "Oups!...membre n'existe plus'!"],404,);
                }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }    
    }
     /**
     * @Route("/membres/update/{id}", name="update_membre" , methods={"POST"})
     */
    public function updateMembre($id,Request $request): Response
    { 
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Membre::class,'json');
        $categorie=$this->categorieRepository->findOneBy(["nomCategorie"=>$data->getCategorie()->getNomCategorie()]);
        $membre_existe=$this->membreRepository->findOneBy(["id"=>$data->getId()]);
        if ($user){
            if($data){
                if($categorie){

                    if($membre_existe){ 
                        $membre_existe->setAdresse($data->getAdresse())
                        ->setNumLicenceFFK($data->getNumLicenceFFK())
                        ->setCategorie($categorie)
                        ->setCotisation($data->getCotisation())
                        ->setDateNaissance($data->getDateNaissance())
                        ->setEmail($data->getEmail())
                        ->setGenre($data->getGenre())
                        ->setGrade($data->getGrade())
                        ->setMalade(false)
                        ->setPrenom($data->getPrenom())
                        ->setNom($data->getNom())
                        ->setTelephone1($data->getTelephone1())
                        ->setTelephone2($data->getTelephone2())
                        ->setDateInscription($data->getDateInscription())
                        ->setEmailParents($data->getEmailParents())
                        ->setNomParents($data->getNomParents())
                        ->setPrenomParents($data->getPrenomParents())
                        ->setTelephoneParents1($data->getTelephoneParents1())
                        ->setTelephoneParents2($data->getTelephoneParents2())
                        ->setObservation($data->getObservation());                        
                        foreach ($membre_existe->getMembreActivites() as $membreactivite) {
                            $this->getDoctrine()->getManager()->remove($membreactivite);
                        }
                        foreach ($membre_existe->getGroupesMembre() as $membregroupe) {
                            $this->getDoctrine()->getManager()->remove($membregroupe);
                        }
                        
                        foreach($data->getGroupesMembre() as $groupe){
                            $membreActivite= new MembreActivite();
                            $membreGroupe= new GroupeMembre();
                            if ($groupe){
                                $groupe_existe=$this->groupeRepository->findOneBy(["NomGroupe"=>$groupe->getGroupe()->getNomGroupe()]);
                                if($groupe_existe){
                                    $membreActivite->setAvtivite($groupe_existe->getActivite())
                                    ->setCotisation($data->getCotisation())
                                    ->setMembre($membre_existe)
                                    ->setDatePremiereInscription($data->getDateInscription());
                                    $this->getDoctrine()->getManager()->persist($membreActivite);
            
                                    $membreGroupe->setGroupe($groupe_existe)
                                    ->setMembre($membre_existe);
                                    $this->getDoctrine()->getManager()->persist($membreGroupe);
                                }
                                else{
                                    return $this->json(['message' => "Oups!...Ce groupe que vous voullez attribuer a ce membre n'est plus disponible'!"],404,);
                                }
                            }
                        }
                        $action=new Actions();
                        $action->setUser($user)
                        ->setType("Modification")
                        ->setDescription("Vous avez modifié le membre \" ". ($membre_existe->getNom()) . " " . ($membre_existe->getPrenom()) ." \"");
                        $this->getDoctrine()->getManager()->persist($action);
                        $user->addAction($action);
                        $this->getDoctrine()->getManager()->flush();
                        return $this->json(['success'=>true,'message'=>'Membre a été bien modifié'], 200, []);
                    }else{
                        return $this->json(['message' => "Oups!...ce membre n'est existe pas!"],404,);
                    }
                }else{
                    return $this->json(['message' => "Oups!...categorie n'existe pas!"],404,);
                }
            }else{
                return $this->json(['message' => "Oups!...erreur est survenus'!"],400,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],400,);
        }    
    }
     /**
     * @Route("/membres/excel/update/{id}", name="update_membre_excel" , methods={"POST"})
     */
    public function updateMembreByExcel($id,Request $request): Response
    { 
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $data=$request->getContent();
        $data=$this->serializer->deserialize($data,Path::class,'json');
        if ($user){
            if($data){
                try{
                    if (!file_exists('../../../excel')) {
                        mkdir('../../../excel', 0777, true);
                    }
                    $reader = Reader::createFromPath('../../../excel/' . $data->getThePath()); 
                    $results = $reader->fetchAssoc();
                    foreach ($results as $row){
                        $categorie=$this->categorieRepository->findOneBy(["nomCategorie"=>u(u($row['categorie'])->trim())->title()]);      
                      
                                $membre_existe=$this->membreRepository->findOneBy(["NumLicenceFFK"=>$row['﻿NumLicenceFFK']]);
                                if(!$categorie){
                                    $categorie=new Categorie();
                                    $categorie->setNomCategorie(u(u($row['categorie'])->trim())->title());
                                    $this->getDoctrine()->getManager()->persist($categorie);
                                    $this->getDoctrine()->getManager()->flush();
                                }
                                if(!$membre_existe){ 
                                    $membre=new Membre();
                                    $membre->setAdresse($row['Adresse'])
                                    ->setNumLicenceFFK($row['﻿NumLicenceFFK'])
                                    ->setCategorie($categorie)
                                    ->setCotisation((float)$row['Cotisation'])
                                    ->setDateNaissance(new \DateTime($row['DateNaissance']))
                                    ->setEmail($row['Email'])
                                    ->setGenre($row['Genre'])
                                    ->setGrade($row['Grade'])
                                    ->setMalade(false)
                                    ->setPrenom($row['Prenom'])
                                    ->setNom($row['Nom'])
                                    ->setTelephone1($row['Telephone1'])
                                    ->setTelephone2($row['Telephone2'])
                                    ->setDateInscription(new \DateTime($row['DateInscription']))
                                    ->setEmailParents($row['EmailParents'])
                                    ->setNomParents($row['NomParents'])
                                    ->setPrenomParents($row['PrenomParents'])
                                    ->setTelephoneParents1($row['TelephoneParents1'])
                                    ->setTelephoneParents2($row['TelephoneParents2'])
                                    ->setObservation($row['Observation']);      
                                    $this->getDoctrine()->getManager()->persist($membre);
                                    $groups=u($row['Activite'])->split(',');
                                    foreach($groups as $groupe){
                                        $membreActivite= new MembreActivite();
                                        $membreGroupe= new GroupeMembre();
                                        if ($groupe){
                                            $groupe_existe=$this->groupeRepository->findOneBy(["NomGroupe"=>$groupe]);
                                            if($groupe_existe){
                                                $membreActivite->setAvtivite($groupe_existe->getActivite())
                                                ->setCotisation((float)$row['Cotisation'])
                                                ->setMembre($membre)
                                                ->setDatePremiereInscription(new \DateTime($row['DateInscription']));
                                                $this->getDoctrine()->getManager()->persist($membreActivite);
                        
                                                $membreGroupe->setGroupe($groupe_existe)
                                                ->setMembre($membre);
                                                $this->getDoctrine()->getManager()->persist($membreGroupe);
                                            }
                                        }
                                    }
                                    $action=new Actions();
                                    $action->setUser($user)
                                    ->setType("Ajout")
                                    ->setDescription("Vous avez Ajouter le membre \" ". ($membre->getNom()) . " " . ($membre->getPrenom()) ." \"");
                                    $this->getDoctrine()->getManager()->persist($action);
                                    $user->addAction($action);
                                    $this->getDoctrine()->getManager()->flush();                        
                                }
                    }
                    return $this->json(['success'=>true,'message'=>'importation bien faite'], 200, []);

                }catch(Exception $e){
                    return $this->json([
                        'status' => 400,
                        'message' => $e->getMessage()
                    ],400);
                }
                }else{
                    return $this->json(['message' => "Oups!...erreur est survenus'!"],400,);
                }          
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],400,);
        }  
    }
}
