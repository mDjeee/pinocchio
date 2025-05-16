import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @Input() title = 'Название графика';

  barChartType = 'bar' as const;

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '', // будет установлен в updateChart()
        font: {
          size: 20
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  };

  barChartData: ChartDataset<'bar', number[]>[] = [
    {
      label: 'Клиенты',
      data: []
    }
  ];

  barChartChartData: ChartData<'bar'> = {
    labels: [],
    datasets: this.barChartData
  };

  ngOnInit(): void {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels'] || changes['title']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    this.barChartData[0].data = this.data;
    this.barChartChartData = {
      labels: this.labels,
      datasets: this.barChartData
    };

    if (this.barChartOptions.plugins?.title) {
      this.barChartOptions.plugins.title.text = this.title;
    }
  }
}
