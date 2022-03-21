<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{ "INVOICE " . $invoice->code }}</title>
  <link href="{{ public_path('css/app.css') }}" rel="stylesheet" type="text/css" />
<body>
  <!-- header -->
  @php
  $client = $invoice->caselaw->client;
  @endphp
  <table class="w-full table-auto">
    <tbody>
      <tr>
        <td>
          <img src="{{ $company->logo }}" class="h-16">
        </td>
        <td class="text-right">
          <p><span class="font-bold">Invoice Date</span> {{ $invoice->date }}</p>
          <p><span class="font-bold">Due Date</span> {{ $invoice->due_date }}</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" class="py-5 text-right">
          <h3 class="text-xl font-bold" style="color: gray">Invoice #{{ $invoice->code }}</h3>
          <h3 class="text-md font-bold" style="color: {{ $invoice->is_paid ? 'green' : 'red' }}">{{ $invoice->is_paid ? 'Paid' : 'Unpaid' }}</h3>
        </td>
      </tr>
      <tr>
        <td>
          <h3 class="text-lg font-bold">Pay To:</h3>
          <p class="text-sm">{{ $company->name }}</p>
          <p class="text-xs">{!! nl2br(e($company->address)) !!}</p>
          <p class="text-xs">{{ $company->phone }}</p>
        </td>
        <td>
          <h3 class="text-lg font-bold">Invoiced To:</h3>
          <p class="text-sm">{{ $client->name }}</p>
          @if($client->address)
          <p class="text-xs">{{ $client->address->line1 }}</p>
          <p class="text-xs">{{ $client->address->line2 }}</p>
          <p class="text-xs">
            {{ $client->address->city }}, {{ $client->address->province }}, {{ $client->address->postal_code }}
          </p>
          <p class="text-xs">{{ $client->address->country }}</p>
          @endif
          <p class="text-xs">{{ $client->mobile }}</p>
        </td>
      </tr>
    </tbody>
  </table>
  <!--/header-->
  <h2 class="text-lg font-bold my-5">Invoice Items</h2>
  <table class="w-full table-fixed">
    <thead style="background:lightgray">
      <tr>
        <th style="width: 70%" class="text-left p-3">Description</th>
        <th style="width: 30%" class="text-right p-3">Amount</th>
      </tr>
    </thead>
    <tbody>
      @if($invoice->details->count() > 0)
      @foreach($invoice->details as $detail)
      <tr>
        <td class="p-3 text-sm">{{ $detail->desc }}</td>
        <td class="p-3 text-right text-sm">Rp {{ number_format($detail->amount, 0, ',', '.') }}</td>
      </tr>
      @endforeach
      <tr>
        <td class="text-right font-bold text-sm p-3 border-b">Sub Total</td>
        <td class="text-right text-sm p-3 border-b">Rp {{ number_format($invoice->subtotal, 0, ',', '.') }}</td>
      </tr>
      <tr>
        <td class="text-right font-bold text-sm p-3">Tax</td>
        <td class="text-right text-sm p-3">Rp {{ number_format($invoice->tax, 0, ',', '.') }}</td>
      </tr>
      <tr>
        <td class="text-right font-bold text-sm p-3">Discount</td>
        <td class="text-right text-sm p-3">Rp {{ number_format($invoice->discount, 0, ',', '.') }}</td>
      </tr>
      <tr>
        <td class="text-right font-bold text-sm p-3 border-b">Total</td>
        <td class="text-right text-sm p-3 border-b">Rp {{ number_format($invoice->total, 0, ',', '.') }}</td>
      </tr>
      @endif
    </tbody>
  </table>
</body>
</html>
