import { Controller, Get, UseFilters, Param, ParseIntPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('exception')
@UseFilters(HttpExceptionFilter)
export class ExceptionController {

    @Get('hello/:id')
    getHello(@Param('id', ParseIntPipe) id: number){
        return {message: `Your Id is: ${id}`};
    }
}
