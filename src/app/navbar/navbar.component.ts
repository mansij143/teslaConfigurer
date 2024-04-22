import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeslaService } from '../services/tesla.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,
    RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy {

  accessToStep2: boolean = false;
  accessToStep3: boolean = false;

  sub!: Subscription;

  constructor(private teslaService: TeslaService) {
  }

  ngOnInit() {
    this.sub = this.teslaService.selectedModel.subscribe(res => {
      this.accessToStep2 = res.isValidStep1();
      this.accessToStep3 = res.isValidStep2();
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
