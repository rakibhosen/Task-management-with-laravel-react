<?php
 
namespace App\Interfaces;

use Illuminate\Http\Request;

interface AuthInterface
{
    /**
     * CheckifAuthenticated
     * 
     * Check if an user is authenticated or not by request
     * 
     * @param Request $request
     * @return bool -> true if authenticated false if not
     */
    public function CheckIfAuthenticated(Request $request);


        /**
     *registerUser
     * 
     * Register a user by request form
     * 
     * @param Request $request
     * @return user object  
     */
    public function registerUser(Request $request);

    

        /**
     * findByEmailAddress
     * 
     * find user by email
     * 
     * @param Request $request
     * @return user by email
     */
    public function findByEmailAddress($email);

}


?>