import { Component } from "react";

import styles from "./ErrorBoundary.module.css";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled application error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className={styles.fallback} role="alert">
          <p className={styles.eyebrow}>Something went wrong</p>
          <h1>The page could not be displayed.</h1>
          <p>Reload the app to try again.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Reload app
          </button>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;