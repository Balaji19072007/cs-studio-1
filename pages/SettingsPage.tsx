import React, { useState, useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { SettingsIcon, UserIcon, BellIcon, ArrowLeftIcon, CheckCircleIcon, AlertCircleIcon, XIcon } from '../components/Icons';
import type { NotificationPreferences } from '../types';

// CropperJS is loaded from a script tag in index.html
declare const Cropper: any;

const SettingsPage: React.FC = () => {
    const { user, updateProfile, updateNotificationPreferences } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');
    
    // Form state
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [prefs, setPrefs] = useState<NotificationPreferences>(user?.notificationPreferences || {
        newLessons: true,
        progressReport: true,
        communityActivity: false,
    });
    
    // Cropper state
    const [isCropModalOpen, setCropModalOpen] = useState(false);
    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const cropperRef = useRef<any>(null);

    // Alert state
    const [alert, setAlert] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setBio(user.bio || '');
            setPrefs(user.notificationPreferences || { newLessons: true, progressReport: true, communityActivity: false });
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    
    const showAlert = (type: 'success' | 'error', message: string) => {
        setAlert({type, message});
        setTimeout(() => setAlert(null), 3000);
    }

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(name, bio, user.photoUrl);
        showAlert('success', 'Profile updated successfully!');
    };
    
    const handleNotificationsSave = (e: React.FormEvent) => {
        e.preventDefault();
        updateNotificationPreferences(prefs);
        showAlert('success', 'Notification settings saved!');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 1024 * 1024) { // 1MB limit
                showAlert('error', 'File size exceeds 1MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result as string);
                setCropModalOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const canvas = cropperRef.current.getCroppedCanvas({
                width: 300,
                height: 300,
            });
            const croppedImageUrl = canvas.toDataURL('image/jpeg');
            updateProfile(name, bio, croppedImageUrl);
            setCropModalOpen(false);
            setImageToCrop(null);
            showAlert('success', 'Profile picture updated!');
        }
    };
    
    useEffect(() => {
        if (isCropModalOpen && imageRef.current && imageToCrop) {
            cropperRef.current = new Cropper(imageRef.current, {
                aspectRatio: 1,
                viewMode: 1,
                dragMode: 'move',
                guides: true,
                background: false,
                autoCropArea: 0.8,
            });
        } else {
            if (cropperRef.current) {
                cropperRef.current.destroy();
                cropperRef.current = null;
            }
        }
        return () => {
             if (cropperRef.current) {
                cropperRef.current.destroy();
             }
        };
    }, [isCropModalOpen, imageToCrop]);

    return (
        <>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center mb-6">
                    <button onClick={() => navigate('/profile')} className="mr-3 p-2 rounded-full hover:bg-slate-800 transition-colors">
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <h1 className="text-3xl font-extrabold text-white flex items-center">
                        <SettingsIcon className="w-8 h-8 mr-3 text-sky-400" /> Account Settings
                    </h1>
                </div>

                <div className="bg-slate-800 shadow-xl rounded-xl overflow-hidden border border-slate-700">
                    <div className="border-b border-slate-700">
                        <nav className="-mb-px flex space-x-8 px-6 pt-4">
                            <button onClick={() => setActiveTab('profile')} className={`tab-link whitespace-nowrap py-3 px-1 text-sm font-medium focus:outline-none border-b-2 ${activeTab === 'profile' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}>
                                <UserIcon className="w-4 h-4 inline-block mr-2" /> Profile
                            </button>
                             <button onClick={() => setActiveTab('notifications')} className={`tab-link whitespace-nowrap py-3 px-1 text-sm font-medium focus:outline-none border-b-2 ${activeTab === 'notifications' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'}`}>
                                <BellIcon className="w-4 h-4 inline-block mr-2" /> Notifications
                            </button>
                        </nav>
                    </div>

                    <div className="p-6 sm:p-8">
                        {activeTab === 'profile' && (
                             <div className="flex flex-col lg:flex-row lg:space-x-8">
                                <div className="lg:w-1/4 mb-6 lg:mb-0">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Profile Picture</label>
                                    <div className="flex items-center space-x-3">
                                        <div className="h-24 w-24 rounded-full bg-slate-700 flex items-center justify-center text-sky-300 text-3xl font-bold border-2 border-slate-600 shadow-md overflow-hidden flex-shrink-0">
                                            {user.photoUrl ? <img src={user.photoUrl} alt="Profile" className="w-full h-full object-cover" /> : <span>{user.initials}</span>}
                                        </div>
                                        <div>
                                            <input type="file" id="file-input" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
                                            <button type="button" onClick={() => document.getElementById('file-input')?.click()} className="px-3 py-2 border border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-200 bg-slate-700 hover:bg-slate-600">
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-3/4">
                                    <form onSubmit={handleProfileSave} className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} id="name" className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                                            <input type="email" id="email" value={user.email} disabled className="mt-1 block w-full bg-slate-700/50 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-slate-400 cursor-not-allowed" />
                                        </div>
                                         <div>
                                            <label htmlFor="bio" className="block text-sm font-medium text-slate-300">Bio</label>
                                            <textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500"></textarea>
                                        </div>
                                        <div className="pt-4 border-t border-slate-700">
                                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700">Save Changes</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                         {activeTab === 'notifications' && (
                           <div>
                                <h2 className="text-2xl font-semibold text-white mb-6">Notification Preferences</h2>
                                <form onSubmit={handleNotificationsSave} className="space-y-6">
                                    <fieldset>
                                        <legend className="text-base font-medium text-slate-200">Email Notifications</legend>
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="email-lessons" name="newLessons" type="checkbox" checked={prefs.newLessons} onChange={e => setPrefs({...prefs, newLessons: e.target.checked})} className="h-4 w-4 text-sky-600 bg-slate-700 border-slate-600 rounded focus:ring-sky-500" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="email-lessons" className="font-medium text-slate-200">New Lesson Releases</label>
                                                    <p className="text-slate-400">Get notified when new interactive lessons are published.</p>
                                                </div>
                                            </div>
                                             <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="email-progress" name="progressReport" type="checkbox" checked={prefs.progressReport} onChange={e => setPrefs({...prefs, progressReport: e.target.checked})} className="h-4 w-4 text-sky-600 bg-slate-700 border-slate-600 rounded focus:ring-sky-500" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="email-progress" className="font-medium text-slate-200">Weekly Progress Report</label>
                                                    <p className="text-slate-400">Receive a summary of your coding progress and learning streaks.</p>
                                                </div>
                                            </div>
                                             <div className="flex items-start">
                                                <div className="flex items-center h-5">
                                                    <input id="email-community" name="communityActivity" type="checkbox" checked={prefs.communityActivity} onChange={e => setPrefs({...prefs, communityActivity: e.target.checked})} className="h-4 w-4 text-sky-600 bg-slate-700 border-slate-600 rounded focus:ring-sky-500" />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label htmlFor="email-community" className="font-medium text-slate-200">Community Activity</label>
                                                    <p className="text-slate-400">Get updates on replies to your forum posts and events.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <div className="pt-4 border-t border-slate-700">
                                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700">Save Notification Settings</button>
                                    </div>
                                </form>
                           </div>
                        )}
                    </div>
                </div>
            </div>
            
            {isCropModalOpen && (
                <div id="crop-modal" className="fixed inset-0 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl border border-slate-700">
                        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                            <h3 className="text-lg font-medium text-white">Crop Profile Picture</h3>
                            <button onClick={() => setCropModalOpen(false)} className="text-slate-400 hover:text-white"><XIcon className="w-6 h-6"/></button>
                        </div>
                        <div className="p-4">
                           <div className="max-h-96 overflow-hidden">
                                <img ref={imageRef} src={imageToCrop || ''} alt="Crop preview" className="max-w-full" />
                           </div>
                        </div>
                        <div className="p-4 border-t border-slate-700 flex justify-end space-x-3">
                            <button onClick={() => setCropModalOpen(false)} className="px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-200 bg-slate-700 hover:bg-slate-600">Cancel</button>
                            <button onClick={handleCrop} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700">Apply Crop</button>
                        </div>
                    </div>
                </div>
            )}
            
            {alert && (
                <div className="fixed bottom-5 right-5 bg-slate-700 border border-slate-600 rounded-lg shadow-lg p-4 flex items-center z-50">
                    {alert.type === 'success' ? <CheckCircleIcon className="w-6 h-6 text-green-400 mr-3" /> : <AlertCircleIcon className="w-6 h-6 text-red-400 mr-3" />}
                    <span className={alert.type === 'success' ? 'text-green-300' : 'text-red-300'}>{alert.message}</span>
                </div>
            )}
        </>
    );
};

export default SettingsPage;