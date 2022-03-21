<?php

namespace App\Http\Services;

use App\Models\User;
use App\Models\Caselaw;
use App\Models\Invoice;
use App\Classes\CodeGenerator;
use App\Http\Requests\InvoiceRequest;
use App\Notifications\NewInvoiceCreated;

class InvoiceService
{
    protected $codeGenerator;
    protected $company;

    public function __construct()
    {
        $this->codeGenerator = new CodeGenerator();
        $this->company = (new CompanyService())->company;
    }

    public function getInvoices(User $user)
    {
        return Invoice::where(function($query) use ($user) {
            if (request('code')) {
                $query->where('code', 'like', '%' . request('code') . '%');
            }
            $query->whereHas('caselaw', function($caselawQuery) use ($user) {
                $caselawQuery->where('status_id', 2);
                if ($user->role_id == 2) {
                    $caselawQuery->whereHas('users', function($usersQuery) use ($user) {
                        $usersQuery->where('user_id', $user->id);
                    }); 
                } elseif ($user->role_id == 3) {
                    $caselawQuery->where('client_id', $user->id);
                }
            });
        })->orderBy('date', 'desc')->paginate(10);
    }

    public function getInvoicesWithCaselaw(Caselaw $caselaw)
    {
        return $caselaw->invoices()->orderBy('date', 'desc')->paginate(10);
    }

    public function getInvoice(Invoice $invoice)
    {
        $client = $invoice->caselaw->client;
        $address = $client->address;

        return [
            'id' => $invoice->id,
            'logo' => $this->company->logo,
            'number' => $invoice->code,
            'date' => $invoice->date_formatted,
            'due_date' => $invoice->due_date_formatted,
            'company' => [
                'name' => $this->company->name,
                'address' => nl2br(e($this->company->address)),
                'phone' => $this->company->phone,
            ],
            'client' => [
                'name' => $client->name,
                'address' => $address ? $address->line1 . '<br />' . ($address->line2 ? $address->line2 . '<br />' : '') . 
                $address->city . ', ' . $address->province . ', ' . $address->postal_code . '<br />' .
                $address->country : '',
                'phone' => $client->mobile
            ],
            'details' => $invoice->details->map(function($item) {
                return [
                    'desc' => $item->desc,
                    'amount' => 'Rp ' . number_format($item->amount, 0, ',', '.')
                ];
            }),
            'subtotal' =>  'Rp ' . number_format($invoice->subtotal, 0, ',', '.'),
            'tax' =>  'Rp ' . number_format($invoice->tax, 0, ',', '.'),
            'discount' =>  'Rp ' . number_format($invoice->discount, 0, ',', '.'),
            'total' =>  'Rp ' . number_format($invoice->total, 0, ',', '.'),
            'is_paid' => $invoice->is_paid,
        ];
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

        $invoice->caselaw->client->notify(
            (new NewInvoiceCreated($invoice->caselaw))
            ->delay(now()->addMinutes(config('notifications.delay_in_minutes')))
        );

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