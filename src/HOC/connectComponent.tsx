import React from 'react'

export const connect = <T,>(Component: React.ComponentType<T>) => {
  return (props: T) => {
    return <Component {...props} />
  }
}
