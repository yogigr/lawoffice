<?php

namespace App\Http\Services;

use App\Models\User;
use App\Models\Status;
use App\Models\Caselaw;
use App\Models\Service;
use Illuminate\Http\Request;
use App\Classes\CodeGenerator;
use App\Http\Requests\CaselawRequest;
use Illuminate\Support\Facades\Validator;

class CaselawService
{
    protected $codeGenerator;

    public function __construct()
    {
        $this->codeGenerator = new CodeGenerator();
    }

    public function getSupportData()
    {
        $statuses = Status::orderBy('id', 'asc')->get()->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->name
            ];
        });

        $services = Service::orderBy('name', 'asc')->get()->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->name
            ];
        });

        $clients = User::where('role_id', 3)->orderBy('name', 'asc')->get()->map(function($item) {
            return [
                'id' => $item->id,
                'name' => $item->name
            ];
        });

        return [
            'statuses' => $statuses,
            'services' => $services,
            'clients' => $clients
        ];
    }

    public function getCaselaws()
    {
        $caselaws = Caselaw::where(function($query) {
           if (request('status_id')) {
                $query->where('status_id', request('status_id'));
           }
           if (request('service_id')) {
                $query->where('service_id', request('service_id'));
           }
           if (request('client_id')) {
                $query->where('client_id', request('client_id'));
           }
           if (request('user_id')) {
               $query->whereHas('users', function($usersQuery) {
                   $usersQuery->where('user_id', request('user_id'));
               });
           }
           if (request('code')) {
                $query->where('code', 'like', '%' . request('code') . '%');
           }
        });

        $caselaws = $caselaws->sortable([
            request('orderby') ? request('orderby') : 'id' => request('orderdir') ? request('orderdir') : 'desc'
        ]);

        $caselaws = $caselaws->paginate(request('per_page') ? request('per_page') : 10);

        return $caselaws;
    }

    public function createCaselaw(CaselawRequest $request)
    {
        $caselaw = Caselaw::create([
            'code' => $this->codeGenerator->getCode('CL', 'caselaws'),
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'title' => $request->title,
            'desc' => $request->desc,
            'service_id' => $request->service_id,
            'status_id' => $request->status_id,
            'client_id' => $request->client_id
        ]);

        return $caselaw;
    }

    public function updateCaselaw(CaselawRequest $request, Caselaw $caselaw)
    {
        $caselaw->update([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'title' => $request->title,
            'desc' => $request->desc,
            'service_id' => $request->service_id,
            'status_id' => $request->status_id,
            'client_id' => $request->client_id
        ]);
        return $caselaw;
    }

    public function deleteCaselaw(Caselaw $caselaw)
    {
        $caselaw->delete();
    }

    public function getLawyers(Caselaw $caselaw)
    {
        $lawyers = $caselaw->users()->orderBy('name', 'asc')->get();
        
        $users = User::where('role_id', 2)->whereNotIn('id', $lawyers->map(function($item) {
            return $item->id;
        })->toArray())->get()->map(function($item){
            return [
                'id' => $item->id,
                'name' => $item->name,
                'role_id' => $item->role_id
            ];
        });

        return [
            'lawyers' => $lawyers,
            'users' => $users,
        ];
    }

    public function LawyerStore(Request $request, Caselaw $caselaw)
    {
        Validator::make($request->all(), [
            'user_id' => 'required'
        ], [
            'user_id.required' => 'Lawyer belum dipilih'
        ])->validate();

        $caselaw->users()->attach($request->input('user_id'));
    }

    public function lawyerDestroy(Caselaw $caselaw, User $lawyer)
    {
        $caselaw->users()->detach($lawyer->id);
    }
}