import { Component, inject, signal, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

import { ButtonModule } from 'primeng/button';
import { McuMallaCurricularModalComponent } from './components/mcu-malla-curricular';

@Component({
   selector: 'app-root',
   imports: [RouterOutlet, ButtonModule, McuMallaCurricularModalComponent],
   templateUrl: './app.html',
   styleUrl: './app.scss'
})
export class App {

   isShowModal = signal(false);

   userImg: string = '/src/assets/user.png';

   protected readonly title = signal('v20iu');
   private readonly primeng = inject(PrimeNG);

   ngOnInit() {
      this.primeng.ripple.set(true);
   }

   // Si el sidebar está minimizado controlar que en responsive muestre el menu completo
   @HostListener('window:resize', ['$event'])
   onResize(event: UIEvent) {
      const sidebar = document.getElementById('sidebar') as HTMLElement;
      sidebar.classList.remove('minimize');
   }

   toggleMenu = (event: Event) => {
      // Abrir submenu
      const menuItem = event.currentTarget as HTMLElement;
      const subMenu = menuItem.querySelector('.sub-menu') as HTMLElement;
      const isActive = menuItem.classList.toggle('sub-menu-toggle');
      if (subMenu) {
         subMenu.style.height = isActive ? `${subMenu.scrollHeight + 6}px` : '0';
         subMenu.style.padding = isActive ? '0.2rem 0' : '0';
      }
      // Cerrar el submenu excepto el seleccionado
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
         if (item !== menuItem) {
            const subMenu = item.querySelector('.sub-menu') as HTMLElement;
            if (subMenu) {
               item.classList.remove('sub-menu-toggle');
               subMenu.style.height = '0';
               subMenu.style.padding = '0';
            }
         }
      });
   }

   toggleSidebar = () => {
      const sidebar = document.getElementById('sidebar') as HTMLElement;
      sidebar.classList.toggle('minimize');
   }

   onHoverIn(event: MouseEvent) {
      const sidebar = document.getElementById('sidebar') as HTMLElement;
      if (!sidebar.classList.contains('minimize')) return

      const menuItem = event.currentTarget as HTMLElement;
      const subMenu = menuItem.querySelector('.sub-menu') as HTMLElement;
      if (subMenu) {
         subMenu.style.height = `${subMenu.scrollHeight + 6}px`;
         subMenu.style.padding = '0.2rem 0';
      }

      // Ocultar submenus de otros menus
      const menuItems = document.querySelectorAll('.menu-item');
      menuItems.forEach(item => {
         if (item !== menuItem) {
            const subMenu = item.querySelector('.sub-menu') as HTMLElement;
            if (subMenu) {
               item.classList.remove('sub-menu-toggle');
               subMenu.style.height = '0';
               subMenu.style.padding = '0';
            }
         }
      });
   }

   toggleResponsiveSidebar = () => {
      document.body.classList.toggle('sidebar-open');
   }

   addAsignatura(event: any) {
      console.log('addAsignatura', event);
   }

   // MOdal
   showModal() {
      this.isShowModal.set(true);
   }

   closeModal(evt: boolean) {
      this.isShowModal.set(evt);
   }


}
