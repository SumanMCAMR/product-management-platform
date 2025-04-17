<?php

use App\Http\Controllers\API\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());
    Route::apiResource('products', ProductController::class);
});
