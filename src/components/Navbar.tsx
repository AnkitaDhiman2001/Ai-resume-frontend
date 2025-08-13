'use client';
import Link from 'next/link'
import { Button } from './ui/Button'
import { RiSparkling2Line } from 'react-icons/ri'
import useAuth from '@/contexts/AuthContext';

export default function Navbar() {
   const { user, logout } = useAuth();

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <RiSparkling2Line className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold gradient-text">AI Resume Builder</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
                <Button onClick={logout} variant="outline">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
