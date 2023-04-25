<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('pseudo');
            $table->text('short_description')->nullable();
            $table->longText('long_description')->nullable();
            $table->date('date_naissance')->nullable();
            $table->string('locality')->nullable();
            $table->string('country')->nullable();
            $table->float('radius')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['pseudo','short_description', 'long_description', 'date_naissance', 'locality', 'country', 'radius']);
        });
    }
};
