<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Services\ProfileService;
use App\Http\Requests\UpdateAddressRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\ChangePasswordRequest;

class ProfileController extends Controller
{
    public function index(ProfileService $service)
    {
        return Inertia::render('Profile/Index', [
            'user' => $service->getUser(),
            'profile' => $service->getProfile(),
        ]);
    }

    public function addressForm(ProfileService $service)
    {
        return Inertia::render('Profile/Address', [
            'user' => $service->getUser(),
            'address' => $service->getAddress(),
        ]);
    }

    public function changePasswordForm(ProfileService $service)
    {
        return Inertia::render('Profile/ChangePassword', [
            'user' => $service->getUser()
        ]);
    }

    public function update(UpdateProfileRequest $request, ProfileService $service)
    {
        $service->updateProfile($request);
        return redirect()->route('profile.index')
        ->with('status', 'Berhasil update profile');
    }

    public function updateAddress(UpdateAddressRequest $request, ProfileService $service)
    {
        $service->updateAddress($request);
        return redirect()->route('profile.address_form')
        ->with('status', 'Berhasil update alamat');
    }

    public function changePassword(ChangePasswordRequest $request, ProfileService $service)
    {
        $service->changePassword($request);
        return redirect()->route('profile.change_password_form')
        ->with('status', 'Berhasil ganti password');
    }
}
