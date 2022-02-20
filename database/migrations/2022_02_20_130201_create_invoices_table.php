<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->date('date');
            $table->date('due_date');
            $table->unsignedBigInteger('caselaw_id');
            $table->decimal('tax', 12, 0);
            $table->decimal('discount', 12, 0);
            $table->string('note')->nullable();
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
        Schema::dropIfExists('invoices');
    }
}
