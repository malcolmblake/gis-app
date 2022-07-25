import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import {BasicMap} from './BasicMap.js';

// declare which API requests to mock
const server = setupServer(
  // capture "GET /" requests
  rest.get('/', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({
      body: {
        boundingBox: [],
        mapOutline: [],
        randomPoints: []
    }
  }))
  }),
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

// ...

describe('BasicMap.js ', () => {

  test('handles server error', async () => {
    server.use(
      rest.get('/', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )

  });


  test('loads and displays Map', async () => {

    jest.mock('react-mapbox-gl', () => ({
      __esModule: true,
      default: () => function () {
        return <span>Mock map</span>;
      },
      Cluster: () => <span>Mock cluster</span>,
    }));

    render(<BasicMap />);
    fireEvent.click(screen.getByText('Reload Map Data'))
    await waitFor(() => screen.getByRole('map'))
    // Assert
    // assert that the alert message is correct using
    // toHaveTextContent, a custom matcher from jest-dom.
    expect(screen.getByRole('alert')).toHaveTextContent('method not implemented')

    // assert that the button is not disabled using
    // toBeDisabled, a custom matcher from jest-dom.
    expect(screen.getByRole('button')).not.toBeDisabled()
  })
})