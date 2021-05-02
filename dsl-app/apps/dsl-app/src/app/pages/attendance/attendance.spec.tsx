import { render } from '@testing-library/react';

import Attendances from './attendances';

describe('Attendancse', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Attendances />);
    expect(baseElement).toBeTruthy();
  });
});
