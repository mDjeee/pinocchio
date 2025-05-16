import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stats',
  imports: [],
  standalone: true,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  @Input() stats!: {
    allUserCount: number;
    newMembers: number;
    activeMembers: number;
    churnCount: number;
    allAmount: number;
    amount: number;
  };
}
