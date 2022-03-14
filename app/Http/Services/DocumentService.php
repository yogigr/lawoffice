<?php

namespace App\Http\Services;

use App\Models\Caselaw;
use App\Models\Document;
use App\Classes\Uploader;
use Illuminate\Support\Str;
use App\Classes\CodeGenerator;
use App\Http\Requests\DocumentRequest;
use Illuminate\Support\Facades\Storage;

class DocumentService
{
    protected $codeGenerator;
    protected $uploader;

    public function __construct()
    {
        $this->codeGenerator = new CodeGenerator();
        $this->uploader = new Uploader();
    }

    public function getDocumentsWithCaselaw(Caselaw $caselaw)
    {
        return $caselaw->documents()->orderBy('id', 'desc')->paginate(10);
    }

    public function store(DocumentRequest $request)
    {
        $document = Document::create([
            'code' => $this->codeGenerator->getCode('DOC', 'documents'), 
            'title' => $request->input('title'), 
            'desc' => $request->input('desc'), 
            'caselaw_id' => $request->input('caselaw_id'), 
            'user_id' => $request->input('user_id')
        ]);

        if ($request->hasFile('fileupload')) {
            $filename = $this->uploader->uploadFile(
                $request->file('fileupload'), 
                Str::slug(strtolower($document->code . ' ' . $document->title)), 
                'document'
            );

            $document->filename = $filename;
            $document->save();
        }

        return $document;
    }

    public function update(DocumentRequest $request, Document $document)
    {
        $document->update([ 
            'title' => $request->input('title'), 
            'desc' => $request->input('desc'),
        ]);

        if ($request->hasFile('fileupload')) {
            $this->uploader->deleteFile('document', $document->filename);
            $filename = $this->uploader->uploadFile(
                $request->file('fileupload'), 
                Str::slug(strtolower($document->code . ' ' . $document->title)), 
                'document'
            );

            $document->filename = $filename;
            $document->save();
        }

        return $document;
    }

    public function destroy(Document $document)
    {
        $this->uploader->deleteFile('document', $document->filename);
        $document->delete();
    }

    public function download(Document $document)
    {
        return Storage::disk('document')->download($document->filename);
    }
}