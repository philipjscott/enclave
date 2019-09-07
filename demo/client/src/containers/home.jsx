import React from 'react'
import { Pretty } from '../components/pretty'
import { getProfile } from '../api/rest'

export function Home () {
  getProfile('sokojoe').then(console.log).catch(console.error)
  return (
    <div>
      <h1>Home</h1>
      <Pretty />
    </div>
  )
}
