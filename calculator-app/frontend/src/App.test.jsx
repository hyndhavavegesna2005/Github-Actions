import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

describe('App', () => {
    beforeEach(() => {
        vi.resetAllMocks()
        global.fetch = vi.fn()
    })

    it('renders calculator inputs and buttons', () => {
        render(<App />)
        expect(screen.getByPlaceholderText('Enter first number')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter second number')).toBeInTheDocument()
        expect(screen.getByText('Add')).toBeInTheDocument()
    })

    it('performs addition successfully', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ result: 15 }),
        })

        render(<App />)
        fireEvent.change(screen.getByTestId('num1'), { target: { value: '10' } })
        fireEvent.change(screen.getByTestId('num2'), { target: { value: '5' } })
        fireEvent.click(screen.getByTestId('add-btn'))

        await waitFor(() => {
            expect(screen.getByText('Result: 15')).toBeInTheDocument()
        })
    })

    it('handles errors', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: 'Division by zero' }),
        })

        render(<App />)
        fireEvent.change(screen.getByTestId('num1'), { target: { value: '10' } })
        fireEvent.change(screen.getByTestId('num2'), { target: { value: '0' } })
        fireEvent.click(screen.getByTestId('divide-btn'))

        await waitFor(() => {
            expect(screen.getByText('Error: Division by zero')).toBeInTheDocument()
        })
    })
})
