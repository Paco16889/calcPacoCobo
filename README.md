# Calculadora TypeScript

Una calculadora básica desarrollada con TypeScript, HTML y CSS que demuestra conceptos fundamentales de programación web moderna.

## 🚀 Características

- ✅ Operaciones básicas: suma, resta, multiplicación, división
- ✅ Interfaz limpia y moderna
- ✅ Validación de errores (división por cero)
- ✅ Funciones de limpiar y borrar
- ✅ Desarrollada con TypeScript para type safety
- ✅ Event listeners modernos (sin onclick en HTML)
- ✅ Source maps para depuración
- ✅ Configuración completa de VSCode para debugging

## 🛠️ Tecnologías utilizadas

- **TypeScript** - Lenguaje principal
- **HTML5** - Estructura
- **CSS3** - Estilos (sin frameworks, diseño limpio)
- **lite-server** - Servidor de desarrollo
- **VSCode** - Configuración de depuración incluida

## 📋 Requisitos previos

- Node.js (versión 14 o superior)
- npm (incluido con Node.js)
- Navegador web moderno (Chrome recomendado para depuración)

## 🔧 Instalación

1. **Clona o descarga el proyecto**
   ```bash
   git clone <url-del-repositorio>
   cd calc
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

## 🚀 Comandos disponibles

### Desarrollo

```bash
# Compilar TypeScript a JavaScript
npm run build

# Iniciar servidor de desarrollo (abre navegador automáticamente)
npm start

# Compilar y iniciar en un solo comando
npm run build && npm start
```

### Estructura de comandos

| Comando | Descripción | Salida |
|---------|-------------|--------|
| `npm run build` | Compila TypeScript → JavaScript | `dist/` |
| `npm start` | Inicia lite-server | `http://localhost:3000` |

## 🐛 Depuración con VSCode

El proyecto incluye configuración completa para depurar con VSCode:

### Opción 1: Depuración automática (Recomendado)
1. Abre el proyecto en VSCode
2. Ve a la pestaña "Run and Debug" (Ctrl+Shift+D)
3. Selecciona "Launch Calculator with Chrome"
4. Presiona **F5**

VSCode automáticamente:
- ✅ Compila el código TypeScript
- ✅ Inicia el servidor de desarrollo
- ✅ Abre Chrome con debugger conectado
- ✅ Termina el servidor al cerrar la depuración

### Opción 2: Depuración manual
1. Ejecuta `npm start` en terminal
2. En VSCode, selecciona "Launch Calculator with Chrome"
3. Presiona **F5**

### Características de depuración
- **Breakpoints visuales** en código TypeScript original
- **Source maps** para mapeo TS ↔ JS
- **Variables inspector** en tiempo real
- **Call stack** completo
- **Console integrada**

## 📁 Estructura del proyecto

```
calc/
├── src/
│   ├── index.html          # Página principal
│   ├── index.ts            # Lógica de la calculadora
│   └── styles.css          # Estilos
├── dist/                   # Código compilado (generado)
├── .vscode/
│   └── launch.json         # Configuración de depuración
├── bs-config.json          # Configuración de lite-server
├── tsconfig.json           # Configuración de TypeScript
├── package.json            # Dependencias y scripts
└── README.md               # Este archivo
```

## 🎯 Funcionalidades de la calculadora

### Botones disponibles
- **Números**: 0-9, punto decimal
- **Operadores**: +, -, ×, ÷
- **Funciones**: 
  - `C` - Limpiar todo
  - `⌫` - Borrar último carácter
  - `=` - Calcular resultado

### Características técnicas
- **Event delegation**: Un solo event listener maneja todos los botones
- **Data attributes**: `data-value` y `data-action` para separar lógica
- **Type safety**: TypeScript previene errores en tiempo de compilación
- **Error handling**: Validación de división por cero

## 🔍 Detalles de implementación

### Patrón de diseño
- **Separación de responsabilidades**: HTML (estructura), CSS (presentación), TS (lógica)
- **Event listeners modernos**: Sin `onclick` en HTML
- **Encapsulación**: Funciones privadas, no contamina scope global

### Configuración TypeScript
- **Target**: ES6
- **Module**: ES2015
- **Source Maps**: Habilitados
- **Strict mode**: Activado para máxima type safety

## 🚨 Solución de problemas

### El servidor no inicia
```bash
# Verificar que el puerto 3000 esté libre
lsof -i :3000

# Si está ocupado, matar el proceso
pkill -f lite-server
```

### Errores de compilación
```bash
# Limpiar y recompilar
rm -rf dist/
npm run build
```

### Problemas de depuración
- Asegúrate de que Chrome esté actualizado
- Verifica que los source maps estén habilitados en DevTools
- Reinicia VSCode si la depuración no funciona

## 📚 Recursos de aprendizaje

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [MDN Web Docs - Event Handling](https://developer.mozilla.org/en-US/docs/Web/Guide/Events)
- [VSCode Debugging Guide](https://code.visualstudio.com/docs/editor/debugging)

## 🤝 Contribuciones

Este es un proyecto educativo. Sugerencias de mejora:
- Añadir más operaciones (potencia, raíz cuadrada)
- Implementar historial de cálculos
- Añadir tests unitarios
- Mejorar la accesibilidad (ARIA labels)

## 📄 Licencia

Proyecto educativo - Uso libre para aprendizaje.
