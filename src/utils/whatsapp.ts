// Utility function to detect mobile device and open WhatsApp accordingly
export const openWhatsApp = (phoneNumber: string, message: string) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const encodedMessage = encodeURIComponent(message);
  
  if (isMobile) {
    // Mobile: opens WhatsApp app directly
    window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
  } else {
    // Desktop: opens WhatsApp Web
    window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`, '_blank');
  }
};

export const ZAPLIA_WHATSAPP = "5511958883133";