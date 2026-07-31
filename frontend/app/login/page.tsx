"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");


      const { data, error } =
        await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });


      if (error) {
        setError(error.message||"login filled");
        return;
      }
      router.push("/dashboard");


    } catch (error) {

      console.error(error);
      setError("Something went wrong");

    } finally {

      setLoading(false);

    }
  };


  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

      <Card className="w-full max-w-md p-8 bg-white shadow-lg border border-slate-200">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Nexora
            <span className="text-blue-600"> ERP</span>
          </h1>

          <p className="text-sm text-slate-500 mt-2">
            Manage your business in one place
          </p>

        </div>


        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >


          <div className="space-y-2">

            <Label className="text-slate-700">
              Email
            </Label>

            <Input
              type="email"
              placeholder="admin@nexora.com"
              className="h-11"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>



          <div className="space-y-2">

            <Label className="text-slate-700">
              Password
            </Label>

            <Input
              type="password"
              placeholder="••••••••"
              className="h-11"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>



          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}



          <div className="flex justify-between items-center text-sm">

            <label className="flex items-center gap-2 text-slate-600">

              <input type="checkbox" />

              Remember me

            </label>


            <button
              type="button"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </button>

          </div>



          <Button
            disabled={loading}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
            type="submit"
          >

            {loading ? "Signing In..." : "Sign In"}

          </Button>


        </form>



        <p className="text-center text-xs text-slate-400 mt-8">
          © 2026 Nexora ERP. All rights reserved.
        </p>


      </Card>

    </main>
  );
}