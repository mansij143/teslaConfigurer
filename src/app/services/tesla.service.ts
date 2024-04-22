import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ModelResponse} from "../models/modelResponse";
import {OptionsResponse} from "../models/optionsResponse";
import {BehaviorSubject, Subject} from "rxjs";
import {SelectedModel} from "../models/selectedModel";

@Injectable({
  providedIn: 'root'
})
export class TeslaService {

  selectedModel: BehaviorSubject<SelectedModel> = new BehaviorSubject<SelectedModel>(new SelectedModel());

  constructor(private httpClient: HttpClient) { }

  getModels(){
    return this.httpClient.get<ModelResponse[]>('/models');
  }

  getOptions(id: string){
    return this.httpClient.get<OptionsResponse>(`/options/${id}`);
  }
}
