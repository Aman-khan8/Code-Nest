import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Check, X } from "lucide-react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });




  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    backend: "",
  });

const [showPassword,setShowPassword]=useState({
  showPassword:false,
  showConfirmPassword:false
})

const [passwordRules, setPasswordRules] = useState({
  length: false,
  alphabets: false,
  numbers: false,
  specialCharacters: false
});

const handleChange = (e) => {
  const { name, value } = e.target;
  
  setFormData((prev) => ({ ...prev, [name]: value }));
  setErrors((prev) => ({ ...prev, backend: "", [name]: "" }));

  if(name === "password"){
    const alphaCount = (value.match(/[a-zA-Z]/g) || []).length;
    const numCount = (value.match(/[0-9]/g) || []).length;
    const specialCharacter = (value.match(/[!@#$.%^&*]/g) || []).length;

    setPasswordRules({
      length: value.length >= 8,
      alphabets: alphaCount >= 5,
      numbers: numCount >= 2,
      specialCharacters: specialCharacter >= 1,
    });
  }
};

  const validateForm = () => {
    let tempErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      backend: "",
    };
    let isValid = true;

    if (!formData.email.toLowerCase().endsWith("@gmail.com")) {
      tempErrors.email = "Please enter a valid @gmail.com address";
      isValid = false;
    }


    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match!";
      isValid = false;
    }
    if(!passwordRules.length || !passwordRules.alphabets || !passwordRules.numbers || !passwordRules.specialCharacters){
  tempErrors.password = "Password does not meet all requirements";
  isValid = false;
}
      

    setErrors(tempErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          fullname: formData.fullname,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      );

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Account created successfully!");
        console.log("Signup Response:", response.data);
        navigate("/dashboard");
        
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setErrors((prev) => ({ ...prev, backend: message }));
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Create Your Arena
          </h2>
          <p className="text-slate-400 mt-2">
            Join the community and start coding.
          </p>
        </div>

        {/* BACKEND ERROR DISPLAY */}
        {errors.backend && (
          <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/50 text-red-400 text-sm text-center">
            {errors.backend}
          </div>
        )}

        <form
          onSubmit={handleSignUp}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Full Name */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              onChange={handleChange}
              value={formData.fullname}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Basit Ali"
              required
            />
          </div>

          {/* Username */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={formData.username}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="basit123"
              required
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.email ? "border-red-500" : "border-slate-600"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="basit@gmail.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>

            <div className="relative"> 
            <input
              type={showPassword.showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={formData.password}
              className={`w-full px-4 py-3  bg-slate-900/50 border ${errors.password ? "border-red-500" : "border-slate-600"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="••••••••"
              required

              
              />
 <button
          type="button"
          onClick={() => setShowPassword({
            showPassword:!showPassword.showPassword,
            showConfirmPassword:showPassword.showConfirmPassword
          })}
          className="absolute right-2 top-4"
        >
          {showPassword.showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>

            </div>
           

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
  
          {/* Confirm Password */}
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirm Password
            </label>
            <div className="relative"> 
            <input
              type={showPassword.showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={handleChange}
              value={formData.confirmPassword}
              className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.confirmPassword ? "border-red-500" : "border-slate-600"} rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="••••••••"
              required
            />
             <button
          type="button"
          onClick={() => setShowPassword({
            showPassword:showPassword.showPassword,
            showConfirmPassword:!showPassword.showConfirmPassword
          })}
          className="absolute right-2 top-4"
        >
          {showPassword.showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>

      </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
<div className="text-sm"> 
<ul>
  <li className="flex items-center gap-2">
    {passwordRules.length ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <X className="w-4 h-4 text-red-400" />
    )}
    <span className={passwordRules.length ? "text-green-400" : "text-red-400"}>At least 8 characters</span> 
  </li>

  <li className="flex items-center gap-2">
    {passwordRules.alphabets ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <X className="w-4 h-4 text-red-400" />
    )}
    <span className={passwordRules.alphabets ? "text-green-400" : "text-red-400"}>
    At least 5 alphabets
    </span>
  </li>

  <li className="flex items-center gap-2">
    {passwordRules.numbers ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <X className="w-4 h-4 text-red-400" />
    )}

    <span className={passwordRules.numbers ? "text-green-400" : "text-red-400"}>
      At least 2 numbers
    </span>
  </li>

  <li className="flex items-center gap-2">
    {passwordRules.specialCharacters ? (
      <Check className="w-4 h-4 text-green-400" />
    ) : (
      <X className="w-4 h-4 text-red-400" />
    )}
     <span className={passwordRules.specialCharacters ? "text-green-400" : "text-red-400"}> 
    At least 1 special character
    </span>
  </li>
</ul>

</div>

          <button
            type="submit"
            className="md:col-span-2 mt-4 py-3 bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer rounded-lg font-bold shadow-lg shadow-blue-500/20"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col items-center gap-4">
          <p className="text-sm text-slate-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-slate-500 hover:text-white transition-colors flex items-center gap-2 text-sm cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
};

export default Signup;
