import React from 'react'

type Props = {}

const ErrorPage = (props: Props) => {
  return (
    <div className='text-red-700 font-bold text-2xl h-screen items-center justify-center flex'>
        <h1>Page not found! 404</h1>
    </div>
  )
}

export default ErrorPage