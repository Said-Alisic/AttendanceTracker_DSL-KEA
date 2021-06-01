import { render } from '@testing-library/react';

import ClassModalRemoveStudent from './class-modal-remove-student';

describe('ClassModalRemoveStudent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClassModalRemoveStudent />);
    expect(baseElement).toBeTruthy();
  });
});
