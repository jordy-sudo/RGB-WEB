export const customButton = (state: number) => {
    switch (state) {
      case 1:
        return {
          icon: 'lock-open-outline' as const,
          label: 'Abrir',
          backgroundColor: '#28a745',
        };
      case 2:
        return {
          icon: 'pause-outline' as const,
          label: 'Pausa',
          backgroundColor: '#ffc107',
        };
      case 3:
        return {
          icon: 'lock-closed-outline' as const,
          label: 'Cerrar',
          backgroundColor: '#dc3545',
        };
      default:
        return {
          icon: 'lock-open-outline' as const,
          label: 'Abrir',
          backgroundColor: '#28a745',
        };
    }
  };
  