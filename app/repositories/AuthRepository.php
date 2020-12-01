<?php

namespace App\repositories;
 
use App\Interfaces\AuthInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\User;

class AuthRepository implements AuthInterface
{

    public function CheckIfAuthenticated(Request $request){
  
        if( Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return true;
        }
        return false;
    }
    public function findByEmailAddress($email){
        $user = User::where('email',$email)->first();
        return $user;
    }

    public function registerUser(Request $request){
        $user = new User();
        $user->name = $request->name;
        $user->email= $request->email;
        $user->password= Hash::make($request->password);
        $user->save();
        return $user;
    }



}

?>