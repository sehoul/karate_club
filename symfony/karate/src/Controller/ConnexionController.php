<?php

namespace App\Controller;

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
use Symfony\Component\Validator\Constraints\IsNull;

class ConnexionController extends AbstractController
{
    /**
     * @Route("/connexion", name="connexion", methods={"POST"})
     */
    public function login(Request $request, SerializerInterface $serializer, UserRepository $userRepository,  UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $data=$request->getContent();
        try {
            $user_data = $serializer->deserialize($data,User::class,'json');
            $user=$userRepository->findOneBy([
                'email' => $user_data->getEmail()
            ]);
            if($user){
                if ($userPasswordEncoder->isPasswordValid($user,$user_data->getPassword())){
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
}
