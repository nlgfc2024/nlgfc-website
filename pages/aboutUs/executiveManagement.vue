<script setup>
definePageMeta({
  title: 'Executive Management'
})

const leadership = {
  executiveDirector: {
    name: "Kondwani Santhe (PhD)",
    position: "Executive Director",
    image: "/images/management/kondwani-santhe--ed.png",
    reportsTo: null,
    subordinates: [
      "directorInfrastructure",
      "directorFinance",
      "directorCorporate"
    ]
  },
  directorInfrastructure: {
    name: "Paul Chipeta",
    position: "Director of Social & Economic Development Services",
    image: "/images/management/directorEconomicDevelopment.png",
    reportsTo: "executiveDirector"
  },
  directorFinance: {
    name: "Linda Kapanda",
    position: "Director of Finance & Fiscal Decentralization",
    image: "/images/management/financeDirector.png",
    reportsTo: "executiveDirector"
  },
  directorCorporate: {
    name: "Stanley Chuthi",
    position: "Director of Administration & Corporate Services",
    image: "/images/management/directorCorporateServices.png",
    reportsTo: "executiveDirector"
  }
}
</script>

<template>
  <div class="executive-page">
    <h1 class="text-2xl font-bold mb-4">NLGFC Executive Management</h1>
    
    <!-- Top Level - Executive Director -->
    <div class="org-level top-level">
      <div class="executive-card">
        <div class="executive-image">
          <img :src="leadership.executiveDirector.image" :alt="leadership.executiveDirector.name">
        </div>
        <h2>{{ leadership.executiveDirector.name }}</h2>
        <p class="position">{{ leadership.executiveDirector.position }}</p>
      </div>
    </div>
    
    <!-- Connecting line -->
    <div class="connector"></div>
    
    <!-- Second Level - Directors -->
    <div class="org-level middle-level">
      <div 
        v-for="(id, index) in leadership.executiveDirector.subordinates" 
        :key="index" 
        class="executive-card"
      >
        <div class="executive-image">
          <img :src="leadership[id].image" :alt="leadership[id].name">
        </div>
        <h3>{{ leadership[id].name }}</h3>
        <p class="position">{{ leadership[id].position }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.executive-page {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
}

.org-level {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.top-level {
  margin-bottom: 1rem;
}

.middle-level {
  margin-top: 1rem;
}

.executive-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 250px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.top-level .executive-card {
  background: #f8f9fa;
  border-top: 4px solid #e74c3c;
}

.position {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

.connector {
  height: 40px;
  width: 2px;
  background: #ddd;
  margin: 0 auto;
}

.executive-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
}

.executive-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .org-level {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .connector {
    height: 20px;
  }
  
  .executive-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>