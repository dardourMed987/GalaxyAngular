import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    isAdmin =false;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        ) { }

    ngOnInit() {

        const isFormateur = this.authService.roles.includes('FORMATEUR');
        const isAdmin = this.authService.roles.includes('ADMIN');

        const menuItemsProjets = [
            { label: 'Sujets', icon: 'pi pi-comment ', routerLink: ['/admin/sujet'], badge: 'NEW' },
            { label: 'Livrables', icon: 'pi pi-check', routerLink: ['/admin/livrable'], target: 'NEW' }
        ];
        
        if (isFormateur) {
            menuItemsProjets.unshift({ label: 'Discussions', icon: 'pi pi-comments', routerLink: ['/admin/discussions'], badge: 'NEW' });
        }
        
        
        if (isAdmin) {
            menuItemsProjets.push({ label: 'Sujets supprimés', icon: 'pi pi-trash', routerLink: ['/admin/sujetSupp'], badge: 'NEW' });
        }

        const menuItemsGestion=[{ label: 'Formations', icon: 'pi pi-book', routerLink: ['/admin/formations'],badge: 'NEW' },
                                { label: 'Modules', icon: 'pi pi-folder', routerLink: ['/admin/modules'],badge: 'NEW' },
                                { label: 'Documents', icon: 'pi pi-file', routerLink: ['/admin/documents'],badge: 'NEW' }];

        if (isAdmin) {
            menuItemsGestion.push({ label: 'Utilisateurs', icon: 'pi pi-users', routerLink: ['/admin/utilisateurs'], badge: 'NEW' });
            menuItemsGestion.push({  label: 'Clients', icon: 'pi pi-user-edit', routerLink: ['/admin/clients'], badge: 'NEW' });
            menuItemsGestion.push({ label: 'Roles', icon: 'pi pi-key', routerLink: ['/admin/role'], badge: 'NEW' });
            menuItemsGestion.push({ label: 'Technologies', icon: 'pi pi-code', routerLink: ['/admin/technologies'], badge: 'NEW' });
            menuItemsGestion.push({  label: 'Critéres évaluation livrable', icon: 'pi pi-list', routerLink: ['/admin/critere'], badge: 'NEW' });

        }
        
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Accueil', icon: 'pi pi-fw pi-home', routerLink: ['/admin/formation'] }
                ]
            },
            {
                label: 'Gestion', 
                items:menuItemsGestion
            },
            {
                label: 'Les projets',
                items: menuItemsProjets
            },
                   ];
    }
}
