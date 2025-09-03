const imageTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

export function isImage(type: string): boolean {
  return imageTypes.includes(type);
}

export function generateKey(length: number): string {
  return Array.from({ length }, () => {
    const base36 = "0123456789abcdefghijklmnopqrstuvwxyz";
    const index = Math.floor(Math.random() * base36.length);
    return base36[index];
  }).join("");
}

export function IsFormData(contentType: string): boolean {
  return contentType.includes("multipart/form-data");
}

export function isBinaryContent(data: Uint8Array): boolean {
  // Check for null bytes or high percentage of non-printable characters
  // This is a simple heuristic to detect binary content
  const sample = data.slice(0, Math.min(1024, data.length));
  let nonPrintableCount = 0;
  
  for (let i = 0; i < sample.length; i++) {
    const byte = sample[i];
    // Check for null bytes (strong indicator of binary)
    if (byte === 0) {
      return true;
    }
    // Count non-printable ASCII characters (excluding common whitespace)
    if (byte < 9 || (byte > 13 && byte < 32) || byte > 126) {
      nonPrintableCount++;
    }
  }
  
  // If more than 30% of sampled bytes are non-printable, consider it binary
  return (nonPrintableCount / sample.length) > 0.3;
}

export function encodeBase64(data: Uint8Array): string {
  // Convert Uint8Array to base64 string using browser APIs
  let binary = '';
  for (let i = 0; i < data.length; i++) {
    binary += String.fromCharCode(data[i]);
  }
  return btoa(binary);
}

export function decodeBase64(str: string): Uint8Array {
  // Decode base64 string to Uint8Array using browser APIs
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}
