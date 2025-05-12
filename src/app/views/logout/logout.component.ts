import { Component, DestroyRef, OnInit } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  standalone: true,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {

  constructor(
    private destroyRef: DestroyRef,
    private storageService: StorageService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.cleanStorage();
  }

  cleanStorage() {
    this.storageService.removeToken();
    this.storageService.removeUser();

    this.router.navigate(['/auth']);
  }
}
