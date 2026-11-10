# Publicar Tres R con Netlify y Supabase

El sitio se sirve desde `site/`; `netlify/functions/appointments.mjs` expone `/api/appointments` y reutiliza `api/appointments.js` para guardar solicitudes. La llave de Supabase se lee únicamente en el servidor de Netlify.

## Supabase

1. Crea el proyecto en la organización **Tres R Barbershop**. Supabase solicita que establezcas la contraseña de la base de datos; no la compartas por chat ni la guardes en este repositorio.
2. En **SQL Editor**, ejecuta el contenido de `supabase/migrations/202611090001_appointment_requests.sql`.
3. En **Project Settings → API Keys**, copia la Project URL y crea/copia una `sb_secret_...` para uso del servidor. Nunca uses esa llave en `site/index.html` ni en una variable `VITE_`/`NEXT_PUBLIC_`.

## Netlify

1. En el sitio existente **tres-r-barberia**, confirma que el repositorio conectado sea `cuentayisus02-jpg/tres-r-barberia-e5a1e` y que la raíz sea el directorio del repositorio.
2. `netlify.toml` publica `site/`, compila las funciones de `netlify/functions/` y mantiene los encabezados de seguridad.
3. Agrega `SUPABASE_URL` y `SUPABASE_SECRET_KEY` en **Site configuration → Environment variables** para Production. Guarda y vuelve a desplegar.

## Comprobación segura

- La tabla `public.appointment_requests` tiene RLS activado y no concede acceso a `anon` ni `authenticated`.
- `private.booking_rate_limits` solo acepta acceso desde `service_role`; conserva un HMAC de la IP en lugar de la IP sin procesar y limita a 8 solicitudes por hora.
- La función valida método, origen, tamaño, campos, horario del negocio y selección de servicios/estilos antes de escribir.
- El formulario abre WhatsApp después de guardar. Si falla el guardado, muestra un enlace alternativo para continuar por WhatsApp e informa que la solicitud no quedó guardada.

Supabase Free no tiene cuota mensual, pero sus proyectos con baja actividad pueden pausarse; revisa su estado antes de depender de la agenda como servicio esencial.
