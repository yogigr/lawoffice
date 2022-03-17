<?php

namespace App\Http\Services;

use App\Models\Role;
use App\Models\User;
use App\Classes\Uploader;
use App\Http\Requests\UserRequest;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $uploader;

    public function __construct()
    {
        $this->uploader = new Uploader();
    }

    public function getSupportData()
    {
        $roles = Role::orderBy('name', 'asc')->get()->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->name
            ];
        });

        return [
            'roles' => $roles
        ];
    }
    
    public function getUsers()
    {
        $users = User::where(function($query) {
            if (request('role_id')) {
                $query->where('role_id', request('role_id'));
            }
            if (request('search')) {
                $query->where('name', 'like', '%' . request('search') . '%');
            }
        });

        $users = $users->sortable([
            request('orderby') ? request('orderby') : 'id' => request('orderdir') ? request('orderdir') : 'desc'
        ]);

        return $users->paginate(10);
    }

    public function store(UserRequest $request)
    {
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role_id' => $request->input('role_id'),
            'date_of_birth' => $request->input('date_of_birth'),
            'gender' => $request->input('gender'),
            'mobile' => $request->input('mobile')
        ]);

        if ($user->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return $user;
    }

    public function update(UserRequest $request, User $user)
    {
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'role_id' => $request->input('role_id'),
            'date_of_birth' => $request->input('date_of_birth'),
            'gender' => $request->input('gender'),
            'mobile' => $request->input('mobile')
        ]);

        if (!is_null($request->input('password'))) {
            $user->password = Hash::make($request->input('password'));
            $user->save();
        }

        return $user;
    }

    public function destroy(User $user)
    {
        if ($user->image) {
            $this->uploader->deleteOldImage('image', $user->image->filename);
        }

        $user->delete();
    }
}