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
     ENVÍO DEL FORMULARIO
     Los formularios viven en el CRM (Ajustes › Forms). El envío es un
     POST multipart a  <base><id>/submit  con los nombres de campo que
     el propio CRM define. Cada formulario existe en español y en
     inglés, y se elige según el idioma activo de la web.
     ------------------------------------------------------------ */
  form: {
    mode: 'endpoint',
    base: 'https://crmapi.retuertographicdesign.com/form/',

    /* id del formulario en el CRM, por tipo e idioma */
    ids: {
      demo:   { es: '49f11c33-2e48-355d-a8a0-e0efc39995d9',
                en: '9d0e99fa-cf1a-377d-a021-a830fe31fed2' },
      ventas: { es: 'b0f74b29-0fd5-378f-801c-fdcfcf384d41',
                en: '85c84f3f-e1b8-3bee-86db-0ee2890e9884' },
    },

    /* campo del formulario de la web  ->  nombre del campo en el CRM */
    fieldMap: {
      name:    'nombre',
      shop:    'taller',
      email:   'email',
      phone:   'telefono',
      size:    'entradasmes',
      message: 'mensaje',
      consent: 'rgpd',
    },
  },

  /* --- Verificación anti-spam del formulario --- */
  captchaAnswers: ['7', 'siete', 'seven'],
};
