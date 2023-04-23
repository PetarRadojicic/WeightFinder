import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import API from '../API';

test('should fetch the weight of a cat in metric units and return 4.535923700000001 kg', async () => {
  const onSearchMock = jest.fn();
  const searchPassMock = jest.fn().mockReturnValue('cat');
  const props = { onSearch: onSearchMock, SearchPass: searchPassMock };

  const { getByText } = render(<API {...props} />);

  const searchButton = getByText('Search');
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(props.onSearch).toHaveBeenCalledTimes(1);
    expect(props.onSearch).toHaveBeenCalledWith('4.535923700000001 kg', expect.any(String));
  });
});
