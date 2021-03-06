<?php

namespace App\Controller;

use App\Entity\Actions;
use App\Entity\Instructeur;
use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Serializer\Exception\NotEncodableValueException;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class ConnexionController extends AbstractController
{
    public function __construct( UserPasswordEncoderInterface $userPasswordEncoder,SerializerInterface $serializer,UserRepository $userRepository){
        $this->userPasswordEncoder=$userPasswordEncoder;
        $this->serializer=$serializer;
        $this->userRepository=$userRepository;
        
    }
    /**
     * @Route("/connexion", name="connexion", methods={"POST"})
     */
    public function login(Request $request)
    {
        $data=$request->getContent();
        try {
            $user_data = $this->serializer->deserialize($data,User::class,'json');
            $user=$this->userRepository->findOneBy([
                'email' => $user_data->getEmail()
            ]);
            if($user){
                if ($this->userPasswordEncoder->isPasswordValid($user,$user_data->getPassword())){
                    return $this->json(['result'=>$user,'success'=>true], 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','roles']]);
                }else{
                    return $this->json([
                        'status' => 400,
                        'message' => "Mot de passe incorrect"
                    ],400);
                }
            }
            else{
                return $this->json([
                    'status' => 404,
                    'message' => "Le nom d'utilisateur ou le mot de passe est incorrect "
                ],404);
            }

        }catch(NotEncodableValueException $e){
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ],400);
        }
        
    } 
    /**
     * @Route("/admin/register/{id}", name="register", methods={"POST"})
     */
    public function register(Request $request,$id)
    {
        $data=$request->getContent();
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $user_data = $this->serializer->deserialize($data,User::class,'json');
        $user_existe=$this->userRepository->findOneBy(['email' => $user_data->getEmail()]);
        if($user){
            if($user_existe){
                    return $this->json([
                        'status' => 400,
                        'message' => "Email d??ja existe !"
                    ],400);
            }
            else{
                if($user_data){
                    $new_user=new User();
                    $new_user->setEmail($user_data->getEmail())
                    ->setNom($user_data->getNom())
                    ->setPrenom($user_data->getPrenom())
                    ->setRole($user_data->getRoles())
                    ->setTel($user_data->getTel())
                    ->setPassword($this->userPasswordEncoder->encodePassword($new_user,$user_data->getPassword()));
                    $this->getDoctrine()->getManager()->persist($new_user);
                    $this->getDoctrine()->getManager()->flush();
                    if($new_user->getRoles()==="instructeur"){
                        $instructeur= new Instructeur();
                        $instructeur->setCompteId($new_user->getId())
                        ->setNom($user_data->getNom())
                        ->setEmail($user_data->getEmail())
                        ->setPrenom($user_data->getPrenom())
                        ->setTel1($user_data->getTel())
                        ->setNumLicenceFFK("(vide)");
                        $this->getDoctrine()->getManager()->persist($instructeur);
                    }
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Creation")
                    ->setDescription("Vous avez cr???? un nouveau compte\" ". ($user_data->getNom()) . " " . ($user_data->getPrenom()) ." \"");
                    $this->getDoctrine()->getManager()->persist($action);
                    $user->addAction($action);
                    $this->getDoctrine()->getManager()->flush();
                    return $this->json([
                        'status' => 200,
                        'message' => "Le nouveau compte a ??t?? bien ajout?? !"
                    ],200);

                }else{
                    return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
                }
                
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }       
    }
    
     /**
     * @Route("/admin/Admins", name="get_Admins", methods={"GET"})
     */
    public function getAdmins()
    {
        return $this->json($this->userRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','Nom','Prenom','email','roles','Tel']]);
    }

     /**
     * @Route("/admin/admin/delete/{idUser}/{id}", name="delete_Admins", methods={"GET"})
     */
    public function deleteAdmins($idUser,$id)
    {
        $user=$this->userRepository->findOneBy(['id' => $idUser]);
        $usertoRemove=$this->userRepository->findOneBy(['id' => $id]); 
        if ($user){
            if ($usertoRemove){
                if(count($this->userRepository->findBy(['Role'=>$usertoRemove->getRoles()]))>1){
                    foreach($usertoRemove->getActions() as $action){
                        $usertoRemove->removeAction($action);
                        $this->getDoctrine()->getManager()->remove($action);
                    }
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Suppression")
                    ->setDescription("Vous avez supprim?? le compte du \" ". ($usertoRemove->getNom()) ." \"");
                     $this->getDoctrine()->getManager()->persist($action);
                    $user->addAction($action);
                    $this->getDoctrine()->getManager()->flush();
                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->remove($usertoRemove);
                    $entityManager->flush();
                    return $this->json(['success'=>true,'message'=>'Utilisateur supprim?? !'], 200, []);
                }else{
                    return $this->json(['message' => "Vous ne pouvez pas supprimer ce compte : " . $usertoRemove->getRoles() . "!"],400,);
                }
            }else{
                return $this->json(['message' => "Oups!...Cet utilisateur n'existe plus'!"],404,);
            } 
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }  
    }


/**
     * @Route("/admin/update/{id}", name="update", methods={"POST"})
     */
    public function update_user(Request $request,$id)
    {
        $data=$request->getContent();
        $user=$this->userRepository->findOneBy(['id' => $id]);
        $user_data = $this->serializer->deserialize($data,User::class,'json');
        $user_existe=$this->userRepository->findOneBy(['id' => $user_data->getId()]);
        if($user){
            if($user_existe){
                if($user_data){
                    if(count($this->userRepository->findBy(['Role' => $user_existe->getRoles()]))>1 || ($user_existe->getRoles()===$user_data->getRoles())){
                        $user_existe->setEmail($user_data->getEmail())
                        ->setNom($user_data->getNom())
                        ->setPrenom($user_data->getPrenom())
                        ->setRole($user_data->getRoles())
                        ->setTel($user_data->getTel())
                        ->setPassword($this->userPasswordEncoder->encodePassword($user_existe,$user_data->getPassword()));
                        $action=new Actions();
                        $action->setUser($user)
                        ->setType("Modification")
                        ->setDescription("Vous avez modifi?? le compte du  \" ". ($user_existe->getNom()) . " " . ($user_existe->getPrenom()) ." \"");
                        $this->getDoctrine()->getManager()->persist($action);
                        $user->addAction($action);
                        $this->getDoctrine()->getManager()->flush();
                        return $this->json([
                            'status' => 200,
                            'message' => "Le membre administratif a ??t?? bien mis ?? jour !"
                        ],200);
                    }else{
                        return $this->json([
                            'status' => 400,
                            'message' => "Vous ne pouvez pas changer le role de cet utilisateur\" " . $user_existe->getRoles() . " \" !"
                        ],400);
                    }
                }else{
                    return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
                }
            }
            else{
                return $this->json([
                    'status' => 400,
                    'message' => "Cet utilisateur n'existe plus!"
                ],400);
                
            }
        }else{
            return $this->json(['message' => "Oups!...erreur est survenus!"],404,);
        }       
    }


}
