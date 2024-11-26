import { RegistrationForm } from "@/components/auth/RegistrationForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-primary-start/10 to-secondary-start/10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <p className="mt-2 text-gray-600">Join us today and start trading</p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegisterPage;