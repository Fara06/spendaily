import { Metadata } from 'next'
import LoginForm from './_component/LoginForm'

export const metadata: Metadata = {
  title: 'Authentication |  Login',
  description: 'Login page for authentication.',
}

export default function Page() {
  return <LoginForm />
}
