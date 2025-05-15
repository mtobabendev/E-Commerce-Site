import { render, screen, fireEvent } from '@testing-library/react';
import { useUser, UserProvider } from '../Context/UserContextLuce';

function TestComponent() {
    const { currentUser, setUser, clearUser } = useUser();

    return (
        <div>
            <h1 data-testid='username'>{currentUser}</h1>
            <button data-testid='setUserButton' onClick={() => setUser('Test')}>Set User</button>
            <button data-testid='clearUserButton' onClick={clearUser}>Clear User</button>
        </div>
    )
}

describe('userContext', () => {
    it('should set the user', () => {
        render(
            <UserProvider>
                <TestComponent />
            </UserProvider>
        );

        const setUserButton = screen.getByTestId('setUserButton');
        fireEvent.click(setUserButton);

        const header = screen.getByTestId('username');
        expect(header.textContent).toBe('Test');
    });
});