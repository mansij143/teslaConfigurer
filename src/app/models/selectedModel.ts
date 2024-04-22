export class SelectedModel {
  code: string = '';
  color: string = '';
  config: string = '';
  tow: boolean = false;
  yoke: boolean = false;

  isValidStep1() {
    return !this.checkNullOrEmpty([this.code, this.color]);
  }

  isValidStep2() {
    return !this.checkNullOrEmpty([this.code, this.color, this.config]);
  }

  private checkNullOrEmpty(stepDetails: string[]){
    for (let steps of stepDetails){
      if (steps === null || steps.length == 0)
        return true;
    }
    return false;
  }

}
