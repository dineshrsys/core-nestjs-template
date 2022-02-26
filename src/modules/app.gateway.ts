import { UseFilters, UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import JwtWSAccessGuard from '@common/guards/jwt-ws-access.guard';
import WsExceptionsFilter from '@common/filters/ws-exceptions.filter';

@UseFilters(WsExceptionsFilter)
@WebSocketGateway(3001)
export default class AppGateway {
    @UseGuards(JwtWSAccessGuard)
    @SubscribeMessage('event')
    handleEvent() {
        return 'Hello, World!';
    }
}
