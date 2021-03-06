import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MessageService } from '../message.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'wcm-compose-message-dialog',
  templateUrl: './compose-message-dialog.component.html',
  styleUrls: ['./compose-message-dialog.component.scss']
})
export class ComposeMessageDialogComponent implements OnInit {
  public subject: string;
  public content: string;

  public subjectControl = new FormControl('', [Validators.required]);
  public bodyControl = new FormControl('', [Validators.required]);

  constructor(
    private ref: MatDialogRef<ComposeMessageDialogComponent>
  ) { }

  public done() {
    this.ref.close({
      subject: this.subject,
      content: this.content
    });
  }

  ngOnInit() {
  }

}
