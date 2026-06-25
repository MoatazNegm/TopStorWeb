import React, { useState } from 'react';
import { login } from './api/auth';
import { Eye, EyeOff, Lock, AlertCircle } from 'lucide-react';

const KineticSecurityTheme = {
  colors: {
    primary: '#0047FF',
    primaryDark: '#0035c5',
    surface: '#faf8ff',
    surfaceContainer: '#eaedff',
    onSurface: '#131b2e',
    onSurfaceVariant: '#434657',
    outline: '#747688',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
  },
  typography: {
    labelSm: 'font-medium text-xs leading-4 tracking-wider',
  },
};

// Get version and commit from git
const getVersionInfo = () => {
  // QSD5.122-9806c format (branch-last5ofcommit)
  return 'QSD5.122-9806c';
};

export default function QLogin({ onLoginSuccess }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'user') {
      setUser(value);
    } else if (name === 'pass') {
      setPass(value);
    }
    setError('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && user && pass) {
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!user || !pass) return;

    setLoading(true);
    setError('');

    try {
      const response = await login(user, pass);
      const token = response.data.token;

      if (token && !token.includes('baduser') && !token.includes('init')) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        onLoginSuccess();
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login failed', err);
      setError('System connection error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-6"
      style={{ backgroundColor: KineticSecurityTheme.colors.surface }}
    >
      {/* Loading overlay */}
      {loading && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6"
          style={{ backgroundColor: KineticSecurityTheme.colors.surface }}
        >
          <style>{`
            @keyframes loginPump {
              0%, 50%, 100% { transform: scale(1, 1); }
              30%, 80% { transform: scale(0.92, 0.95); }
            }
          `}</style>
          <img
            src="/assets/images/Q.png"
            alt="QuickStor"
            className="max-w-full h-auto object-contain"
            style={{
              maxHeight: '12rem',
              animation: 'loginPump 1.5s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {/* Background accent elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: KineticSecurityTheme.colors.primary }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 blur-3xl"
        style={{ backgroundColor: KineticSecurityTheme.colors.primaryDark }}
      />

      {/* Main container */}
      <div className="relative w-full max-w-sm flex flex-col">
        {/* Logo Section - Larger, Compact spacing */}
        <div className="text-center mb-2">
          <img
            src="/img/Quickstor_logo.png"
            alt="QuickStor Logo"
            className="h-36 mx-auto"
          />
        </div>

        {/* Card container - Compact */}
        <div
          className="rounded-lg border p-8"
          style={{
            backgroundColor: '#ffffff',
            borderColor: KineticSecurityTheme.colors.outline,
            borderWidth: '1px',
            boxShadow: `0 10px 25px -5px rgba(0, 26, 94, 0.1)`,
          }}
        >
          {/* Header - Reduced */}
          <div className="text-center mb-6">
            <h1
              className="font-semibold text-lg mb-1"
              style={{ color: KineticSecurityTheme.colors.onSurface }}
            >
              Sign in to your account
            </h1>
          </div>

          {/* Error message */}
          {error && (
            <div
              className="mb-4 p-3 rounded-lg flex items-start gap-2 border text-sm"
              style={{
                backgroundColor: KineticSecurityTheme.colors.errorContainer,
                borderColor: KineticSecurityTheme.colors.error,
              }}
            >
              <AlertCircle
                size={16}
                style={{ color: KineticSecurityTheme.colors.error }}
                className="flex-shrink-0 mt-0.5"
              />
              <p
                style={{ color: KineticSecurityTheme.colors.error }}
              >
                {error}
              </p>
            </div>
          )}

          {/* Form - Compact spacing */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username field */}
            <div>
              <label
                htmlFor="user"
                className={`block mb-1.5 text-xs font-medium uppercase tracking-wider`}
                style={{ color: KineticSecurityTheme.colors.onSurface }}
              >
                Username
              </label>
              <input
                id="user"
                type="text"
                name="user"
                value={user}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter username"
                disabled={loading}
                autoComplete="username"
                className="w-full px-3 py-2 rounded-lg border transition-all duration-200 focus:outline-none text-sm"
                style={{
                  backgroundColor: '#f8fafc',
                  borderColor: KineticSecurityTheme.colors.outline,
                  borderWidth: '1px',
                  color: KineticSecurityTheme.colors.onSurface,
                }}
                onFocus={(e) => {
                  e.target.style.borderColor =
                    KineticSecurityTheme.colors.primary;
                  e.target.style.boxShadow = `0 0 0 2px ${KineticSecurityTheme.colors.primary}33`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor =
                    KineticSecurityTheme.colors.outline;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="pass"
                className={`block mb-1.5 text-xs font-medium uppercase tracking-wider`}
                style={{ color: KineticSecurityTheme.colors.onSurface }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="pass"
                  type={showPassword ? 'text' : 'password'}
                  name="pass"
                  value={pass}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••"
                  disabled={loading}
                  autoComplete="current-password"
                  className="w-full px-3 py-2 pr-10 rounded-lg border transition-all duration-200 focus:outline-none text-sm"
                  style={{
                    backgroundColor: '#f8fafc',
                    borderColor: KineticSecurityTheme.colors.outline,
                    borderWidth: '1px',
                    color: KineticSecurityTheme.colors.onSurface,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor =
                      KineticSecurityTheme.colors.primary;
                    e.target.style.boxShadow = `0 0 0 2px ${KineticSecurityTheme.colors.primary}33`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor =
                      KineticSecurityTheme.colors.outline;
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  tabIndex="-1"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-gray-100 rounded transition-colors"
                  style={{ color: KineticSecurityTheme.colors.onSurfaceVariant }}
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !user || !pass}
              className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{
                backgroundColor: loading
                  ? KineticSecurityTheme.colors.primaryDark
                  : KineticSecurityTheme.colors.primary,
                color: '#ffffff',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        {/* Footer - Version info */}
        <div className="mt-6 text-center">
          <p
            className="text-xs"
            style={{
              color: KineticSecurityTheme.colors.onSurfaceVariant,
            }}
          >
            Enterprise Secure Storage <br />
            <span className="inline-block mt-1 font-mono text-xs opacity-70">
              v{getVersionInfo()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
