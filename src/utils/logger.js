export const logger = {
  info: (message, data = null) => {
    console.info("ℹ️ [INFO]:", message, data ?? "");
  },
  warn: (message, data = null) => {
    console.warn("⚠️ [WARN]:", message, data ?? "");
  },
  error: (message, data = null) => {
    console.error("❌ [ERROR]:", message, data ?? "");
  },
  success: (message, data = null) => {
    console.log("✅ [SUCCESS]:", message, data ?? "");
  },
};
