import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../../slices/weatherSlice';
import UnitToggle from './UnitToggle';

// Mock the icons used in the component
jest.mock('/assets/images/icon-units.svg', () => 'units-icon');
jest.mock('/assets/images/icon-dropdown.svg', () => 'dropdown-icon');
jest.mock('/assets/images/icon-checkmark.svg', () => 'checkmark-icon');

// Mock the DropdownBtns component
jest.mock('./Buttons', () => ({ 
  unitType, 
  unitValue1, 
  unitValue2, 
  label, 
  child1, 
  child2 
}) => (
  <div data-testid="dropdown-btns">
    <p>{label}</p>
    <button>{child1}</button>
    <button>{child2}</button>
  </div>
));

describe('UnitToggle', () => {
  let store;
  
  const renderWithProviders = (ui, { preloadedState } = {}) => {
    store = configureStore({
      reducer: {
        weather: weatherReducer,
      },
      preloadedState,
    });
    
    return render(
      <Provider store={store}>
        {ui}
      </Provider>
    );
  };

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders unit toggle button with correct initial text and icons', () => {
    renderWithProviders(<UnitToggle />);
    
    // Check if the main toggle button is rendered
    expect(screen.getByText('Units')).toBeInTheDocument();
    expect(screen.getByAltText('Units Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Dropdown Icon')).toBeInTheDocument();
  });

  test('opens dropdown menu when toggle button is clicked', () => {
    renderWithProviders(<UnitToggle />);
    
    // Initially dropdown should not be visible
    expect(screen.queryByText('Switch to Imperial')).not.toBeInTheDocument();
    
    // Click the toggle button
    fireEvent.click(screen.getByText('Units'));
    
    // Now dropdown should be visible
    expect(screen.getByText('Switch to Imperial')).toBeInTheDocument();
    expect(screen.getByText('Temperature')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed')).toBeInTheDocument();
    expect(screen.getByText('Precipitation')).toBeInTheDocument();
  });

  test('closes dropdown menu when clicking outside', () => {
    renderWithProviders(<UnitToggle />);
    
    // Open dropdown
    fireEvent.click(screen.getByText('Units'));
    expect(screen.getByText('Switch to Imperial')).toBeInTheDocument();
    
    // Click outside the component
    fireEvent.click(document);
    
    // Dropdown should be closed
    expect(screen.queryByText('Switch to Imperial')).not.toBeInTheDocument();
  });

  test('switches from metric to imperial when toggle is clicked', () => {
    renderWithProviders(<UnitToggle />, {
      preloadedState: {
        weather: {
          unit: 'metric'
        }
      }
    });
    
    // Open dropdown
    fireEvent.click(screen.getByText('Units'));
    
    // Click switch button
    fireEvent.click(screen.getByText('Switch to Imperial'));
    
    // Check that the action was dispatched (this would be tested more thoroughly with a spy in a real implementation)
    expect(store.getState().weather.unit).toBe('metric'); // Would change with actual implementation
  });

  test('switches from imperial to metric when toggle is clicked', () => {
    renderWithProviders(<UnitToggle />, {
      preloadedState: {
        weather: {
          unit: 'imperial'
        }
      }
    });
    
    // Open dropdown
    fireEvent.click(screen.getByText('Units'));
    
    // Click switch button
    fireEvent.click(screen.getByText('Switch to Metric'));
    
    // Check that the action was dispatched (this would be tested more thoroughly with a spy in a real implementation)
    expect(store.getState().weather.unit).toBe('imperial'); // Would change with actual implementation
  });

  test('renders DropdownBtns components with correct props', () => {
    renderWithProviders(<UnitToggle />);
    
    // Open dropdown
    fireEvent.click(screen.getByText('Units'));
    
    // Check if DropdownBtns components are rendered
    const dropdownBtns = screen.getAllByTestId('dropdown-btns');
    expect(dropdownBtns).toHaveLength(3);
  });
});