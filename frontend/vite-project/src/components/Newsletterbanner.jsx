import { useState } from 'react'
export default function NewsletterBanner({ onSubscribe }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubscribe(email.trim())
    setEmail('')
  }

  return (
    <section className="relative z-10 mx-auto -mb-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-black p-6 shadow-md sm:p-10 lg:flex-row">
        <h2 className="max-w-xl text-center text-2xl font-black leading-tight text-white sm:text-4xl lg:text-left">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:max-w-md">
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-full bg-white px-5 py-3 text-sm text-black outline-none focus:ring-2 focus:ring-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  )
}