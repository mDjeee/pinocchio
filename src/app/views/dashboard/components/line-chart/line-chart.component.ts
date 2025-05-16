import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  imports: [
    BaseChartDirective
  ],
  standalone: true,
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title = 'Название графика';
  @Input() axisLabel = 'Активные клиенты';

  lineChartType: ChartType = 'line';
  lineChartOptions: ChartOptions = { responsive: true };
  lineChartLabels: string[] = [];
  lineChartData: ChartDataset<'line', number[]>[] = [
    { data: [], label: '' }
  ];

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
  }
  private updateChart(): void {
    this.lineChartData = [
      {
        data: this.data,
        label: this.axisLabel
      }
    ];

    this.lineChartLabels = this.labels;

    this.lineChartOptions = {
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
          position: 'bottom'
        }
      },
    };
  }
}
