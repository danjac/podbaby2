import { FETCH_CATEGORIES_REQUEST } from '../../actionTypes';

import { fetchCategories } from './categories';

describe('fetchCategories', () => {

  it('should request categories', () => {

    const action = fetchCategories();
    expect(action.type).toEqual(FETCH_CATEGORIES_REQUEST);
  });

});
