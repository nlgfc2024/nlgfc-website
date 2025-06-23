export const useOpportunities = () => {
    // Sample job opportunities data
    const jobOpportunities = ref([
        {
            id: 1,
            title: 'Senior Financial Analyst',
            department: 'Finance',
            location: 'Lilongwe',
            type: 'Permanent',
            publishDate: '2024-01-20',
            expiryDate: '2025-02-20',
            salary: 'MWK 800,000 - 1,200,000',
            description: 'We are seeking a qualified Senior Financial Analyst to join our Finance team.',
            requirements: [
                'Bachelor\'s degree in Finance, Accounting, or related field',
                'Minimum 5 years of experience in financial analysis',
                'Professional certification (ACCA, CPA, or equivalent)'
            ],
            responsibilities: [
                'Prepare financial reports and analysis',
                'Support budget preparation and monitoring',
                'Conduct variance analysis and provide recommendations'
            ]
        },
        {
            id: 2,
            title: 'Project Coordinator - SSRLP',
            department: 'Projects',
            location: 'Lilongwe',
            type: 'Contract',
            publishDate: '2024-01-18',
            expiryDate: '2025-02-18',
            salary: 'MWK 600,000 - 900,000',
            description: 'NLGFC is looking for a Project Coordinator to support the implementation of SSRLP.',
            requirements: [
                'Bachelor\'s degree in Development Studies or related field',
                'Minimum 3 years of project management experience'
            ],
            responsibilities: [
                'Coordinate project implementation activities',
                'Monitor project progress and prepare reports'
            ]
        }
    ])

    // Sample procurement notices data
    const procurementNotices = ref([
        {
            id: 1,
            title: 'Supply and Delivery of Office Equipment',
            type: 'RFQ',
            department: 'Administration',
            publishDate: '2024-01-15',
            expiryDate: '2025-02-15',
            estimatedValue: 'MWK 2,500,000',
            description: 'NLGFC invites qualified suppliers to submit quotations for office equipment.',
            documents: [
                { name: 'RFQ Document', type: 'pdf', url: '/documents/rfq-office-equipment.pdf' }
            ]
        },
        {
            id: 2,
            title: 'Consultancy Services for Financial Management System',
            type: 'RFP',
            department: 'ICT',
            publishDate: '2024-01-10',
            expiryDate: '2025-02-28',
            estimatedValue: 'MWK 15,000,000',
            description: 'NLGFC seeks to engage a qualified consultant for financial management system.',
            documents: [
                { name: 'RFP Document', type: 'pdf', url: '/documents/rfp-financial-system.pdf' }
            ]
        }
    ])

    // Utility functions
    const isExpired = (dateString) => {
        return new Date(dateString) < new Date()
    }

    const getDaysUntilExpiry = (dateString) => {
        const today = new Date()
        const expiryDate = new Date(dateString)
        const diffTime = expiryDate - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    // Computed stats
    const opportunityStats = computed(() => {
        const activeJobs = jobOpportunities.value.filter(job => !isExpired(job.expiryDate)).length
        const openTenders = procurementNotices.value.filter(notice => !isExpired(notice.expiryDate)).length

        const totalClosingSoon = [
            ...jobOpportunities.value.filter(job => !isExpired(job.expiryDate) && getDaysUntilExpiry(job.expiryDate) <= 7),
            ...procurementNotices.value.filter(notice => !isExpired(notice.expiryDate) && getDaysUntilExpiry(notice.expiryDate) <= 7)
        ].length

        return {
            activeJobs,
            openTenders,
            closingSoon: totalClosingSoon
        }
    })

    return {
        jobOpportunities: readonly(jobOpportunities),
        procurementNotices: readonly(procurementNotices),
        opportunityStats: readonly(opportunityStats),
        isExpired,
        getDaysUntilExpiry
    }
}
