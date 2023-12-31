// pages/setup-cafe.js
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import classes from './index.module.scss'

const SetupCafePage = () => {
  const router = useRouter()
  const [budget, setBudget] = useState('')
  const [coffeeTypes, setCoffeeTypes] = useState([])

  const handleBudgetChange = e => {
    setBudget(e.target.value)
  }

  const handleCoffeeTypeChange = e => {
    const value = e.target.value
    setCoffeeTypes(
      e.target.checked ? [...coffeeTypes, value] : coffeeTypes.filter(type => type !== value),
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log({ budget, coffeeTypes })
    // Add your routing logic here, e.g., router.push('/dashboard');
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Set Up Your Cafe</h1>
      {/* Your form and inputs go here, similar to your existing SetupCafe component */}
    </div>
  )
}

export default SetupCafePage
