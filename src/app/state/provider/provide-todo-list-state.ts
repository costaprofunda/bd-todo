import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from '../+state/todo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from '../+state/todo.effects';

export const provideTodoListState = () =>
    importProvidersFrom([StoreModule.forFeature('todoList', todoReducer), EffectsModule.forFeature(TodoEffects)]);
