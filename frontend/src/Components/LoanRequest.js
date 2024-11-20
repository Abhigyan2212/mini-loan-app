import axios from 'axios'
function LoanRequest() {
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { amount, term } = e.target.elements
    const token = localStorage.getItem('token')
    await axios.post('http://localhost:5000/loan', { amount: amount.value, term: term.value }, { headers: { Authorization: `Bearer ${token}` } })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input name="amount" type="number" placeholder="Loan Amount" required />
      <input name="term" type="number" placeholder="Loan Term" required />
      <button type="submit">Request Loan</button>
    </form>
  )
}
export default LoanRequest
