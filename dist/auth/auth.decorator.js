"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.User = (0, common_1.createParamDecorator)((_, ctx) => {
    var _a, _b;
    const httpRequest = ctx.switchToHttp().getRequest();
    const request = httpRequest
        ? httpRequest
        : (_b = (_a = graphql_1.GqlExecutionContext.create(ctx)) === null || _a === void 0 ? void 0 : _a.getContext()) === null || _b === void 0 ? void 0 : _b.req;
    return request === null || request === void 0 ? void 0 : request.user;
});
//# sourceMappingURL=auth.decorator.js.map