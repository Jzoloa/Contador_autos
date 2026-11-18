# Contador de vehículos (PWA) – guía de publicación

Archivos: index.html (la app), sw.js (permite abrirla sin internet), manifest.webmanifest + iconos (instalación en el teléfono), Codigo_planilla.gs (script de Google Sheets, opcional).

## Opción A: GitHub Pages
1. Creá una cuenta en github.com y un repositorio nuevo (ej.: `contador`).
2. En el repositorio: Add file → Upload files. Subí index.html, sw.js, manifest.webmanifest, icon-192.png e icon-512.png (NO hace falta subir Codigo_planilla.gs ni este archivo). Commit.
3. Settings → Pages → Source: "Deploy from a branch" → Branch: main, carpeta /(root) → Save.
4. En 1 o 2 minutos aparece la dirección: https://TUUSUARIO.github.io/contador/
   Nota: en cuentas gratuitas GitHub Pages suele requerir repositorio público (verificalo en la documentación de GitHub).

## Opción B: Netlify Drop (sin cuenta de GitHub)
Arrastrá la carpeta con los 5 archivos a la página de Netlify Drop. Te da una dirección https.

## Instalar en cada celular
1. Abrí la dirección con internet, en Chrome (Android) o Safari (iPhone). Esperá a que cargue completa.
2. Menú → "Agregar a pantalla de inicio" / "Instalar app".
3. Abrí la app desde el ícono. Probá con modo avión: tiene que abrir y contar.

## Planilla de Google (opcional)
1. Nueva planilla → Extensiones → Apps Script → pegá Codigo_planilla.gs y cambiá CAMBIAR_ESTA_CLAVE.
2. Implementar → Nueva implementación → Aplicación web (Ejecutar como: Yo; Acceso: Cualquier persona).
3. Copiá la dirección que termina en /exec.
4. En la app: "Configurar planilla" → pegá la dirección y la clave.

## Actualizar la app
Si cambiás index.html, cambiá también `conteo-v1` por `conteo-v2` en sw.js, así los teléfonos descargan la versión nueva.

## Antes del relevamiento
Prueba completa: contar, cerrar la app, reabrir en modo avión, guardar versión, exportar CSV, sincronizar con señal.
