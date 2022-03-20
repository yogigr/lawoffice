<?php

namespace App\Http\Services;

use App\Models\Bank;
use App\Http\Requests\BankRequest;

class BankService
{
    public function getBanks()
    {
        return Bank::orderBy('name', 'asc')->get();
    }

    public function store(BankRequest $request)
    {
        return Bank::create([
            'name' => $request->input('name'),
            'number' => $request->input('number'),
            'owner' => $request->input('owner')
        ]);
    }

    public function update(BankRequest $request, Bank $bank)
    {
        return $bank->update([
            'name' => $request->input('name'),
            'number' => $request->input('number'),
            'owner' => $request->input('owner')
        ]);
    }

    public function destroy(Bank $bank)
    {
        $bank->delete();
    }
}