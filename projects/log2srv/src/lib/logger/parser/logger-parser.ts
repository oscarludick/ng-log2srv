import { AbstractLoggerModel, CommonModel } from '../logger.model';

export type LoggerParserModel = new (...args: any[]) => new (
  ...args: any[]
) => LoggerParser<AbstractLoggerModel>;

export abstract class LoggerParser<T extends AbstractLoggerModel> {
  abstract parseEvent(model: CommonModel): T;
}
