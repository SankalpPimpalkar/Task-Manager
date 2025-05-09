import React, { useEffect, useState } from 'react';
import { UserRound, Mail, Briefcase, MapPin, Link as LinkIcon, ChevronLeft, Check, Upload, Trash2, Plus, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GET_ACCOUNT, UPDATE_USER_INFO } from '../../appwrite/auth';
import { loginUser } from '../../redux/slices/auth.slice';

// Skeleton Loading Components
const ProfilePictureSkeleton = () => (
    <div className="md:col-span-1 border border-[#1d1f29] bg-[#1a1c27] rounded-xl p-5 flex flex-col items-center h-fit">
        <div className="rounded-full w-32 h-32 bg-[#1d1f29] animate-pulse mb-4"></div>
        <div className="h-4 w-24 bg-[#1d1f29] rounded animate-pulse"></div>
    </div>
);

const InputFieldSkeleton = () => (
    <div className="space-y-2">
        <div className="h-4 w-1/3 bg-[#1d1f29] rounded animate-pulse"></div>
        <div className="h-10 w-full bg-[#1d1f29] rounded-lg animate-pulse"></div>
    </div>
);

const SocialLinkSkeleton = () => (
    <div className="space-y-2">
        <div className="h-4 w-1/3 bg-[#1d1f29] rounded animate-pulse"></div>
        <div className="flex items-center">
            <div className="h-10 w-12 bg-[#1d1f29] rounded-l-lg animate-pulse"></div>
            <div className="h-10 flex-1 bg-[#1d1f29] rounded-r-lg animate-pulse"></div>
        </div>
    </div>
);

export default function EditProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoadingChanges, setIsLoadingChanges] = useState(false)
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        occupation: '',
        location: '',
        about: '',
        links: []
    });
    const [newLink, setNewLink] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddLink = () => {
        if (newLink.trim() && !formData.links.includes(newLink.trim())) {
            setFormData(prev => ({
                ...prev,
                links: [...prev.links, newLink.trim()]
            }));
            setNewLink('');
        }
    };

    const handleRemoveLink = (index) => {
        setFormData(prev => ({
            ...prev,
            links: prev.links.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoadingChanges(true)
            console.log('Updated profile data:', formData);
            const resp = await UPDATE_USER_INFO(formData)
            setUser(resp)
            dispatch(loginUser(resp))
            setFormData({
                name: resp?.name || '',
                email: resp?.email || '',
                occupation: resp?.occupation || '',
                location: resp?.location || '',
                about: resp?.about || '',
                links: resp?.links ? [...resp.links] : []
            });
        } catch (error) {
            throw error
        } finally {
            setIsLoadingChanges(false)
        }
    };

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const resp = await GET_ACCOUNT();
            setUser(resp);
            dispatch(loginUser(resp));
            setFormData({
                name: resp?.name || '',
                email: resp?.email || '',
                occupation: resp?.occupation || '',
                location: resp?.location || '',
                about: resp?.about || '',
                links: resp?.links ? [...resp.links] : []
            });
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (isLoading) {
        return (
            <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-xl shadow-lg'>
                {/* Header with back button skeleton */}
                <div className='flex justify-between items-center mb-8'>
                    <div className="h-10 w-24 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    <div className="hidden md:block h-8 w-48 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                    <div className="h-10 w-32 bg-[#1a1c27] rounded-lg animate-pulse"></div>
                </div>

                <div className='block md:hidden h-8 w-48 bg-[#1a1c27] rounded-lg animate-pulse mb-4'></div>

                <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                    <ProfilePictureSkeleton />

                    <div className='md:col-span-3'>
                        <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-xl p-6 mb-6'>
                            <div className="h-6 w-48 bg-[#1a1c27] rounded-lg animate-pulse mb-6"></div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                                <InputFieldSkeleton />
                                <InputFieldSkeleton />
                                <InputFieldSkeleton />
                                <InputFieldSkeleton />
                            </div>

                            <div className="h-6 w-48 bg-[#1a1c27] rounded-lg animate-pulse mb-6"></div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <InputFieldSkeleton />
                                <InputFieldSkeleton />
                                <div className='md:col-span-2'>
                                    <div className="h-4 w-1/3 bg-[#1d1f29] rounded animate-pulse mb-2"></div>
                                    <div className="h-32 w-full bg-[#1d1f29] rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-xl p-5'>
                            <div className="h-6 w-48 bg-[#1a1c27] rounded-lg animate-pulse mb-6"></div>
                            <div className='space-y-4'>
                                <SocialLinkSkeleton />
                                <SocialLinkSkeleton />
                                <SocialLinkSkeleton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='border border-[#1d1f29] bg-[#11131e] p-5 col-span-4 rounded-xl shadow-lg'>
            {/* Header with back button */}
            <div className='flex justify-between items-center mb-8'>
                <button
                    onClick={() => navigate(-1)}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg border border-[#1d1f29] bg-[#1a1c27] text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:-translate-x-1'
                >
                    <ChevronLeft size={18} />
                    Back
                </button>
                <h1 className='text-2xl font-bold text-white hidden md:block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text'>
                    Edit Profile
                </h1>
                <button
                    onClick={handleSubmit}
                    disabled={isLoadingChanges}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg disabled:bg-green-700 bg-green-600'
                >
                    {
                        isLoadingChanges ? (
                            <>
                                <LoaderCircle className='animate-spin' size={18} strokeWidth={3} />
                                <p>
                                    Saving Changes
                                </p>
                            </>
                        ) : (
                            <>
                                <Check size={18} strokeWidth={3} />
                                Save Changes
                            </>
                        )
                    }

                </button>
            </div>

            <h1 className='text-2xl font-bold text-white block md:hidden pb-4'>
                Edit Profile
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
                {/* Profile Picture Section */}
                <div className='md:col-span-1 border border-[#1d1f29] bg-[#1a1c27] rounded-xl p-5 flex flex-col items-center h-fit backdrop-blur-sm'>
                    <div className='relative mb-4 group'>
                        <div className='rounded-full w-32 h-32 border-2 border-[#1d1f29] group-hover:border-emerald-400 transition-all duration-300 overflow-hidden'>
                            <img
                                className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                                src={user?.avatar || 'https://img.lovepik.com/free-png/20210926/lovepik-cartoon-avatar-png-image_401440477_wh1200.png'}
                                alt='Profile'
                            />
                        </div>
                        <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <label className='cursor-pointer flex flex-col items-center'>
                                <div className='bg-gray-900/80 rounded-full p-3 mb-1 backdrop-blur-sm hover:bg-gray-900 transition-colors duration-200'>
                                    <Upload size={20} className='text-emerald-400' />
                                </div>
                                <span className='text-xs text-white bg-gray-900/80 px-2 py-1 rounded hover:bg-gray-900 transition-colors duration-200 backdrop-blur-sm'>Change Photo</span>
                                <input type='file' className='hidden' />
                            </label>
                        </div>
                    </div>
                    {user?.avatar && (
                        <button className='text-rose-400 hover:text-rose-300 text-sm transition-colors duration-200'>
                            Remove Photo
                        </button>
                    )}
                </div>

                {/* Form Section */}
                <div className='md:col-span-3 overflow-y-auto h-[calc(100dvh-160px)]'>
                    <form onSubmit={handleSubmit}>
                        <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-xl p-6 mb-6 backdrop-blur-sm'>
                            <h3 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
                                <UserRound className='text-emerald-400' size={18} />
                                <span>Basic Information</span>
                            </h3>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                                <div className='space-y-2'>
                                    <label className='block text-gray-400 text-sm font-medium'>Name</label>
                                    <input
                                        type='text'
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className='w-full px-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200'
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-gray-400 text-sm font-medium'>Email</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                                            <Mail size={16} />
                                        </div>
                                        <input
                                            type='email'
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200'
                                        />
                                    </div>
                                </div>
                            </div>

                            <h3 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
                                <Briefcase className='text-cyan-400' size={18} />
                                <span>Additional Information</span>
                            </h3>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <label className='block text-gray-400 text-sm font-medium'>Occupation</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                                            <Briefcase size={16} />
                                        </div>
                                        <input
                                            type='text'
                                            name="occupation"
                                            value={formData.occupation}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200'
                                        />
                                    </div>
                                </div>
                                <div className='space-y-2'>
                                    <label className='block text-gray-400 text-sm font-medium'>Location</label>
                                    <div className='relative'>
                                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500'>
                                            <MapPin size={16} />
                                        </div>
                                        <input
                                            type='text'
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200'
                                        />
                                    </div>
                                </div>
                                <div className='md:col-span-2 space-y-2'>
                                    <label className='block text-gray-400 text-sm font-medium'>About</label>
                                    <textarea
                                        rows={4}
                                        name="about"
                                        value={formData.about}
                                        onChange={handleChange}
                                        className='w-full px-4 py-2.5 rounded-lg border border-[#1d1f29] bg-[#11131e] text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50 focus:outline-none transition-all duration-200'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Social Links Section */}
                        <div className='border border-[#1d1f29] bg-[#1a1c27] rounded-xl p-5 mb-16 md:mb-0 backdrop-blur-sm'>
                            <h3 className='text-lg font-semibold text-white mb-6 flex items-center gap-2'>
                                <LinkIcon className='text-blue-400' size={18} />
                                <span>Social Links</span>
                            </h3>
                            <div className='space-y-4'>
                                {formData.links.map((link, index) => (
                                    <div key={index} className='space-y-2'>
                                        <label className='block text-gray-400 text-sm font-medium'>
                                            {link.includes('github.com') ? 'GitHub' :
                                                link.includes('linkedin.com') ? 'LinkedIn' :
                                                    'Website'}
                                        </label>
                                        <div className='flex items-center'>
                                            <span className='inline-flex items-center px-4 py-2.5 rounded-l-lg border border-r-0 border-[#1d1f29] bg-[#11131e] text-gray-400'>
                                                <LinkIcon size={16} className='text-blue-400' />
                                            </span>
                                            <input
                                                type='url'
                                                value={link}
                                                readOnly
                                                className='flex-1 px-4 py-1.5 border border-[#1d1f29] bg-[#11131e] text-white rounded-r-lg'
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveLink(index)}
                                                className='ml-2 p-2 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-gray-700 transition-colors duration-200'
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className='space-y-2'>
                                    <label className='block text-gray-400 text-sm font-medium'>Add New Link</label>
                                    <div className='flex items-center'>
                                        <span className='inline-flex items-center px-4 py-2.5 rounded-l-lg border border-r-0 border-[#1d1f29] bg-[#11131e] text-gray-400'>
                                            <LinkIcon size={16} className='text-blue-400' />
                                        </span>
                                        <input
                                            type='url'
                                            value={newLink}
                                            onChange={(e) => setNewLink(e.target.value)}
                                            placeholder='https://example.com'
                                            className='flex-1 px-4 py-1.5 border border-[#1d1f29] bg-[#11131e] text-white rounded-r-lg'
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddLink}
                                            disabled={!newLink.trim()}
                                            className='ml-2 p-2 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}