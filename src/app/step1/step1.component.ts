import {Component, OnDestroy, OnInit} from '@angular/core';
import {TeslaService} from "../services/tesla.service";
import {ModelResponse} from "../models/modelResponse";
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SelectedModel} from "../models/selectedModel";
import {take} from "rxjs";

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component implements OnInit {

  step1Form!: FormGroup;
  models!: ModelResponse[];
  selectedModel!: SelectedModel;

  constructor(private teslaService: TeslaService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.teslaService.getModels().subscribe(res => {
      this.models = res;
      this.teslaService.selectedModel.pipe(take(1)).subscribe(res => {
        this.selectedModel = res;
        this.step1Form.patchValue({
          modelSelect: res.code ? this.models.findIndex(x => x.code == res.code) : '',
          colorSelect: res.color
        });
      })
    });
  }

  onChangeDetails() {
    this.selectedModel.code = this.step1Form.get('modelSelect')?.valid ? this.models[this.step1Form.get('modelSelect')?.value].code : '';
    this.selectedModel.color = this.step1Form.get('colorSelect')?.valid ? this.step1Form.get('colorSelect')?.value : '';
    this.teslaService.selectedModel.next(this.selectedModel);
  }

  onSelectCarModel() {
    if (this.step1Form.get('modelSelect')?.valid){
      this.selectedModel = new SelectedModel();
      this.step1Form.get('colorSelect')?.setValue(this.models[this.step1Form.get('modelSelect')?.value].colors[0].code);
    }
  }

  private buildForm() {
    this.step1Form = new FormGroup({
      modelSelect: new FormControl('', [Validators.required]),
      colorSelect: new FormControl('', [Validators.required]),
    });
  }

}
