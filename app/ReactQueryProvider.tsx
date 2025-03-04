'use client'

import { useState } from "react"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export default function ReactQueryProvider ({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 60, // 1 hour
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    // Provide the client to your App
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}