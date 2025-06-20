
interface DiagnosticResult {
  category: string;
  status: 'healthy' | 'warning' | 'error';
  message: string;
  details?: any;
}

interface SystemHealth {
  overall: 'healthy' | 'warning' | 'error';
  checks: DiagnosticResult[];
  timestamp: Date;
}

export class SystemDiagnostics {
  async runDiagnostics(): Promise<SystemHealth> {
    const checks: DiagnosticResult[] = [];

    // Browser compatibility check
    checks.push(this.checkBrowserCompatibility());
    
    // Local storage check
    checks.push(this.checkLocalStorage());
    
    // Network connectivity check
    checks.push(await this.checkNetworkConnectivity());
    
    // Authentication status check
    checks.push(this.checkAuthenticationStatus());
    
    // Performance check
    checks.push(this.checkPerformance());

    const errorCount = checks.filter(c => c.status === 'error').length;
    const warningCount = checks.filter(c => c.status === 'warning').length;

    const overall = errorCount > 0 ? 'error' : warningCount > 0 ? 'warning' : 'healthy';

    return {
      overall,
      checks,
      timestamp: new Date()
    };
  }

  private checkBrowserCompatibility(): DiagnosticResult {
    const isChrome = /Chrome/.test(navigator.userAgent);
    const isFirefox = /Firefox/.test(navigator.userAgent);
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    const isEdge = /Edg/.test(navigator.userAgent);

    if (isChrome || isFirefox || isSafari || isEdge) {
      return {
        category: 'Browser Compatibility',
        status: 'healthy',
        message: 'Browser is supported',
        details: { userAgent: navigator.userAgent }
      };
    }

    return {
      category: 'Browser Compatibility',
      status: 'warning',
      message: 'Browser may not be fully supported',
      details: { userAgent: navigator.userAgent }
    };
  }

  private checkLocalStorage(): DiagnosticResult {
    try {
      const testKey = '__cms_test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return {
        category: 'Local Storage',
        status: 'healthy',
        message: 'Local storage is working'
      };
    } catch (e) {
      return {
        category: 'Local Storage',
        status: 'error',
        message: 'Local storage is not available',
        details: { error: e.message }
      };
    }
  }

  private async checkNetworkConnectivity(): Promise<DiagnosticResult> {
    try {
      const start = performance.now();
      const response = await fetch(window.location.origin, { 
        method: 'HEAD',
        cache: 'no-cache'
      });
      const end = performance.now();
      const latency = Math.round(end - start);

      if (response.ok) {
        const status = latency > 1000 ? 'warning' : 'healthy';
        return {
          category: 'Network Connectivity',
          status,
          message: `Network is ${status} (${latency}ms)`,
          details: { latency, status: response.status }
        };
      } else {
        return {
          category: 'Network Connectivity',
          status: 'error',
          message: `Network request failed (${response.status})`,
          details: { status: response.status, latency }
        };
      }
    } catch (e) {
      return {
        category: 'Network Connectivity',
        status: 'error',
        message: 'Network connectivity failed',
        details: { error: e.message }
      };
    }
  }

  private checkAuthenticationStatus(): DiagnosticResult {
    try {
      const authData = localStorage.getItem('zenith_auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return {
          category: 'Authentication',
          status: 'healthy',
          message: 'User is authenticated',
          details: { user: parsed.user?.email }
        };
      } else {
        return {
          category: 'Authentication',
          status: 'warning',
          message: 'No authentication data found'
        };
      }
    } catch (e) {
      return {
        category: 'Authentication',
        status: 'error',
        message: 'Authentication check failed',
        details: { error: e.message }
      };
    }
  }

  private checkPerformance(): DiagnosticResult {
    const memory = (performance as any).memory;
    if (memory) {
      const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
      const usage = (usedMB / totalMB) * 100;

      const status = usage > 80 ? 'warning' : 'healthy';
      return {
        category: 'Performance',
        status,
        message: `Memory usage: ${Math.round(usage)}% (${usedMB}MB / ${totalMB}MB)`,
        details: { usedMB, totalMB, usage }
      };
    }

    return {
      category: 'Performance',
      status: 'healthy',
      message: 'Performance metrics not available'
    };
  }
}

export const systemDiagnostics = new SystemDiagnostics();
