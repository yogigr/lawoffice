<?php

namespace App\Http\Services;

use App\Classes\Uploader;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateAddressRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Requests\ChangePasswordRequest;

class ProfileService
{
    protected $uploader;

    public function __construct()
    {
        $this->uploader = new Uploader();
    }

    public function getUser()
    {
        $user = Auth::user();
        return [
            'name' => $user->name,
            'role_name' => $user->role->name ?? '',
            'picture' => $user->picture
        ];
    }

    public function getProfile()
    {
        $user = Auth::user();
        return [
            'name' => $user->name,
            'email' => $user->email,
            'date_of_birth' => $user->date_of_birth,
            'gender' => $user->gender,
            'mobile' => $user->mobile,
        ];
    }

    public function getAddress()
    {
        $user = Auth::user();
        return [
            'line1' => $user->address->line1 ?? '', 
            'line2' => $user->address->line2 ?? '', 
            'city' => $user->address->city ?? '', 
            'province' => $user->address->province ?? '', 
            'postal_code' => $user->address->postal_code ?? '', 
            'country' => $user->address->country ?? '',
        ];
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        $user = Auth::user();

        $user->update([
            'name' => $request->input('name'),
            'date_of_birth' => $request->input('date_of_birth'),
            'gender' => $request->input('gender'),
            'mobile' => $request->input('mobile')
        ]);

        if ($request->hasFile('imagefile')) {
            if ($user->image) {
                $this->uploader->deleteOldImage('image', $user->image->filename);
                $user->image->delete();
            }

            $filename = $this->uploader->uploadPicture(
                $request->file('imagefile'), 
                'user ' . $user->id . ' ' . $user->name . ' ' . now()->format('YmdHis'), 
                'image'
            );
            $user->image()->create([
                'filename' => $filename
            ]);

            $user->refresh();
        }

        return $user;
    }

    public function updateAddress(UpdateAddressRequest $request)
    {
        $user = Auth::user();
        
        $data = [
            'line1' => $request->input('line1'), 
            'line2' => $request->input('line2'), 
            'city' => $request->input('city'), 
            'province' => $request->input('province'), 
            'postal_code' => $request->input('postal_code'), 
            'country' => $request->input('country'),
        ];

        if ($user->address) {
            $user->address->update($data);
        } else {
            $user->address()->create($data);
        }

        return $user;
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = Auth::user();
        
        $user->update([
            'password' => Hash::make($request->input('new_password'))
        ]);

        return $user;
    }
}