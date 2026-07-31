"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { set } from "better-auth";

export default function SignupPage() {
  const router = useRouter();

  const [Form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading ,setLoading]=useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...Form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
  if (Form.password !== Form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
    setLoading(true)
    const { data, error } =
      await authClient.signUp.email({
        name: Form.name,
        email: Form.email,
        password: Form.password,
      });

    if (error) {
      setError(error.message||"signup filled");
      return;
    }

    router.push("/dashboard");
 
   } catch (error) {
     console.log(error)
      
    }finally{
      setLoading(false)
    }
  }



  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <Card className="w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center">
          Nexora <span className="text-blue-600">ERP</span>
        </h1>


        {error && (
          <p className="text-red-500 text-sm mt-4">
            {error}
          </p>
        )}


        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-6"
        >

          <div>
            <Label>Name</Label>
            <Input
              name="name"
              value={Form.name}
              onChange={handleChange}
            />
          </div>


          <div>
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              value={Form.email}
              onChange={handleChange}
            />
          </div>


          <div>
            <Label>Password</Label>
            <Input
              name="password"
              type="password"
              value={Form.password}
              onChange={handleChange}
            />
          </div>


          <div>
            <Label>Confirm Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              value={Form.confirmPassword}
              onChange={handleChange}
            />
          </div>


          <Button className="w-full" type="submit">
            {loading?" Createimng Account....":" Create Account"}
          </Button>

        </form>


        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>

      </Card>

    </main>
  );
}