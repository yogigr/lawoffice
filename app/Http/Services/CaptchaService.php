<?php

namespace App\Http\Services;

use Illuminate\Http\Request;

class CaptchaService
{
    public function getCaptcha(Request $request)
    {
        //delete captcha answer session
        $request->session()->forget('captcha_answer');
            
        $randomInteger1 = substr(mt_rand(),0,2);
        $randomInteger2 = substr(mt_rand(),0,1);

        $captchaQuestion = sprintf('%s + %s ?', $randomInteger1, $randomInteger2);
        $captchaAnswer = $randomInteger1 + $randomInteger2;

        //put session
        $request->session()->put('captcha_answer', $captchaAnswer);

        return $captchaQuestion;
    }    
}