<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('Notification/Index', [
            'notifications' => NotificationResource::collection(
                Auth::user()->notifications()->paginate(10)
            )
        ]);
    }

    public function markAsRead($id)
    {
        $userUnreadNotification = Auth::user()
        ->unreadNotifications
        ->where('id', $id)
        ->first();

        if($userUnreadNotification) {
            $userUnreadNotification->markAsRead();
        }

        return redirect()->route('notification.index');
    }

    public function markAllAsRead()
    {
        Auth::user()->unreadNotifications->markAsRead();
        return redirect()->route('notification.index');
    }

    public function destroy()
    {
        Auth::user()->notifications()->delete();
        return redirect()->route('notification.index');
    }
}
