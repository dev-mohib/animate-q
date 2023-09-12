<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        User::factory()->create([
            'name'=> 'Admin',
            'email'=> 'b.x.w@live.com',
            'password'=> '$2y$10$KlLiaPQcPkSCFY4tBdSIaOIts5awS0l2XQBhyywqmWKlfFyAqQWPe'
        ]);
    }
}
