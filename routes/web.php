<?php

use Illuminate\Support\Facades\Route;

// Every URL is handled by React Router
Route::view('/{any?}', 'app')->where('any', '.*');