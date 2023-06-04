"use client"
import React from 'react'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

// initializing our client
const client = new QueryClient()
const Provider = ({children}) => {
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}

export default Provider