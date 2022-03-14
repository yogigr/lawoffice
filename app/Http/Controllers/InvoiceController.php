<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\InvoiceRequest;
use App\Http\Services\InvoiceService;

class InvoiceController extends Controller
{
    public function index()
    {
        if (!Gate::allows('view-invoice')) {
            abort(403);
        }
    }

    public function store(InvoiceRequest $request, InvoiceService $service)
    {
        $invoice = $service->store($request);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/invoice/' . $invoice->id)
        ->with('status', 'Berhasil membuat invoice baru');
    }

    public function update(InvoiceRequest $request, InvoiceService $service, Invoice $invoice)
    {
        $invoice = $service->update($request, $invoice);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/invoice/' . $invoice->id)
        ->with('status', 'Berhasil update invoice');
    }

    public function destroy(InvoiceService $service, Invoice $invoice)
    {
        if (!Gate::allows('delete-invoice')) {
            abort(403);
        }

        $caselaw = $invoice->caselaw;
        $service->destroy($invoice);
        return redirect()->route('caselaw.invoice.index', $caselaw)
        ->with('status', 'Invoice berhasil dihapus');
    }
}
