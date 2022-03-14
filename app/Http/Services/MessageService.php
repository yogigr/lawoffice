<?php

namespace App\Http\Services;

use App\Models\Caselaw;
use App\Models\Message;
use App\Http\Requests\MessageRequest;

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

        return $message;
    }

    public function destroy(Message $message)
    {
        $message->delete();
    }
}