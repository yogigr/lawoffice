<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\BankRequest;
use App\Http\Services\BankService;

class BankController extends Controller
{
    public function index(BankService $service)
    {
        return Inertia::render('Bank/Index', [
            'banks' => $service->getBanks()
        ]);
    }

    public function create()
    {
        return Inertia::render('Bank/Create');
    }

    public function store(BankRequest $request, BankService $service)
    {
        $bank = $service->store($request);
        return redirect()->route('bank.index')
        ->with('status', 'Berhasil tambah bank baru');
    }

    public function edit(Bank $bank)
    {
        return Inertia::render('Bank/Edit', [
            'bank' => $bank
        ]);
    }

    public function update(BankRequest $request, BankService $service, Bank $bank)
    {
        $bank = $service->update($request, $bank);
        return redirect()->route('bank.index')
        ->with('status', 'Berhasil update bank');
    }

    public function destroy(BankService $service, Bank $bank)
    {
        $service->destroy($bank);
        return redirect()->route('bank.index')
        ->with('status', 'Berhasil hapus bank');
    }
}
