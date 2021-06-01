import { render } from '@testing-library/react';

import AttendancesTable from './attendances-table';

describe('AttendancesTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AttendancesTable />);
    expect(baseElement).toBeTruthy();
  });
});
