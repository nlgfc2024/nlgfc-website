import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Composable function for generating district-specific PDF reports
 * @param {Object} districtData - The district data to include in the PDF
 * @param {String} districtName - The name of the district
 */
export const useDistrictPDF = () => {
  /**
   * Generate a PDF report for a district
   * @param {Object} districtData - The district data to include in the PDF
   * @param {String} districtName - The name of the district
   */
  const generateDistrictPDF = (districtData, districtName) => {
    try {
      // Create new PDF document
      const doc = new jsPDF();
      
      // Set document properties
      doc.setProperties({
        title: `${districtName} District information`,
        subject: 'District Information 2025',
        author: 'NLGFC'
      });
      
      // Add title
      doc.setFontSize(22);
      doc.setTextColor(0, 51, 102); // Dark blue color
      doc.text(`${districtName} District info`, 14, 20);
      
      // Add generation date
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      const date = new Date().toLocaleDateString();
      doc.text(`Generated on: ${date}`, 14, 30);
      
      // Current y position
      let yPosition = 40;
      
      // Add Profile Information if available
      if (districtData.profile) {
        // Add section title
        doc.setFontSize(16);
        doc.setTextColor(0, 51, 102);
        doc.text('Profile Information', 14, yPosition);
        yPosition += 10;
        
        // Add profile details
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        // About section
        if (districtData.profile.about) {
          doc.setFont(undefined, 'bold');
          doc.text('About:', 14, yPosition);
          yPosition += 7;
          doc.setFont(undefined, 'normal');
          const splitAbout = doc.splitTextToSize(districtData.profile.about, 180);
          doc.text(splitAbout, 14, yPosition);
          yPosition += splitAbout.length * 7 + 5;
        }
        
        // Vision section
        if (districtData.profile.vision) {
          doc.setFont(undefined, 'bold');
          doc.text('Vision:', 14, yPosition);
          yPosition += 7;
          doc.setFont(undefined, 'normal');
          const splitVision = doc.splitTextToSize(districtData.profile.vision, 180);
          doc.text(splitVision, 14, yPosition);
          yPosition += splitVision.length * 7 + 5;
        }
        
        // Mission section
        if (districtData.profile.mission) {
          doc.setFont(undefined, 'bold');
          doc.text('Mission:', 14, yPosition);
          yPosition += 7;
          doc.setFont(undefined, 'normal');
          const splitMission = doc.splitTextToSize(districtData.profile.mission, 180);
          doc.text(splitMission, 14, yPosition);
          yPosition += splitMission.length * 7 + 5;
        }
        
        // Core Values section
        if (districtData.profile.values && districtData.profile.values.length > 0) {
          doc.setFont(undefined, 'bold');
          doc.text('Core Values:', 14, yPosition);
          yPosition += 7;
          doc.setFont(undefined, 'normal');
          districtData.profile.values.forEach((value, index) => {
            doc.text(`• ${value}`, 14, yPosition);
            yPosition += 7;
          });
          yPosition += 5;
        }
        
        // Strategic Objectives section
        if (districtData.profile.strategicObjectives && districtData.profile.strategicObjectives.length > 0) {
          doc.setFont(undefined, 'bold');
          doc.text('Strategic Objectives:', 14, yPosition);
          yPosition += 7;
          doc.setFont(undefined, 'normal');
          districtData.profile.strategicObjectives.forEach((objective, index) => {
            const splitObjective = doc.splitTextToSize(objective, 170);
            doc.text(`• ${objective}`, 14, yPosition);
            yPosition += splitObjective.length * 7;
          });
          yPosition += 5;
        }
        
        // Key Functions section
        if (districtData.profile.keyFunctions && districtData.profile.keyFunctions.length > 0) {
          doc.setFont(undefined, 'bold');
          doc.text('Key Functions:', 14, yPosition);
          yPosition += 7;
          doc.setFont(undefined, 'normal');
          districtData.profile.keyFunctions.forEach((func, index) => {
            doc.text(`• ${func}`, 14, yPosition);
            yPosition += 7;
          });
          yPosition += 5;
        }
        
        // Additional profile information
        if (districtData.profile.additionalInfo) {
          Object.entries(districtData.profile.additionalInfo).forEach(([key, value]) => {
            doc.setFont(undefined, 'bold');
            doc.text(`${key}:`, 14, yPosition);
            yPosition += 7;
            doc.setFont(undefined, 'normal');
            const splitValue = doc.splitTextToSize(value, 180);
            doc.text(splitValue, 14, yPosition);
            yPosition += splitValue.length * 7 + 5;
          });
        }
      }
      
      // Add Projects section if available
      if (districtData.projects && districtData.projects.length > 0) {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        } else {
          yPosition += 10;
        }
        
        doc.setFontSize(16);
        doc.setTextColor(0, 51, 102);
        doc.text('Development Projects', 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        districtData.projects.forEach((project, index) => {
          // Check if we need a new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFont(undefined, 'bold');
          doc.text(`Project ${index + 1}: ${project.name}`, 14, yPosition);
          yPosition += 7;
          
          if (project.fullName) {
            doc.setFont(undefined, 'normal');
            doc.text(project.fullName, 14, yPosition);
            yPosition += 7;
          }
          
          if (project.description) {
            const splitDescription = doc.splitTextToSize(project.description, 180);
            doc.text(splitDescription, 14, yPosition);
            yPosition += splitDescription.length * 7 + 3;
          }
          
          if (project.objectives && project.objectives.length > 0) {
            doc.setFont(undefined, 'bold');
            doc.text('Key Objectives:', 14, yPosition);
            yPosition += 7;
            doc.setFont(undefined, 'normal');
            project.objectives.forEach((objective) => {
              const splitObjective = doc.splitTextToSize(objective, 170);
              doc.text(`• ${objective}`, 14, yPosition);
              yPosition += splitObjective.length * 7;
            });
          }
          
          // Add status if available
          if (project.status) {
            doc.setFont(undefined, 'bold');
            doc.text(`Status: ${project.status}`, 14, yPosition);
            yPosition += 10;
          } else {
            yPosition += 5;
          }
        });
      }
      
      // Add Reports section if available
      if (districtData.reports && districtData.reports.length > 0) {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        } else {
          yPosition += 10;
        }
        
        doc.setFontSize(16);
        doc.setTextColor(0, 51, 102);
        doc.text('Reports & Documents', 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        // Create table for reports
        const reportRows = districtData.reports.map(report => [
          report.title,
          report.type,
          report.date ? new Date(report.date).toLocaleDateString() : 'N/A',
          report.description || ''
        ]);
        
        doc.autoTable({
          startY: yPosition,
          head: [['Title', 'Type', 'Date', 'Description']],
          body: reportRows,
          theme: 'grid',
          styles: {
            fontSize: 8
          },
          headStyles: {
            fillColor: [0, 51, 102]
          },
          margin: { left: 14 }
        });
        
        yPosition = doc.lastAutoTable.finalY + 10;
      }
      
      // Add News section if available
      if (districtData.news && districtData.news.length > 0) {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        } else {
          yPosition += 10;
        }
        
        doc.setFontSize(16);
        doc.setTextColor(0, 51, 102);
        doc.text('Latest News & Updates', 14, yPosition);
        yPosition += 10;
        
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        
        districtData.news.forEach((article, index) => {
          // Check if we need a new page
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.setFont(undefined, 'bold');
          doc.text(`Article ${index + 1}: ${article.title}`, 14, yPosition);
          yPosition += 7;
          
          if (article.date) {
            doc.setFont(undefined, 'normal');
            doc.text(`Date: ${new Date(article.date).toLocaleDateString()}`, 14, yPosition);
            yPosition += 7;
          }
          
          if (article.category) {
            doc.text(`Category: ${article.category}`, 14, yPosition);
            yPosition += 7;
          }
          
          if (article.summary) {
            const splitSummary = doc.splitTextToSize(article.summary, 180);
            doc.text(splitSummary, 14, yPosition);
            yPosition += splitSummary.length * 7 + 5;
          }
        });
      }
      
      // Save the PDF
      doc.save(`${districtName.replace(/\s+/g, '_')}_District_Report.pdf`);
      
      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      return false;
    }
  };
  
  return {
    generateDistrictPDF
  };
};