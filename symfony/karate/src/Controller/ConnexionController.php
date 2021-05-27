<?php

namespace App\Controller;

use App\Entity\Actions;
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
                    /*switch ($user->getRoles()){
                        case 'secretaire': 
                            break;
                    }*/
                    return $this->json(['result'=>$user,'success'=>true], 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','roles']]);
                }else{
                    return $this->json([
                        'status' => 400,
                        'message' => "wrong password"
                    ],400);
                }
            }
            else{
                return $this->json([
                    'status' => 404,
                    'message' => "username or email not found"
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
     * @Route("/register/{id}", name="register", methods={"POST"})
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
                        'message' => "email deja existe !"
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
                    $action=new Actions();
                    $action->setUser($user)
                    ->setType("Creation")
                    ->setDescription("Creation d'un nouveau membre administratif \" ". ($user_data->getNom()) . " " . ($user_data->getPrenom()) ." \"");
                    $this->getDoctrine()->getManager()->persist($action);
                    $user->addAction($action);
                    $this->getDoctrine()->getManager()->flush();
                    return $this->json([
                        'status' => 200,
                        'message' => "Le nouveau membre administratif a été bien ajouté !"
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
     * @Route("/Admins", name="get_Admins", methods={"GET"})
     */
    public function getAdmins()
    {
        return $this->json($this->userRepository->findAll(), 200, [],[AbstractNormalizer::ATTRIBUTES => ['id','Nom','Prenom','email','roles','Tel']]);
    }
}
