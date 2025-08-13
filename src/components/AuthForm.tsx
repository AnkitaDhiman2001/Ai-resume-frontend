'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

import  useAuth from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { RiSparkling2Line } from 'react-icons/ri';
import { CiLock, CiMail } from 'react-icons/ci';
import { BiUser } from 'react-icons/bi';
import { toasterError } from './core/Toaster';

export function AuthForm({ type }: { type: "login" | "register" }) {
const [form, setForm] = useState({ name: "", email: "", password: "", confirm_password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (type === 'login') {
      await login(form.email, form.password);
      } 
      else if (type === 'register') {
          if (form.password !== form.confirm_password) {
            alert("Passwords do not match");
            return;
          }
        await signup(form.name, form.email, form.password);
      }
    } catch (error) {
      toasterError('Invalid credentials. Please try again.');
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <RiSparkling2Line className="h-10 w-10 text-purple-600" />
            <span className="text-3xl font-bold gradient-text">AI Resume Builder</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              {type == 'login' ? 'Sign in to your account to continue building amazing resumes' : 'Join thousands of professionals building amazing resumes with AI'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
               {type === 'register' && (
               <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <BiUser className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    name='name'
                    value={form.name}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
               )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <CiMail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    name='email'
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <CiLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    name='password'
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {type === 'register' && (
               <div className="space-y-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <div className="relative">
                  <CiLock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirm_password"
                    type="password"
                    name='confirm_password'
                    placeholder="Confirm your password"
                    value={form.confirm_password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {type === 'login' ? 'Sign In' : isLoading ? 'Signing in...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                {type === 'login' ? "Don't have an account?" : 'Already have an account?'}{" "}
                <Link href={type === 'login' ? '/auth/register' : '/auth/login'} className="text-purple-600 hover:underline">
                    {type === 'login' ? 'Register' : 'Login'}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};



