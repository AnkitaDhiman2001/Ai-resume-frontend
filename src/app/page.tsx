import React from 'react';

import { RiSparkling2Line, RiFileTextLine} from 'react-icons/ri';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { GoZap } from 'react-icons/go';
import { LuUsers } from 'react-icons/lu';

import { Button } from '@/components/ui/Button';
import { FaArrowRightLong } from 'react-icons/fa6';
import { Card, CardContent } from '@/components/ui/Card';

console.log('HomePage component loaded');

const HomePage: React.FC = () => {
  const features = [
    {
      icon: <RiSparkling2Line className="h-8 w-8 text-purple-600" />,
      title: 'AI-Powered Content',
      description: 'Our AI analyzes your experience and suggests compelling content that highlights your strengths.',
    },
    {
      icon: <RiFileTextLine className="h-8 w-8 text-blue-600" />,
      title: 'Professional Templates',
      description: 'Choose from beautiful, ATS-friendly templates designed by career experts.',
    },
    {
      icon: <GoZap className="h-8 w-8 text-green-600" />,
      title: 'Instant Generation',
      description: 'Create a polished resume in minutes, not hours. Export as PDF when ready.',
    },
    {
      icon: <LuUsers className="h-8 w-8 text-orange-600" />,
      title: 'Trusted by Thousands',
      description: 'Join professionals who have landed their dream jobs using our platform.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}
      
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-20 px-4">
        <div className="container mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Build Your Perfect Resume with{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Power</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. Our AI technology helps you craft compelling content that gets you noticed by employers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/register" className='flex items-center justify-center'>
                Get Started Free <FaArrowRightLong  className="ml-2 h-8 w-8" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/auth/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our AI Resume Builder?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by advanced AI technology, our platform makes resume creation effortless and effective.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center p-6">
                 <CardContent className="pt-6">
                <div key={index}>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
                </CardContent>
               </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Land Your Dream Job?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have successfully created impressive resumes with our AI-powered platform.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
            <Link href="/auth/register" className='flex items-center justify-center'>
              Start Building Your Resume
              <FaArrowRightLong  className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center mb-6">
            <RiSparkling2Line className="h-8 w-8 text-purple-400 mr-2" />
            <span className="text-2xl font-bold">AI Resume Builder</span>
          </div>
          <p className="text-gray-400 mb-4">
            Create professional resumes with the power of artificial intelligence.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 AI Resume Builder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;