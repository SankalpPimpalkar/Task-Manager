import React, { useState } from 'react'
import { UserRound, Mail, Lock, ArrowRight, Briefcase, MapPin, Info, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { CREATE_ACCOUNT } from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/slices/auth.slice'

export default function Register() {
    const [step, setStep] = useState(1)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isRegistering, setIsRegistering] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        occupation: '',
        location: '',
        about: ''
    })

    const handleNext = async (e) => {
        e.preventDefault()
        if (step < 3) {
            setStep(prev => prev + 1)
        } else {
            try {
                setIsRegistering(true)
                console.log('Form submitted:', formData)
                const resp = await CREATE_ACCOUNT(formData)

                if (resp) {
                    dispatch(loginUser(resp))
                    navigate('/')
                    return
                }
            } catch (error) {
                console.log(error)
                throw error
            } finally {
                setIsRegistering(false)
            }
        }
    }

    const handleBack = (e) => {
        e.preventDefault()
        if (step > 1) setStep(prev => prev - 1)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <form aria-busy={isRegistering} onSubmit={handleNext} className="w-full max-w-lg border border-[#1d1f29] bg-[#11131e] rounded-xl shadow-lg overflow-hidden">
            {/* Progress Bar */}
            <div className="h-1 bg-[#1d1f29]">
                <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${(step / 3) * 100}%` }}
                ></div>
            </div>

            <div className="p-8">
                <div className="text-start mb-8">
                    <h1 className="text-2xl font-bold text-white mb-1">Create Account</h1>
                    <p className="text-[#8a8d9b]">Step {step} of 3</p>
                </div>

                {step === 1 && (
                    <div className="space-y-5">
                        <InputField
                            icon={<UserRound className="w-5 h-5 text-[#8a8d9b]" />}
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            label="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <InputField
                            icon={<Mail className="w-5 h-5 text-[#8a8d9b]" />}
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <InputField
                            icon={<UserRound className="w-5 h-5 text-[#8a8d9b]" />}
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            label="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <InputField
                            icon={<Lock className="w-5 h-5 text-[#8a8d9b]" />}
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            label="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-5">
                        <InputField
                            icon={<Briefcase className="w-5 h-5 text-[#8a8d9b]" />}
                            name="occupation"
                            type="text"
                            placeholder="Software Developer"
                            label="Occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                        />
                        <InputField
                            icon={<MapPin className="w-5 h-5 text-[#8a8d9b]" />}
                            name="location"
                            type="text"
                            placeholder="New York, USA"
                            label="Location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                )}

                {step === 3 && (
                    <div className="mb-5">
                        <label className="block text-[#d1d5db] text-sm mb-2 font-medium">About</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-start pt-3 pl-3 pointer-events-none">
                                <Info className="w-5 h-5 text-[#8a8d9b]" />
                            </div>
                            <textarea
                                name="about"
                                rows="4"
                                value={formData.about}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-gray-400 focus:border-[#3a3d4d] focus:outline-none transition-colors duration-200"
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </div>
                )}
            </div>

            <div className="px-8 pb-2">
                <div className="flex justify-between pt-6 border-t border-[#1d1f29]">
                    <button
                        type="button"
                        onClick={handleBack}
                        className={`py-3 px-6 rounded-lg border ${step === 1 ? 'border-[#1d1f29] text-[#8a8d9b] cursor-not-allowed' : 'border-[#3a3d4d] text-white hover:bg-[#1d1f29]'} transition-colors duration-200 text-sm cursor-pointer`}
                        disabled={step === 1}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`py-3 px-6 gap-4 text-white rounded-lg flex items-center transition-colors duration-200 text-sm cursor-pointer ${isRegistering ? 'bg-emerald-800 cursor-not-allowed' : 'bg-emerald-700 hover:bg-emerald-600'}`}
                    >
                        <span>{step < 3 ? 'Continue' : 'Complete Registration'}</span>
                        {
                            isRegistering ? (
                                <Loader2 className='w-5 h-5 animate-spin' />
                            ) : (
                                <ArrowRight className="w-5 h-5" />
                            )
                        }
                    </button>

                </div>
            </div>
            <p className="mt-4 pb-8 px-8 text-start text-sm text-[#8a8d9b]">
                Already have an account?{' '}
                <Link to={"/auth/signin"} className="text-emerald-500 hover:underline">
                    Log in
                </Link>
            </p>
        </form>

    )
}

function InputField({ icon, name, type, placeholder, label, value, onChange }) {
    return (
        <div>
            <label className="block text-[#d1d5db] text-sm mb-2 font-medium">{label}</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    {icon}
                </div>
                <input
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-gray-400 focus:border-[#3a3d4d] focus:outline-none transition-colors duration-200"
                    required
                />
            </div>
        </div>
    )
}