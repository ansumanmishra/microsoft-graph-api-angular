import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

import { GraphService } from '../graph.service';
import { Event, DateTimeTimeZone } from '../event';
import { AlertsService } from '../alerts.service';

declare var $;
declare var moment;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  private events: Event[];

  constructor(
    private graphService: GraphService,
    private alertsService: AlertsService) { }

  ngOnInit() {
    this.graphService.getEvents()
      .then((events) => {
        this.events = events;
        console.log(this.events)
        //

        const eventsToDisplay = this.events.map( e => {
          return {
            start: e.start.dateTime,
            title: e.subject,
          };
        });

        console.log(eventsToDisplay)

        $('#calendar1').fullCalendar({
          left: 'prev,next,today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay',
          navLinks: true, // can click day/week names to navigate views
          eventLimit: 'true',
          eventLimitClick: 'popover',
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'
          },
          events: eventsToDisplay,
        });
      });
  }

  formatDateTimeTimeZone(dateTime: DateTimeTimeZone): string {
    try {
      //return moment.tz(dateTime.dateTime, dateTime.timeZone).format();
    }
    catch(error) {
      this.alertsService.add('DateTimeTimeZone conversion error', JSON.stringify(error));
    }
  }
}
