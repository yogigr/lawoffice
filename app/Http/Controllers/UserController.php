<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Services\UserService;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function index(UserService $service)
    {
        if (!Gate::allows('view-user')) {
            abort(403);
        }

        return Inertia::render('User/Index', [
            'roles' => $service->getSupportData()['roles'],
            'users' => UserResource::collection($service->getUsers())
        ]);
    }

    public function create(UserService $service)
    {
        if (!Gate::allows('create-user')) {
            abort(403);
        }

        return Inertia::render('User/Create', [
            'roles' => $service->getSupportData()['roles']
        ]);
    }

    public function store(UserRequest $request, UserService $service)
    {
        $user = $service->store($request);
        return redirect()->route('user.show', $user)
        ->with('status', 'User berhasil dibuat');
    }

    public function show(User $user)
    {
        if (!Gate::allows('view-user')) {
            abort(403);
        }

        return Inertia::render('User/Show', [
            'user' => new UserResource($user)
        ]);
    }

    public function edit(UserService $service, User $user)
    {
        if (!Gate::allows('edit-user')) {
            abort(403);
        }

        return Inertia::render('User/Edit', [
            'roles' => $service->getSupportData()['roles'],
            'user' => new UserResource($user)
        ]);
    }

    public function update(UserRequest $request, UserService $service, User $user)
    {
        $user = $service->update($request, $user);
        return redirect()->route('user.show', $user)
        ->with('status', 'User berhasil diperbarui');
    }

    public function destroy(UserService $service, User $user)
    {
        $service->destroy($user);
        return redirect()->route('user.index')
        ->with('status', 'User berhasil dihapus');
    }

    public function address(User $user)
    {
        if (!Gate::allows('view-user')) {
            abort(403);
        }
        
        return Inertia::render('User/Address', [
            'address' => $user->address,
            'user' => new UserResource($user)
        ]);
    }
}
