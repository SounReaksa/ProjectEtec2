import React, { useState } from "react";

const API_URL = "http://localhost:8081/api/auth";

// Custom hook for authentication
const useAuth = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async ({ email, password }) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Save user info in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("Login successful:", data.user);
            setLoading(false);

            return data;
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    return { login, error, loading };
};

// Placeholder for routing links
const LinkPlaceholder = ({ to, children, className }) => {
    const handleClick = () => {
        console.log(`Navigating to: ${to}`);
    };
    return (
        <a
            href="#"
            onClick={handleClick}
            className={`text-blue-600 hover:text-blue-700 underline font-medium transition duration-150 ${className}`}
        >
            {children}
        </a>
    );
};

const Login = () => {
    const { login, error, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login(formData);
            alert("Login successful!");
            console.log("Logged in user:", userData.user);
            // Optionally redirect to dashboard here
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-100 transition duration-300 hover:shadow-3xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        Welcome E Trade
                    </h1>
                    <p className="mt-2 text-gray-500 text-lg">
                        Sign in to continue to your account
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Error Display */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600 text-center shadow-sm">
                            {error}
                        </div>
                    )}

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                          Username or Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 placeholder-gray-400"
                            placeholder="you@example.com"
                            disabled={loading}
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label htmlFor="password" className="text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <LinkPlaceholder to={"/forgot-password"} className="text-xs">
                                Forgot Password?
                            </LinkPlaceholder>
                        </div>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-150 placeholder-gray-400"
                            placeholder="••••••••"
                            disabled={loading}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-white font-bold tracking-wide transition duration-300 ${
                            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
                        }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : "Sign In"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center mt-8 text-gray-500 text-sm">
                    Don't have an account?{" "}
                    <LinkPlaceholder to={"/register"}>Create an account</LinkPlaceholder>
                </p>
            </div>
        </div>
    );
};

export default Login;
