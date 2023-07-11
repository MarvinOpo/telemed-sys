<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeptCtrl extends Controller
{
    //
    public function index()
    {
        $services = DB::table('departments')->get();
        return response()->json($services);
    }
}
