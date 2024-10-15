export function splitRGB(rgbString: string): { red: number; green: number; blue: number } | null {
    // Usamos una expresión regular para extraer los números del formato "rgb(r, g, b)"
    const valores = rgbString.match(/\d+/g);
    
    if (valores && valores.length === 3) {
      const red = parseInt(valores[0], 10);
      const green = parseInt(valores[1], 10);
      const blue = parseInt(valores[2], 10);
      
      console.log(`Red: ${red}, Green: ${green}, Blue: ${blue}`);
      
      return { red, green, blue };
    } else {
      console.error('El formato RGB no es válido.');
      return null;
    }
  }