<?php

namespace App\Listeners;

use App\Models\User;
use App\Events\CaselawCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Notifications\PleaseFollowUpNewCase;
use App\Notifications\ThankYouForConsulting;
use Illuminate\Support\Facades\Notification;

class SendCaselawCreatedNotification
{
    public function handle(CaselawCreated $event)
    {
        $caselaw = $event->caselaw;
        $client = $caselaw->client;

        //client
        $client->notify(
            (new ThankYouForConsulting($caselaw))
            ->delay(now()->addMinutes(config('notifications.delay_in_minutes')))
        );

        //admins
        Notification::send(
            User::where('role_id', 1)->get(),
            (new PleaseFollowUpNewCase($caselaw))
            ->delay(now()->addMinutes(config('notifications.delay_in_minutes')))
        );
    }
}
