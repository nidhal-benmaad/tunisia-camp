import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { SettingsService } from '@core';
import { Subscription } from 'rxjs';
import * as chroma from 'chroma-js';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardService],
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = this.dashboardSrv.getData();

  messages = this.dashboardSrv.getMessages();

  charts = this.dashboardSrv.getCharts();
  chart1: any;
  chart2: any;

  stats = this.dashboardSrv.getStats();

  notifySubscription!: Subscription;

  constructor(
    private ngZone: NgZone,
    private dashboardSrv: DashboardService,
    private settings: SettingsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.notifySubscription = this.settings.notify.subscribe(res => {
      console.log(res);
    });
    this.dashboardSrv.getRevenueData().subscribe((res: any) => {
      console.log('res', res);
      const keys = Object.keys(res);

      const values = Object.values(res);
      let updatedOtions: any = this.charts[1];
      updatedOtions = {
        ...updatedOtions,
        series: values,
        labels: keys,
        fill: { colors: this.generateColors(values) },
        colors: this.generateColors(values),
      };

      this.charts[1] = Object.assign(updatedOtions);
      console.log('this.charts[1]', this.charts[1]);
      // Render the updated chart
      this.chart2?.updateOptions(this.charts[1]);
    });
    this.dashboardSrv.getTotalRevenueByCurrentMonth().subscribe((res: any) => {
      let updatedStats = [...this.stats]; // Create a copy of the stats array
      updatedStats[1].amount = res + '';

      this.dashboardSrv.setStats(updatedStats);
      this.cdr.detectChanges();
      console.log('res', res);
    });
  }

  generateColors(data: any) {
    const scale = chroma.scale(['#008ffb', '#00e396']); // Adjust the color range as desired
    const colors = scale.colors(data.length);

    return colors;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initChart());
  }

  ngOnDestroy() {
    if (this.chart1) {
      this.chart1?.destroy();
    }
    if (this.chart2) {
      this.chart2?.destroy();
    }

    this.notifySubscription.unsubscribe();
  }

  initChart() {
    this.chart1 = new ApexCharts(document.querySelector('#chart1'), this.charts[0]);
    this.chart1?.render();
    this.chart2 = new ApexCharts(document.querySelector('#chart2'), this.charts[1]);
    this.chart2?.render();
  }
}
