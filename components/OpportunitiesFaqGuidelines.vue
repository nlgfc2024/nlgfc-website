<script setup>
const props = defineProps({
  activeSection: {
    type: String,
    default: 'jobs'
  }
})

const emit = defineEmits(['close'])

// FAQ data for jobs
const jobFaqs = ref([
  {
    id: 1,
    question: "How do I apply for a job at NLGFC?",
    answer: "To apply for a position at NLGFC, submit your comprehensive CV, tailored cover letter, certified copies of academic certificates, and contact details for three professional references. Applications must be received before the specified deadline through the designated channels."
  },
  {
    id: 2,
    question: "What documents do I need to include in my application?",
    answer: "Your application should include: (1) A comprehensive CV highlighting relevant experience, (2) A tailored cover letter for the specific position, (3) Certified copies of academic certificates and professional qualifications, (4) Contact details for at least three professional references, (5) Any additional documents specified in the job posting."
  },
  {
    id: 3,
    question: "How long does the recruitment process take?",
    answer: "The recruitment process typically takes 4-6 weeks from the application deadline. This includes application review, shortlisting, interviews, reference checks, and final selection. Only shortlisted candidates will be contacted for interviews."
  },
  {
    id: 4,
    question: "Can I apply for multiple positions simultaneously?",
    answer: "Yes, you can apply for multiple positions that match your qualifications and experience. However, you must submit separate applications for each position, tailoring your cover letter and highlighting relevant experience for each role."
  },
  {
    id: 5,
    question: "What happens if I don't hear back after applying?",
    answer: "Due to the high volume of applications, only shortlisted candidates will be contacted. If you don't hear from us within 4 weeks of the application deadline, please consider your application unsuccessful for that particular position."
  },
  {
    id: 6,
    question: "Do you offer internship or graduate trainee programs?",
    answer: "Yes, NLGFC periodically offers internship opportunities and graduate trainee programs. These are usually advertised separately and have specific eligibility criteria. Keep checking our opportunities page for such programs."
  },
  {
    id: 7,
    question: "What benefits does NLGFC offer to employees?",
    answer: "NLGFC offers competitive benefits including health insurance, pension contributions, professional development opportunities, performance-based bonuses, and a supportive work environment focused on career growth."
  }
])

// FAQ data for procurement
const procurementFaqs = ref([
  {
    id: 1,
    question: "How do I participate in NLGFC procurement processes?",
    answer: "To participate in NLGFC procurement, you must be a registered supplier with relevant qualifications and experience. Download the procurement documents, prepare your submission according to specifications, and submit before the deadline through the specified channels."
  },
  {
    id: 2,
    question: "What documents are required for procurement submissions?",
    answer: "Required documents typically include: (1) Completed tender/quotation forms, (2) Company registration certificates, (3) Tax clearance certificates, (4) Professional licenses/certifications, (5) Financial statements, (6) Technical proposals, (7) Any other documents specified in the procurement notice."
  },
  {
    id: 3,
    question: "How are procurement decisions made?",
    answer: "Procurement decisions are made through a transparent evaluation process based on technical competence, financial capability, experience, and value for money. All submissions are evaluated by a procurement committee according to predetermined criteria."
  },
  {
    id: 4,
    question: "Can I submit my proposal electronically?",
    answer: "Electronic submissions are accepted for certain procurement processes as specified in the notice. When electronic submission is allowed, documents must be in PDF format and submitted through the designated platform before the deadline."
  },
  {
    id: 5,
    question: "What happens if my submission is late?",
    answer: "Late submissions will not be considered under any circumstances. It is the supplier's responsibility to ensure submissions are received before the specified deadline, accounting for any potential delays."
  },
  {
    id: 6,
    question: "How can I get clarification on procurement requirements?",
    answer: "For clarifications, contact the procurement office at procurement@nlgfc.gov.mw or +265 1 770 244. All clarifications will be shared with all potential bidders to ensure fairness and transparency."
  },
  {
    id: 7,
    question: "When will I know the results of the procurement process?",
    answer: "Results are typically communicated within 2-4 weeks after the submission deadline, depending on the complexity of the evaluation. All participants will be notified of the outcome in writing."
  }
])

// Guidelines data
const jobGuidelines = ref([
  {
    title: "Application Preparation",
    items: [
      "Carefully read the job description and requirements",
      "Tailor your CV to highlight relevant experience and skills",
      "Write a compelling cover letter specific to the position",
      "Ensure all documents are properly formatted and error-free",
      "Gather certified copies of all required certificates"
    ]
  },
  {
    title: "Submission Process",
    items: [
      "Submit applications through the specified channels only",
      "Ensure all required documents are included",
      "Submit well before the deadline to avoid last-minute issues",
      "Keep copies of all submitted documents for your records",
      "Confirm receipt of your application if possible"
    ]
  },
  {
    title: "Interview Preparation",
    items: [
      "Research NLGFC's mission, vision, and current projects",
      "Prepare examples demonstrating your relevant experience",
      "Practice answering common interview questions",
      "Prepare thoughtful questions about the role and organization",
      "Dress professionally and arrive on time"
    ]
  },
  {
    title: "Professional Conduct",
    items: [
      "Maintain honesty and integrity throughout the process",
      "Provide accurate information in all communications",
      "Respect confidentiality of the recruitment process",
      "Be professional in all interactions with NLGFC staff",
      "Follow up appropriately without being overly persistent"
    ]
  }
])

const procurementGuidelines = ref([
  {
    title: "Pre-Submission Requirements",
    items: [
      "Ensure your company meets all eligibility criteria",
      "Obtain all required licenses and certifications",
      "Prepare current tax clearance certificates",
      "Review technical specifications thoroughly",
      "Attend any pre-bid meetings if scheduled"
    ]
  },
  {
    title: "Document Preparation",
    items: [
      "Complete all forms accurately and legibly",
      "Provide all requested supporting documents",
      "Ensure financial documents are current and certified",
      "Include detailed technical proposals where required",
      "Sign and stamp all documents as specified"
    ]
  },
  {
    title: "Submission Guidelines",
    items: [
      "Submit in the format specified (hard copy, electronic, or both)",
      "Seal submissions properly and label clearly",
      "Submit to the correct address and contact person",
      "Ensure submission is received before the deadline",
      "Obtain receipt confirmation where possible"
    ]
  },
  {
    title: "Ethical Standards",
    items: [
      "Maintain highest standards of integrity and transparency",
      "Do not offer or accept bribes or improper inducements",
      "Avoid conflicts of interest and declare any potential conflicts",
      "Respect confidentiality of procurement information",
      "Comply with all applicable laws and regulations"
    ]
  }
])

// Computed properties
const currentFaqs = computed(() => {
  return props.activeSection === 'jobs' ? jobFaqs.value : procurementFaqs.value
})

const currentGuidelines = computed(() => {
  return props.activeSection === 'jobs' ? jobGuidelines.value : procurementGuidelines.value
})

const activeTab = ref('faq')
const expandedFaq = ref(null)

const toggleFaq = (faqId) => {
  expandedFaq.value = expandedFaq.value === faqId ? null : faqId
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-600 text-white p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold">
              {{ activeSection === 'jobs' ? 'Job Opportunities' : 'Procurement' }} FAQ & Guidelines
            </h2>
            <p class="text-blue-100 mt-1">
              Essential information for {{ activeSection === 'jobs' ? 'job applicants' : 'suppliers and contractors' }}
            </p>
          </div>
          <button
              @click="emit('close')"
              class="text-white hover:text-gray-200 transition-colors"
          >
            <Icon name="heroicons:x-mark" class="w-6 h-6" />
          </button>
        </div>

        <!-- Tab Navigation -->
        <div class="mt-6">
          <nav class="flex space-x-4">
            <button
                @click="activeTab = 'faq'"
                :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === 'faq'
                  ? 'bg-white text-blue-600'
                  : 'text-blue-100 hover:text-white hover:bg-blue-700'
              ]"
            >
              <Icon name="heroicons:question-mark-circle" class="w-4 h-4 inline mr-2" />
              Frequently Asked Questions
            </button>
            <button
                @click="activeTab = 'guidelines'"
                :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                activeTab === 'guidelines'
                  ? 'bg-white text-blue-600'
                  : 'text-blue-100 hover:text-white hover:bg-blue-700'
              ]"
            >
              <Icon name="heroicons:document-text" class="w-4 h-4 inline mr-2" />
              Guidelines & Best Practices
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
        <!-- FAQ Tab -->
        <div v-if="activeTab === 'faq'" class="space-y-4">
          <div
              v-for="faq in currentFaqs"
              :key="faq.id"
              class="border border-gray-200 rounded-lg"
          >
            <button
                @click="toggleFaq(faq.id)"
                class="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span class="font-medium text-gray-900">{{ faq.question }}</span>
              <Icon
                  name="heroicons:chevron-down"
                  :class="[
                  'w-5 h-5 text-gray-500 transition-transform',
                  expandedFaq === faq.id ? 'rotate-180' : ''
                ]"
              />
            </button>
            <div
                v-if="expandedFaq === faq.id"
                class="px-6 pb-4 text-gray-700 border-t border-gray-100"
            >
              <p class="pt-4">{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Guidelines Tab -->
        <div v-if="activeTab === 'guidelines'" class="space-y-8">
          <div
              v-for="guideline in currentGuidelines"
              :key="guideline.title"
              class="bg-gray-50 rounded-lg p-6"
          >
            <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-600 mr-2" />
              {{ guideline.title }}
            </h3>
            <ul class="space-y-2">
              <li
                  v-for="item in guideline.items"
                  :key="item"
                  class="flex items-start text-gray-700"
              >
                <Icon name="heroicons:arrow-right" class="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div class="text-sm text-gray-600">
            <Icon name="heroicons:information-circle" class="w-4 h-4 inline mr-1" />
            For additional questions, contact us at:
            <span v-if="activeSection === 'jobs'" class="font-medium">hr@nlgfc.gov.mw</span>
            <span v-else class="font-medium">procurement@nlgfc.gov.mw</span>
          </div>
          <button
              @click="emit('close')"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for better UX */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
