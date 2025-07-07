import { Component } from '@angular/core';
import { AboutComponent } from '../../shared/components/about/about.component';
import { AppointmentComponent } from '../../shared/components/appointment/appointment.component';
import { ContactComponent } from '../../shared/components/contact/contact.component';
import { CountsComponent } from '../../shared/components/counts/counts.component';
import { DepartmentsComponent } from '../../shared/components/departments/departments.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { ServicesComponent } from '../../shared/components/services/services.component';
import { WhyUsComponent } from '../../shared/components/why-us/why-us.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    WhyUsComponent,
    AboutComponent,
    CountsComponent,
    ServicesComponent,
    AppointmentComponent,
    DepartmentsComponent,
    ContactComponent,
  ],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

}
