import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  imports: [
    BaseChartDirective
  ],
  standalone: true,
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  @Input() labels: string[] = ['Активные', 'Подписки прекарщены'];
  @Input() data: number[] = [0, 0];
  @Input() title = 'Название графика';

  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: this.title,
        font: {
          size: 18
        }
      },
      legend: {
        position: 'right'
      }
    },
  };

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }

  updateChart() {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [{ data: this.data }]
    };

    this.doughnutChartOptions.plugins!.title!.text = this.title;
  }
}
