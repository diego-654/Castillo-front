import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { SocioRepository } from '@features/socio/domain/repositories/socio.repository';
import { SvgIconComponent } from '@shared/components/svg-icon/svg-icon.component';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-detalle-socio-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './detalle-socio-layout.html',
  styleUrl: './detalle-socio-layout.scss',
})
export class DetalleSocioLayout {

  router = inject(Router);
  route = inject(ActivatedRoute);
  socioRepository = inject(SocioRepository);

  // id dinámico del url
  socioId = signal<number>(0); // id de miembro


  tabs = signal([
    { label: 'General', route: '', icon: 'credit-card.svg' },
    { label: 'Membresia', route: '', icon: 'credit-card.svg' },
    { label: 'Pagos', route: '', icon: 'credit-card.svg' }
  ]);

  ngOnInit() {
    this.obtenerIdSocio();

  }

  async obtenerIdSocio() {
    const id = Number(this.route.snapshot.paramMap.get('id') ?? 0);
    this.socioId.set(id);
    this.obtenerDatosMiembro();
  }

  async obtenerDatosMiembro() {
    const res = await firstValueFrom(
      this.socioRepository.obtenerDatosMiembro(this.socioId())
    );


    // 👇 Ahora que tenemos el ID real, generamos tabs correctos
    this.setTabs();
  }


  setTabs() {

    this.tabs.set([
      {
        label: 'General',
        route: `/socios/${this.socioId()}/general`,
        icon: 'credit-card.svg',
      },
      {
        label: 'Membresia',
        route: `/socios/${this.socioId()}/membresia`,
        icon: 'credit-card.svg',
      },
      {
        label: 'Pagos',
        route: `/socios/${this.socioId()}/pagos`,
        icon: 'credit-card.svg',
      }
    ]);
  }

  irAlFormulario() {
    this.router.navigate(['/socios']);
  }
}
