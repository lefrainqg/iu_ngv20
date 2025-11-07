export const environment = {
   production: false,

   ENC_SECRET_KEY: 'S3cr3tK3ySrl',

   // APIS
   // baseURL: 'http://localhost:8081/dthapi/ws', //?: No se utiliza
   PATH_API_SRL: 'http://localhost:4000/api_v1',
   PATH_API_CDA: 'http://localhost:4001/api',
   API_ONEDRIVE: 'https://apiarchivos.espoch.edu.ec/wsrepositorio/rutaRepositorio',

   //CAS
   CASLOGIN: 'https://seguridad.espoch.edu.ec/cas/login?',
   CASLOGOUT: 'https://seguridad.espoch.edu.ec/cas/logout?',
   CASVALIDATE: 'https://seguridad.espoch.edu.ec/cas/p3/serviceValidate?',
   REDIRECT_URI: 'https://localhost:4200/cas',
   LOGOUT_REDIRECT: 'https://localhost:4200/logout/',
   LOGOUT_CORREO: 'https://login.microsoftonline.com/common/oauth2/logout?',
   VALIDATEJAVA: 'https://servicioscomprobante.espoch.edu.ec/ServicioWebComprobantes/ServiciosComprobantes/ValidateCas/',

   API_CENTRALIZADA_2: 'https://centralizada2.espoch.edu.ec/rutaCentral'
};
