<?php

namespace App\Controller;

use App\Entity\Membre;
use App\Entity\Actions;
use App\Entity\GroupeMembre;
use App\Entity\MembreActivite;
use App\Repository\ActiviteRepository;
use App\Repository\CategorieRepository;
use App\Repository\GroupeRepository;
use App\Repository\MembreRepository;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\Request;


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
        return $this->json($this->membreRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','NumLicenceFFK','Nom','Prenom','DateNaissance','Genre','Adresse','Telephone1','Telephone2','Email','NomParents','PrenomParents','TelephoneParents1','TelephoneParents2','EmailParents','Cotisation','DateInscription','Grade','Observation','categorie'=>['nomCategorie'],'membreActivites'=>['Avtivite'=>['nomActivite']]]]);
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
        $categorie=$this->categorieRepository->findOneBy(["id"=>$data->getGroupesMembre()[0]->getGroupe()->getId()]);
        $membre_existe=$this->membreRepository->findOneBy(["NumLicenceFFK"=>$data->getNumLicenceFFK()]);
        $membre=new Membre();
        $membreActivite= new MembreActivite();
        $membreGroupe= new GroupeMembre();
        if ($user){
            if($data){
                if($groupe && $activite){
                    if($membre_existe){
                        return $this->json(['message' => "Oups!...ce numero de licence FFK deja existe!"],400,);
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
                        $this->getDoctrine()->getManager()->persist($membreActivite);
    
                        $action=new Actions();
                        $action->setUser($user)
                        ->setType("Ajout")
                        ->setDescription("Ajout du membre \" ". ($membre->getNom()) . " " . ($membre->getPrenom()) ." \"");
                        $this->getDoctrine()->getManager()->persist($action);
                        $user->addAction($action);
                        $this->getDoctrine()->getManager()->flush();
                        return $this->json(['success'=>true,'message'=>'membre ajouté modifié avec succee'], 200, []);
                    }

                }else{
                    return $this->json(['message' => "Oups!...activité ou groupe n'est plus disponible!"],404,);
                }
            }else{
                return $this->json(['message' => "Oups!...ce groupe n'est plus disponible!"],404,);
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }    
    }
}
