import { Component, DestroyRef, OnInit } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Admin } from '../../../../shared/interfaces/admin.interface';
import { LocationBackDirective } from '../../../../shared/directives/location-back.directive';

@Component({
  selector: 'app-admin-detail',
  imports: [
    LocationBackDirective,
    RouterLink
  ],
  standalone: true,
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.scss'
})
export class AdminDetailComponent implements OnInit {
  id = '';
  admin?: Admin;

  constructor(
    private destroyRef: DestroyRef,
    private adminService: AdminService,
    private toastrService: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.watchRoute();
  }

  watchRoute() {
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(param => {
        this.id = param['id'];
        if(this.id) {
          this.getAdmin();
        }
      });
  }

  getAdmin() {
    this.adminService.getAdminById(+this.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: Admin) => {
          this.admin = res;
        },
        error: (err: any) => {
          this.toastrService.error(err.message);
        }
      })
  }
}
