<template>
  <footer class=" text-white py-12" style="background-color: #070738">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Get in Touch -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Get in Touch</h3>
          <p class="text-sm leading-relaxed">
            National Local Government Finance Committee<br />
            Private Bag 348<br />
            Capital City, Lilongwe 3, Malawi
          </p>
          <p class="mt-2 text-sm">
            Phone: +265 1 773 666<br />
            Email: <a href="mailto:info@nlgfc.gov.mw" class="underline">info@nlgfc.gov.mw</a>
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><NuxtLink to="/about" class="hover:underline">About Us</NuxtLink></li>
            <li><NuxtLink to="/projects" class="hover:underline">Projects</NuxtLink></li>
            <li><NuxtLink to="/resources" class="hover:underline">Resource Centre</NuxtLink></li>
            <li><NuxtLink to="/opportunities" class="hover:underline">Opportunities</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:underline">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Social Media -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <UIcon name="i-simple-icons-facebook" class="w-6 h-6 text-white hover:text-gray-200" />
            </a>
            <a href="#" aria-label="Twitter">
              <UIcon name="i-simple-icons-twitter" class="w-6 h-6 text-white hover:text-gray-200" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <UIcon name="i-simple-icons-linkedin" class="w-6 h-6 text-white hover:text-gray-200" />
            </a>
            <a href="#" aria-label="YouTube">
              <UIcon name="i-simple-icons-youtube" class="w-6 h-6 text-white hover:text-gray-200" />
            </a>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Newsletter</h3>
          <p class="text-sm mb-2">Stay up to date with our latest news.</p>
          <form class="flex flex-col space-y-2">
            <UInput placeholder="Enter your email" size="sm" class="text-gray-900" />
            <UButton type="submit" size="sm" color="white" variant="solid" class="w-fit">
              Subscribe
            </UButton>
          </form>
        </div>
      </div>

      <div class="border-t border-white/20 mt-10 pt-6 text-center text-sm">
        &copy; {{ new Date().getFullYear() }} National Local Government Finance Committee. All rights reserved.
      </div>
    </UContainer>
  </footer>
</template>
