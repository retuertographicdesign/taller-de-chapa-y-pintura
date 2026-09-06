# Taller de Chapa y Pintura · Web de marketing

Sitio estático de una sola página para **Taller de Chapa y Pintura**, el software de gestión
integral para talleres de chapa y pintura (recepción con firma digital, peritaje
de daños sobre esquema visual, seguimiento en tiempo real, vehículos de cortesía
y entrega).

Construido siguiendo la misma arquitectura que
[`retuertographicdesign/capri`](https://github.com/retuertographicdesign/capri):
HTML estático + CSS propio + JS sin dependencias, bilingüe ES/EN, formulario
sin dependencias externas y despliegue en GitHub Pages.

## Estructura

```
index.html            Página completa (hero, producto, cómo funciona, precios, FAQ, contacto)
assets/site.css       Sistema visual completo
assets/config.js      ← ÚNICO archivo con los datos reales que hay que rellenar
assets/i18n.js        Todos los textos en español e inglés
assets/site-common.js Cabecera, idioma, FAQ, modal legal y formulario
```

## Pendiente de rellenar

Todo lo marcado como `[PENDIENTE]` en `assets/config.js`:

| Dato | Dónde |
|---|---|
| Teléfono y WhatsApp | `assets/config.js` |
| Email comercial y de protección de datos | `assets/config.js` |
| Dirección o ciudad | `assets/config.js` |
| Mecanismo de envío del formulario (`form.mode` y `form.endpoint`) | `assets/config.js` |
| Titular, NIF y domicilio fiscal | `assets/i18n.js`, claves `aviso_p1`, `priv_p1` (marcadores `[TITULAR]`, `[NIF]`, `[DIRECCIÓN FISCAL]`) |
| Email de privacidad en los textos legales | `assets/i18n.js`, marcador `[EMAIL PROTECCIÓN DE DATOS]` |
| Perfiles de LinkedIn / Instagram | `assets/config.js` (vacío = el icono no se muestra) |

### Envío del formulario

No usa ningún servicio de terceros por defecto. El mecanismo se elige en
`assets/config.js`, en el bloque `form`:

- `mode: 'endpoint'` — hace un `POST` a `form.endpoint`. Sirve para Formspree,
  Web3Forms, Netlify Forms, un Apps Script de Google o un backend propio. Con
  `payload: 'form'` envía `FormData` (lo que piden Formspree y Netlify) y con
  `payload: 'json'` envía JSON.
- `mode: 'mailto'` — abre el cliente de correo del visitante con el mensaje ya
  redactado. No necesita servidor.
- `mode: ''` (estado actual) — el formulario valida los campos pero no envía:
  muestra el aviso con las vías alternativas (teléfono, WhatsApp, email).

## Contenido y decisiones

- Los textos salen del plan de producto del proyecto: propuesta de valor, ciclo
  de las seis etapas, módulos y posicionamiento de precio.
- **Precios**: 99 € / 179 € / a medida, cuota plana por taller y usuarios
  ilimitados, siguiendo la franja de 99–179 €/mes del posicionamiento. Conviene
  confirmarlos antes de publicar.
- **No hay testimonios**: no se incluyen citas de clientes inventadas. Cuando
  haya testimonios reales, encajan entre la sección oscura y los precios.
- **No hay fotografías**: el mockup del hero es HTML/CSS. Si se añaden fotos
  reales del producto o de talleres, sustituyen a ese bloque.

## Desarrollo

Es HTML estático: basta con abrir `index.html` en el navegador, o servirlo con

```bash
python3 -m http.server 4173
```

## Despliegue

GitHub Pages desde la rama `main`, carpeta raíz. Para un dominio propio, añadir
un archivo `CNAME` con el dominio y apuntar los DNS a GitHub Pages.
