import { useState } from 'react'
import './App.css'

function App() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const calculate = async (op) => {
    setError(null)
    setResult(null)
    try {
      const response = await fetch('http://localhost:5000/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          op,
          a: num1,
          b: num2,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setResult(data.result)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container">
      <h1>Calculator</h1>
      <div className="card">
        <div className="input-group">
          <input
            type="number"
            placeholder="Enter first number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            data-testid="num1"
          />
          <input
            type="number"
            placeholder="Enter second number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            data-testid="num2"
          />
        </div>
        <div className="button-group">
          <button onClick={() => calculate('add')} data-testid="add-btn">Add</button>
          <button onClick={() => calculate('subtract')} data-testid="subtract-btn">Subtract</button>
          <button onClick={() => calculate('multiply')} data-testid="multiply-btn">Multiply</button>
          <button onClick={() => calculate('divide')} data-testid="divide-btn">Divide</button>
        </div>
        {result !== null && <div className="result" data-testid="result">Result: {result}</div>}
        {error && <div className="error" data-testid="error">Error: {error}</div>}
      </div>
    </div>
  )
}

export default App
