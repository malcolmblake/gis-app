import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
      <>
        <h1>Something went wrong.</h1>
        <pre>
          <code>
            {this.state}
          </code>
        </pre>
        </>
      )

    }

    return this.props.children;
  }
}

function logErrorToMyService(error, errorMessage){
  // Just terrible console.log for now.
  // Depending on which service you use this could be any external logging like PaperTrail or similar.
  console.error(errorMessage, error);
}