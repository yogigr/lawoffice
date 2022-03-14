<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Caselaw;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use App\Http\Requests\CaselawRequest;
use App\Http\Services\CaselawService;
use App\Http\Services\InvoiceService;
use App\Http\Services\MessageService;
use App\Http\Services\DocumentService;
use App\Http\Resources\CaselawResource;
use App\Http\Resources\InvoiceResource;
use App\Http\Resources\MessageResource;
use App\Http\Resources\DocumentResource;
use App\Http\Services\AppointmentService;
use App\Http\Resources\AppointmentResource;

class CaselawController extends Controller
{
    public function index(CaselawService $service)
    {
        if (!Gate::allows('view-caselaw')) {
            abort(403);
        }

        if (Auth::user()->role_id == 3) {
            request()->request->add(['client_id' => Auth::id()]);
        } elseif (Auth::user()->role_id == 2) {
            request()->request->add(['user_id' => Auth::id()]);
        }

        $caselaws = $service->getCaselaws();
        $support = $service->getSupportData();
        return Inertia::render('Caselaws/Index', [
            'statuses' => $support['statuses'],
            'services' => $support['services'],
            'caselaws' => request()->inertia() ? Inertia::lazy(function() use ($caselaws) {
                return CaselawResource::collection($caselaws);
            }) : CaselawResource::collection($caselaws),
        ]);
    }

    public function create(CaselawService $service)
    {
        if (!Gate::allows('create-caselaw')) {
            abort(403);
        }

        $support = $service->getSupportData();
        return Inertia::render('Caselaws/Create', [
            'statuses' => $support['statuses'],
            'services' => $support['services'],
            'clients' => $support['clients'],
        ]);
    }

    public function store(CaselawRequest $request, CaselawService $service)
    {
        $caselaw = $service->createCaselaw($request);
        return redirect()->route('caselaw.show', $caselaw)->with('status', 'Case berhasil dibuat');
    }

    public function show(Caselaw $caselaw)
    {
        if (!Gate::allows('view-caselaw')) {
            abort(403);
        }

        return Inertia::render('Caselaws/Show', [
            'caselaw' => new CaselawResource($caselaw),
        ]);
    }

    public function edit(CaselawService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('edit-caselaw')) {
            abort(403);
        }

        $support = $service->getSupportData();
        return Inertia::render('Caselaws/Edit', [
            'caselaw' => new CaselawResource($caselaw),
            'statuses' => $support['statuses'],
            'services' => $support['services'],
            'clients' => $support['clients'],
        ]);
    }

    public function update(CaselawRequest $request, CaselawService $service, Caselaw $caselaw)
    {
        $caselaw = $service->updateCaselaw($request, $caselaw);
        return redirect()->route('caselaw.show', $caselaw)->with('status', 'Case berhasil diperbaharui');
    }

    public function destroy(CaselawService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('delete-caselaw')) {
            abort(403);
        }

        $service->deleteCaselaw($caselaw);
        return redirect()->route('caselaw.index')->with('status', 'Case berhasil dihapus');
    }

    public function lawyer(CaselawService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('view-lawyer')) {
            abort(403);
        }

        $data = $service->getLawyers($caselaw);
        return Inertia::render('Caselaws/Lawyer', [
            'caselaw' => $caselaw,
            'lawyers' => UserResource::collection($data['lawyers']),
            'users' => $data['users']
        ]);
    }

    public function lawyerStore(Request $request, CaselawService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('create-lawyer')) {
            abort(403);
        }

        $service->lawyerStore($request, $caselaw);
        return redirect()->route('caselaw.lawyer.index', $caselaw)->with('status', 'Berhasil menambahkan lawyer');
    }

    public function lawyerDestroy(CaselawService $service, Caselaw $caselaw, User $lawyer)
    {
        if (!Gate::allows('delete-caselaw')) {
            abort(403);
        }

        $service->lawyerDestroy($caselaw, $lawyer);
        return redirect()->route('caselaw.lawyer.index', $caselaw)->with('status', 'Berhasil hapus lawyer');
    }

    public function appointment(AppointmentService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('view-appointment')) {
            abort(403);
        }

        return Inertia::render('Caselaws/Appointment', [
            'caselaw' => $caselaw,
            'appointments' => AppointmentResource::collection($service->getAppointmentsWithCaselaw($caselaw))
        ]);
    }

    public function invoice(InvoiceService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('view-invoice')) {
            abort(403);
        }

        return Inertia::render('Caselaws/Invoice', [
            'caselaw' => $caselaw,
            'invoices' => InvoiceResource::collection($service->getInvoicesWithCaselaw($caselaw))
        ]);
    }

    public function message(MessageService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('view-message')) {
            abort(403);
        }

        return Inertia::render('Caselaws/Message', [
            'caselaw' => $caselaw,
            'messages' => MessageResource::collection($service->getMessagesWithCaselaw($caselaw))
        ]);
    }

    public function document(DocumentService $service, Caselaw $caselaw)
    {
        if (!Gate::allows('view-document')) {
            abort(403);
        }

        return Inertia::render('Caselaws/Document', [
            'caselaw' => $caselaw,
            'documents' => DocumentResource::collection($service->getDocumentsWithCaselaw($caselaw))
        ]);
    }
}
