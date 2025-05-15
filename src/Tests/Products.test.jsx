import { render, screen, fireEvent } from '@testing-library/react';
import Confirmation from '../Pages/Confirmation';

describe('Confirmation' , ()=> {
    it('should display Confirmation', ()=> {
        render(<Confirmation />);
        const text = screen.getByText('Your order has been received.');
        expect(text).to.exist;
        expect(text.textContent).to.equal('Your order has been received.');
        expect(text.textContent).to.include('Your');

        const header = screen.getByRole('heading', { level: 1 }); // Grabs an H1 heading
        expect(header.textContent).to.equal(text.textContent); // Check if it's equal to the text
    });
    it('should display button clicked text', async ()=> {
        render(<Confirmation />);

        // Should not be on the screen initially
        expect(screen.queryByText('Button was clicked')).to.be.null;

        // Click the button element with the text 'Test'
        const button = screen.getByRole('button', { name: 'Test' });
        // Click the button
        fireEvent.click(button);

        // See if the text is on the page
        expect(screen.getByText('Button was clicked')).to.exist;
    });
    it('should run the test function with the username', () => {
        // Creating a mocked version of our function
        const mockedFn = vi.fn();
        
        render(<Confirmation onTest={mockedFn} />);

        const button = screen.getByRole('button', { name: 'Run' });
        fireEvent.click(button);

        expect(mockedFn).toHaveBeenCalled(); // Check if it's been called at all
        expect(mockedFn).toHaveBeenCalledWith('Joker'); // Check if it's been call with an argument
        expect(mockedFn).toHaveBeenCalledTimes(1);// Check how many times it's been called
    });
});