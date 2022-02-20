<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->date('date');
            $table->time('time');
            $table->string('title');
            $table->text('desc');
            $table->enum('type', ['online', 'offline']);
            $table->text('location');
            $table->unsignedBigInteger('caselaw_id');           
            $table->timestamps();

            $table->foreign('caselaw_id')->references('id')->on('caselaws')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointments');
    }
}
