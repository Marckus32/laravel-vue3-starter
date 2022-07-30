<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post("/login",["as" => "login", "uses" => "\App\Http\Controllers\AuthController@login"]);
Route::post("/register",["as" => "register", "uses" => "\App\Http\Controllers\AuthController@register"]);

Route::group(["middleware" => "auth:sanctum"], function(){
    Route::get("/test",["as"    => "test",      "uses" => "\App\Http\Controllers\TestController@index"]);
    
    Route::post("/logout",["as" => "logout",    "uses" => "\App\Http\Controllers\AuthController@logout"]);
});
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

