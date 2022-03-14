<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\CaselawController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\AppointmentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/caselaw/{caselaw}/lawyer', [CaselawController::Class, 'lawyer'])->name('caselaw.lawyer.index');
    Route::post('/caselaw/{caselaw}/lawyer', [CaselawController::class, 'lawyerStore'])->name('caselaw.lawyer.store');
    Route::delete('/caselaw/{caselaw}/lawyer/{lawyer}', [CaselawController::class, 'lawyerDestroy'])->name('caselaw.lawyer.destroy');
    Route::get('/caselaw/{caselaw}/appointment', [CaselawController::class, 'appointment'])->name('caselaw.appointment.index');
    Route::get('/caselaw/{caselaw}/invoice', [CaselawController::class, 'invoice'])->name('caselaw.invoice.index');
    Route::get('/caselaw/{caselaw}/message', [CaselawController::class, 'message'])->name('caselaw.message.index');
    Route::get('/caselaw/{caselaw}/document', [CaselawController::class, 'document'])->name('caselaw.document.index');
    Route::resource('/caselaw', CaselawController::class);

    Route::resource('/appointment', AppointmentController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('/invoice', InvoiceController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('/message', MessageController::class)->only(['store', 'destroy']);

    Route::get('/document/{document}/download', [DocumentController::class, 'download'])->name('document.download');
    Route::resource('/document', DocumentController::class)->only(['store', 'update', 'destroy']);
});

require __DIR__.'/auth.php';
