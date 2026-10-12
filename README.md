# tarea-semana17-docker

Aplicacion Next.js contenerizada con Docker. Actividad practica de la semana 17 (Full Stack Junior, Kodigo): se creó un proyecto con `create-next-app` y se escribio un `Dockerfile` multi-stage para construir y ejecutar la aplicacion en un contenedor de forma portable y reproducible.

## Requisitos

- Docker (Docker Desktop en Windows o macOS).

No hace falta tener Node.js instalado: todo se instala y compila dentro de la imagen.

## Construir la imagen

Desde la raíz del proyecto:

```bash
docker build -t tarea-semana17-docker:1.0 .
```

## Ejecutar el contenedor

```bash
docker run -d --name tarea-semana17 -p 3000:3000 tarea-semana17-docker:1.0
```

Luego abrir http://localhost:3000 en el navegador.

Si el puerto 3000 está ocupado, se puede usar otro del lado izquierdo, por ejemplo `-p 3001:3000`, y abrir http://localhost:3001.

## Comandos que podrian servir

```bash
docker ps                          # ver contenedores en ejecucion
docker logs tarea-semana17         # ver los registros de la aplicacion
docker exec tarea-semana17 whoami  # comprobar el usuario (debe responder: node)
docker images tarea-semana17-docker  # ver el tamaño de la imagen
```

## Detener y eliminar el contenedor

```bash
docker stop tarea-semana17
docker rm tarea-semana17
```

## Decisiones técnicas (Resumen generado)

- **Multi-stage build (3 etapas):** `deps` instala las dependencias con `npm ci`, `builder` compila la aplicación con `npm run build` y `runner` contiene únicamente lo necesario para ejecutarla. Las herramientas de compilación no llegan a la imagen final.
- **`output: "standalone"` en `next.config.ts`:** Next.js genera una carpeta `.next/standalone` con solo lo mínimo para correr, incluyendo un `server.js`. Por eso el contenedor arranca con `node server.js` en lugar de `next start`, lo que reduce mucho el tamaño de la imagen. Es el mismo servidor de Next.js, ya preparado para producción en contenedores.
- **Usuario sin privilegios:** el contenedor corre con `USER node`, no como root, siguiendo el principio de mínimo privilegio.
- **`.dockerignore`:** excluye `node_modules`, `.next`, `.env*`, `.git` y logs. Evita copiar al contenedor dependencias compiladas para Windows y archivos sensibles, y acelera la construcción.
- **Imagen base `node:22-alpine`:** la misma versión mayor de Node con la que se desarrolló, en su variante Alpine, que es muy liviana.
- **Tamaño final de la imagen:** aproximadamente 85.5 MB.