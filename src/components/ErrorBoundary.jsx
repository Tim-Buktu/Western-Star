import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log to console for now; could integrate with analytics later
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="bg-red-50 text-red-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
            <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
            <p className="text-sm text-red-700">This section failed to load. Please try again later.</p>
          </div>
        </section>
      )
    }
    return this.props.children
  }
}
