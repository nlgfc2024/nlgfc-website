import { ref } from 'vue';

const projectGroups = ref([]);

const projectContent = ref({});

export function useGeneralSidebar() {
  return {
    projectGroups,
    projectContent,
  };
}