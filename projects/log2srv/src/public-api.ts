/*
 * Public API Surface of log2srv
 */
export { Log2SrvModule } from './lib/log2srv.module';
export { Log2SrvConfig } from './lib/log2srv.config';
export { EventWrapperComponent, EventWrapperDirective } from './lib/wrapper';
export {
  AbstractLoggerModel,
  EventModel,
  LoggerTypes,
  LoggerTypesNames,
} from './lib/logger';
export { HttpLogger } from './lib/logger/http';
export { ParserModel } from './lib/logger/parser';
export { Log2Srv } from './lib/descriptor';
