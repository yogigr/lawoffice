<?php

use Inertia\Inertia;
use App\Http\Controllers\Dashboard;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\CaselawController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\NotificationController;

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

Route::get('/', [FrontController::class, 'welcome'])->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', Dashboard::class)->name('dashboard');

    Route::resource('consultation', ConsultationController::class)->only(['create', 'store']);

    Route::get('/caselaw/{caselaw}/lawyer', [CaselawController::Class, 'lawyer'])->name('caselaw.lawyer.index');
    Route::post('/caselaw/{caselaw}/lawyer', [CaselawController::class, 'lawyerStore'])->name('caselaw.lawyer.store');
    Route::delete('/caselaw/{caselaw}/lawyer/{lawyer}', [CaselawController::class, 'lawyerDestroy'])->name('caselaw.lawyer.destroy');
    Route::get('/caselaw/{caselaw}/appointment', [CaselawController::class, 'appointment'])->name('caselaw.appointment.index');
    Route::get('/caselaw/{caselaw}/invoice', [CaselawController::class, 'invoice'])->name('caselaw.invoice.index');
    Route::get('/caselaw/{caselaw}/message', [CaselawController::class, 'message'])->name('caselaw.message.index');
    Route::get('/caselaw/{caselaw}/document', [CaselawController::class, 'document'])->name('caselaw.document.index');
    Route::resource('/caselaw', CaselawController::class);

    Route::resource('/appointment', AppointmentController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/invoice/{invoice}/pdf', [InvoiceController::class, 'pdf'])->name('invoice.pdf');
    Route::resource('/invoice', InvoiceController::class)->except(['create', 'edit']);
    Route::resource('/message', MessageController::class)->only(['store', 'destroy']);

    Route::get('/document/{document}/download', [DocumentController::class, 'download'])->name('document.download');
    Route::resource('/document', DocumentController::class)->only(['store', 'update', 'destroy']);

    Route::get('/user/{user}/address', [UserController::Class, 'address'])->name('user.address');
    Route::resource('/user', UserController::class);

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/address', [ProfileController::class, 'addressForm'])->name('profile.address_form');
    Route::get('/profile/change-password', [ProfileController::class, 'changePasswordForm'])->name('profile.change_password_form');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/address', [ProfileController::class, 'updateAddress'])->name('profile.update_address');
    Route::patch('/profile/change-password', [ProfileController::class, 'changePassword'])->name('profile.change_password');

    Route::get('config', [ConfigController::class, 'index'])->name('config.index');
    Route::patch('config', [ConfigController::class, 'update'])->name('config.update');

    Route::get('company', [CompanyController::class, 'index'])->name('company.index');
    Route::patch('company', [CompanyController::class, 'update'])->name('company.update');

    Route::get('notification', [NotificationController::class, 'index'])->name('notification.index');
    Route::patch('notification/{id}/mark-as-read', [NotificationController::class, 'markAsRead'])->name('notification.mark_as_read');
    Route::patch('notification/mark-all-as-read', [NotificationController::class, 'markAllAsRead'])->name('notification.mark_all_as_read');
    Route::delete('notification/delete-all', [NotificationController::class, 'destroy'])->name('notification.destroy');

    Route::resource('/service', ServiceController::class)->except(['show']);
    Route::resource('/bank', BankController::class)->except(['show']);
});

require __DIR__.'/auth.php';
