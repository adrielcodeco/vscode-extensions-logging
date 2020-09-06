"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionsLogging = void 0;
var vscode_1 = require("vscode");
var os_1 = require("os");
var lodash_1 = require("lodash");
var util_1 = require("util");
var winston_1 = require("winston");
var winston_transport_1 = __importDefault(require("winston-transport"));
var ExtensionsLogging = (function () {
    function ExtensionsLogging(outputChannel, loglevel) {
        if (loglevel === void 0) { loglevel = 'info'; }
        var combine = winston_1.format.combine, metadata = winston_1.format.metadata, printf = winston_1.format.printf;
        this.logger = winston_1.createLogger({
            level: loglevel || 'info',
            format: combine(metadata(), printf(function (info) {
                var result = info.level + ": ";
                if (typeof info.message === 'string') {
                    result += info.message;
                }
                else {
                    result += util_1.inspect(info.message, false, 5);
                }
                if (info.metadata && !lodash_1.isEmpty(info.metadata)) {
                    result += os_1.EOL;
                    if (typeof info.metadata === 'string') {
                        result += info.metadata;
                    }
                    else {
                        result += util_1.inspect(info.metadata, false, 5);
                    }
                }
                return result;
            })),
            transports: [new VSCodeExtensionTransport(outputChannel)],
            exitOnError: false,
        });
    }
    ExtensionsLogging.register = function (extensionName) {
        var outputChannel = vscode_1.window.createOutputChannel(extensionName);
        return new ExtensionsLogging(outputChannel);
    };
    ExtensionsLogging.prototype.log = function (log, context) {
        this.logger.info(log, context);
    };
    ExtensionsLogging.prototype.error = function (log, context) {
        this.logger.error(log, context);
    };
    ExtensionsLogging.prototype.warn = function (log, context) {
        this.logger.warn(log, context);
    };
    ExtensionsLogging.prototype.info = function (log, context) {
        this.logger.info(log, context);
    };
    ExtensionsLogging.prototype.debug = function (log, context) {
        this.logger.debug(log, context);
    };
    ExtensionsLogging.prototype.notice = function (log, context) {
        this.logger.notice(log, context);
    };
    ExtensionsLogging.prototype.crit = function (log, context) {
        this.logger.crit(log, context);
    };
    ExtensionsLogging.prototype.alert = function (log, context) {
        this.logger.alert(log, context);
    };
    ExtensionsLogging.prototype.emerg = function (log, context) {
        this.logger.emerg(log, context);
    };
    return ExtensionsLogging;
}());
exports.ExtensionsLogging = ExtensionsLogging;
var VSCodeExtensionTransport = (function (_super) {
    __extends(VSCodeExtensionTransport, _super);
    function VSCodeExtensionTransport(outputChannel) {
        var _this = _super.call(this) || this;
        _this.outputChannel = outputChannel;
        return _this;
    }
    VSCodeExtensionTransport.prototype.log = function (info, next) {
        var _this = this;
        setImmediate(function () {
            _this.emit('logged', info);
        });
        this.outputChannel.append(info.message);
        if (next) {
            next();
        }
    };
    return VSCodeExtensionTransport;
}(winston_transport_1.default));
//# sourceMappingURL=index.js.map