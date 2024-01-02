import React from 'react'
import Link from 'next/link'
import classes from './index.module.scss' // Adjust the path as needed

const RecommendationLink: React.FC = () => {
  return <Link href="/recommendation">Recommendations</Link>
}

export default RecommendationLink
