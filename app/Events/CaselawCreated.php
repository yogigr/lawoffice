<?php

namespace App\Events;

use App\Models\Caselaw;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CaselawCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    
    public $caselaw; 
    
    public function __construct(Caselaw $caselaw)
    {
        $this->caselaw = $caselaw;
    }
}
