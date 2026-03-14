import { ref } from 'vue';

const projectGroups = ref([]);
const projectContent = ref({});
/** Standalone sidebar sections (no accordion) - used for about page flat links */
const sidebarSections = ref([]);

export function useGeneralSidebar() {
  return {
    projectGroups,
    projectContent,
    sidebarSections,
  };
}