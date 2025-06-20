interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warning' | 'info';
  message: string;
  stack?: string;
  userAgent: string;
  url: string;
  userId?: string;
  action?: string;
  component?: string;
  contentId?: string;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100;

  log(level: ErrorLog['level'], message: string, error?: Error, context?: Partial<ErrorLog>) {
    const errorLog: ErrorLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level,
      message,
      stack: error?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...context
    };

    this.logs.unshift(errorLog);
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Store in localStorage for persistence
    this.persistLogs();
    
    // Console output for development
    console[level]('Error Logger:', errorLog);
  }

  private persistLogs() {
    try {
      localStorage.setItem('cms_error_logs', JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Failed to persist error logs:', e);
    }
  }

  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
    localStorage.removeItem('cms_error_logs');
  }

  loadPersistedLogs() {
    try {
      const stored = localStorage.getItem('cms_error_logs');
      if (stored) {
        this.logs = JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to load persisted logs:', e);
    }
  }
}

export const errorLogger = new ErrorLogger();
errorLogger.loadPersistedLogs();
