import React, { useState } from 'react'
import { forceUseAPI, migrateToBackend, isMigrationAvailable } from '../utils/cmsApi'

export default function DatabaseMigrationFix() {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const showMigration = isMigrationAvailable()

  if (!showMigration) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
        <p className="font-semibold">✅ Database Mode Active</p>
        <p className="text-sm">Your CMS is connected to the database</p>
      </div>
    )
  }

  const handleForceUseAPI = async () => {
    setIsLoading(true)
    setStatus('Switching to database mode...')
    
    try {
      forceUseAPI()
      setStatus('✅ Successfully switched to database mode! Please refresh the page.')
      setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMigrate = async () => {
    setIsLoading(true)
    setStatus('Migrating localStorage data to database...')
    
    try {
      const result = await migrateToBackend()
      if (result.success) {
        setStatus('✅ Migration successful! Reloading page...')
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      } else {
        setStatus(`❌ Migration failed: ${result.message}`)
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-black p-4 rounded-lg shadow-lg max-w-sm">
      <div className="mb-3">
        <h3 className="font-bold text-lg">⚠️ Database Not Connected</h3>
        <p className="text-sm">Your newsletters are saving to localStorage (temporary) instead of the database.</p>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={handleMigrate}
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium disabled:opacity-50"
        >
          {isLoading ? 'Migrating...' : 'Migrate & Connect to Database'}
        </button>
        
        <button
          onClick={handleForceUseAPI}
          disabled={isLoading}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded text-sm font-medium disabled:opacity-50"
        >
          {isLoading ? 'Switching...' : 'Skip Migration & Use Database'}
        </button>
      </div>
      
      {status && (
        <div className="mt-3 p-2 bg-black bg-opacity-20 rounded text-xs">
          {status}
        </div>
      )}
    </div>
  )
}
