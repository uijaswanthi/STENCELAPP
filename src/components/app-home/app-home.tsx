import { Component, h, State } from '@stencil/core';
import { Event, EventEmitter } from '@stencil/core';
import { Listen } from '@stencil/core';

type Step = {
  stepName: number,
  finished: boolean,
}

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {


  @Event() statusOfSteps: EventEmitter;

  @State() steps: Step[] = [{ stepName: 1, finished: false }, { stepName: 2, finished: false }, { stepName: 3, finished: false }, { stepName: 4, finished: false }, { stepName: 5, finished: false }];
  @State() finished: Step[];
  @State() unFinished: Step[] = this.steps;

  @Listen('statusOfSteps')
  listeningComletedSteps(e) {
    this.finished = this.steps.filter(x => x.finished)
    this.unFinished = this.steps.filter(x => !x.finished)
  }

  setFinishing = (index: number, e) => {
    this.steps = this.steps.map((x, i) => { return { ...x, finished: i <= index } })
    this.statusOfSteps.emit(e)
  }


  render() {
    return (
      <div>
        <div class="app-home">
          {this.steps.map((step, i) => <div class={`step-container ${step.finished ? "container-finished" : ""}`}>
            <button key={i} class={`step ${step.finished ? "finished" : "unfinished"}`} onClick={() => this.setFinishing(i, "")}>{step.stepName}</button>
            <div>Step {step.stepName}</div>
          </div>
          )}
        </div>
        <div>
          Unfinished:{this.unFinished?.map(x => `Step ${x.stepName}`).join(', ')}
        </div>
        <div>
          Finished:{this.finished?.map(x => `Step ${x.stepName}`).join(', ')}
        </div>
      </div>
    );
  }
}
