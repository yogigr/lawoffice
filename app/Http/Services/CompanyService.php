<?php

namespace App\Http\Services;

use App\Models\Company;
use App\Classes\Uploader;
use App\Http\Requests\CompanyRequest;

class CompanyService
{
    protected $company;
    protected $uploader;

    public function __construct()
    {
        $this->company = Company::first();
        $this->uploader = new Uploader();
    }

    public function getCompany()
    {
        return [
            'name' => $this->company->name,
            'about' => $this->company->about,
            'facebook_link' => $this->company->facebook_link,
            'instagram_link' => $this->company->instagram_link,
            'twitter_link' => $this->company->twitter_link,
            'email' => $this->company->email,
            'phone' => $this->company->phone,
            'address' => $this->company->address,
            'meta_keywords' => $this->company->meta_keywords,
            'meta_desc' => $this->company->meta_desc,
            'logo' => $this->company->logo,
        ];
    }

    public function update(CompanyRequest $request)
    {
        $this->company->update([
            'name' => $request->name,
            'about' => $request->about,
            'facebook_link' => $request->facebook_link,
            'instagram_link' => $request->instagram_link,
            'twitter_link' => $request->twitter_link,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'meta_keywords' => $request->meta_keywords,
            'meta_desc' => $request->meta_desc,
        ]);

        if ($request->hasFile('imagefile')) {
            if ($this->company->image) {
                $this->uploader->deleteOldImage('image', $this->company->image->filename);
                $this->company->image->delete();
            }

            $filename = $this->uploader->uploadPicture(
                $request->file('imagefile'), 
                'company ' . $this->company->id . ' ' . $this->company->name . ' ' . now()->format('YmdHis'), 
                'image'
            );
            $this->company->image()->create([
                'filename' => $filename
            ]);

            $this->company->refresh();
        }

        return $this->company;
    }
}