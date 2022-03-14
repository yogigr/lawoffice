<?php

namespace App\Http\Services;

use App\Models\Caselaw;
use App\Models\Invoice;
use App\Classes\CodeGenerator;
use App\Http\Requests\InvoiceRequest;

class InvoiceService
{
    protected $codeGenerator;

    public function __construct()
    {
        $this->codeGenerator = new CodeGenerator();
    }

    public function getInvoicesWithCaselaw(Caselaw $caselaw)
    {
        return $caselaw->invoices()->orderBy('date', 'desc')->paginate(10);
    }

    public function store(InvoiceRequest $request)
    {
        $invoice = Invoice::create([
            'code' => $this->codeGenerator->getCode('INV', 'invoices'), 
            'date' => $request->input('date'), 
            'due_date' => $request->input('due_date'), 
            'caselaw_id' => $request->input('caselaw_id'), 
            'tax' => $request->input('tax'), 
            'discount' => $request->input('discount'), 
            'note' => $request->input('note')
        ]);

        foreach ($request->input('details') as $d) {
            $detail = $invoice->details()->create([
                'desc' => $d['desc'], 
                'amount' => $d['amount'], 
                'note' => $d['note']
            ]);
        }

        return $invoice;
    }

    public function update(InvoiceRequest $request, Invoice $invoice)
    {
        $invoice->update([
            'date' => $request->input('date'), 
            'due_date' => $request->input('due_date'),
            'tax' => $request->input('tax'), 
            'discount' => $request->input('discount'), 
            'note' => $request->input('note'),
            'is_paid' => $request->input('is_paid')
        ]);

        foreach ($invoice->details as $detail) { $detail->delete();}

        foreach ($request->input('details') as $d) {
            $detail = $invoice->details()->create([
                'desc' => $d['desc'], 
                'amount' => $d['amount'], 
                'note' => $d['note']
            ]);
        }

        return $invoice;
    }

    public function destroy(Invoice $invoice)
    {
        foreach ($invoice->details as $detail) { $detail->delete();}
        $invoice->delete();
    }
}