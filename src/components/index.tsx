import clsx from 'clsx'
import React from 'react'

export function Paper ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return <div className={clsx('shadow p-3 rounded bg-white', className)} {...props} />
}

export function Button ({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      className={clsx(
        'py-2 px-6 bg-red-700 text-white rounded hover:bg-red-800 disabled:bg-red-300',
        className
      )}
      {...props}
    />
  )
}
