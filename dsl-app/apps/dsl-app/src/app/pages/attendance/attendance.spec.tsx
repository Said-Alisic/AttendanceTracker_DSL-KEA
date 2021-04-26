import { render } from '@testing-library/react';

import Attendance from './attendance';

describe('Attendance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Attendance />);
    expect(baseElement).toBeTruthy();
  });
});
