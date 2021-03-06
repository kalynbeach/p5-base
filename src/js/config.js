/**
 * Configurations
 */

// TODO: Play around with frequency thresholds

// Audio Frequency Bands
export const bandDetectorConfigs = [
  { low: 20, high: 60, thresh: 0.8, fpp: 30 }, // Sub
  { low: 60, high: 250, thresh: 0.35, fpp: 30 }, // Bass
  { low: 250, high: 500, thresh: 0.6, fpp: 30 }, // Low-Mid
  { low: 500, high: 2000, thresh: 0.4, fpp: 30 }, // Mid
  // { low: 2000, high: 5000, thresh: 0.5, fpp: 30 }, // High-Mid
];

export const bandEllipseConfigs = [
  { x: 150, y: 100, color: "#DC143C", label: "Sub" },
  { x: 350, y: 100, color: "#FF4500", label: "Bass" },
  { x: 550, y: 100, color: "#FFD700", label: "L-Mid" },
  { x: 750, y: 100, color: "#87CEEB", label: "Mid" },
  //{ x: 950, y: 100, color: "#87CEEB", label: "High-Mid" },
];