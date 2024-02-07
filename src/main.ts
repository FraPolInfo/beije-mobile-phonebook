import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { CustomRootModule } from './app/custom-root.module';


platformBrowserDynamic().bootstrapModule(CustomRootModule)
  .catch(err => console.error(err));