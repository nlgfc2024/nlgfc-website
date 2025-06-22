<script setup>
import { onMounted } from 'vue'

definePageMeta({
  title: 'Contact Us'
})

const latitude = -13.954969
const longitude = 33.781897

onMounted(() => {
  const interval = setInterval(() => {
    if (typeof L !== 'undefined') {
      clearInterval(interval)

      const map = L.map('contact-map').setView([latitude, longitude], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map)

      L.marker([latitude, longitude]).addTo(map)
        .bindPopup('We are here!')
        .openPopup()

      setTimeout(() => {
        map.invalidateSize()
      }, 200)
    }
  }, 100)
})
</script>

<template>
  <div>
    <!-- Optional PageHeader -->
    <!-- <PageHeader title="Contact Us" /> -->

    <div class="contact-page">
      <!-- Leaflet Map comes first -->
      <div id="contact-map" class="map-container"></div>

      <h1>Please input the required information below:</h1>

      <form class="contact-form">
        <label>
          Name:
          <input type="text" name="name" required />
        </label>

        <label>
          Email:
          <input type="email" name="email" required />
        </label>

        <label>
          Message:
          <textarea name="message" rows="5" required></textarea>
        </label>

        <button type="submit">Send</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: auto;
  padding: 2rem;
}

/* Leaflet Map Styling */
.map-container {
  margin-bottom: 2rem;
  height: 400px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-form label {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.contact-form input,
.contact-form textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.contact-form button {
  width: fit-content;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}
</style>
