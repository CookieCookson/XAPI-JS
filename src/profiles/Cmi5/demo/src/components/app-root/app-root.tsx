import { Component, h, State } from "@stencil/core";
import { Cmi5 } from "xapi-js";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css"
})
export class AppRoot {
  @State() initialized: boolean = false;
  choices = {
    choice1: false,
    choice2: false,
    choice3: false,
    choice4: false
  };
  fillIn: string = "";
  cmi5: Cmi5 = new Cmi5();

  initialize() {
    this.cmi5.initialize().then(() => {
      this.initialized = true;
    });
  }

  complete() {
    this.cmi5.complete();
  }

  pass() {
    this.cmi5.pass();
  }

  fail() {
    this.cmi5.fail();
  }

  terminate() {
    this.cmi5.terminate();
  }

  getLaunchParameters() {
    const launchParameters = this.cmi5.getLaunchParameters();
    console.log(launchParameters);
  }

  getLaunchData() {
    const launchData = this.cmi5.getLaunchData();
    console.log(launchData);
  }

  getLearnerPreferences() {
    const learnerPreferences = this.cmi5.getLearnerPreferences();
    console.log(learnerPreferences);
  }

  progress(percent: number) {
    this.cmi5.progress(percent);
  }

  interactionTrueFalse(answer: boolean) {
    this.cmi5.interactionTrueFalse("test1", "is-true-true", answer, true, {
      "en-US": "Is True True"
    }, {
      "en-US": "In a boolean context, is true truthy?"
    })
  }

  interactionChoice(event: Event) {
    event.preventDefault();
    this.cmi5.interactionChoice("test1", "first-two-choices", Object.keys(this.choices).filter((key) => {
      return this.choices[key] === true;
    }), ["choice1", "choice2"], [
      {
        id: "choice1",
        description: {
          "en-US": "Choice 1"
        }
      },
      {
        id: "choice2",
        description: {
          "en-US": "Choice 2"
        }
      },
      {
        id: "choice3",
        description: {
          "en-US": "Choice 3"
        }
      },
      {
        id: "choice4",
        description: {
          "en-US": "Choice 4"
        }
      }
    ], {
      "en-US": "First Two Choices"
    }, {
      "en-US": "What are the first two choices?"
    })
  }

  setChoice(key: string, value: boolean) {
    this.choices[key] = value;
  }

  interactionFillIn(event: Event) {
    event.preventDefault();
    this.cmi5.interactionFillIn("test1", "hello", this.fillIn, "World", {
      "en-US": "Hello"
    }, {
      "en-US": "Hello?"
    });
  }

  setFillIn(value: string) {
    this.fillIn = value;
  }

  /**
   * TODO: Add cmi5 allowed cmi.interaction statements to demo https://xapi.com/blog/capturing-interactions-from-cmi5-launched-assessments/
   */

  render() {
    return (
      <div>
        <header>
          <h1>XAPI JS Cmi5 Demo</h1>
        </header>

        <main>
          <h2>Getters</h2>
          <button onClick={() => this.getLaunchParameters()}>Get Launch Parameters</button>
          <button onClick={() => this.getLaunchData()} disabled={!this.initialized}>Get Launch Data</button>
          <button onClick={() => this.getLearnerPreferences()} disabled={!this.initialized}>Get Learner Preferences</button>
          <h2>"cmi5 defined" Statements</h2>
          <button onClick={() => this.initialize()} disabled={this.initialized}>Initialize</button>
          <button onClick={() => this.complete()} disabled={!this.initialized}>Complete</button>
          <button onClick={() => this.pass()} disabled={!this.initialized}>Pass</button>
          <button onClick={() => this.fail()} disabled={!this.initialized}>Fail</button>
          <button onClick={() => this.terminate()} disabled={!this.initialized}>Terminate</button>
          <h2>"cmi5 allowed" Statements</h2>
          <h3>Progress</h3>
          <button onClick={() => this.progress(25)} disabled={!this.initialized}>Progress 25%</button>
          <button onClick={() => this.progress(50)} disabled={!this.initialized}>Progress 50%</button>
          <button onClick={() => this.progress(75)} disabled={!this.initialized}>Progress 75%</button>
          <h3>Interactions</h3>
          <h4>True / False</h4>
          <p>Q1. In a boolean context, is <code>true</code> truthy?</p>
          <button onClick={() => this.interactionTrueFalse(true)} disabled={!this.initialized}>True (Correct)</button>
          <button onClick={() => this.interactionTrueFalse(false)} disabled={!this.initialized}>False (Incorrect)</button>
          <h4>Choice</h4>
          <p>Q2. What are the first two choices?</p>
          <form onSubmit={(event) => this.interactionChoice(event)}>
            <label><input type="checkbox" value="choice1" onInput={(event) => this.setChoice("choice1", (event.target as HTMLInputElement).checked)} />Choice 1</label>
            <label><input type="checkbox" value="choice2" onInput={(event) => this.setChoice("choice2", (event.target as HTMLInputElement).checked)} />Choice 2</label>
            <label><input type="checkbox" value="choice3" onInput={(event) => this.setChoice("choice3", (event.target as HTMLInputElement).checked)} />Choice 3</label>
            <label><input type="checkbox" value="choice4" onInput={(event) => this.setChoice("choice4", (event.target as HTMLInputElement).checked)} />Choice 4</label>
            <input type="submit" value="Submit" disabled={!this.initialized} />
          </form>
          <h4>Fill In</h4>
          <p>Q3. Hello?</p>
          <form onSubmit={(event) => this.interactionFillIn(event)}>
            <label><input type="text" onInput={(event) => this.setFillIn((event.target as HTMLInputElement).value)} /></label>
            <input type="submit" value="Submit" disabled={!this.initialized} />
          </form>
        </main>
      </div>
    );
  }
}