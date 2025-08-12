"use client";
import API from "@/utils/Api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({ type }: { type: "login" | "register" }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm_password: "" });

  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
     if (type === 'login') {
        if (form.email && form.password) {
            const url = "api/users/login"
            try {
              const response = await API.post(url, {
                email: form.email,
                password: form.password
              })
              if (response.data) {
                router.push('/dashboard');
                sessionStorage.setItem('user', JSON.stringify(response.data));
              }
            }
            catch (error) {
              console.log(error, "error")
            }
        }
        else{
           alert('Please fill all fields');
        }
      } else if (type === 'register') {
        if (form.name && form.email && form.password && form.confirm_password) {
          if (form.password !== form.confirm_password) {
            alert("Passwords do not match");
            return;
          }
           const url = "api/users/create-users"
            try {
              const response = await API.post(url, {
                name: form.name,
                email: form.email,
                password: form.password
              })
              if (response.data) {
                router.push('/dashboard');
                sessionStorage.setItem('user', JSON.stringify(response.data));
              }

            }
            catch (error) {
              console.log(error, "error")
            }
        } else {
          alert('Please fill all fields');
        }
      }
  };
  return (
   <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">{type === 'login' ? 'Login' : 'Register'}</h2>
      <form className="space-y-4">
         {type === 'register' && (
         <input
          type="text"
          placeholder="Name"
          name="name"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.name}
          onChange={handleChange}
        />
         )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={handleChange}
        />
         {type === 'register' && (
         <input
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.confirm_password}
          onChange={handleChange}
        />
         )}
        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          {type === 'login' ? 'Login' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          {type === 'login' ? "Don't have an account?" : 'Already have an account?'}{" "}
          <Link href={type === 'login' ? '/auth/register' : '/auth/login'} className="text-blue-600 hover:underline">
            {type === 'login' ? 'Register' : 'Login'}
          </Link>
        </p>

      </form>
    </div>
  );
}
