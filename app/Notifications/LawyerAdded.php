<?php

namespace App\Notifications;

use App\Models\Caselaw;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class LawyerAdded extends Notification implements ShouldQueue
{
    use Queueable;

    public $title;
    public $message;
    public $actions;

    public function __construct(Caselaw $caselaw)
    {
        $this->title = config('notifications.lawyer_added.title');
        $this->message = config('notifications.lawyer_added.message');
        $this->actions = [
            'text' => 'LIHAT CASE',
            'link' => url('/caselaw/' . $caselaw->id)
        ];
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject($this->title)
                    ->line($this->message)
                    ->action($this->actions['text'], $this->actions['link'])
                    ->line('Thank you for using our application!');
    }

    public function toArray($notifiable)
    {
        return [
            'title' => $this->title,
            'message' => $this->message,
            'action' => $this->actions
        ];
    }
}
