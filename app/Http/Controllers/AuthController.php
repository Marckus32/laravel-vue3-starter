<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{    
    public function checkLogin()
    {
        return auth()->user();
    }

    public function register(Request $request)
    {

        $data = $request->validate([
            "name"  => "required|string",
            "email" => "required|string|email|unique:users,email",
            "password"  => [
                "required","confirmed"
            ]
        ]);

        $user = User::create([
            "name"  => $data['name'],
            "email" => $data['email'],
            "password"  => Hash::make($data['password'])
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return response([
            "user" => $user,
            "token" => $token
        ])->cookie("_token", $token,config("session.lifetime"));

    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            "email" => "required|email|string|exists:users,email",
            "password"  => "required"
        ]);

        if(Auth::attempt(["email" => $request->email, "password" => $request->password])){
            $user = Auth::user();
            $accessToken = $user->createToken('authToken')->plainTextToken;

            return response([
                "user" => $user,
                "token" => $accessToken
            ])->cookie("_token", $accessToken,config("session.lifetime"));
        }else{            
            return response(['error' => 'The provided credentials are invalid', "message" => "Login failed. Invalid username or password."], 422);
        }
    }

    public function logout(Request $request)
    {
        // $token = $request->user()->token();
        // $token->revoke();
        // $cookie = Cookie::forget('_token');
        // $response = ['message' => 'You have been successfully logged out!'];
        // return response($response, 200)->withCookie($cookie);;
        $user = Auth::user();
        $user->currentAccessToken()->delete();
        $cookie = Cookie::forget('_token');
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200)->withCookie($cookie);;
    }
}
