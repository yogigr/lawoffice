<?php

namespace App\Classes;

use Image;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class Uploader
{
    public function uploadImage($file, $filename, $disk, $twidth = 200, $theight = 200, $width = 400, $height = 300)
    {
        $filename = Str::slug($filename) . '.' . $file->getClientOriginalExtension();
        $canvas = Image::canvas($width, $height, '#eee');
        $tcanvas = Image::canvas($twidth, $theight, '#eee');
        
        $image = Image::make($file);
        $thumb = Image::make($file);
        
        $image->resize($width, $height, function ($constraint) {
            $constraint->aspectRatio();
        });

        $thumb->resize($twidth, $theight, function ($constraint) {
            $constraint->aspectRatio();
        });

        $canvas->insert($image, 'center');
        $tcanvas->insert($thumb, 'center');

        Storage::disk($disk)->put($filename, (string) $canvas->encode());
        Storage::disk($disk)->put('thumb/'.$filename, (string) $tcanvas->encode());
        return $filename;
    }

    public function uploadPicture($file, $filename, $disk)
    {
        $filename = Str::slug($filename) . '.' . $file->getClientOriginalExtension();
        $picture = Image::make($file);

        $picture->fit(250, 250, function ($constraint) {
            $constraint->aspectRatio();
        });

        Storage::disk($disk)->put($filename, (string) $picture->encode());
        return $filename;
    }

    public function deleteOldImage($disk, $filename)
    {
    	if (Storage::disk($disk)->exists($filename)) {
            Storage::disk($disk)->delete($filename);
            Storage::disk($disk)->delete('thumb/'.$filename);
        }
    }

    public function uploadFile($file, $filename, $disk)
    {
        $filename = Str::slug($filename) . '.' . $file->getClientOriginalExtension();
        Storage::disk($disk)->put('/'.$filename, File::get($file));
        return $filename;
    }

    public function deleteFile($disk, $filename)
    {
        if (Storage::disk($disk)->exists($filename)) {
            Storage::disk($disk)->delete($filename);
        }
    }
}
