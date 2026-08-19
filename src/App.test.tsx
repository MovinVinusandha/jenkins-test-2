import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Component', () => {
  describe('Hero & Header Section', () => {
    it('renders the main heading "Hi"', () => {
      render(<App />)
      const heading = screen.getByRole('heading', { level: 1, name: /hi/i })
      expect(heading).toBeInTheDocument()
    })

    it('renders hero image, React logo, and Vite logo', () => {
      render(<App />)
      const reactLogo = screen.getByAltText('React logo')
      const viteLogo = screen.getByAltText('Vite logo')
      
      expect(reactLogo).toBeInTheDocument()
      expect(reactLogo).toHaveClass('framework')
      expect(viteLogo).toBeInTheDocument()
      expect(viteLogo).toHaveClass('vite')
    })

    it('renders the instruction paragraph', () => {
      render(<App />)
      const instruction = screen.getByText((_, element) => {
        return element?.textContent === 'Edit src/App.tsx and save to test HMR'
      })
      expect(instruction).toBeInTheDocument()
    })
  })

  describe('Counter Functionality', () => {
    it('renders the counter button with initial count of 0', () => {
      render(<App />)
      const button = screen.getByRole('button', { name: /count is 0/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('counter')
    })

    it('increments the count when clicked once', async () => {
      const user = userEvent.setup()
      render(<App />)

      const button = screen.getByRole('button', { name: /count is 0/i })
      await user.click(button)

      expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
    })

    it('increments the count correctly on multiple clicks', async () => {
      const user = userEvent.setup()
      render(<App />)

      const button = screen.getByRole('button', { name: /count is 0/i })
      await user.click(button)
      await user.click(button)
      await user.click(button)

      expect(screen.getByRole('button', { name: /count is 3/i })).toBeInTheDocument()
    })
  })

  describe('Documentation Section', () => {
    it('renders the Documentation heading and subtitle', () => {
      render(<App />)
      const docHeading = screen.getByRole('heading', { level: 2, name: /documentation/i })
      expect(docHeading).toBeInTheDocument()
      expect(screen.getByText('Your questions, answered')).toBeInTheDocument()
    })

    it('contains a link to Explore Vite', () => {
      render(<App />)
      const viteLink = screen.getByRole('link', { name: /explore vite/i })
      expect(viteLink).toBeInTheDocument()
      expect(viteLink).toHaveAttribute('href', 'https://vite.dev/')
      expect(viteLink).toHaveAttribute('target', '_blank')
    })

    it('contains a link to Learn more (React)', () => {
      render(<App />)
      const reactLink = screen.getByRole('link', { name: /learn more/i })
      expect(reactLink).toBeInTheDocument()
      expect(reactLink).toHaveAttribute('href', 'https://react.dev/')
      expect(reactLink).toHaveAttribute('target', '_blank')
    })
  })

  describe('Connect with Us Section', () => {
    it('renders the Connect with us heading and subtitle', () => {
      render(<App />)
      const socialHeading = screen.getByRole('heading', { level: 2, name: /connect with us/i })
      expect(socialHeading).toBeInTheDocument()
      expect(screen.getByText('Join the Vite community')).toBeInTheDocument()
    })

    it('contains valid social media and community links', () => {
      render(<App />)
      
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/vitejs/vite')
      expect(githubLink).toHaveAttribute('target', '_blank')

      const discordLink = screen.getByRole('link', { name: /discord/i })
      expect(discordLink).toHaveAttribute('href', 'https://chat.vite.dev/')
      expect(discordLink).toHaveAttribute('target', '_blank')

      const xLink = screen.getByRole('link', { name: /x\.com/i })
      expect(xLink).toHaveAttribute('href', 'https://x.com/vite_js')
      expect(xLink).toHaveAttribute('target', '_blank')

      const blueskyLink = screen.getByRole('link', { name: /bluesky/i })
      expect(blueskyLink).toHaveAttribute('href', 'https://bsky.app/profile/vite.dev')
      expect(blueskyLink).toHaveAttribute('target', '_blank')
    })
  })
})
