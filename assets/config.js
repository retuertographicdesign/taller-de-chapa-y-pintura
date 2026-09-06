/* ============================================================
   CONFIGURACIÓN DEL SITIO
   Único archivo que hay que tocar para poner los datos reales.
   Todo lo que aparece entre corchetes [ ] es un marcador
   pendiente de sustituir por el dato definitivo.
   ============================================================ */
window.SITE_CONFIG = {
  /* --- Datos de contacto (aparecen en la web) --- */
  phone:        '+34 000 000 000',            // [PENDIENTE] teléfono real
  phoneHref:    '+34000000000',               // mismo teléfono sin espacios, para el enlace tel:
  whatsapp:     '34000000000',                // [PENDIENTE] número de WhatsApp con prefijo, sin '+'
  email:        'hola@tallerdecha.com',       // [PENDIENTE] email comercial
  emailPrivacy: 'privacidad@tallerdecha.com', // [PENDIENTE] email de protección de datos
  address:      'Santa Cruz de Tenerife, España', // [PENDIENTE] dirección o ciudad

  /* --- Redes (deja la cadena vacía para ocultar el icono) --- */
  linkedin: '',
  instagram: '',

  /* --- Envío del formulario mediante EmailJS (emailjs.com) ---
     Crea una cuenta gratuita, un servicio y una plantilla con las
     variables: name, email, to_email, subject, message.            */
  emailjs: {
    publicKey:  'EMAILJS_PUBLIC_KEY',   // [PENDIENTE]
    serviceId:  'EMAILJS_SERVICE_ID',   // [PENDIENTE]
    templateId: 'EMAILJS_TEMPLATE_ID',  // [PENDIENTE]
  },

  /* --- Verificación anti-spam del formulario --- */
  captchaAnswers: ['7', 'siete', 'seven'],
};
