import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

// Error Boundary Sederhana untuk menangkap crash
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Zenith App Crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', color: '#333' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Something went wrong.</h1>
          <p style={{ color: '#666' }}>Aplikasi mengalami crash. Cek console browser untuk detailnya.</p>
          <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', overflow: 'auto', textAlign: 'left', marginTop: '20px', fontSize: '12px' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#000', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);