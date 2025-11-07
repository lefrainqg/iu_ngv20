import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
   providers: [
      provideBrowserGlobalErrorListeners(),
      provideZonelessChangeDetection(),
      provideRouter(routes), provideClientHydration(withEventReplay()),

      provideAnimations(),


      // agregar httpclient provide
      provideHttpClient(),

      // PrimeNg
      providePrimeNG({
         theme: {
            preset: Aura,
            options: {
               prefix: 'p',
               darkModeSelector: 'auto',
               ripple: true,
               inputVariant: 'filled',
            },
         }
      })
   ]
};
