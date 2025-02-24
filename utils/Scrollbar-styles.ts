export const colors = {
    deepPurple: '#1A1A2E',
    cosmicBlue: '#0E1C36',
    starryWhite: '#E0E0E0',
    glassWhite: 'rgba(255, 255, 255, 0.1)',
    glassBorder: 'rgba(255, 255, 255, 0.2)',
    textWhite: '#FFFFFF',
    textGray: '#CCCCCC'
  };

// Custom scrollbar styles
export const scrollbarStyles = `
    .custom-scrollbar {
      scrollbar-width: thin;
      scrollbar-color: ${colors.glassWhite} transparent;
    }
  
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
  
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
  
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: ${colors.glassWhite};
      border-radius: 20px;
      border: 3px solid transparent;
    }
  
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: ${colors.glassBorder};
    }
  `;