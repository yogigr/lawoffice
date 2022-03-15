<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaselawUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('caselaw_user', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('caselaw_id');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('caselaw_id')->references('id')->on('caselaws')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('caselaw_user');
    }
}