<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Http\Services\BankService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\InvoiceRequest;
use App\Http\Services\CompanyService;
use App\Http\Services\InvoiceService;
use App\Http\Resources\InvoiceResource;

class InvoiceController extends Controller
{
    public function index(InvoiceService $service)
    {
        if (!Gate::allows('view-invoice')) {
            abort(403);
        }

        return Inertia::render('Invoice/Index', [
            'invoices' => InvoiceResource::collection($service->getInvoices(Auth::user()))
        ]);
    }

    public function store(InvoiceRequest $request, InvoiceService $service)
    {
        $invoice = $service->store($request);
        return redirect($request->has('redirect') ? $request->input('redirect') : '/invoice/' . $invoice->id)
        ->with('status', 'Berhasil membuat invoice baru');
    }

    public function show(InvoiceService $service, Invoice $invoice)
    {
        if (!Gate::allows('view-invoice')) {
            abort(403);
        }

        return Inertia::render('Invoice/Show', [
            'invoice' => $service->getInvoice($invoice),
            'banks' => (new BankService())->getBanks()
        ]);
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

    public function pdf(Invoice $invoice)
    {
        if (!Gate::allows('view-invoice')) {
            abort(403);
        }

        $pdf = Pdf::loadView('invoice.pdf', [
            'company' => (new CompanyService())->company,
            'invoice' => $invoice
        ]);

        return $pdf->download($invoice->code . '_' . now()->format('Ymdhis') . '.pdf');
    }
}
