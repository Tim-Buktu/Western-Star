import React, { useState, useEffect } from 'react'
import { migrateToBackend, getMigrationStatus, isMigrationAvailable } from '../utils/cmsApi'

export default function MigrationPanel() {
  const [migrationStatus, setMigrationStatus] = useState(null)
  const [isMigrating, setIsMigrating] = useState(false)
  const [migrationResult, setMigrationResult] = useState(null)
  const [showMigration, setShowMigration] = useState(false)

  useEffect(() => {
    checkMigrationStatus()
    setShowMigration(isMigrationAvailable())
  }, [])

  const checkMigrationStatus = async () => {
    try {
      const status = await getMigrationStatus()
      setMigrationStatus(status)
    } catch (error) {
      console.error('Error checking migration status:', error)
    }
  }

  const handleMigrate = async () => {
    setIsMigrating(true)
    setMigrationResult(null)

    try {
      const result = await migrateToBackend()
      setMigrationResult(result)
      
      if (result.success) {
        setShowMigration(false)
        // Refresh migration status
        await checkMigrationStatus()
        // Reload page to use new API data
        setTimeout(() => window.location.reload(), 2000)
      }
    } catch (error) {
      setMigrationResult({
        success: false,
        message: error.message
      })
    } finally {
      setIsMigrating(false)
    }
  }

  if (!showMigration) return null

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 p-2 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Database Migration Available</h3>
              <p className="text-blue-100 text-sm">
                We've detected CMS data in your browser. Migrate it to the database for persistent storage.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleMigrate}
              disabled={isMigrating}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isMigrating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Migrating...
                </div>
              ) : (
                'Migrate Now'
              )}
            </button>
            
            <button
              onClick={() => setShowMigration(false)}
              className="text-blue-200 hover:text-white p-2"
              title="Dismiss (you can migrate later from CMS Admin)"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {migrationResult && (
          <div className={`mt-4 p-4 rounded-lg ${migrationResult.success ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                {migrationResult.success ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <div>
                <p className="font-medium">{migrationResult.message}</p>
                {migrationResult.success && migrationResult.details && (
                  <div className="mt-2 text-sm opacity-90">
                    <p>Successfully migrated:</p>
                    <ul className="list-disc list-inside mt-1 grid grid-cols-2 gap-1">
                      {Object.entries(migrationResult.details.migrated).map(([key, count]) => (
                        count > 0 && (
                          <li key={key}>{count} {key.replace(/([A-Z])/g, ' $1').toLowerCase()}</li>
                        )
                      ))}
                    </ul>
                    <p className="mt-2 text-green-100">Page will refresh automatically...</p>
                  </div>
                )}
                {!migrationResult.success && migrationResult.details && (
                  <p className="mt-1 text-sm opacity-90">{migrationResult.details}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
