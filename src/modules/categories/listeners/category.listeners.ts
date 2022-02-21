import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { CATEGORY_UPDATED } from '@constants/events.constant';
import { Category } from '@modules/categories/entities/category.entity';

@Injectable()
export class CategoryListeners {
  constructor(private eventEmitter: EventEmitter2) {}

  @OnEvent(CATEGORY_UPDATED)
  handleCategoryUpdatedEvent(payload: Category) {
    console.log('Message Received: ', payload.categoryTitle);
  }
}
