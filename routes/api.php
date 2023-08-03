<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Controllers\AdminController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/', function(Request $request){
    $data = [
        "username" => "aldysp34",
        "password" => Hash::make("aldysp34"),
        "name" => "Muhammad Aldi Surya Putra",
        "class" => "admin",
        "is_admin" => true,
        "super_admin" => true,
    ];
    $user = App\Models\User::create($data);
    if ($user){
        return response()->json([
            "status" => 200,
            "message" => "succes register"
        ]);
    }
    return response()->json([
        "status" => 500,
        "message" => "failed",
    ]);
})->name('admin.manage.users.store');
