import { TestBed } from '@angular/core/testing';

import { IngredientRestService } from './ingredient-rest.service';

describe('IngredientRestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IngredientRestService = TestBed.get(IngredientRestService);
    expect(service).toBeTruthy();
  });
});
