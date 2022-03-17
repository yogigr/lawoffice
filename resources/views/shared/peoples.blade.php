<div id="peoples" class="bg-white">
  <div class="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
    <div class="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
      <div class="space-y-5 sm:space-y-4">
        <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl">Our People</h2>
        <p class="text-xl text-gray-500">Libero fames augue nisl porttitor nisi, quis. Id ac elit odio vitae elementum enim vitae ullamcorper suspendisse. Vivamus fringilla.</p>
      </div>
      <div class="lg:col-span-2">
        <ul role="list" class="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
          @foreach($lawyers as $lawyer)
          <li class="{{ $loop->index < 6 ? '' : 'hidden hidden-people' }}">
            <div class="flex items-center space-x-4 lg:space-x-6">
              <img class="w-16 h-16 rounded-full lg:w-20 lg:h-20" src="{{ $lawyer->picture }}" alt="{{ $lawyer->name }}">
              <div class="font-medium text-lg leading-6 space-y-1">
                <h3>{{ $lawyer->name }}</h3>
                <p class="text-indigo-600">{{ $lawyer->role->name }}</p>
              </div>
            </div>
          </li>
          @endforeach
        </ul>
      </div>
    </div>
    <div class="mt-16 flex justify-center">
      <button id="toggle-people-btn" class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
        SHOW ALL
      </button>
    </div>
  </div>
</div>
