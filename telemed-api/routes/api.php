<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeptCtrl;
use App\Http\Controllers\EncounterCtrl;
use App\Http\Controllers\PatCtrl;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/departments', [DeptCtrl::class, 'index']);
Route::get('/patients', [PatCtrl::class, 'index']);
// Route::get('/encounters', [EnctrCtrl::class, 'index']);

Route::prefix('/encounters')->controller(EncounterCtrl::class)->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
});
