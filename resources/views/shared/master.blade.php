<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="{{ $company->meta_desc }}">
  <meta name="keywords" content="{{ $company->meta_keywords }}">
  <meta name="author" content="{{ $company->name }}">
  <title>{{ $company->name }}</title>
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">
<body>
  @include('shared.heroes')
  @yield('content')
  @include('shared.scroll_to_top_btn')
  <script src="{{ asset('js/front.js') }}"></script>
</body>
</html>
