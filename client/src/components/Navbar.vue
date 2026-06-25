<template>
  <nav class="bg-dark-900 text-gray-100 ">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- LOGO / BRAND -->
        <div class="flex-shrink-0">
          <a href="#" class="text-xl font-bold tracking-wider text-white hover:text-emerald-400 transition-colors">
          ./AldyToi
          </a>
        </div>

        <!-- DESKTOP MENU (Muncul di PC, Hilang di HP) -->
        <div class="hidden md:flex ml-auto mr-5 space-x-8 text-sm font-medium">
          <a href="https://linkedin.com/in/aldytoi" class="hover:text-emerald-400 px-1 py-5 transition-colors">LinkedIn</a>
          <a href="#" class="hover:text-emerald-400 px-1 py-5 transition-colors">Services</a>
          <a href="mailto:aldyjrz@gmail.com" class="hover:text-emerald-400 px-1 py-5 transition-colors">Contact</a>
        </div>

        <!-- BUTTON CALL TO ACTION (PC Only) -->
        <div class="hidden md:flex items-center">
          <a href="#" class="bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold px-4 py-2 rounded-lg text-sm transition-all shadow-md shadow-emerald-500/10">
            Hire Me
          </a>
        </div>

        <!-- MOBILE MENU BUTTON (Tombol Hamburger di HP) -->
        <div class="md:hidden flex items-center">
          <label for="mobile-menu-toggle" class="cursor-pointer p-2 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>

      </div>
    </div>

    <!-- INPUT HIDDEN UNTUK DETEKSI KLIK (Trik CSS murni tanpa JS) -->
    <input type="checkbox" id="mobile-menu-toggle" class="hidden peer" />

    <!-- MOBILE MENU (Hanya muncul saat tombol di HP di-klik) -->
    <div class="hidden peer-checked:block md:hidden bg-dark">
      <div class="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-base font-medium">
        <a href="https://linkedin.com/in/aldytoi" class="block hover:bg-gray-800 hover:text-emerald-400 px-3 py-2 rounded-md transition-colors">LinkedIn</a>
        <a href="#" class="block hover:bg-gray-800 hover:text-emerald-400 px-3 py-2 rounded-md transition-colors">Services</a>
        <a href="mailto:aldyjrz@gmail.com" class="block hover:bg-gray-800 hover:text-emerald-400 px-3 py-2 rounded-md transition-colors">Contact</a>
        <div class="pt-4 border-t border-gray-800 mt-2 px-3">
          <a href="#" class="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all">
            Hire Me
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
 