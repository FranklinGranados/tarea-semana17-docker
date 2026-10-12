import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //vamos a agregar una linea extra la cual arma una carpeta .next/standalone con solo lo mínimo para correr la app, 
  // incluyendo un server.js listo para arrancar. Así la imagen final no necesita llevar todo node_modules.
  output: "standalone", //esta es la linea que se agrego para que la imagen final no tenga que llevar todo node_modules
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
