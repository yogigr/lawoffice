<!-- This example requires Tailwind CSS v2.0+ -->
<div id="practices" class="bg-primary-600">
  <div class="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:pt-24 lg:px-8">
    <h2 class="text-4xl font-extrabold text-gray-900 tracking-tight">
      PRACTICE AREAS
    </h2>
    <div class="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
      @foreach($services as $service)
      <div class="{{ $loop->index < 4 ? '' : 'hidden hidden-practice' }}">
        <div>
          <span class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-50">
            <!-- Heroicon name: outline/check -->
            <svg class="absolute h-6 w-6 text-primary-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </span>
        </div>
        <div class="mt-6">
          <h3 class="text-lg font-bold text-white">{{ $service->name }}</h3>
          <p class="mt-2 text-base text-primary-50">
            {{ $service->description }}
          </p>
        </div>
      </div>
      @endforeach
    </div>
    <div class="mt-12 flex justify-center">
      <button id="toggle-practice-btn" class="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"></button>
    </div>
  </div>
</div>
