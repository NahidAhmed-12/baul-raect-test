import React, { useState, useEffect, useRef, useCallback } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/app-check';

// helper function to format timestamps for chat
const formatTimestampShort = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1 && date.getDate() === now.getDate()) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 2 && date.getDate() === now.getDate() - 1) {
        return 'Yesterday';
    } else {
        return date.toLocaleString([], { month: 'short', day: 'numeric' });
    }
};


const Admin = () => {
    // --- State Management ---
    const [pageState, setPageState] = useState('loading'); // loading, login, dashboard
    const [currentView, setCurrentView] = useState('dashboard'); // dashboard, users, messages, settings, routers
    const [loginError, setLoginError] = useState('');
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Data states
    const [dashboardStats, setDashboardStats] = useState({ total: 0, active: 0, revenue: 0, messages: 0 });
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    const [currentUserFilter, setCurrentUserFilter] = useState('inactive');
    const [hasMoreUsers, setHasMoreUsers] = useState(false);
    const [pricingPlans, setPricingPlans] = useState([]);
    const [activePlanEditor, setActivePlanEditor] = useState({ index: -2 }); // -2 for placeholder, -1 for new
    const [routers, setRouters] = useState(null); // null for loading, [] for empty, or array of routers

    // Activation Modal State
    const [modalState, setModalState] = useState({ isVisible: false, userId: null, error: '', selectedPlan: null });
    
    // Messages/Chat State
    const [inboxUsers, setInboxUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState({ userId: null, userName: '', userEmail: '', messages: [] });
    const [isChatOpenMobile, setChatOpenMobile] = useState(false);
    const [chatInput, setChatInput] = useState("");
    const [uploadProgress, setUploadProgress] = useState(-1); // -1 for hidden

    // Image Preview Modal
    const [previewImage, setPreviewImage] = useState(null);

    const USERS_PER_PAGE = 10;
    const searchDebounceTimer = useRef(null);
    const chatMessagesEndRef = useRef(null);

    // --- Effects ---

    // Apply theme to document
    useEffect(() => {
        const docElement = document.documentElement;
        docElement.classList.remove('light', 'dark');
        docElement.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Firebase Initialization and Auth
    useEffect(() => {
        const initializeFirebase = async () => {
            try {
                if (!firebase.apps.length) {
                    const response = await fetch('/api/config');
                    if (!response.ok) throw new Error('Failed to load Firebase config');
                    const firebaseConfig = await response.json();
                    firebase.initializeApp(firebaseConfig);

                    const appCheck = firebase.appCheck();
                    appCheck.activate('6LdDE6wrAAAAAAwoKDphiThT-W7MHcS676QE6hgP', true);
                }

                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        setPageState('dashboard');
                    } else {
                        setPageState('login');
                    }
                });
            } catch (error) {
                console.error("Firebase initialization failed:", error);
                setLoginError("Application config error. Could not start.");
                setPageState('login');
            }
        };
        initializeFirebase();
    }, []);

    // Countdown timer for user expiry
    useEffect(() => {
        const interval = setInterval(() => {
             setDisplayedUsers(prevUsers => 
                prevUsers.map(u => ({ ...u, countdown: u.expire ? calculateCountdown(u.expire) : null }))
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    // Main data fetching effect when dashboard is active
    useEffect(() => {
        if (pageState !== 'dashboard') return;
        
        const db = firebase.database();
        const usersRef = db.ref('users');
        const revenueRef = db.ref('Revenue/total');
        const plansRef = db.ref('setting/pricingPlans');
        const messagesRef = db.ref('massages');
        const adminReadsRef = db.ref('adminReads');
        const routersRef = db.ref('Others/RouterName');

        // Fetch all data
        const onUserChange = usersRef.on('value', snapshot => {
            const usersVal = snapshot.val() || {};
            const usersArray = Object.entries(usersVal).map(([id, data]) => ({ id, ...data }));
            setAllUsers(usersArray);
            setDashboardStats(prev => ({ ...prev, total: usersArray.length, active: usersArray.filter(u => u.active).length }));
        });
        
        const onRevenueChange = revenueRef.on('value', snapshot => {
            setDashboardStats(prev => ({ ...prev, revenue: snapshot.val() || 0 }));
        });
        
        const onPlansChange = plansRef.on('value', snapshot => {
            setPricingPlans(snapshot.val() || []);
        });

        const onRoutersChange = routersRef.on('value', snapshot => {
            const data = snapshot.val();
            if (data) {
                const routerList = Object.entries(data).map(([key, value]) => ({
                    key,
                    ...value,
                    // Convert child keys object to array for easier mapping
                    childKeys: Object.entries(value).map(([childKey, entries]) => ({
                        key: childKey,
                        entries: entries || []
                    })),
                    isExpanded: false
                }));
                setRouters(routerList);
            } else {
                setRouters([]);
            }
        });

        let adminLastReads = {};
        const onAdminReadsChange = adminReadsRef.on('value', snapshot => {
            adminLastReads = snapshot.val() || {};
        });

        const onMessagesChange = messagesRef.on('value', snapshot => {
            const allMessages = snapshot.val() || {};
            const usersRefForNames = db.ref('users');
            usersRefForNames.once('value', userSnapshot => {
                const userCache = userSnapshot.val() || {};
                const processedInbox = Object.entries(allMessages).map(([userId, messages]) => {
                    const messageValues = Object.values(messages).sort((a,b) => a.timestamp - b.timestamp);
                    if(messageValues.length === 0) return null;
                    const lastMessage = messageValues[messageValues.length - 1];
                    const userDetails = userCache[userId] || {};
                    const lastRead = adminLastReads[userId] || 0;
                    
                    return {
                        userId,
                        userName: userDetails.Name || 'Unknown User',
                        userEmail: userDetails.email || 'N/A',
                        photoURL: userDetails.photoURL,
                        lastMessage: lastMessage.text,
                        lastMessageIsImage: !!lastMessage.imageUrl,
                        lastMessageTimestamp: lastMessage.timestamp,
                        isUnread: lastMessage.sender === 'user' && lastMessage.timestamp > lastRead,
                    };
                }).filter(Boolean).sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);
                
                setInboxUsers(processedInbox);
                setDashboardStats(prev => ({ ...prev, messages: processedInbox.filter(u => u.isUnread).length }));
            });
        });

        return () => {
            usersRef.off('value', onUserChange);
            revenueRef.off('value', onRevenueChange);
            plansRef.off('value', onPlansChange);
            messagesRef.off('value', onMessagesChange);
            adminReadsRef.off('value', onAdminReadsChange);
            routersRef.off('value', onRoutersChange);
        };
    }, [pageState]);
    
    // Filter users when filter or user data changes
    useEffect(() => {
        const isFilterActive = currentUserFilter === 'active';
        const filtered = allUsers.filter(user => (user.active || false) === isFilterActive);
        setFilteredUsers(filtered);
        setDisplayedUsers(filtered.slice(0, USERS_PER_PAGE));
        setHasMoreUsers(filtered.length > USERS_PER_PAGE);
    }, [currentUserFilter, allUsers]);
    
    // Chat messages listener
    useEffect(() => {
        if (!currentChat.userId) return;

        const chatRef = firebase.database().ref(`massages/${currentChat.userId}`);
        const onChatUpdate = chatRef.on('value', snapshot => {
            const messages = snapshot.val() || {};
            const sortedMessages = Object.values(messages).sort((a,b) => a.timestamp - b.timestamp);
            setCurrentChat(prev => ({...prev, messages: sortedMessages }));
        });

        return () => chatRef.off('value', onChatUpdate);
    }, [currentChat.userId]);
    
    // Auto-scroll chat
    useEffect(() => {
        chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentChat.messages]);


    // --- Handlers ---
    
    const handleLogin = (e) => {
        e.preventDefault();
        setPageState('loading');
        const { email, password } = e.target.elements;
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .catch(error => {
                setLoginError(error.message);
                setPageState('login');
            });
    };

    const handleLogout = () => firebase.auth().signOut();

    const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

    const navigate = (view) => {
        setCurrentView(view);
        setSidebarOpen(false);
        setChatOpenMobile(false);
    };

    const calculateCountdown = (expireTimestamp) => {
        if (!expireTimestamp) return '';
        const now = new Date().getTime();
        const distance = expireTimestamp - now;
        if (distance < 0) return 'Expired';

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        let output = '';
        if (days > 0) output += `${days}d `;
        if (hours > 0 || days > 0) output += `${hours}h `;
        if (minutes > 0 || hours > 0 || days > 0) output += `${minutes}m `;
        output += `${seconds}s`;
        return output.trim();
    };

    const handleUserSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        clearTimeout(searchDebounceTimer.current);
        if(!searchTerm) {
            setDisplayedUsers(filteredUsers.slice(0, USERS_PER_PAGE));
            setHasMoreUsers(filteredUsers.length > USERS_PER_PAGE);
            return;
        }

        searchDebounceTimer.current = setTimeout(() => {
            const results = allUsers.filter(user => 
                (user.Name || '').toLowerCase().includes(searchTerm) || 
                (user.email || '').toLowerCase().includes(searchTerm)
            );
            setDisplayedUsers(results);
            setHasMoreUsers(false);
        }, 300);
    };
    
    const loadMoreUsers = () => {
        const currentLength = displayedUsers.length;
        const moreUsers = filteredUsers.slice(currentLength, currentLength + USERS_PER_PAGE);
        setDisplayedUsers([...displayedUsers, ...moreUsers]);
        setHasMoreUsers(filteredUsers.length > currentLength + USERS_PER_PAGE);
    };

    const handleDeactivation = (userId) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            const userCard = document.querySelector(`.user-card[data-user-id="${userId}"]`);
            userCard?.classList.add('is-loading');
            firebase.database().ref(`users/${userId}`).update({ active: false, expire: null })
            .catch(err => alert("Deactivation failed: " + err.message))
            .finally(() => userCard?.classList.remove('is-loading'));
        }
    };
    
    const openActivationModal = (userId) => {
        setModalState({ isVisible: true, userId, error: '', selectedPlan: null });
    };

    const handleActivationConfirm = () => {
        const { userId, selectedPlan } = modalState;
        if (!selectedPlan) {
            setModalState(prev => ({ ...prev, error: 'Please select a plan.'}));
            return;
        }
        
        const userCard = document.querySelector(`.user-card[data-user-id="${userId}"]`);
        userCard?.classList.add('is-loading');
        setModalState({ isVisible: false, userId: null, error: '', selectedPlan: null });

        const price = parseFloat(selectedPlan.price.replace(/[^0-9.-]+/g,"")) || 0;
        const periodString = selectedPlan.period;
        const now = new Date();
        if (periodString.includes('week')) { const weeks = parseInt(periodString.match(/\d+/)?.[0] || '1', 10); now.setDate(now.getDate() + (weeks * 7)); } 
        else if (periodString.includes('month')) { const months = parseInt(periodString.match(/\d+/)?.[0] || '1', 10); now.setMonth(now.getMonth() + months); } 
        else if (periodString.includes('year')) { const years = parseInt(periodString.match(/\d+/)?.[0] || '1', 10); now.setFullYear(now.getFullYear() + years); }
        const expireTimestamp = now.getTime();
        
        const updates = {
            [`users/${userId}/active`]: true,
            [`users/${userId}/expire`]: expireTimestamp,
        };

        const db = firebase.database();
        db.ref().update(updates)
            .then(() => {
                if(price > 0) {
                    return db.ref('Revenue/total').transaction(currentTotal => (currentTotal || 0) + price);
                }
            })
            .catch(err => alert("Activation failed: " + err.message))
            .finally(() => userCard?.classList.remove('is-loading'));
    };
    
    const handlePlanFormSubmit = (e, index) => {
        e.preventDefault();
        const form = e.target;
        const isNew = index === -1;
        const features = Array.from(form.querySelectorAll('.feature-input')).map(input => input.value).filter(Boolean);
        const newPlan = {
            name: form.elements.name.value,
            price: form.elements.price.value,
            description: form.elements.description.value,
            period: form.elements.period.value,
            buttonText: form.elements.buttonText.value,
            isRecommended: form.elements.isRecommended.checked,
            features
        };
        
        let updatedPlans = [...pricingPlans];
        if(isNew) {
            updatedPlans.push(newPlan);
        } else {
            updatedPlans[index] = newPlan;
        }

        firebase.database().ref('setting/pricingPlans').set(updatedPlans)
            .then(() => {
                setActivePlanEditor({ index: isNew ? updatedPlans.length - 1 : index });
            })
            .catch(err => alert("Failed to save plan: " + err.message));
    };
    
    const handlePlanDelete = (index) => {
        if(window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
            const updatedPlans = [...pricingPlans];
            updatedPlans.splice(index, 1);
            firebase.database().ref('setting/pricingPlans').set(updatedPlans)
                .then(() => setActivePlanEditor({ index: -2 })) // show placeholder
                .catch(err => alert("Failed to delete plan: " + err.message));
        }
    };

    const handleOpenChat = (user) => {
        setCurrentChat({ userId: user.userId, userName: user.userName, userEmail: user.userEmail, messages: [] });
        if (window.innerWidth <= 1024) {
            setChatOpenMobile(true);
        }
        if (user.isUnread) {
            firebase.database().ref(`adminReads/${user.userId}`).set(Date.now());
        }
    };
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!chatInput.trim() || !currentChat.userId) return;
        
        const message = {
            sender: 'admin',
            senderName: 'Admin',
            text: chatInput,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        
        firebase.database().ref(`massages/${currentChat.userId}`).push(message);
        setChatInput('');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !currentChat.userId) return;
        
        const timestamp = Date.now();
        const storageRef = firebase.storage().ref(`chat_images/${currentChat.userId}/${timestamp}_${file.name}`);
        const uploadTask = storageRef.put(file);

        setUploadProgress(0);

        uploadTask.on('state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            error => {
                console.error("Upload failed", error);
                alert("Image upload failed!");
                setUploadProgress(-1);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                    const message = {
                        sender: 'admin',
                        senderName: 'Admin',
                        imageUrl: downloadURL,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    };
                    firebase.database().ref(`massages/${currentChat.userId}`).push(message);
                    setTimeout(() => setUploadProgress(-1), 500);
                });
            }
        );
    };
    
    const handleCopyEmail = () => {
        navigator.clipboard.writeText(currentChat.userEmail).then(() => {
            const btn = document.getElementById('copy-email-btn-icon');
            if (btn) {
                btn.classList.remove('fa-copy');
                btn.classList.add('fa-check');
                setTimeout(() => {
                    btn.classList.remove('fa-check');
                    btn.classList.add('fa-copy');
                }, 2000);
            }
        });
    };
    
    // --- Router Management Handlers ---
    const sanitizeFirebaseKey = (key) => key.replace(/[\.\#\$\[\]]/g, '-');
    
    const handleRouterUpdate = (originalKey, formElement) => {
        const newKey = sanitizeFirebaseKey(formElement.querySelector('.router-key-input').value);
        if(!newKey) { alert("Router Name cannot be empty."); return; }
        
        const routerData = {};
        let hasError = false;
        
        formElement.querySelectorAll('.child-key-section').forEach(section => {
            if(hasError) return;
            const childKey = sanitizeFirebaseKey(section.querySelector('.child-key-input').value);
            if(!childKey) { alert('Child Key cannot be empty.'); hasError = true; return; }
            
            const entries = [];
            section.querySelectorAll('.router-entry').forEach(entry => {
                entries.push({
                    Hostname: entry.querySelector('.entry-hostname').value,
                    Jumper_Link: entry.querySelector('.entry-jumperlink').value,
                    Posted_By: entry.querySelector('.entry-postedby').value,
                    Probability: entry.querySelector('.entry-probability').value,
                    Likes: parseInt(entry.querySelector('.entry-likes').value, 10) || 0,
                    Dislikes: parseInt(entry.querySelector('.entry-dislikes').value, 10) || 0,
                    Posted_Time: firebase.database.ServerValue.TIMESTAMP
                });
            });
            if(entries.length === 0) { alert(`Child key "${childKey}" must have at least one entry.`); hasError=true; return;}
            routerData[childKey] = entries;
        });
        
        if (hasError) return;

        const dbRef = firebase.database().ref('Others/RouterName');
        
        if (originalKey && originalKey !== newKey) {
            // Renaming - remove old, add new
            const updates = {};
            updates[originalKey] = null;
            updates[newKey] = routerData;
            dbRef.update(updates).catch(err => alert("Update failed: " + err.message));
        } else {
            // Creating or updating in place
            dbRef.child(newKey).set(routerData).catch(err => alert("Update failed: " + err.message));
        }
    };
    
    const handleRouterDelete = (key) => {
        if (window.confirm(`Are you sure you want to delete the router "${key}"?`)) {
            firebase.database().ref(`Others/RouterName/${key}`).remove();
        }
    };

    const handleAddNewRouter = () => {
        setRouters(prev => [{ key: '', childKeys: [{ key: '', entries: [{}]}], isExpanded: true, isNew: true }, ...prev]);
    };

    const handleRouterCardChange = (routerIndex, newRouterData) => {
        setRouters(prev => {
            const updated = [...prev];
            updated[routerIndex] = newRouterData;
            return updated;
        });
    };
    

    // --- Render Logic ---
    
    if (pageState === 'loading') {
        return (
            <div id="page-loader">
                <div className="spinner"></div>
            </div>
        );
    }
    
    if (pageState === 'login') {
        return (
            <div className="mesh-gradient-bg aurora-bg">
                <div id="login-page">
                    <div className="flex items-center justify-center min-h-screen p-4">
                        <div className="w-full max-w-sm p-8 space-y-8 rounded-2xl shadow-2xl animate-on-load" style={{backgroundColor: 'var(--panel-bg)', border: '1px solid var(--panel-border)', backdropFilter: 'blur(20px)', '--shadow-color': 'rgba(var(--active-link-icon-rgb), 0.2)', boxShadow: '0 0 40px -10px var(--shadow-color)'}}>
                            <div className="text-center">
                                <div className="flex justify-center mb-4">
                                    <span className="flex items-center justify-center h-12 w-12 text-white rounded-xl transition-transform hover:scale-110" style={{background: 'var(--primary-gradient)'}}>
                                        <i className="fa-solid fa-square-poll-vertical text-2xl"></i>
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-text-primary">Welcome Back!</h1>
                                <p className="text-text-secondary mt-2">Sign in to the <span className="font-semibold" style={{color: 'var(--active-link-icon)'}}>Baul 2.0</span> Dashboard</p>
                            </div>
                            <form id="login-form" className="space-y-6" onSubmit={handleLogin}>
                                <div className="relative">
                                    <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"></i>
                                    <input type="email" id="email" name="email" className="search-input w-full pl-12 pr-4 py-3 rounded-lg outline-none" placeholder="Email Address" required />
                                </div>
                                <div className="relative">
                                    <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"></i>
                                    <input type="password" id="password" name="password" className="search-input w-full pl-12 pr-4 py-3 rounded-lg outline-none" placeholder="Password" required />
                                </div>
                                {loginError && <p id="login-error" className="text-red-500 text-sm text-center !mt-4">{loginError}</p>}
                                <div>
                                    <button type="submit" className="w-full text-white font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:scale-105" style={{background: 'var(--primary-gradient)', boxShadow: '0 8px 20px -6px rgba(var(--active-link-icon-rgb), 0.5)'}}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="mesh-gradient-bg aurora-bg">
            <div id="dashboard-page">
                {/* --- Sidebar --- */}
                <aside id="sidebar" className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                    <div className="flex flex-col h-full">
                        <div className="sidebar-header h-20 flex items-center justify-start px-4">
                            <a href="#" className="flex items-center gap-3 w-full">
                                <span className="flex items-center justify-center h-12 w-12 text-white rounded-xl transition-transform duration-300 hover:scale-110 flex-shrink-0" style={{background: 'var(--primary-gradient)'}}>
                                    <i className="fa-solid fa-square-poll-vertical text-2xl"></i>
                                </span>
                                <span className="logo-text text-2xl font-bold" style={{color:'var(--active-link-icon)'}}>Baul 2.0</span>
                            </a>
                        </div>
                        <nav className="flex-grow p-2 space-y-1">
                            <a href="#" onClick={() => navigate('dashboard')} className={`nav-link ${currentView === 'dashboard' ? 'active' : ''}`}><i className="fa-solid fa-house"></i><span className="nav-link-text">Dashboard</span></a>
                            <a href="#" onClick={() => navigate('messages')} className={`nav-link ${currentView === 'messages' ? 'active' : ''}`}><i className="fa-solid fa-envelope"></i><span className="nav-link-text">Messages</span></a>
                            <a href="#" onClick={() => navigate('settings')} className={`nav-link ${currentView === 'settings' ? 'active' : ''}`}><i className="fa-solid fa-cog"></i><span className="nav-link-text">Setting</span></a>
							<a href="#" onClick={() => navigate('routers')} className={`nav-link ${currentView === 'routers' ? 'active' : ''}`}><i className="fa-solid fa-route"></i><span className="nav-link-text">Others Routers</span></a>
                        </nav>
                        <div className="p-4 mt-auto">
                            <a href="#" id="logout-btn" onClick={handleLogout} className="nav-link"><i className="fa-solid fa-right-from-bracket"></i><span className="nav-link-text">Logout</span></a>
                        </div>
                    </div>
                </aside>
                {isSidebarOpen && <div id="sidebar-overlay" className="sidebar-overlay open lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
                
                <div className="content-wrapper w-full">
                    <div className="h-screen flex flex-col">
                        {/* --- Header --- */}
                        <header className="header sticky top-0 z-50 flex-shrink-0">
                            <div className="w-full mx-auto flex items-center justify-between h-20 px-6">
                                <div className="flex items-center gap-4">
                                    <button id="menu-button" aria-label="Open menu" className="lg:hidden h-10 w-10 flex items-center justify-center header-btn" onClick={() => setSidebarOpen(true)}>
                                        <i className="fa-solid fa-bars text-lg"></i>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 ml-auto">
                                    <button id="theme-toggle" aria-label="Toggle theme" className="header-btn h-10 w-10 flex items-center justify-center" onClick={handleThemeToggle}>
                                        <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                                    </button>
                                    <button aria-label="Notifications" className="header-btn h-10 w-10 flex items-center justify-center relative">
                                        <i className="fa-regular fa-bell text-lg"></i>
                                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                                    </button>
                                </div>
                            </div>
                        </header>
                        
                        {/* --- Main Content --- */}
                        <main className="flex-grow overflow-y-auto">
                            
                            {/* Dashboard View */}
                            <div id="dashboard-wrapper" className={`p-6 ${currentView !== 'dashboard' ? 'hidden' : ''}`}>
                                <div className="w-full max-w-7xl mx-auto space-y-6">
                                    <div className="space-y-6 animate-on-load">
                                        <div>
                                            <h1 className="text-2xl font-extrabold text-text-primary">Good morning, Admin!</h1>
                                            <p className="text-text-secondary mt-1">Here's your performance summary for today.</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                            <div onClick={() => { setCurrentView('users'); setCurrentUserFilter('inactive');}} className="stat-card p-5"><div className="flex items-center gap-4"><div className="stat-icon h-12 w-12 flex items-center justify-center rounded-lg"><i className="fa-solid fa-users text-xl"></i></div><div><p className="text-sm text-text-secondary font-medium">Total Users</p><p className="text-2xl font-bold">{dashboardStats.total}</p></div></div></div>
                                            <div className="stat-card p-5"><div className="flex items-center gap-4"><div className="stat-icon h-12 w-12 flex items-center justify-center rounded-lg"><i className="fa-solid fa-dollar-sign text-xl"></i></div><div><p className="text-sm text-text-secondary font-medium">Revenue</p><p className="text-2xl font-bold">${dashboardStats.revenue.toFixed(2)}</p></div></div></div>
                                            <div onClick={() => { setCurrentView('users'); setCurrentUserFilter('active'); }} className="stat-card p-5"><div className="flex items-center gap-4"><div className="stat-icon h-12 w-12 flex items-center justify-center rounded-lg"><i className="fa-solid fa-user-check text-xl"></i></div><div><p className="text-sm text-text-secondary font-medium">Active Users</p><p className="text-2xl font-bold">{dashboardStats.active}</p></div></div></div>
                                            <div onClick={() => navigate('messages')} className={`stat-card p-5 ${dashboardStats.messages > 0 ? 'has-new-messages': ''}`}><div className="flex items-center gap-4"><div className="stat-icon h-12 w-12 flex items-center justify-center rounded-lg"><i className="fa-solid fa-envelope text-xl"></i></div><div><p className="text-sm text-text-secondary font-medium">Messages</p><p className="text-2xl font-bold">{dashboardStats.messages}</p></div></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* User Management View */}
                            <div className={`${currentView !== 'users' ? 'hidden' : ''}`}>
                                <div className="space-y-6 px-6 pb-6">
                                    <div className="pt-6 flex items-center gap-4">
                                        <button onClick={() => navigate('dashboard')} className="header-btn h-10 w-10 flex items-center justify-center flex-shrink-0"><i className="fa-solid fa-arrow-left text-lg"></i></button>
                                        <div><h2 className="text-2xl font-bold text-text-primary">User Management</h2><p className="text-sm text-text-secondary mt-1">Search, view, and manage all users.</p></div>
                                    </div>
                                    <div className="flex items-center gap-2 p-1 rounded-lg" style={{backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)'}}>
                                        <button onClick={() => setCurrentUserFilter('inactive')} className={`user-filter-btn flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentUserFilter === 'inactive' ? 'active': ''}`}>Inactive</button>
                                        <button onClick={() => setCurrentUserFilter('active')} className={`user-filter-btn flex-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${currentUserFilter === 'active' ? 'active': ''}`}>Active</button>
                                    </div>
                                    <div className="relative">
                                        <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"></i>
                                        <input type="text" onChange={handleUserSearch} placeholder="Search by name or email..." className="search-input w-full pl-10 pr-4 py-2.5 rounded-lg outline-none" />
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {displayedUsers.map((user, index) => (
                                            <div key={user.id} className="user-card animate-stagger" data-user-id={user.id} style={{'--stagger-delay': `${index * 50}ms`, '--shine-delay': `${Math.random() * -5}s`}}>
                                                <div className="card-content-wrapper">
                                                    <div className="flex items-center gap-4">
                                                        <img src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.Name || user.email)}`} alt="Avatar" className="user-avatar h-12 w-12 rounded-full border-2 border-white dark:border-slate-700 shadow-lg object-cover" />
                                                        <div className="overflow-hidden">
                                                            <p className="font-bold text-md text-text-primary truncate" title={user.Name || ''}>{user.Name || 'N/A'}</p>
                                                            <p className="text-xs text-text-muted truncate" title={user.email || ''}>{user.email || 'N/A'}</p>
                                                            {user.active && user.expire && <div className="mt-2 text-xs text-text-muted flex items-center gap-1.5"><i className="fa-regular fa-clock"></i><span>{user.countdown}</span></div>}
                                                            {!user.active && user.expire && user.expire < Date.now() && <div className="mt-2 text-xs text-red-500 font-semibold flex items-center gap-1.5"><i className="fa-solid fa-triangle-exclamation"></i><span>Expired</span></div>}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow my-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`status-dot h-2.5 w-2.5 rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                            <p className="status-label text-sm font-semibold text-text-secondary">{user.active ? 'Active' : 'Inactive'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="action-button-wrapper mt-auto pt-4 border-t border-panel-border/50">
                                                        {user.active ? (
                                                            <button className="action-btn deactivate w-full" onClick={() => handleDeactivation(user.id)}>Deactivate</button>
                                                        ) : (
                                                            <button className="action-btn activate w-full" onClick={() => openActivationModal(user.id)}>Activate</button>
                                                        )}
                                                    </div>
                                                </div>
                                                 <div className="card-loading-overlay"><div className="flex flex-col items-center loading-content"><div className="fancy-spinner"></div><p className="loading-text">Updating...</p></div></div>
                                            </div>
                                        ))}
                                    </div>
                                    {displayedUsers.length === 0 && <div className="text-center py-10 text-text-secondary">No users found for this filter.</div>}
                                    {hasMoreUsers && <div className="text-center py-4"><button id="see-more-btn" onClick={loadMoreUsers}>See More</button></div>}
                                </div>
                            </div>
                            
                             {/* Messages View */}
                            <div id="messages-view" className={`h-full flex ${currentView !== 'messages' ? 'hidden' : ''} ${isChatOpenMobile ? 'chat-open-mobile' : ''}`}>
                                <div className="flex-none w-80 bg-panel-bg backdrop-filter backdrop-blur-md border-r border-panel-border flex flex-col">
                                    <div className="p-6 border-b border-panel-border flex items-center gap-4">
                                        <button onClick={() => navigate('dashboard')} className="header-btn h-10 w-10 flex items-center justify-center flex-shrink-0"><i className="fa-solid fa-arrow-left text-lg"></i></button>
                                        <div><h2 className="text-2xl font-bold text-text-primary">Inbox</h2><p className="text-sm text-text-secondary mt-1">Conversations with users.</p></div>
                                    </div>
                                    <div id="inbox-list" className="flex-grow overflow-y-auto custom-scrollbar p-2">
                                        {inboxUsers.length > 0 ? inboxUsers.map(user => (
                                            <div key={user.userId} onClick={() => handleOpenChat(user)} className={`inbox-item ${user.isUnread ? 'unread' : ''} ${currentChat.userId === user.userId ? 'active-chat' : ''}`}>
                                                <div className="inbox-avatar flex-shrink-0"><img src={user.photoURL || `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(user.userName)}`} alt="Avatar" className="h-10 w-10 rounded-full border border-panel-border object-cover"/></div>
                                                <div className="flex-grow overflow-hidden"><p className="inbox-user-name font-bold text-text-primary truncate">{user.userName}</p><p className="inbox-last-message text-sm text-text-secondary truncate">{user.lastMessageIsImage ? <><i className="fa-regular fa-image mr-1"></i> Photo</> : user.lastMessage}</p></div>
                                                <div className="inbox-meta flex-shrink-0 text-right"><p className="text-xs text-text-muted">{formatTimestampShort(user.lastMessageTimestamp)}</p>{user.isUnread && <span className="unread-dot h-2.5 w-2.5 rounded-full block ml-auto mt-1"></span>}</div>
                                            </div>
                                        )) : <div className="text-center text-text-muted py-10">No messages yet.</div>}
                                    </div>
                                </div>
                                <div id="chat-area" className="flex-grow flex flex-col relative">
                                    <div id="chat-header" className="flex-none p-6 border-b border-panel-border bg-panel-bg backdrop-filter backdrop-blur-md z-10 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => setChatOpenMobile(false)} id="close-chat-btn" className="lg:hidden h-8 w-8 flex-shrink-0 items-center justify-center header-btn"><i className="fa-solid fa-arrow-left text-lg"></i></button>
                                            <div>
                                                <h3 id="chat-user-name" className="font-bold text-lg text-text-primary">{currentChat.userName || 'Select a conversation'}</h3>
                                                <div className="flex items-center gap-2">
                                                    <p id="chat-user-email" className="text-sm text-text-secondary">{currentChat.userEmail || 'No user selected'}</p>
                                                    {currentChat.userId && <button onClick={handleCopyEmail} id="copy-email-btn" className="text-text-muted hover:text-active-link-icon transition-colors" title="Copy email"><i id="copy-email-btn-icon" className="fa-regular fa-copy"></i></button>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="chat-messages" className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar flex flex-col">
                                        {currentChat.userId ? currentChat.messages.map((msg, index) => (
                                            <div key={index} className={`chat-message-wrapper ${msg.sender === 'user' ? 'user-message' : 'admin-message'}`}>
                                                <div className="chat-bubble">
                                                    {msg.imageUrl ? <img src={msg.imageUrl} alt="Chat" className="chat-image" onClick={() => setPreviewImage(msg.imageUrl)} /> : <div className="chat-bubble-text"><p className="message-sender-name">{msg.sender === 'user' ? currentChat.userName : 'Admin'}</p><p className="message-text">{msg.text}</p></div>}
                                                </div>
                                                <p className="chat-timestamp">{new Date(msg.timestamp).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'})}</p>
                                            </div>
                                        )) : <div className="text-center text-text-muted py-10">No conversation selected.</div>}
                                        <div ref={chatMessagesEndRef} />
                                    </div>
                                    {uploadProgress >= 0 && <div id="chat-upload-progress-container" className="visible"><div className="progress-bar-container"><div id="chat-upload-progress-bar" className="progress-bar-inner" style={{width: `${uploadProgress}%`}}></div></div></div>}
                                    <form id="chat-input-form" data-active-user-id={currentChat.userId} onSubmit={handleSendMessage}>
                                        <input type="file" id="chat-image-input" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={!currentChat.userId || uploadProgress >= 0} />
                                        <button type="button" onClick={() => document.getElementById('chat-image-input').click()} id="chat-attach-btn" className="chat-action-btn" title="Attach Image" disabled={!currentChat.userId || uploadProgress >= 0}><i className="fa-solid fa-paperclip"></i></button>
                                        <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} id="chat-message-input" placeholder={uploadProgress >= 0 ? "Uploading image..." : "Type a message..."} disabled={!currentChat.userId || uploadProgress >= 0}/>
                                        <button type="submit" id="send-message-btn" className="chat-action-btn" title="Send Message" disabled={!currentChat.userId || uploadProgress >= 0}><i className="fa-solid fa-paper-plane"></i></button>
                                    </form>
                                </div>
                            </div>
                            
                            {/* Settings View */}
                            <div className={`${currentView !== 'settings' ? 'hidden' : ''}`}>
                                <div className="space-y-6 px-6 pb-6">
                                    <div className="pt-6 flex items-center gap-4">
                                        <button onClick={() => navigate('dashboard')} className="header-btn h-10 w-10 flex items-center justify-center flex-shrink-0"><i className="fa-solid fa-arrow-left text-lg"></i></button>
                                        <div><h2 className="text-2xl font-bold text-text-primary">Pricing Plan Settings</h2><p className="text-sm text-text-secondary mt-1">Manage your application's pricing plans.</p></div>
                                    </div>
                                    <div className="settings-layout">
                                        <div className="settings-panel">
                                            <div className="p-4 border-b border-panel-border">
                                                <button onClick={() => setActivePlanEditor({ index: -1 })} id="add-new-plan-btn" className="w-full flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-lg shadow-md"><i className="fa-solid fa-plus"></i>Add New Plan</button>
                                            </div>
                                            <div id="settings-plan-list" className="overflow-y-auto max-h-[60vh]">
                                                {pricingPlans.map((plan, index) => (
                                                    <div key={index} onClick={() => setActivePlanEditor({ index })} className={`plan-list-item ${activePlanEditor.index === index ? 'active' : ''}`}><div className="plan-name font-semibold text-text-primary">{plan.name || 'Untitled Plan'}</div><div className="text-sm text-text-secondary">{plan.price || '$0.00'} - {plan.period || 'N/A'}</div></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div id="settings-plan-editor" className="settings-panel">
                                            {activePlanEditor.index === -2 && <div className="plan-editor-placeholder p-6"><i className="fa-solid fa-wand-magic-sparkles text-5xl text-text-muted mb-4"></i><h3 className="font-bold text-lg">Manage Plans</h3><p className="max-w-xs mx-auto">Select a plan from the left to edit its details, or add a new one.</p></div>}
                                            {activePlanEditor.index > -2 && (
                                                <form className="p-6 space-y-5 animate-view-change" onSubmit={e => handlePlanFormSubmit(e, activePlanEditor.index)}>
                                                    {(() => {
                                                        const isNew = activePlanEditor.index === -1;
                                                        const plan = isNew ? { name: '', price: '', description: '', period: '', buttonText: 'Get Started', features: ['', '', ''], isRecommended: false } : pricingPlans[activePlanEditor.index];
                                                        return <>
                                                            <div><h3 className="text-lg font-bold text-text-primary">{isNew ? 'Create New Plan' : 'Edit Plan'}</h3><p className="text-sm text-text-secondary">Update the details for the pricing plan.</p></div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div><label className="block text-sm font-medium text-text-secondary mb-1">Plan Name</label><input type="text" name="name" defaultValue={plan.name} placeholder="e.g., Basic, Pro" className="settings-input w-full px-3 py-2 rounded-lg outline-none" required/></div>
                                                                <div><label className="block text-sm font-medium text-text-secondary mb-1">Price</label><input type="text" name="price" defaultValue={plan.price} placeholder="e.g., $10.00" className="settings-input w-full px-3 py-2 rounded-lg outline-none"/></div>
                                                            </div>
                                                            <div><label className="block text-sm font-medium text-text-secondary mb-1">Description</label><input type="text" name="description" defaultValue={plan.description} placeholder="Plan description" className="settings-input w-full px-3 py-2 rounded-lg outline-none"/></div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div><label className="block text-sm font-medium text-text-secondary mb-1">Period</label><input type="text" name="period" defaultValue={plan.period} placeholder="e.g., /1 month" className="settings-input w-full px-3 py-2 rounded-lg outline-none"/></div>
                                                                <div><label className="block text-sm font-medium text-text-secondary mb-1">Button Text</label><input type="text" name="buttonText" defaultValue={plan.buttonText} placeholder="e.g., Get Started" className="settings-input w-full px-3 py-2 rounded-lg outline-none"/></div>
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-text-secondary mb-1">Features (leave blank to hide)</label>
                                                                <div className="space-y-2 pt-1">{[0,1,2].map(i => <div key={i} className="flex items-center gap-2"><i className="fa-solid fa-check-circle text-green-500/70"></i><input type="text" defaultValue={plan.features?.[i] || ''} placeholder={`Feature ${i+1}`} className="feature-input settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none"/></div>)}</div>
                                                            </div>
                                                            <div className="pt-2"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="isRecommended" defaultChecked={plan.isRecommended} className="w-4 h-4 rounded text-active-link-icon focus:ring-active-link-icon"/><span className="text-sm font-medium text-text-secondary">Set as Recommended</span></label></div>
                                                            <div className="flex items-center justify-between pt-4 border-t border-panel-border">
                                                                <div>{!isNew && <button type="button" className="font-semibold text-sm text-red-500 hover:text-red-700 transition-colors" onClick={() => handlePlanDelete(activePlanEditor.index)}>Delete Plan</button>}</div>
                                                                <button type="submit" className="px-6 py-2.5 text-sm rounded-lg font-semibold text-white action-btn activate">{isNew ? 'Save Plan' : 'Update Plan'}</button>
                                                            </div>
                                                        </>
                                                    })()}
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                             
                            {/* Others Routers View */}
                            <div className={`${currentView !== 'routers' ? 'hidden' : ''}`}>
                                <div className="space-y-6 px-6 pb-6">
                                    <div className="pt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <button onClick={() => navigate('dashboard')} className="header-btn h-10 w-10 flex items-center justify-center flex-shrink-0"><i className="fa-solid fa-arrow-left text-lg"></i></button>
                                            <div><h2 className="text-2xl font-bold text-text-primary">Others Routers</h2></div>
                                        </div>
                                        <button onClick={handleAddNewRouter} className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold rounded-lg shadow-md action-btn activate"><i className="fa-solid fa-plus"></i>Add New Router</button>
                                    </div>
                                    <div className="space-y-4">
                                        {routers === null && <div className="text-center py-10"><div className="spinner"></div></div>}
                                        {routers && routers.length === 0 && <div className="text-center text-text-secondary py-10">No router configurations found. Click 'Add New Router' to start.</div>}
                                        {routers && routers.map((router, rIndex) => {
                                            const totalEntries = router.childKeys?.reduce((acc, ck) => acc + (ck.entries?.length || 0), 0) || 0;
                                            return (
                                                <div key={router.isNew ? `new-${rIndex}`: router.key} className="router-card-wrapper animate-stagger">
                                                    {!router.isNew && (
                                                        <div className="router-summary-card" onClick={() => handleRouterCardChange(rIndex, {...router, isExpanded: !router.isExpanded})}>
                                                            <div className="flex-grow flex items-center gap-4 overflow-hidden">
                                                                <i className="fa-solid fa-server text-xl" style={{color: 'var(--active-link-icon)'}}></i>
                                                                <div className="overflow-hidden"><p className="router-name-highlight truncate" title={router.key}>{router.key}</p><p className="text-xs text-text-secondary">{router.childKeys?.length || 0} Child Key(s), {totalEntries} Total Entrie(s). Click to expand.</p></div>
                                                            </div>
                                                            <div className="toggle-icon text-lg text-text-muted"><i className={`fa-solid ${router.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></div>
                                                        </div>
                                                    )}
                                                    {(router.isExpanded) && (
                                                        <div className="router-details-wrapper">
                                                            <form className="settings-panel p-6 router-details-editor" onSubmit={e => { e.preventDefault(); handleRouterUpdate(router.isNew ? null : router.key, e.target); }}>
                                                                <div className="space-y-4">
                                                                    <div className="pb-4 border-b" style={{borderColor: 'var(--panel-border)'}}>
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-text-secondary mb-1">{router.isNew ? "New Router Name (Key)" : "Router Name (Key)"}</label>
                                                                            <input type="text" defaultValue={router.key} required placeholder="unique-router-name" className="router-key-input settings-input w-full px-3 py-2 rounded-lg outline-none font-semibold text-lg"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="child-keys-container space-y-4">
                                                                        {router.childKeys.map((ck, ckIndex) => (
                                                                            <div key={ckIndex} className="child-key-section p-4">
                                                                                 <div className="flex justify-between items-center pb-3 mb-3 border-b" style={{borderColor: 'var(--input-border)'}}>
                                                                                    <div><label className="block text-xs font-medium text-text-secondary mb-1">Child Key Name</label><input type="text" required defaultValue={ck.key} className="child-key-input settings-input w-full px-3 py-1.5 rounded-md outline-none font-medium"/></div>
                                                                                    <button type="button" onClick={() => { const newCKs = [...router.childKeys]; newCKs.splice(ckIndex,1); handleRouterCardChange(rIndex, {...router, childKeys: newCKs}); }} className="text-red-500 hover:text-red-700 h-8 w-8 rounded-full hover:bg-red-500/10 flex items-center justify-center transition-colors"><i className="fa-solid fa-times"></i></button>
                                                                                </div>
                                                                                <div className="entries-container space-y-3">
                                                                                    {ck.entries.map((entry, eIndex) => (
                                                                                        <div key={eIndex} className="router-entry p-4 rounded-lg border space-y-3" style={{backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)'}}>
                                                                                             <div className="flex justify-between items-center"><p className="text-sm font-semibold text-text-secondary">Entry {eIndex + 1}</p><button type="button" onClick={() => { const newEntries = [...ck.entries]; newEntries.splice(eIndex,1); const newCKs = [...router.childKeys]; newCKs[ckIndex].entries = newEntries; handleRouterCardChange(rIndex, {...router, childKeys: newCKs}); }} className="text-red-500 hover:text-red-700 h-8 w-8 rounded-full hover:bg-red-500/10 flex items-center justify-center transition-colors"><i className="fa-solid fa-trash-alt"></i></button></div>
                                                                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                                                                <div><label className="block text-xs font-medium text-text-secondary mb-1">Hostname</label><input type="text" defaultValue={entry.Hostname} className="settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none entry-hostname"/></div>
                                                                                                <div><label className="block text-xs font-medium text-text-secondary mb-1">Jumper Link</label><input type="text" defaultValue={entry.Jumper_Link} className="settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none entry-jumperlink"/></div>
                                                                                                <div><label className="block text-xs font-medium text-text-secondary mb-1">Posted By</label><input type="text" defaultValue={entry.Posted_By} className="settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none entry-postedby"/></div>
                                                                                                <div><label className="block text-xs font-medium text-text-secondary mb-1">Probability</label><input type="text" defaultValue={entry.Probability} className="settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none entry-probability"/></div>
                                                                                                <div><label className="block text-xs font-medium text-text-secondary mb-1">Likes</label><input type="number" defaultValue={entry.Likes} className="settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none entry-likes"/></div>
                                                                                                <div><label className="block text-xs font-medium text-text-secondary mb-1">Dislikes</label><input type="number" defaultValue={entry.Dislikes} className="settings-input w-full px-3 py-1.5 rounded-md text-sm outline-none entry-dislikes"/></div>
                                                                                             </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <div className="mt-4"><button type="button" onClick={() => { const newEntries = [...ck.entries, {}]; const newCKs = [...router.childKeys]; newCKs[ckIndex].entries = newEntries; handleRouterCardChange(rIndex, {...router, childKeys: newCKs}); }} className="header-btn px-4 py-2 text-sm font-semibold w-full"><i className="fa-solid fa-plus mr-2"></i>Add Entry to this Key</button></div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="pt-4"><button type="button" onClick={() => handleRouterCardChange(rIndex, {...router, childKeys: [...router.childKeys, {key: '', entries: [{}]}]})} className="header-btn px-4 py-2 text-sm font-semibold w-full border-dashed"><i className="fa-solid fa-plus-circle mr-2"></i>Add New Child Key</button></div>
                                                                    <div className="pt-4 border-t flex justify-between items-center" style={{borderColor: 'var(--panel-border)'}}>
                                                                        {router.isNew ? 
                                                                            <button type="button" onClick={() => setRouters(routers.filter((_,i) => i !== rIndex))} className="header-btn px-4 py-2 text-sm font-semibold">Cancel</button>
                                                                            : <button type="button" onClick={() => handleRouterDelete(router.key)} className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors">Delete Router</button>
                                                                        }
                                                                        <button type="submit" className="action-btn activate px-5 py-2.5">{router.isNew ? "Save Router" : "Update Router"}</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                        </main>
                    </div>
                </div>
            </div>

            {/* Activation Modal */}
            {modalState.isVisible && (
                <div id="activation-modal-overlay" className="visible">
                    <div id="activation-modal">
                        <h2 className="text-xl font-bold text-text-primary mb-1">Activate User</h2>
                        <p className="text-text-secondary mb-6">Select an activation plan for the user.</p>
                        <div id="pricing-plans-container" className="space-y-3 mb-6">
                            {pricingPlans.map((plan, index) => (
                                <div key={index} onClick={() => setModalState(prev => ({ ...prev, selectedPlan: plan, error: '' }))} className={`plan-option relative ${modalState.selectedPlan?.name === plan.name ? 'selected' : ''}`}>
                                    <label className="flex justify-between items-center cursor-pointer">
                                        <div><h4 className="font-bold text-text-primary">{plan.name}</h4><p className="text-sm text-text-secondary">{plan.description}</p></div>
                                        <div className="text-right"><p className="text-lg font-bold text-text-primary">{plan.price}</p><p className="text-xs text-text-muted">{plan.period}</p></div>
                                    </label>
                                    {plan.isRecommended && <span className="absolute top-0 right-3 -translate-y-1/2 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Recommended</span>}
                                </div>
                            ))}
                        </div>
                        {modalState.error && <p id="modal-error" className="text-red-500 text-sm mb-4 text-center">{modalState.error}</p>}
                        <div className="flex justify-end gap-3">
                            <button id="modal-cancel-btn" onClick={() => setModalState({ isVisible: false, userId: null, error: '', selectedPlan: null })} className="px-4 py-2 rounded-lg font-semibold text-text-secondary hover:bg-gray-500/10 transition-colors">Cancel</button>
                            <button id="modal-confirm-btn" onClick={handleActivationConfirm} className="px-6 py-2 rounded-lg font-semibold text-white" style={{background: 'var(--primary-gradient)'}}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Image Preview Modal */}
            {previewImage && (
                <div id="image-preview-overlay" className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-[2000] flex items-center justify-center p-4" onClick={() => setPreviewImage(null)}>
                    <img id="preview-image-src" src={previewImage} alt="Image Preview" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl" style={{transform: 'scale(1)', opacity: 1}}/>
                    <button id="preview-close-btn" className="absolute top-5 right-5 text-white text-3xl font-bold" onClick={() => setPreviewImage(null)}><i className="fa-solid fa-times"></i></button>
                </div>
            )}
             
            {/* All CSS from the original file */}
            <style>{`
                :root { --bg-color: #f8fafc; --text-primary: #1e293b; --text-secondary: #475569; --text-muted: #94a3b8; --panel-bg: rgba(255, 255, 255, 0.8); --panel-border: #e2e8f0; --input-bg: white; --input-border: #cbd5e1; --active-link-bg: #e0f2fe; --active-link-text: #0284c7; --active-link-icon: #0ea5e9; --sidebar-width: 16rem; --sidebar-width-collapsed: 5rem; --green-glow: rgba(22, 163, 74, 0.5); --red-glow: rgba(220, 38, 38, 0.5); --primary-gradient: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); --active-link-icon-rgb: 14, 165, 233; }
                .dark { --bg-color: #0f172a; --text-primary: #f1f5f9; --text-secondary: #94a3b8; --text-muted: #64748b; --panel-bg: rgba(15, 23, 42, 0.7); --panel-border: #1e293b; --input-bg: rgba(30, 41, 59, 0.8); --input-border: #334155; --active-link-bg: rgba(168, 85, 247, 0.1); --active-link-text: #f1f5f9; --active-link-icon: #a855f7; --green-glow: rgba(74, 222, 128, 0.4); --red-glow: rgba(248, 113, 113, 0.4); --primary-gradient: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%); --active-link-icon-rgb: 168, 85, 247; }
                .mesh-gradient-bg::before, .mesh-gradient-bg::after { content: ''; position: fixed; top: 50%; left: 50%; pointer-events: none; z-index: -1; transition: opacity 0.7s ease; filter: blur(150px); }
                .mesh-gradient-bg::before { width: 800px; height: 800px; background-image: radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 60%); transform: translate(-80%, -60%) rotate(20deg); opacity: 1; }
                .mesh-gradient-bg::after { width: 800px; height: 800px; background-image: radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent 60%); transform: translate(30%, 40%) rotate(-30deg); opacity: 1; z-index: -2; }
                .dark .mesh-gradient-bg::before, .dark .mesh-gradient-bg::after { opacity: 0; }
                .dark .aurora-bg::before { content: ''; position: fixed; top: 50%; left: 50%; pointer-events: none; z-index: -1; transition: opacity 0.7s ease; width: 700px; height: 700px; background-image: radial-gradient(circle, rgba(168, 85, 247, 0.15), transparent 65%); filter: blur(120px); transform: translate(-50%, -50%); opacity: 1; }
                body { font-family: 'Inter', sans-serif; background-color: var(--bg-color); color: var(--text-primary); transition: background-color 0.4s ease, color 0.4s ease; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes panIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes stagger-in { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                .animate-on-load { animation: fadeIn 0.8s ease-out forwards; }
                .animate-view-change { animation: panIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
                .animate-stagger { opacity: 0; animation: stagger-in 0.5s ease-out forwards; animation-delay: var(--stagger-delay, 0s); }
                @keyframes continuous-shine-ltr { from { transform: translateX(-110%) skewX(-25deg); } to { transform: translateX(220%) skewX(-25deg); } }
                @keyframes continuous-shine-rtl { from { transform: translateX(220%) skewX(-25deg); } to { transform: translateX(-110%) skewX(-25deg); } }
                #page-loader { position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background-color: var(--bg-color); transition: opacity 0.4s ease-out; }
                .spinner { width: 48px; height: 48px; border-radius: 50%; border: 5px solid var(--panel-border); border-top-color: var(--active-link-icon); animation: spin 1s linear infinite; }
                .header { background-color: var(--panel-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--panel-border); }
                .sidebar { position: fixed; top: 0; left: 0; height: 100vh; background-color: var(--panel-bg); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-right: 1px solid var(--panel-border); width: var(--sidebar-width); z-index: 100; display: flex; flex-direction: column; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease; }
                .content-wrapper { transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1); margin-left: var(--sidebar-width); }
                .sidebar.collapsed { width: var(--sidebar-width-collapsed); }
                .sidebar.collapsed ~ .content-wrapper { margin-left: var(--sidebar-width-collapsed); }
                .search-input, .settings-input { background-color: var(--input-bg); border: 1px solid var(--input-border); transition: border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.4s ease; }
                .search-input:focus, .settings-input:focus { box-shadow: 0 0 0 4px var(--active-link-bg); border-color: var(--active-link-icon); }
                .stat-card { position: relative; background-color: var(--panel-bg); border-radius: 1rem; border: 1px solid var(--panel-border); transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden; cursor: pointer; backdrop-filter: blur(10px); }
                .stat-card:hover { transform: translateY(-8px); border-color: var(--active-link-icon); box-shadow: 0 10px 30px -5px rgba(14, 165, 233, 0.3); }
                .dark .stat-card:hover { box-shadow: 0 10px 30px -5px rgba(168, 85, 247, 0.3); }
                .stat-card.has-new-messages { border-color: var(--active-link-icon); box-shadow: 0 0 0 4px var(--active-link-bg); animation: pulse-glow 1.5s infinite; }
                @keyframes pulse-glow { 0% { box-shadow: 0 0 0 0 rgba(var(--active-link-icon-rgb), 0.7); } 70% { box-shadow: 0 0 0 10px rgba(var(--active-link-icon-rgb), 0); } 100% { box-shadow: 0 0 0 0 rgba(var(--active-link-icon-rgb), 0); } }
                .stat-icon { background-color: var(--active-link-bg); color: var(--active-link-icon); }
                .action-btn { padding: 8px 14px; line-height: 1; border-radius: 6px; font-weight: 600; font-size: 0.8rem; color: white; transition: all 0.3s ease; border: none; background-size: 200% auto; cursor: pointer; box-shadow: 0 2px 8px -3px rgba(0,0,0,0.2); }
                #see-more-btn { width: 100%; max-width: 250px; margin: 1.5rem auto 0; display: block; padding: 0.75rem 1rem; font-weight: 600; border-radius: 8px; color: var(--active-link-text); background-color: var(--active-link-bg); border: 1px solid var(--active-link-icon); transition: all 0.3s ease; }
                #see-more-btn:hover:not(:disabled) { background-image: var(--primary-gradient); color: white; transform: translateY(-3px); box-shadow: 0 8px 20px -6px rgba(var(--active-link-icon-rgb), 0.5); }
                #see-more-btn:disabled { cursor: not-allowed; opacity: 0.6; }
                .action-btn.activate { background-image: linear-gradient(to right, #22c55e 0%, #16a34a 51%, #15803d 100%); }
                .action-btn.deactivate { background-image: linear-gradient(to right, #ef4444 0%, #dc2626 51%, #b91c1c 100%); }
                .action-btn:hover:not(:disabled) { background-position: right center; transform: translateY(-2px); box-shadow: 0 7px 20px -4px var(--glow-color, rgba(0,0,0,0.4)); }
                .action-btn.activate:hover { --glow-color: var(--green-glow); }
                .action-btn.deactivate:hover { --glow-color: var(--red-glow); }
                .action-btn:disabled { cursor: not-allowed; opacity: 0.7; }
                .header-btn { background-color: var(--input-bg); border: 1px solid var(--input-border); color: var(--text-secondary); border-radius: 0.5rem; transition: all 0.2s ease-out; }
                .header-btn:hover { color: var(--active-link-icon); border-color: var(--active-link-icon); transform: scale(1.1) rotate(-5deg); }
                .user-filter-btn { color: var(--text-secondary); }
                .user-filter-btn.active { background-image: var(--primary-gradient); color: white; box-shadow: 0 4px 10px -4px rgba(var(--active-link-icon-rgb), 0.5); }
                .user-card { background-color: var(--panel-bg); backdrop-filter: blur(12px); padding: 1.25rem; box-shadow: 0 4px 15px -2px rgba(0,0,0,0.06); transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); position: relative; overflow: hidden; display: flex; flex-direction: column; border-radius: 1.25rem; border: 1px solid var(--panel-border); }
                .user-card::before { content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%); animation: continuous-shine-ltr 5s linear infinite; animation-delay: var(--shine-delay); pointer-events: none; z-index: 1; }
                .dark .user-card::before { background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0) 100%); }
                #user-list-container .user-card:nth-child(even)::before { animation-name: continuous-shine-rtl; }
                .user-card::after { content: ''; position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%); transform: translateX(-180%) skewX(-25deg); pointer-events: none; z-index: 2; transition: transform 0.85s cubic-bezier(0.2, 1, 0.3, 1); }
                .user-card:hover::after { transform: translateX(280%) skewX(-25deg); }
                .dark .user-card::after { background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%); }
                .user-card > * { position: relative; z-index: 3; }
                .user-card:hover { transform: translateY(-8px) scale(1.03); box-shadow: 0 20px 40px -10px rgba(14, 165, 233, 0.3); border-color: var(--active-link-icon); }
                .dark .user-card:hover { box-shadow: 0 20px 40px -10px rgba(168, 85, 247, 0.3); border-color: var(--active-link-icon); }
                .user-card .user-avatar { transition: transform 0.3s ease; }
                .user-card:hover .user-avatar { transform: scale(1.1); }
                .sidebar-header { border-bottom: 1px solid var(--panel-border); }
                .nav-link { display: flex; align-items: center; gap: 1rem; padding: 0.8rem 1.5rem; color: var(--text-secondary); font-weight: 600; transition: all 0.25s ease-in-out; white-space: nowrap; border-radius: 0.75rem; margin: 0.25rem 0.5rem; position: relative; }
                .nav-link:hover { color: var(--active-link-text); background-color: var(--active-link-bg); transform: translateX(5px); }
                .nav-link.active { color: white; font-weight: 700; background-image: var(--primary-gradient); box-shadow: 0 8px 20px -6px rgba(var(--active-link-icon-rgb), 0.5); transform: scale(1.03) translateX(5px); }
                .dark .nav-link.active { box-shadow: 0 8px 20px -6px rgba(var(--active-link-icon-rgb), 0.4); }
                .nav-link i { font-size: 1.1rem; width: 1.5rem; text-align: center; transition: transform 0.3s ease; }
                .nav-link.active i { color: white; }
                .nav-link:hover i { transform: scale(1.1); }
                .sidebar.collapsed .nav-link { justify-content: center; padding: 0.8rem 0; }
                .sidebar.collapsed .nav-link-text, .sidebar.collapsed .logo-text { display: none; }
                #logout-btn:hover { color: #ef4444; background-color: rgba(239, 68, 68, 0.1); }
                .dark #logout-btn:hover { color: #f87171; background-color: rgba(248, 113, 113, 0.1); }
                .card-loading-overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(255, 255, 255, 0.85); opacity: 0; pointer-events: none; transition: opacity 0.25s ease-in-out; z-index: 10; border-radius: inherit; }
                .dark .card-loading-overlay { background: rgba(15, 23, 42, 0.85); }
                .user-card.is-loading .card-loading-overlay { opacity: 1; pointer-events: auto; }
                .loading-content { transform: scale(0.9); opacity: 0; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease; transition-delay: 0.05s; }
                .user-card.is-loading .loading-content { transform: scale(1); opacity: 1; }
                .fancy-spinner { width: 44px; height: 44px; border-radius: 50%; border: 4px solid var(--panel-border); border-top-color: var(--active-link-icon); animation: spin 0.85s cubic-bezier(0.25, 0.1, 0.25, 1) infinite; }
                .loading-text { font-weight: 600; font-size: 0.9rem; margin-top: 0.75rem; color: var(--text-primary); }
                #activation-modal-overlay { position: fixed; inset: 0; background-color: rgba(0,0,0,0.6); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
                #activation-modal-overlay.visible { opacity: 1; pointer-events: auto; }
                #activation-modal { background-color: var(--bg-color); color: var(--text-primary); border-radius: 1rem; padding: 2rem; width: 90%; max-width: 500px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); border: 1px solid var(--panel-border); transform: scale(0.95); transition: transform 0.3s ease; }
                #activation-modal-overlay.visible #activation-modal { transform: scale(1); }
                .plan-option { border: 2px solid var(--input-border); border-radius: 0.75rem; padding: 1rem; transition: all 0.2s ease; cursor: pointer; }
                .plan-option:hover { border-color: var(--active-link-icon); }
                .plan-option.selected { border-color: var(--active-link-icon); box-shadow: 0 0 0 3px var(--active-link-bg); }
                .settings-layout { display: grid; grid-template-columns: 300px 1fr; gap: 1.5rem; align-items: flex-start; }
                .settings-panel { background-color: var(--panel-bg); backdrop-filter: blur(12px); border-radius: 1.25rem; border: 1px solid var(--panel-border); box-shadow: 0 4px 15px -2px rgba(0,0,0,0.06); transition: all 0.3s ease; }
                .plan-list-item { padding: 1rem; cursor: pointer; border-bottom: 1px solid var(--panel-border); transition: background-color 0.2s ease; }
                .plan-list-item:last-child { border-bottom: none; }
                .plan-list-item:hover { background-color: rgba(128, 128, 128, 0.1); }
                .plan-list-item.active { background-color: var(--active-link-bg); }
                .plan-list-item.active .plan-name { color: var(--active-link-text); font-weight: 700; }
                .plan-editor-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 400px; text-align: center; color: var(--text-secondary); }
                #add-new-plan-btn { background-image: var(--primary-gradient); color: white; transition: all 0.3s ease; background-size: 200% auto; }
                #add-new-plan-btn:hover { background-position: right center; transform: scale(1.05); }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: var(--panel-bg); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--input-border); border-radius: 10px; border: 2px solid var(--panel-bg); }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }
                .chat-message-wrapper { display: flex; flex-direction: column; gap: 0.25rem; max-width: 75%; width: -moz-fit-content; width: fit-content; }
                .chat-message-wrapper.user-message { align-self: flex-start; }
                .chat-message-wrapper.admin-message { align-self: flex-end; }
                .chat-bubble { padding: 0.5rem; border-radius: 1.25rem; line-height: 1.5; word-wrap: break-word; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: transform 0.2s ease; }
                .chat-bubble:hover { transform: translateY(-2px); }
                .chat-bubble-text { padding: 0.5rem 0.75rem; }
                .user-message .chat-bubble { background-color: var(--active-link-bg); color: var(--active-link-text); border-bottom-left-radius: 0.25rem; }
                .admin-message .chat-bubble { background-color: var(--panel-border); color: var(--text-primary); border-bottom-right-radius: 0.25rem; }
                .dark .admin-message .chat-bubble { background-color: #334155; color: var(--text-primary); }
                .message-sender-name { font-weight: 600; font-size: 0.8rem; margin-bottom: 0.1rem; color: var(--text-secondary); }
                .user-message .message-sender-name { color: var(--active-link-icon); }
                .dark .user-message .message-sender-name { color: var(--active-link-icon); }
                .message-text { font-size: 0.9rem; color: inherit; }
                .chat-image { max-width: 280px; max-height: 280px; object-fit: cover; border-radius: 1rem; cursor: pointer; display: block; transition: filter 0.2s ease; }
                .chat-image:hover { filter: brightness(1.1); }
                .chat-timestamp { font-size: 0.7rem; color: var(--text-muted); }
                .user-message .chat-timestamp { align-self: flex-start; padding-left: 0.25rem; }
                .admin-message .chat-timestamp { align-self: flex-end; padding-right: 0.25rem; }
                #chat-input-form { background-color: var(--panel-bg); backdrop-filter: blur(12px); border-top: 1px solid var(--panel-border); padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.75rem; transition: background-color 0.4s ease, border-color 0.4s ease; }
                #chat-message-input { flex-grow: 1; min-width: 0; background-color: var(--input-bg); border: 1px solid var(--input-border); border-radius: 9999px; padding: 0.65rem 1.25rem; font-size: 0.95rem; color: var(--text-primary); outline: none; transition: all 0.3s ease; }
                #chat-message-input:focus { border-color: var(--active-link-icon); box-shadow: 0 0 0 3px var(--active-link-bg); }
                #chat-message-input::placeholder { color: var(--text-muted); }
                #chat-message-input:disabled { background-color: var(--panel-border); cursor: not-allowed; }
                .chat-action-btn { flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease; }
                .chat-action-btn i { font-size: 1.1rem; }
                #chat-attach-btn { background-color: var(--input-bg); border: 1px solid var(--input-border); color: var(--text-secondary); }
                #chat-attach-btn:hover:not(:disabled) { border-color: var(--active-link-icon); color: var(--active-link-icon); transform: scale(1.1); }
                #send-message-btn { background-image: var(--primary-gradient); color: white; box-shadow: 0 4px 10px -4px rgba(var(--active-link-icon-rgb), 0.5); }
                #send-message-btn:hover:not(:disabled) { transform: scale(1.1); box-shadow: 0 7px 15px -5px rgba(var(--active-link-icon-rgb), 0.6); }
                #send-message-btn:active:not(:disabled) { transform: scale(1.05); }
                #send-message-btn:disabled, #chat-attach-btn:disabled { background: var(--input-border); cursor: not-allowed; box-shadow: none; opacity: 0.6; }
                #send-message-btn i { margin-left: 1px; }
                #chat-upload-progress-container { position: absolute; bottom: 100%; left: 0; width: 100%; background: var(--panel-bg); padding: 0.5rem 1rem; border-top: 1px solid var(--panel-border); opacity: 0; transform: translateY(10px); pointer-events: none; transition: opacity 0.3s ease, transform 0.3s ease; }
                #chat-upload-progress-container.visible { opacity: 1; transform: translateY(0); }
                .progress-bar-container { width: 100%; background-color: var(--input-bg); border-radius: 9999px; height: 8px; position: relative; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); border: 1px solid var(--panel-border); }
                .progress-bar-inner { height: 100%; border-radius: 9999px; transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1); background-image: var(--primary-gradient); }
                #image-preview-overlay { transition: opacity 0.3s ease; }
                #image-preview-overlay.hidden { opacity: 0; pointer-events: none; }
                #preview-image-src { transition: transform 0.3s ease, opacity 0.3s ease; transform: scale(0.95); opacity: 0; }
                #image-preview-overlay:not(.hidden) #preview-image-src { transform: scale(1); opacity: 1; }
                #preview-close-btn { transition: transform 0.3s ease; width: 44px; height: 44px; background-color: rgba(0,0,0,0.3); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
                #preview-close-btn:hover { transform: scale(1.1) rotate(90deg); }
                .inbox-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-radius: 0.75rem; cursor: pointer; transition: background-color 0.2s ease, transform 0.1s ease; border: 1px solid transparent; }
                .inbox-item:hover { background-color: var(--active-link-bg); border-color: var(--active-link-icon); transform: translateY(-2px); }
                .inbox-item.active-chat { background-color: var(--active-link-bg); border-color: var(--active-link-icon); box-shadow: 0 0 0 3px var(--active-link-bg); }
                .inbox-item.unread { background-color: rgba(var(--active-link-icon-rgb), 0.1); font-weight: 700; }
                .dark .inbox-item.unread { background-color: rgba(var(--active-link-icon-rgb), 0.05); }
                .inbox-item.unread .inbox-user-name, .inbox-item.unread .inbox-last-message { font-weight: 700; }
                .inbox-item .unread-dot { background-color: var(--active-link-icon); box-shadow: 0 0 0 2px rgba(var(--active-link-icon-rgb), 0.5); }
                .router-summary-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem 1.5rem; background-color: var(--panel-bg); border: 1px solid var(--panel-border); border-radius: 1rem; cursor: pointer; transition: all 0.3s ease; backdrop-filter: blur(10px); box-shadow: 0 4px 15px -2px rgba(0,0,0,0.05); }
                .router-summary-card:hover { transform: translateY(-4px); border-color: var(--active-link-icon); box-shadow: 0 10px 25px -8px rgba(var(--active-link-icon-rgb), 0.3); }
                .router-name-highlight { font-weight: 700; font-size: 1.1rem; color: var(--text-primary); transition: color 0.3s ease; }
                .router-summary-card:hover .router-name-highlight { color: var(--active-link-icon); }
                .toggle-icon i { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                .router-details-wrapper.hidden { display: none; }
                .router-details-wrapper { margin-top: -0.5rem; padding-top: 0.5rem; }
                .router-details-editor { animation: panIn 0.4s ease-out forwards; }
                .child-key-section { background-color: rgba(128, 128, 128, 0.05); border: 1px solid var(--panel-border); border-radius: 0.75rem; margin-top: 1rem; }
                .dark .child-key-section { background-color: rgba(255, 255, 255, 0.03); }
                @media (max-width: 1024px) {
                    .sidebar { transform: translateX(-105%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
                    .sidebar.open { transform: translateX(0); }
                    .content-wrapper { margin-left: 0 !important; }
                    .sidebar-overlay { position: fixed; inset: 0; z-index: 99; background-color: rgba(0, 0, 0, 0.6); transition: opacity 0.3s ease-in-out; opacity: 0; pointer-events: none; }
                    .sidebar-overlay.open { opacity: 1; pointer-events: auto; }
                    #messages-view { flex-direction: column; }
                    #messages-view > div:first-child { width: 100%; height: 100%; position: absolute; top: 0; left: 0; transform: translateX(0); transition: transform 0.3s ease-in-out; z-index: 1000; }
                    #messages-view.chat-open-mobile > div:first-child { transform: translateX(-100%); }
                    #chat-area { width: 100%; position: absolute; height: 100%; top: 0; left: 0; transform: translateX(100%); transition: transform 0.3s ease-in-out; background-color: var(--bg-color); }
                    #messages-view.chat-open-mobile #chat-area { transform: translateX(0); }
                    #chat-header #close-chat-btn { display: flex; }
                }
                @media (max-width: 768px) { .settings-layout { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default Admin;
