import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title = 'Название графика';

  pieChartType: 'pie' = 'pie'; // ✅ исправлено

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: this.title,
        font: { size: 18 }
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    this.pieChartData = {
      labels: this.labels,
      datasets: [{ data: this.data }]
    };

    if (this.pieChartOptions.plugins?.title) {
      this.pieChartOptions.plugins.title.text = this.title;
    }
  }
}
