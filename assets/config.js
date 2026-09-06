/* ============================================================
   CONFIGURACIÓN DEL SITIO
   Único archivo que hay que tocar para poner los datos reales.
   Todo lo que aparece entre corchetes [ ] es un marcador
   pendiente de sustituir por el dato definitivo.
   ============================================================ */
window.SITE_CONFIG = {
  /* --- Datos de contacto (aparecen en la web) --- */
  phone:        '+34 000 000 000',                     // [PENDIENTE] teléfono real
  phoneHref:    '+34000000000',                        // el mismo, sin espacios, para el enlace tel:
  whatsapp:     '34000000000',                         // [PENDIENTE] WhatsApp con prefijo, sin '+'
  email:        'hola@tallerdechapaypintura.com',      // [PENDIENTE] email comercial
  emailPrivacy: 'privacidad@tallerdechapaypintura.com',// [PENDIENTE] email de protección de datos
  address:      'Santa Cruz de Tenerife, España',      // [PENDIENTE] dirección o ciudad

  /* --- Redes (deja la cadena vacía para ocultar el icono) --- */
  linkedin: '',
  instagram: '',

  /* ------------------------------------------------------------
     ENVÍO DEL FORMULARIO DE DEMO
     Mientras 'mode' esté vacío, el formulario valida los campos
     pero no envía: muestra el aviso con teléfono, WhatsApp y email.

     mode: 'endpoint'  -> hace un POST a la URL indicada.
                          Vale para Formspree, Web3Forms, Netlify Forms,
                          un Apps Script de Google o un backend propio.
           'mailto'    -> abre el cliente de correo del visitante con
                          el mensaje ya redactado. Sin servidor.
           ''          -> sin configurar (estado actual).
     ------------------------------------------------------------ */
  form: {
    mode:     '',      // [PENDIENTE] 'endpoint' o 'mailto'
    endpoint: '',      // [PENDIENTE] URL que recibe el POST, si mode = 'endpoint'
    method:   'POST',
    payload:  'json',  // 'json' (application/json) o 'form' (FormData; lo piden Formspree y Netlify)
    extraFields: {},   // campos fijos añadidos al envío, p. ej. { access_key: '...' }
  },

  /* --- Verificación anti-spam del formulario --- */
  captchaAnswers: ['7', 'siete', 'seven'],
};
