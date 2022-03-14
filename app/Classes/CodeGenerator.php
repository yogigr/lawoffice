<?php

namespace App\Classes;

use Illuminate\Support\Facades\DB;

class CodeGenerator
{
    public function getCode($char, $table, $digitLength = 4)
	{
		$maxCode = DB::table($table)->max('code');
        if (is_null($maxCode)) {
        	return $char . str_pad(1, $digitLength, '0', STR_PAD_LEFT);
        } else {
            $currentNumber = substr($maxCode, strlen($char), $digitLength);
            $newNumber = str_pad((int)($currentNumber + 1), $digitLength, '0', STR_PAD_LEFT);
            return $char . $newNumber;
        }
	}

}