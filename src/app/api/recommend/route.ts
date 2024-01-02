import type { NextApiRequest, NextApiResponse } from 'next'
import { executePythonScript } from '../../_api/executePythonScript'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract the budget from the request body
    const { budget } = req.body

    try {
      // Execute the Python script and get recommendations
      const recommendations = await executePythonScript(budget)
      // Send the recommendations as a response
      res.status(200).json({ recommendations })
    } catch (error) {
      // Handle any errors that occur during script execution
      console.error('Error executing Python script:', error)
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  } else {
    // Respond with 405 Method Not Allowed if the request method is not POST
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
