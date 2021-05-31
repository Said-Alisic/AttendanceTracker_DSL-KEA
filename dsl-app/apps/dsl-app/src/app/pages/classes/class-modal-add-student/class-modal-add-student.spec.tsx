import { render } from '@testing-library/react';

import ClassModalAddStudent from './class-modal-add-student';

describe('ClassModalAddStudent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassModalAddStudent />);
    expect(baseElement).toBeTruthy();
  });
});
