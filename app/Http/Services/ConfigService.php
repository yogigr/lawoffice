<?php

namespace App\Http\Services;

use App\Http\Requests\ConfigRequest;
use Illuminate\Support\Facades\Artisan;

class ConfigService
{
    public function getConfig()
    {
        return collect([
            'app_name' => str_replace('_', ' ', config('app.name')),
            'app_env' => config('app.env'),
            'app_debug' => config('app.debug'),
            'app_url' => config('app.url'),

            'mail_host' => config('mail.mailers.smtp.host'),
            'mail_port' => config('mail.mailers.smtp.port'),
            'mail_username' => config('mail.mailers.smtp.username'),
            'mail_password' => config('mail.mailers.smtp.password'),
            'mail_from_address' => config('mail.from.address')
        ]);
    }

    public function update(ConfigRequest $request)
    {
        //clear config cache
        Artisan::call('config:clear');

        Artisan::call('env:set app_name=' . str_replace(' ', '_', $request->input('app_name')));
        Artisan::call('env:set app_env=' . $request->input('app_env'));
        Artisan::call('env:set app_debug=' . $request->input('app_debug'));
        Artisan::call('env:set app_url=' . $request->input('app_url'));
        Artisan::call('env:set mail_host=' . $request->input('mail_host'));
        Artisan::call('env:set mail_port=' . $request->input('mail_port'));
        Artisan::call('env:set mail_username=' . $request->input('mail_username'));
        Artisan::call('env:set mail_password=' . $request->input('mail_password'));
        Artisan::call('env:set mail_from_address=' . $request->input('mail_from_address'));

        if (config('app.env') == 'production') {
            Artisan::call('config:cache');
        }
    }
}