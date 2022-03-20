<?php

namespace App\Http\Services;

use App\Models\Caselaw;
use App\Models\Message;
use App\Http\Requests\MessageRequest;
use App\Http\Services\CaselawService;
use App\Notifications\NewMessageCreated;
use Illuminate\Support\Facades\Notification;

class MessageService
{
    public function getMessagesWithCaselaw(Caselaw $caselaw)
    {
        return $caselaw->messages()->orderBy('created_at', 'asc')->paginate(10);
    }

    public function store(MessageRequest $request)
    {
        $message = Message::create([
            'text' => $request->input('text'), 
            'user_id' => $request->input('user_id'), 
            'caselaw_id'=> $request->input('caselaw_id')
        ]);

        //notif
        Notification::send(
            (new CaselawService())->getRelatedUsers($message->caselaw, true)->except($message->user_id),
            (new NewMessageCreated($message->caselaw))
            ->delay(now()->addMinutes(config('notifications.delay_in_minutes')))
        );

        return $message;
    }

    public function destroy(Message $message)
    {
        $message->delete();
    }
}