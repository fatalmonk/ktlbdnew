/**
 * Structured client-side logging and error reporting.
 * When Datadog RUM is initialized, errors are also sent via registerRumReporter.
 */

type RumReporter = (error: Error, context?: Record<string, unknown>) => void;

let rumReporter: RumReporter | null = null;

export function registerRumReporter(fn: RumReporter): void {
  rumReporter = fn;
}

function serializePayload(
  level: "error" | "warn" | "info",
  message: string,
  extra?: Record<string, unknown>,
): string {
  return JSON.stringify({
    level,
    message,
    service: "ktlbd-website-app",
    env: import.meta.env.MODE,
    t: new Date().toISOString(),
    ...extra,
  });
}

export function reportError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  const err = error instanceof Error ? error : new Error(String(error));
  console.error(
    serializePayload("error", err.message, { stack: err.stack, ...context }),
  );
  rumReporter?.(err, context);
}

export function reportMessage(
  message: string,
  level: "warn" | "info" = "info",
  context?: Record<string, unknown>,
): void {
  const line = serializePayload(level, message, context);
  if (level === "warn") console.warn(line);
  else console.info(line);
}

export function initGlobalErrorHandlers(): void {
  window.addEventListener("error", (event) => {
    if (event.error) {
      reportError(event.error, {
        source: "error",
        filename: event.filename,
        lineno: event.lineno,
      });
    } else {
      reportMessage(event.message || "window error", "warn", {
        source: "error",
        filename: event.filename,
        lineno: event.lineno,
      });
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportError(event.reason, { source: "unhandledrejection" });
  });
}
