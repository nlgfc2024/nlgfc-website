<script setup>
definePageMeta({
  title: 'Board of Directors'
})

const board = {
  chairperson: {
    name: "Dr. Ellen M. Mkandawire",
    position: "Board Chairperson",
    image: "/images/samples/profile1.jpg",
    reportsTo: null,
    subordinates: [
      "member1",
      "member2",
      "member3",
      "member4"
    ]
  },
  member1: {
    name: "Mr. John B. Mwale",
    position: "Board Member",
    image: "/images/samples/profile2.jpg",
    reportsTo: "chairperson"
  },
  member2: {
    name: "Mrs. Patricia K. Jere",
    position: "Board Member",
    image: "/images/samples/profile2.jpg",
    reportsTo: "chairperson"
  },
  member3: {
    name: "Dr. Michael T. Phiri",
    position: "Board Member",
    image: "/images/samples/profile2.jpg",
    reportsTo: "chairperson"
  },
  member4: {
    name: "Ms. Sarah W. Kumwenda",
    position: "Board Member",
    image: "/images/samples/profile2.jpg",
    reportsTo: "chairperson"
  }
}
</script>

<template>
  <div class="board-page">
    <h1>Board of Directors</h1>
    
    <!-- Top Level - Board Chair -->
    <div class="org-level top-level">
      <div class="board-card">
        <div class="board-image">
          <img :src="board.chairperson.image" :alt="board.chairperson.name">
        </div>
        <h2>{{ board.chairperson.name }}</h2>
        <p class="position">{{ board.chairperson.position }}</p>
      </div>
    </div>
    
    <!-- Connecting lines -->
    <div class="connector-container">
      <div class="connector-line"></div>
    </div>
    
    <!-- Second Level - Board Members -->
    <div class="org-level middle-level">
      <div 
        v-for="(id, index) in board.chairperson.subordinates" 
        :key="index" 
        class="board-card"
      >
        <div class="board-image">
          <img :src="board[id].image" :alt="board[id].name">
        </div>
        <h3>{{ board[id].name }}</h3>
        <p class="position">{{ board[id].position }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.board-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 2.5rem;
  font-size: 2rem;
}

.org-level {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.top-level {
  margin-bottom: 1rem;
}

.middle-level {
  margin-top: 1rem;
}

.board-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  width: 200px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.top-level .board-card {
  background: #f8f9fa;
  border-top: 4px solid #2c3e50;
  width: 220px;
}

.position {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.board-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
}

.top-level .board-image {
  width: 110px;
  height: 110px;
}

.board-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.connector-container {
  display: flex;
  justify-content: center;
  margin: 0.5rem 0;
}

.connector-line {
  height: 30px;
  width: 80%;
  max-width: 800px;
  border-bottom: 2px solid #ddd;
}

@media (max-width: 768px) {
  .org-level {
    gap: 1rem;
  }
  
  .board-card {
    width: 160px;
    padding: 1rem;
  }
  
  .top-level .board-card {
    width: 180px;
  }
  
  .board-image {
    width: 80px;
    height: 80px;
  }
  
  .top-level .board-image {
    width: 90px;
    height: 90px;
  }
  
  .connector-line {
    width: 60%;
  }
}

@media (max-width: 480px) {
  .org-level {
    flex-direction: column;
    align-items: center;
  }
  
  .board-card {
    width: 100%;
    max-width: 250px;
  }
  
  .connector-line {
    height: 20px;
    width: 2px;
    border-bottom: none;
    border-left: 2px solid #ddd;
  }
}
</style>