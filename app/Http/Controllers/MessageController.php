<?php

namespace App\Http\Controllers;

use App\Models\Caselaw;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\MessageRequest;
use App\Http\Services\MessageService;

class MessageController extends Controller
{
    public function store(MessageRequest $request, MessageService $service)
    {
        $message = $service->store($request);
        return redirect()->route('caselaw.message.index', $message->caselaw)
        ->with('status', 'Pesan berhasil dikirim'); 
    }

    public function destroy(MessageService $service, Message $message)
    {
        if (!Gate::allows('delete-message')) {
            abort(403);
        }
        
        $caselaw = $message->caselaw;
        $service->destroy($message);
        return redirect()->route('caselaw.message.index', $caselaw)
        ->with('status', 'Pesan berhasil dihapus'); 
    }
}
