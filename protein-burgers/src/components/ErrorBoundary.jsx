import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030405] px-6 text-center text-white">
          <h1 className="text-2xl font-black text-[#f0c76f]">Something went wrong</h1>
          <p className="max-w-lg text-sm text-white/60">{this.state.error.message}</p>
          <p className="text-xs text-white/40">
            Run <code className="text-[#ffe1a0]">npm run dev</code> inside{' '}
            <code className="text-[#ffe1a0]">protein-burgers</code> and open the Local URL from the
            terminal.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
