import { exec } from 'child_process'
import path from 'path'

export const executePythonScript = (budget: number): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(process.cwd(), 'machine_learning/products_recommendation.py')

    exec(`python3 ${scriptPath} ${budget}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        reject('Error executing Python script')
      } else if (stderr) {
        console.error(`stderr: ${stderr}`)
        reject('Python script returned an error')
      } else {
        try {
          const products = JSON.parse(stdout)
          resolve(products)
        } catch (parseError) {
          reject('Error parsing script output')
        }
      }
    })
  })
}
