'use client'
import React, { useState } from 'react'

const RecommendationsForm = () => {
  const [budget, setBudget] = useState('')
  const [recommendations, setRecommendations] = useState([])

  const fetchRecommendations = async () => {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ budget: Number(budget) }),
    })
    if (response.ok) {
      const data = await response.json()
      setRecommendations(data.recommendations)
    } else {
      // Handle errors
      console.error('Failed to fetch recommendations')
    }
  }

  return (
    <div>
      <input
        type="number"
        value={budget}
        onChange={e => setBudget(e.target.value)}
        placeholder="Enter your budget"
      />
      <button onClick={fetchRecommendations}>Get Recommendations</button>
      {recommendations.length > 0 && (
        <ul>
          {recommendations[0].map((product, index) => (
            <li key={index}>{product}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RecommendationsForm
