<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\repositories\AuthRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use Laravel\Passport\Bridge\AccessToken;

class AuthApiController extends Controller
{

    public $authRepository;

    public function __construct(AuthRepository $authRepository){
        $this->authRepository = $authRepository;
    }

    public function Login(Request $request){
        $formData = $request->all();
        $validator = validator::make($formData,[
            'email'=>'required',
            'password'=>'required',
         
        ],[
            'email.required'=>'Please give  email',
            'password'=>'please give  password',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->getMessageBag()->first(),
                'errors'=>$validator->getMessageBag(),
            ]);
        }
        if($this->authRepository->CheckIfAuthenticated($request)){
           $user = $this->authRepository->findByEmailAddress($request->email);
           $accessToken = $user->createToken('authToken')->accessToken;
           return response()->json([
            'success'=>true,
            'message'=>'Logged in successfully',
            'user'=>$user,
            'access_token'=>$accessToken,
        ]);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Sorry invalid Email or Password',
                'errors'=>null,
            ]);
        }
    }

    public function Register(Request $request){
        $formData = $request->all();
        $validator = validator::make($formData,[
            'name'=>'required',
            'email'=>'required|unique:users',
            'password'=>'required|confirmed',
        ],[
            'email.required'=>'Please give  email',
            'email.unique'=>'Email has allready used,Please login or use another',
            'password'=>'please give your password',
            'name'=>'please give your name',
        ]);

        if($validator->fails()){
            return response()->json([
                'success'=>false,
                'message'=>$validator->getMessageBag()->first(),
                'errors'=>$validator->getMessageBag(),
            ]);
        }
        $user = $this->authRepository->registerUser($request);
        if(!is_null($user)){
            $user = $this->authRepository->findByEmailAddress($request->email);
            $accessToken = $user->createToken('authToken')->accessToken;
            return response()->json([
                'success'=>true,
                'message'=>'Registered successfully !!',
                'user'=>$user,
                'access_token'=>$accessToken,
            ]);
        }else{
            return response()->json([
                'success'=>false,
                'message'=>'Registration failed !!',
                'errors'=>null,
            ]);
        }



    }





}
