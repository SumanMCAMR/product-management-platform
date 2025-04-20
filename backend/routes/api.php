<?php

use App\Http\Controllers\API\ProductController;
use App\Http\Controllers\API\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::controller(RegisterController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [RegisterController::class, 'logout']);
    Route::get('/user', fn(Request $request) => $request->user());
    Route::apiResource('products', ProductController::class)->except('update');
    Route::post('/products/{product}', [ProductController::class, 'update']);
});
