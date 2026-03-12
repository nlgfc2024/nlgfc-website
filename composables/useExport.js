import { ref } from 'vue'

/**
 * Composable function for export functionality
 */
export const useExport = () => {
  const isExporting = ref(false)

  // Method to export data to CSV
  const exportToCSV = (districts, filename = 'malawi_districts.csv') => {
    try {
      // Create CSV content
      const headers = ['Name', 'Region', 'Capital', 'Population', 'Area', 'Description', 'Phone', 'Email', 'Private Bag']
      const csvContent = [
        headers.join(','),
        ...districts.map(district => [
          district.name,
          district.region,
          district.capital || '',
          district.population || '',
          district.area || '',
          district.description || '',
          district.Phone || '',
          district.email || '',
          district.PrivateBag || ''
        ].map(field => `"${field}"`).join(','))
      ].join('\n')

      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error exporting to CSV:', error)
      throw error
    }
  }

  // Method to export data to PDF
  const exportToPDF = async (districts, title = 'Malawi Districts Report') => {
    try {
      isExporting.value = true

      // Dynamically import jsPDF to avoid SSR issues
      const jsPDF = await import('jspdf')
      const autoTable = await import('jspdf-autotable')

      const doc = new jsPDF.default()

      // Add title
      doc.setFontSize(18)
      doc.text(title, 14, 20)

      // Add date
      doc.setFontSize(12)
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30)

      // Add table
      autoTable.default(doc, {
        startY: 40,
        head: [['Name', 'Region', 'Capital', 'Population', 'Area']],
        body: districts.map(district => [
          district.name,
          district.region,
          district.capital || '',
          district.population || '',
          district.area || ''
        ]),
        styles: {
          fontSize: 8
        },
        headStyles: {
          fillColor: [0, 50, 13]
        }
      })

      // Save the PDF
      doc.save(`${title.replace(/\s+/g, '_')}.pdf`)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      throw error
    } finally {
      isExporting.value = false
    }
  }

  return {
    // State
    isExporting,

    // Methods
    exportToCSV,
    exportToPDF
  }
}