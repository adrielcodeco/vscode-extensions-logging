import { OutputChannel, window } from 'vscode'
import { EOL } from 'os'
import { isEmpty } from 'lodash'
import { inspect } from 'util'
import { createLogger, Logger, format } from 'winston'
import Transport from 'winston-transport'

export class ExtensionsLogging {
  private readonly logger!: Logger

  constructor (outputChannel: OutputChannel, loglevel = 'info') {
    const { combine, metadata, printf } = format
    this.logger = createLogger({
      level: loglevel || 'info',
      format: combine(
        metadata(),
        printf(info => {
          let result = `${info.level}: `
          // tslint:disable-next-line: strict-type-predicates
          if (typeof info.message === 'string') {
            result += info.message
          } else {
            result += inspect(info.message, false, 5)
          }
          if (info.metadata && !isEmpty(info.metadata)) {
            result += EOL
            if (typeof info.metadata === 'string') {
              result += info.metadata
            } else {
              result += inspect(info.metadata, false, 5)
            }
          }
          return result
        }),
      ),
      transports: [new VSCodeExtensionTransport(outputChannel)],
      exitOnError: false,
    })
  }

  static register (extensionName: string) {
    const outputChannel = window.createOutputChannel(extensionName)
    return new ExtensionsLogging(outputChannel)
  }

  public log (log: any, context?: any): void {
    this.logger.info(log, context)
  }

  public error (log: any, context?: any): void {
    this.logger.error(log, context)
  }

  public warn (log: any, context?: any): void {
    this.logger.warn(log, context)
  }

  public info (log: any, context?: any): void {
    this.logger.info(log, context)
  }

  public debug (log: any, context?: any): void {
    this.logger.debug(log, context)
  }

  public notice (log: any, context?: any): void {
    this.logger.notice(log, context)
  }

  public crit (log: any, context?: any): void {
    this.logger.crit(log, context)
  }

  public alert (log: any, context?: any): void {
    this.logger.alert(log, context)
  }

  public emerg (log: any, context?: any): void {
    this.logger.emerg(log, context)
  }
}

class VSCodeExtensionTransport extends Transport {
  constructor (private readonly outputChannel: OutputChannel) {
    super()
  }

  log (info: any, next: () => void) {
    setImmediate(() => {
      this.emit('logged', info)
    })
    this.outputChannel.append(info.message)
    if (next) {
      next()
    }
  }
}
