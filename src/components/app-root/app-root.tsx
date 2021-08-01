import { Component, h } from '@stencil/core';
// import { AppHome } from '../app-home/app-home';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <div>
        <main>
          <app-home></app-home>
        </main>
      </div>
    );
  }
}
