import { createRouteParamDecorator } from "@nestjs/common";

export const Users = createRouteParamDecorator((data, req) => {
    return req.user;
});
