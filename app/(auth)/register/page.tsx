import { Metadata } from 'next'
import RegisterPage from './_components/RegisterForm'
export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Register page for authentication.',
}

export default function Page() {
  return <RegisterPage />
}
