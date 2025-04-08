// app/login/page.tsx
'use client';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/useForm';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const { values, errors, touched, handleChange, handleSubmit } = useForm(
    { email: '', password: '' },
    (values) => {
      const errs: Record<string, string> = {};
      if (!values.email) errs.email = 'Email is required';
      if (values.password !== 'automatedpros') {
        errs.password = 'Incorrect password';
      }
      return errs;
    }
  );

  const onSubmit = () => {
    login({ id: 1, name: 'Admin User', email: values.email });
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F0F2F5] to-white">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-[#405DE6] mb-8">
          Welcome Back
        </h1>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#405DE6]"
              required
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#405DE6]"
              required
            />
            {touched.password && errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-[#405DE6] via-[#833AB4] to-[#FD1D1D] hover:bg-gradient-to-l text-white text-lg font-medium rounded-md transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#405DE6] hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
