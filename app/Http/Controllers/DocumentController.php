<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Http\Requests\DocumentRequest;
use App\Http\Services\DocumentService;

class DocumentController extends Controller
{
    public function store(DocumentRequest $request, DocumentService $service)
    {
        $document = $service->store($request);
        return redirect()->route('caselaw.document.index', $document->caselaw)
        ->with('status', 'Berhasil menambahkan dokumen baru');
    }

    public function update(DocumentRequest $request, DocumentService $service, Document $document)
    {
        $document = $service->update($request, $document);
        return redirect()->route('caselaw.document.index', $document->caselaw)
        ->with('status', 'Berhasil update dokumen');
    }

    public function destroy(DocumentService $service, Document $document)
    {
        $caselaw = $document->caselaw;
        $service->destroy($document);
        return redirect()->route('caselaw.document.index', $document->caselaw)
        ->with('status', 'Berhasil hapus dokumen');
    }

    public function download(DocumentService $service, Document $document)
    {
        return $service->download($document);
    }
}
