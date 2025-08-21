import pkg from 'pg'
const { Pool } = pkg

// PostgreSQL connection configuration (shared with CMS)
const pool = new Pool({
  user: process.env.POSTGRES_USER || 'nlgfc_user',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DB || 'nlgfc_content',
  password: process.env.POSTGRES_PASSWORD || 'nlgfc_password',
  port: process.env.POSTGRES_PORT || 5432,
})

export default defineEventHandler(async (event) => {
  let client
  
  try {
    // Connect to PostgreSQL
    client = await pool.connect()

    // Get contact information
    const contactResult = await client.query('SELECT * FROM contact_info ORDER BY id DESC LIMIT 1')
    const contactInfo = contactResult.rows[0]
    
    // Get active information officers
    const officersResult = await client.query('SELECT * FROM information_officers WHERE is_active = true ORDER BY sort_order ASC')
    const officers = officersResult.rows
    
    // Get ATI information
    const atiResult = await client.query('SELECT * FROM ati_info ORDER BY id DESC LIMIT 1')
    const atiInfo = atiResult.rows[0]

    return {
      success: true,
      data: {
        contact: contactInfo || {
          organization_name: 'National Local Government Finance Committee',
          address: 'Red Cross House, Area 14',
          po_box: 'P.O. Box 31162, Lilongwe 3.',
          primary_phone: '+265891003313',
          secondary_phone: '+265891003314',
          primary_email: 'ed@nlgfc.gov.mw',
          secondary_email: 'kmcd@nlgfc.gov.mw',
          map_latitude: -13.954969,
          map_longitude: 33.781897,
          map_zoom: 15
        },
        officers: officers || [
          {
            name: 'AB Hamilton Chimala',
            position: 'Information Officer',
            email: 'hchimala@nlgfc.gov.mw',
            phone: '+265 999 941 441',
            photo_url: '/images/contact1.jpg'
          },
          {
            name: 'Duncan Macheso',
            position: 'Information Officer',
            email: 'dmacheso@nlgfc.gov.mw',
            phone: '+265 999 584 000',
            photo_url: '/images/contact2.jpg'
          }
        ],
        ati: atiInfo || {
          description: 'The Access to Information Act (ATIA) provides for the right of access to information in the custody of public and relevant private institutions; the processes and procedures related to obtaining that information; and to provide for matters connected therewith or incidental thereto.',
          manual_title: 'Access to Information manual',
          manual_url: '/documents/ati-2016.pdf'
        }
      }
    }
  } catch (error) {
    console.error('Error fetching contact data:', error)
    
    // Return fallback data if database is not available
    return {
      success: true,
      data: {
        contact: {
          organization_name: 'National Local Government Finance Committee',
          address: 'Red Cross House, Area 14',
          po_box: 'P.O. Box 31162, Lilongwe 3.',
          primary_phone: '+265891003313',
          secondary_phone: '+265891003314',
          primary_email: 'ed@nlgfc.gov.mw',
          secondary_email: 'kmcd@nlgfc.gov.mw',
          map_latitude: -13.954969,
          map_longitude: 33.781897,
          map_zoom: 15
        },
        officers: [
          {
            name: 'AB Hamilton Chimala',
            position: 'Information Officer',
            email: 'hchimala@nlgfc.gov.mw',
            phone: '+265 999 941 441',
            photo_url: '/images/contact1.jpg'
          },
          {
            name: 'Duncan Macheso',
            position: 'Information Officer',
            email: 'dmacheso@nlgfc.gov.mw',
            phone: '+265 999 584 000',
            photo_url: '/images/contact2.jpg'
          }
        ],
        ati: {
          description: 'The Access to Information Act (ATIA) provides for the right of access to information in the custody of public and relevant private institutions; the processes and procedures related to obtaining that information; and to provide for matters connected therewith or incidental thereto.',
          manual_title: 'Access to Information manual',
          manual_url: '/documents/ati-2016.pdf'
        }
      }
    }
  } finally {
    // Release database connection
    if (client) {
      client.release()
    }
  }
})
