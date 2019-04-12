// Get device pixelRatio and set className
export default function dpr() {
  const classNames = [];

  // Pixel Ratio
  let pixelRatio = 1;
  if (typeof window !== 'undefined') {
    pixelRatio = window.devicePixelRatio;
  }
  classNames.push(`pixel-ratio-${Math.floor(pixelRatio)}`);
  if (pixelRatio >= 2) {
    classNames.push('retina');
  }

  // Add html classes
  if (classNames.length > 0 && typeof document !== 'undefined') {
    const htmlTag = document.getElementsByTagName('html')[0];
    for (let i = 0; i < classNames.length; i += 1) {
      htmlTag.classList.add(classNames[i]);
    }
  }
}
