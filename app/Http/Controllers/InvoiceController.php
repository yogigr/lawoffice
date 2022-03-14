<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Http\Requests\InvoiceRequest;
use App\Http\Services\InvoiceService;

class InvoiceController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(InvoiceRequest $request, InvoiceService $service)
    {
        $invoice = $service->store($request);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/invoice/' . $invoice->id)
        ->with('status', 'Berhasil membuat invoice baru');
    }

    public function show(Invoice $invoice)
    {
        //
    }

    public function edit(Invoice $invoice)
    {
        //
    }

    public function update(InvoiceRequest $request, InvoiceService $service, Invoice $invoice)
    {
        $invoice = $service->update($request, $invoice);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/invoice/' . $invoice->id)
        ->with('status', 'Berhasil update invoice');
    }

    public function destroy(InvoiceService $service, Invoice $invoice)
    {
        $caselaw = $invoice->caselaw;
        $service->destroy($invoice);
        return redirect()->route('caselaw.invoice.index', $caselaw)
        ->with('status', 'Invoice berhasil dihapus');
    }
}
