import { Provider } from "@angular/core";

import { ConsoleLogger } from "./console-logger.service";

export function provideConsoleLogger(): Provider[] {
  return [
    ConsoleLogger
  ]
}
