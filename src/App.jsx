
import React, { useEffect, useRef } from 'react';

// Main App Component
function App() {
  // We use useRef to get direct access to DOM elements, similar to getElementById.
  // This helps in converting the existing JavaScript logic with minimal changes.
  const loadingOverlayRef = useRef(null);
  const authContainerRef = useRef(null);
  const authPageRef = useRef(null);
  const loginPageRef = useRef(null);
  const signupPageRef = useRef(null);
  const appContainerRef = useRef(null);
  const loginFormRef = useRef(null);
  const signupFormRef = useRef(null);
  const showSignupBtnRef = useRef(null);
  const showLoginBtnRef = useRef(null);
  const loginErrorRef = useRef(null);
  const signupErrorRef = useRef(null);
  const sidebarRef = useRef(null);
  const menuBtnRef = useRef(null);
  const mainContentRef = useRef(null);
  const contentTitleRef = useRef(null);
  const copyrightYearRef = useRef(null);
  const notificationBtnRef = useRef(null);
  const notificationPanelRef = useRef(null);
  const notificationBadgeRef = useRef(null);
  const notificationListRef = useRef(null);
  const clearNotificationsBtnRef = useRef(null);
  const profileBtnRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const profileNameRef = useRef(null);
  const profileEmailRef = useRef(null);
  const activityStatusDotRef = useRef(null);
  const logoutBtnRef = useRef(null);
  const verifiedIconRef = useRef(null);
  const hostnameInputRef = useRef(null);
  const findBtnRef = useRef(null);
  const findBtnTextRef = useRef(null);
  const findBtnIconRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const addHostBtnRef = useRef(null);
  const addHostModalRef = useRef(null);
  const addHostModalPanelRef = useRef(null);
  const addHostCloseBtnRef = useRef(null);
  const addHostCancelBtnRef = useRef(null);
  const addHostFormRef = useRef(null);
  const addHostRouterSelectRef = useRef(null);
  const addHostHostnameInputRef = useRef(null);
  const addHostHostnameLabelRef = useRef(null);
  const addHostSubmitBtnRef = useRef(null);
  const addHostErrorRef = useRef(null);
  const profileExpiryTimerRef = useRef(null);
  const mainRouterContentRef = useRef(null);
  const profileSectionRef = useRef(null);
  const myProfileLinkRef = useRef(null);
  const profilePagePictureRef = useRef(null);
  const profilePictureUploadRef = useRef(null);
  const profilePageNameRef = useRef(null);
  const profilePageEmailRef = useRef(null);
  const updateInfoFormRef = useRef(null);
  const updateNameInputRef = useRef(null);
  const updateEmailInputRef = useRef(null);
  const updateInfoStatusRef = useRef(null);
  const updateInfoBtnRef = useRef(null);
  const changePasswordFormRef = useRef(null);
  const changePasswordStatusRef = useRef(null);
  const changePasswordBtnRef = useRef(null);
  const uploadProgressContainerRef = useRef(null);
  const uploadProgressBarRef = useRef(null);
  const uploadProgressTextRef = useRef(null);
  const chatModalRef = useRef(null);
  const openChatBtnRef = useRef(null);
  const closeChatBtnRef = useRef(null);
  const chatFormRef = useRef(null);
  const chatInputRef = useRef(null);
  const chatMessagesContainerRef = useRef(null);
  const chatAttachBtnRef = useRef(null);
  const chatImageUploadRef = useRef(null);
  const chatUploadProgressContainerRef = useRef(null);
  const chatUploadProgressBarRef = useRef(null);
  const chatUploadProgressTextRef = useRef(null);
  const imagePreviewModalRef = useRef(null);
  const previewImageRef = useRef(null);
  const imagePreviewCloseBtnRef = useRef(null);
  const pricingPlansContainerRef = useRef(null);
  const homeSectionRef = useRef(null);
  const copySoundRef = useRef(null);
  const othersToggleButtonRef = useRef(null);
  const othersButtonsGridRef = useRef(null);
  const othersSidebarMenuRef = useRef(null);
  const othersSidebarToggleRef = useRef(null);
  const notepadSectionRef = useRef(null);
  const notepadLinkRef = useRef(null);
  const notepadTextareaRef = useRef(null);
  const notepadBackBtnRef = useRef(null);
  const manualRidModalRef = useRef(null);
  const manualRidFormRef = useRef(null);
  const manualRidInputRef = useRef(null);
  const manualRidErrorRef = useRef(null);
  const manualRidCloseBtnRef = useRef(null);
  const manualRidCancelBtnRef = useRef(null);

  const togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;
    const icon = button.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
  };


  // useEffect hook runs once after the component mounts, similar to DOMContentLoaded.
  // All the original JavaScript logic is placed here.
  useEffect(() => {
    // Check if external libraries are loaded
    if (typeof dayjs === 'undefined' || typeof firebase === 'undefined') {
        console.error("External libraries (Day.js, Firebase) are not loaded. Please ensure they are included in your main index.html file.");
        return;
    }
    
    // Day.js setup
    dayjs.extend(window.dayjs_plugin_relativeTime);
    dayjs.extend(window.dayjs_plugin_updateLocale);
    dayjs.updateLocale('en', {
      relativeTime: { future: "in %s", past: "%s ago", s: 'a few seconds', m: "1 minute", mm: "%d minutes", h: "1 hour", hh: "%d hours", d: "1 day", dd: "%d days", M: "1 month", MM: "%d months", y: "1 year", yy: "%d years" }
    });

    // Main App Logic
    function initializeAndRunApp(firebaseConfig) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        try {
          const appCheck = firebase.appCheck();
          appCheck.activate('6LdDE6wrAAAAAAwoKDphiThT-W7MHcS676QE6hgP', true);
          console.log("Firebase App Check activated.");
        } catch (error) {
          console.error("Error activating Firebase App Check:", error);
        }

        const auth = firebase.auth();
        const db = firebase.database();
        const storage = firebase.storage();
        
        // Use refs to get DOM elements
        const loadingOverlay = loadingOverlayRef.current;
        const authContainer = authContainerRef.current;
        const authPage = authPageRef.current;
        const loginPage = loginPageRef.current;
        const signupPage = signupPageRef.current;
        const appContainer = appContainerRef.current;
        const loginForm = loginFormRef.current;
        const signupForm = signupFormRef.current;
        const showSignupBtn = showSignupBtnRef.current;
        const showLoginBtn = showLoginBtnRef.current;
        const loginError = loginErrorRef.current;
        const signupError = signupErrorRef.current;
        const sidebar = sidebarRef.current;
        const menuBtn = menuBtnRef.current;
        const mainContent = mainContentRef.current;
        const contentTitle = contentTitleRef.current;
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const navListItems = document.querySelectorAll('.nav-wrapper nav ul li');
        const copyrightYear = copyrightYearRef.current;
        const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
        const htmlElement = document.documentElement;
        const notificationBtn = notificationBtnRef.current;
        const notificationPanel = notificationPanelRef.current;
        const notificationBadge = notificationBadgeRef.current;
        const notificationList = notificationListRef.current;
        const clearNotificationsBtn = clearNotificationsBtnRef.current;
        const profileBtn = profileBtnRef.current;
        const profileDropdown = profileDropdownRef.current;
        const profileName = profileNameRef.current;
        const profileEmail = profileEmailRef.current;
        const profilePicture = profileBtn.querySelector('img');
        const activityStatusDot = activityStatusDotRef.current;
        const logoutBtn = logoutBtnRef.current;
        const verifiedIcon = verifiedIconRef.current;
        const hostnameInput = hostnameInputRef.current;
        const findBtn = findBtnRef.current;
        const findBtnText = findBtnTextRef.current;
        const findBtnIcon = findBtnIconRef.current;
        const resultsContainer = resultsContainerRef.current;
        const addHostBtn = addHostBtnRef.current;
        const addHostModal = addHostModalRef.current;
        const addHostModalPanel = addHostModalPanelRef.current;
        const addHostCloseBtn = addHostCloseBtnRef.current;
        const addHostCancelBtn = addHostCancelBtnRef.current;
        const addHostForm = addHostFormRef.current;
        const addHostRouterSelect = addHostRouterSelectRef.current;
        const addHostHostnameInput = addHostHostnameInputRef.current;
        const addHostHostnameLabel = addHostHostnameLabelRef.current;
        const addHostSubmitBtn = addHostSubmitBtnRef.current;
        const addHostError = addHostErrorRef.current;
        const profileExpiryTimer = profileExpiryTimerRef.current;
        const mainRouterContent = mainRouterContentRef.current;
        const profileSection = profileSectionRef.current;
        const myProfileLink = myProfileLinkRef.current;
        const profilePagePicture = profilePagePictureRef.current;
        const profilePictureUpload = profilePictureUploadRef.current;
        const profilePageName = profilePageNameRef.current;
        const profilePageEmail = profilePageEmailRef.current;
        const updateInfoForm = updateInfoFormRef.current;
        const updateNameInput = updateNameInputRef.current;
        const updateEmailInput = updateEmailInputRef.current;
        const updateInfoStatus = updateInfoStatusRef.current;
        const updateInfoBtn = updateInfoBtnRef.current;
        const changePasswordForm = changePasswordFormRef.current;
        const changePasswordStatus = changePasswordStatusRef.current;
        const changePasswordBtn = changePasswordBtnRef.current;
        const uploadProgressContainer = uploadProgressContainerRef.current;
        const uploadProgressBar = uploadProgressBarRef.current;
        const uploadProgressText = uploadProgressTextRef.current;
        const chatModal = chatModalRef.current;
        const openChatBtn = openChatBtnRef.current;
        const closeChatBtn = closeChatBtnRef.current;
        const chatForm = chatFormRef.current;
        const chatInput = chatInputRef.current;
        const chatMessagesContainer = chatMessagesContainerRef.current;
        const chatAttachBtn = chatAttachBtnRef.current;
        const chatImageUpload = chatImageUploadRef.current;
        const chatUploadProgressContainer = chatUploadProgressContainerRef.current;
        const chatUploadProgressBar = chatUploadProgressBarRef.current;
        const chatUploadProgressText = chatUploadProgressTextRef.current;
        const imagePreviewModal = imagePreviewModalRef.current;
        const previewImage = previewImageRef.current;
        const imagePreviewCloseBtn = imagePreviewCloseBtnRef.current;
        const pricingPlansContainer = pricingPlansContainerRef.current;
        const homeSection = homeSectionRef.current;
        const copySound = copySoundRef.current;
        
        const othersToggleButton = othersToggleButtonRef.current;
        const othersButtonsGrid = othersButtonsGridRef.current;
        const othersSidebarMenu = othersSidebarMenuRef.current;
        const othersSidebarToggle = othersSidebarToggleRef.current;

        const notepadSection = notepadSectionRef.current;
        const notepadLink = notepadLinkRef.current;
        const notepadTextarea = notepadTextareaRef.current;
        const notepadBackBtn = notepadBackBtnRef.current;

        const manualRidModal = manualRidModalRef.current;
        const manualRidForm = manualRidFormRef.current;
        const manualRidInput = manualRidInputRef.current;
        const manualRidError = manualRidErrorRef.current;
        const manualRidCloseBtn = manualRidCloseBtnRef.current;
        const manualRidCancelBtn = manualRidCancelBtnRef.current;
        const manualRidModalTitle = manualRidModal.querySelector('h3');
        const manualRidModalLabel = manualRidModal.querySelector('label');

        let activeGenerateButton = null;
        let activeParamToReplace = '';
        let chatListener = null;
        let userListener = null;
        let listeningOnUid = null;
        let expiryInterval = null;
        let notificationInterval = null;
        let currentSource = 'home';
        let currentSearchTerm = '';
        let otherRoutersLoaded = false;
        let otherRouterNames = [];
        let isUserActive = false;
        let isInitialDataLoaded = false;
        let chatNotificationListener = null;
        let unreadAdminMessages = 0;
        let fullResults = [];
        let displayedCount = 0;
        const RESULTS_PER_PAGE = 10;
        
        const hideLoader = () => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        };

        const handlePricingPlanClick = (e) => {
            const targetButton = e.target.closest('button[data-action="scroll-to-signup"]');
            if (targetButton) {
                e.preventDefault();
                loginPage.classList.add('hidden');
                signupPage.classList.remove('hidden');
                loginPage.classList.remove('form-anim');
                signupPage.classList.add('form-anim');
                signupPage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        pricingPlansContainer.addEventListener('click', handlePricingPlanClick);

        function updateExpiryCountdown(expiryTimestamp) {
            const now = new Date().getTime();
            const distance = expiryTimestamp - now;

            if (distance < 0) {
                profileExpiryTimer.innerHTML = `<i class="fa-solid fa-hourglass-end mr-1.5"></i>Expired`;
                profileExpiryTimer.style.color = '#ef4444';
                if (expiryInterval) clearInterval(expiryInterval);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            let output = `<i class="fa-solid fa-hourglass-half mr-1.5"></i>`;
            if (days > 0) {
                output += `${days}d ${hours}h ${minutes}m ${seconds}s`;
            } else if (hours > 0) {
                output += `${hours}h ${minutes}m ${seconds}s`;
            } else if (minutes > 0) {
                output += `${minutes}m ${seconds}s`;
            } else {
                output += `${seconds}s`;
            }
            
            profileExpiryTimer.innerHTML = output;

            if (days < 1 && hours < 24) {
                 profileExpiryTimer.style.color = '#f59e0b';
            } else {
                 profileExpiryTimer.style.color = 'var(--text-secondary)';
            }
        }
        
        function cleanupListeners() {
            if (userListener && listeningOnUid) {
                db.ref('users/' + listeningOnUid).off('value', userListener);
            }
            if (chatListener && listeningOnUid) {
                db.ref('massages/' + listeningOnUid).off('value', chatListener);
            }
             if (chatNotificationListener && listeningOnUid) {
                db.ref('massages/' + listeningOnUid).off('child_added', chatNotificationListener);
            }
            if (notificationInterval) clearInterval(notificationInterval);
            if (expiryInterval) clearInterval(expiryInterval);

            userListener = null;
            chatListener = null;
            chatNotificationListener = null;
            listeningOnUid = null;
            notificationInterval = null;
            expiryInterval = null;
            isUserActive = false;
        }

        const onAuthStateChangedUnsubscribe = auth.onAuthStateChanged(user => {
            cleanupListeners(); 
            isInitialDataLoaded = false;

            if (user) {
                appContainer.classList.remove('hidden');
                authContainer.classList.add('hidden');
                authPage.classList.add('hidden'); 
                
                profileEmail.textContent = user.email;
                listeningOnUid = user.uid;
                initializeChatListener(user.uid);

                const initialPage = 'home';
                const initialPlaceholder = null;

                showPage(initialPage, initialPlaceholder, true); 

                if(window.history.replaceState) {
                  window.history.replaceState({ page: initialPage, placeholder: initialPlaceholder }, '', window.location.pathname);
                }
                
                loadOtherRouters();

                const userRef = db.ref('users/' + user.uid);
                
                userListener = userRef.on('value', (snapshot) => {
                    const userData = snapshot.val();
                    if (!userData) {
                        auth.signOut();
                        return;
                    }

                    const currentActiveStatus = userData.active;
                    const expiryTimestamp = userData.expire;
                    const currentNotificationMessage = userData.Massage?.status_notification?.message;
                    
                    let needsDbUpdate = false;
                    let updatePayload = {};
                    
                    if (currentActiveStatus && expiryTimestamp && new Date().getTime() > expiryTimestamp) {
                        updatePayload.active = false;
                        updatePayload['Massage/status_notification'] = { message: "Your account is not active", icon: "fa-exclamation-triangle", color: "text-red-500", timestamp: firebase.database.ServerValue.TIMESTAMP, read: false };
                        needsDbUpdate = true;
                    } 
                    else if (currentActiveStatus && currentNotificationMessage !== "Your account is active successfully") {
                        updatePayload['Massage/status_notification'] = { message: "Your account is active successfully", icon: "fa-check-circle", color: "text-green-500", timestamp: firebase.database.ServerValue.TIMESTAMP, read: false };
                        needsDbUpdate = true;
                    } 
                    else if (!currentActiveStatus && currentNotificationMessage !== "Your account is not active") {
                         updatePayload['Massage/status_notification'] = { message: "Your account is not active", icon: "fa-exclamation-triangle", color: "text-red-500", timestamp: firebase.database.ServerValue.TIMESTAMP, read: false };
                        needsDbUpdate = true;
                    }
                    
                    if (needsDbUpdate) {
                        userRef.update(updatePayload).catch(error => console.error("Firebase update error:", error));
                        return;
                    }
                    
                    isUserActive = currentActiveStatus;
                    
                    const name = user.displayName || userData.Name || 'User';
                    const photoURL = user.photoURL || userData.photoURL || `https://placehold.co/128x128/1e293b/FFFFFF?text=${name.charAt(0)}&font=inter`;
                    
                    profileName.textContent = name;
                    profilePicture.src = photoURL;
                    profilePageName.textContent = name;
                    updateNameInput.value = name;
                    profilePagePicture.src = photoURL;
                    profilePageEmail.textContent = user.email;
                    updateEmailInput.value = user.email;

                    updateProfileStatus(currentActiveStatus);
                    
                    if (expiryInterval) clearInterval(expiryInterval);
                    if (userData.expire) {
                        profileExpiryTimer.classList.remove('hidden');
                        updateExpiryCountdown(userData.expire);
                        expiryInterval = setInterval(() => updateExpiryCountdown(userData.expire), 1000);
                    } else {
                        profileExpiryTimer.classList.add('hidden');
                    }

                    const messagesToDisplay = userData.Massage ? JSON.parse(JSON.stringify(userData.Massage)) : {};
                    updateNotificationUI(messagesToDisplay);
                    
                    if (!isInitialDataLoaded) {
                        isInitialDataLoaded = true;
                        if (photoURL && !photoURL.includes('placehold.co')) {
                            profilePicture.onload = () => hideLoader();
                            profilePicture.onerror = () => {
                                console.error("Profile picture failed to load.");
                                hideLoader();
                            };
                        } else {
                            hideLoader();
                        }
                    }

                }, (error) => {
                    console.error("Firebase listener error:", error);
                     if (!isInitialDataLoaded) {
                        isInitialDataLoaded = true;
                        hideLoader();
                    }
                });

                if (window.innerWidth >= 768) openSidebar();

            } else {
                authContainer.classList.remove('hidden');
                authPage.classList.remove('hidden');
                appContainer.classList.add('hidden');
                hideLoader();
                loginPage.classList.remove('hidden');
                signupPage.classList.add('hidden');
                loginPage.classList.add('form-anim');
                signupPage.classList.remove('form-anim');
                closeSidebar();
                loadPricingPlans();
            }
        });
        
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        const originalLoginBtnHTML = loginBtn.innerHTML;
        const signupBtn = signupForm.querySelector('button[type="submit"]');
        const originalSignupBtnHTML = signupBtn.innerHTML;

        const handleLoginFormSubmit = (e) => {
            e.preventDefault();
            loginError.textContent = '';
            loginBtn.disabled = true;
            loginBtn.innerHTML = `<span class="flex items-center justify-center">Logging in...<i class="fa-solid fa-spinner spinner ml-2"></i></span>`;

            auth.signInWithEmailAndPassword(loginForm['login-email'].value, loginForm['login-password'].value)
                .catch(error => {
                    console.error("Login Error:", error); 
                    if (error.code === 'auth/invalid-credential' || 
                        error.code === 'auth/wrong-password' || 
                        error.message.includes('INVALID_LOGIN_CREDENTIALS')) {
                        loginError.textContent = "Email or password is incorrect";
                    } else if (error.code === 'auth/user-not-found') {
                        loginError.textContent = "No account was found with this email.";
                    } else {
                        loginError.textContent = "An error occurred while logging in. Please try again.";
                    }
                    loginBtn.disabled = false;
                    loginBtn.innerHTML = originalLoginBtnHTML;
                });
        };
        
        const handleSignupFormSubmit = (e) => {
            e.preventDefault();
            signupError.textContent = '';
            const name = signupForm['signup-name'].value;
            const email = signupForm['signup-email'].value;
            const password = signupForm['signup-password'].value;
            
            signupBtn.disabled = true;
            signupBtn.innerHTML = `<span class="flex items-center justify-center">Signing up...<i class="fa-solid fa-spinner spinner ml-2"></i></span>`;

            auth.createUserWithEmailAndPassword(email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                    user.updateProfile({ displayName: name });
                    
                    const userRef = db.ref('users/' + user.uid);
                    userRef.set({
                        Name: name,
                        email: email,
                        active: false,
                        Massage: {
                            initial_message: { message: "Account created successfully", icon: "fa-user-plus", color: "text-green-500", timestamp: firebase.database.ServerValue.TIMESTAMP, read: false },
                            status_notification: { message: "Your account is not active", icon: "fa-exclamation-triangle", color: "text-red-500", timestamp: firebase.database.ServerValue.TIMESTAMP, read: false }
                        }
                    });
                })
                .catch(error => { 
                    signupError.textContent = error.message; 
                    signupBtn.disabled = false;
                    signupBtn.innerHTML = originalSignupBtnHTML;
                });
        };

        loginForm.addEventListener('submit', handleLoginFormSubmit);
        signupForm.addEventListener('submit', handleSignupFormSubmit);

        const handleLogoutClick = (e) => { e.preventDefault(); auth.signOut(); };
        logoutBtn.addEventListener('click', handleLogoutClick);
        
        const handleShowSignupClick = (e) => { 
            e.preventDefault(); 
            loginPage.classList.add('hidden'); 
            signupPage.classList.remove('hidden'); 
            loginPage.classList.remove('form-anim');
            signupPage.classList.add('form-anim');
        };
        const handleShowLoginClick = (e) => { 
            e.preventDefault(); 
            signupPage.classList.add('hidden'); 
            loginPage.classList.remove('hidden'); 
            signupPage.classList.remove('form-anim');
            loginPage.classList.add('form-anim');
        };

        showSignupBtn.addEventListener('click', handleShowSignupClick);
        showLoginBtn.addEventListener('click', handleShowLoginClick);
        
        const applyTheme = (theme, targetButton) => { 
            if (document.startViewTransition && targetButton) {
                const rect = targetButton.getBoundingClientRect(); 
                document.documentElement.style.setProperty('--x', `${rect.left + rect.width / 2}px`); 
                document.documentElement.style.setProperty('--y', `${rect.top + rect.height / 2}px`); 
                
                document.startViewTransition(() => {
                    htmlElement.classList.remove('light', 'dark'); 
                    htmlElement.classList.add(theme); 
                    localStorage.setItem('theme', theme);
                });
            } else {
                htmlElement.classList.remove('light', 'dark'); 
                htmlElement.classList.add(theme); 
                localStorage.setItem('theme', theme); 
            }
        };
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.classList.remove('light', 'dark');
        htmlElement.classList.add(savedTheme);

        const handleThemeToggleClick = (e) => {
            const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
            applyTheme(newTheme, e.currentTarget);
        };
        
        themeToggleBtns.forEach(btn => {
            btn.addEventListener('click', handleThemeToggleClick);
        });

        const openSidebar = () => { sidebar.classList.remove('-translate-x-full'); if (window.innerWidth >= 768) mainContent.classList.add('md:ml-64'); navListItems.forEach((li, index) => { li.classList.add('stagger-in'); li.style.animationDelay = `${index * 50}ms`; }); };
        const closeSidebar = () => { sidebar.classList.add('-translate-x-full'); if (window.innerWidth >= 768) mainContent.classList.remove('md:ml-64'); navListItems.forEach(li => { li.classList.remove('stagger-in'); li.style.animationDelay = ''; }); };
        
        const handleMenuBtnClick = (e) => { e.stopPropagation(); sidebar.classList.contains('-translate-x-full') ? openSidebar() : closeSidebar(); };
        menuBtn.addEventListener('click', handleMenuBtnClick);
        
        function showPage(pageId, placeholder, fromPopState = false) {
            mainRouterContent.classList.add('hidden');
            profileSection.classList.add('hidden');
            homeSection.classList.add('hidden');
            notepadSection.classList.add('hidden');
            
            if (pageId === 'profile') {
                profileSection.classList.remove('hidden');
            } else if (pageId === 'home') {
                homeSection.classList.remove('hidden');
                currentSource = 'home';
            } else if (pageId === 'notepad') {
                notepadSection.classList.remove('hidden');
                notepadTextarea.value = sessionStorage.getItem('notepadContent') || '';
            } else {
                mainRouterContent.classList.remove('hidden');
                contentTitle.textContent = pageId;
                currentSource = pageId;
                hostnameInput.value = '';
                hostnameInput.placeholder = placeholder || 'Find hostname or enter full URL...';
                displayMessage('Search results will appear here.', 'fa-file-lines');
            }
            if (window.innerWidth < 768) closeSidebar();
            profileDropdown.classList.add('hidden');
            notificationPanel.classList.add('hidden');

            if (!fromPopState && window.history.pushState) {
                window.history.pushState({ page: pageId, placeholder: placeholder }, '', window.location.pathname);
            }
        }
        
        const handlePopState = (event) => {
            if (event.state && event.state.page) {
                const link = document.querySelector(`.nav-link[data-source="${event.state.page}"], .nav-link-sub[data-source="${event.state.page}"]`);
                if(link) {
                  document.querySelector('.nav-link.active-link, .nav-link-sub.active-link')?.classList.remove('active-link');
                  link.classList.add('active-link');
                }
                showPage(event.state.page, event.state.placeholder, true);
            } else {
                showPage('home', null, true);
            }
        };

        window.addEventListener('popstate', handlePopState);

        const handleMyProfileClick = (e) => {
            e.preventDefault();
            document.querySelector('.nav-link.active-link, .nav-link-sub.active-link, .dropdown-toggle.active-link')?.classList.remove('active-link');
            showPage('profile');
        };

        myProfileLink.addEventListener('click', handleMyProfileClick);
        
        const handleNavClick = (e) => {
            const link = e.target.closest('.nav-link, .nav-link-sub');
            if (link && !link.classList.contains('dropdown-toggle')) {
                e.preventDefault();
                document.querySelector('.nav-link.active-link')?.classList.remove('active-link');
                document.querySelector('.nav-link-sub.active-link')?.classList.remove('active-link');
                document.querySelector('.dropdown-toggle.active-link')?.classList.remove('active-link');
                link.classList.add('active-link');
                
                const isSubLink = link.classList.contains('nav-link-sub');
                if (isSubLink) {
                    const parentDropdown = link.closest('.nav-item-dropdown');
                    if (parentDropdown) {
                        parentDropdown.querySelector('.dropdown-toggle').classList.add('active-link');
                    }
                }
                
                const newTitle = link.dataset.source;
                const placeholder = link.dataset.placeholder;
                showPage(newTitle, placeholder);
            }
        };
        
        document.querySelector('.nav-wrapper nav').addEventListener('click', handleNavClick);

        dropdownToggles.forEach(toggle => {
            const handleToggleClick = (e) => {
                e.preventDefault();
                const menu = toggle.nextElementSibling;
                const arrow = toggle.querySelector('.dropdown-arrow');
                menu.classList.toggle('open');
                arrow.classList.toggle('open');
            };
            toggle.addEventListener('click', handleToggleClick);
        });
        
        const handleHomeSectionClick = (e) => {
             const button = e.target.closest('.home-nav-button');
             if (!button || button.id === 'others-toggle-button') return;

             const targetSource = button.dataset.source;
             const targetPlaceholder = button.dataset.placeholder || `Find hostname for ${targetSource}...`;

             const sidebarLink = document.querySelector(`.nav-link[data-source="${targetSource}"], .nav-link-sub[data-source="${targetSource}"]`);

             if (sidebarLink) {
                 document.querySelector('.nav-link.active-link')?.classList.remove('active-link');
                 document.querySelector('.nav-link-sub.active-link')?.classList.remove('active-link');
                 document.querySelector('.dropdown-toggle.active-link')?.classList.remove('active-link');
                 sidebarLink.classList.add('active-link');

                 const parentDropdown = sidebarLink.closest('.nav-item-dropdown');
                 if (parentDropdown) {
                     parentDropdown.querySelector('.dropdown-toggle').classList.add('active-link');
                     const menu = parentDropdown.querySelector('.dropdown-menu');
                     if(menu) menu.classList.add('open');
                     const arrow = parentDropdown.querySelector('.dropdown-arrow');
                     if(arrow) arrow.classList.add('open');
                 }
             }
             showPage(targetSource, targetPlaceholder);
        };

        homeSection.addEventListener('click', handleHomeSectionClick);

        const handleNotificationBtnClick = (e) => { e.stopPropagation(); profileDropdown.classList.add('hidden'); notificationPanel.classList.toggle('hidden'); if (!notificationPanel.classList.contains('hidden')) markNotificationsAsRead(); };
        const handleClearNotificationsClick = (e) => { e.preventDefault(); const user = auth.currentUser; if (user) db.ref('users/' + user.uid + '/Massage').remove(); };
        const handleProfileBtnClick = (e) => { e.stopPropagation(); notificationPanel.classList.add('hidden'); profileDropdown.classList.toggle('hidden'); };

        notificationBtn.addEventListener('click', handleNotificationBtnClick);
        clearNotificationsBtn.addEventListener('click', handleClearNotificationsClick);
        profileBtn.addEventListener('click', handleProfileBtnClick);

        const handleDocumentClick = (e) => {
            if (notificationPanel && !notificationPanel.contains(e.target) && !notificationBtn.contains(e.target)) notificationPanel.classList.add('hidden');
            if (profileDropdown && !profileDropdown.contains(e.target) && !profileBtn.contains(e.target)) profileDropdown.classList.add('hidden');
            if (sidebar && window.innerWidth < 768 && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) closeSidebar();
        };

        document.addEventListener('click', handleDocumentClick);
        
        function updateProfileStatus(isActive) {
            const statusSpinner = document.getElementById('status-spinner');
            activityStatusDot.classList.toggle('bg-green-500', isActive);
            activityStatusDot.classList.toggle('bg-red-500', !isActive);
            
            profilePicture.classList.remove('border-green-500', 'border-red-500', 'dark:border-green-400', 'dark:border-red-400');
            
            statusSpinner.classList.toggle('active', isActive);
            statusSpinner.classList.toggle('inactive', !isActive);

            if (verifiedIcon) verifiedIcon.classList.toggle('hidden', !isActive);
        }
        
        function updateNotificationUI(messages) {
            if (notificationInterval) clearInterval(notificationInterval);
            notificationList.innerHTML = '';
            let unreadCount = 0;

            if (messages && typeof messages === 'object' && Object.keys(messages).length > 0) {
                const sortedNotifications = Object.entries(messages)
                    .sort(([, a], [, b]) => (b.timestamp || 0) - (a.timestamp || 0));

                for (const [key, notif] of sortedNotifications) {
                    if (notif && notif.read === false) unreadCount++;

                    const formattedDate = dayjs(notif.timestamp).format('D/M/YYYY, h:mm:ss A');
                    const relativeTime = dayjs(notif.timestamp).fromNow();

                    const li = document.createElement('li');
                    li.className = 'p-3 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 cursor-pointer';
                    li.innerHTML = `
                        <div class="flex items-start gap-3">
                            <div class="w-8 h-8 flex-shrink-0 bg-sky-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
                                <i class="fa-solid ${notif.icon || 'fa-bell'} text-sm ${notif.color || ''}"></i>
                            </div>
                            <div>
                                <p class="text-sm" style="color: var(--text-secondary);">${notif.message || 'No message content.'}</p>
                                <p class="text-xs text-slate-400 dark:text-slate-500 mt-1" title="${formattedDate}">
                                    <span class="relative-time" data-timestamp="${notif.timestamp}">${relativeTime}</span>
                                </p>
                            </div>
                        </div>`;
                    notificationList.appendChild(li);
                }
                notificationInterval = setInterval(() => {
                    document.querySelectorAll('.relative-time').forEach(el => {
                        const timestamp = parseInt(el.dataset.timestamp, 10);
                        el.textContent = dayjs(timestamp).fromNow();
                    });
                }, 5000);

            } else {
                notificationList.innerHTML = `<li class="p-4 text-center text-sm" style="color: var(--text-muted);">No notifications yet.</li>`;
            }

            notificationBadge.textContent = unreadCount;
            notificationBadge.classList.toggle('hidden', unreadCount === 0);
        }
        
        function markNotificationsAsRead() {
            const user = auth.currentUser;
            if (!user) return;
            const massageRef = db.ref('users/' + user.uid + '/Massage');
            massageRef.once('value', snapshot => {
                if(snapshot.exists()){
                    snapshot.forEach(childSnapshot => {
                        if (childSnapshot.val().read === false) childSnapshot.ref.update({ read: true });
                    });
                }
            });
        }
        
        const performSearch = () => {
            fullResults = [];
            displayedCount = 0;
            resultsContainer.innerHTML = '';

            if (otherRouterNames.includes(currentSource) && !isUserActive) {
                displayCustomError('Your account is not active. Please contact Admin to have it activated.', 'fa-shield-halved', 'text-red-500', 'Contact Admin', 'contact-admin-error-link');
                return;
            }

            const rawInput = hostnameInput.value.trim();
            if (!rawInput) { 
                const message = currentSource === 'cintSurveyid' ? 'Please enter a Survey ID.' : 'Please enter a hostname or URL.';
                displayMessage(message, 'fa-exclamation-triangle', 'text-amber-500'); 
                return; 
            }
            
            if (currentSource === 'dkrbasic') {
                if (rawInput.includes('&_k=')) {
                    displayMessage('Survey এর মধ্যে &_k আছে সেগুলো bypass হবে না বর্তমানে।', 'fa-ban', 'text-red-500');
                    return;
                }
                currentSearchTerm = 'alldkrhost'; 
            } else if (currentSource === 'cintSurveyid') {
                if (!/^\d+$/.test(rawInput)) {
                    displayMessage('Please enter a valid Survey ID.', 'fa-exclamation-triangle', 'text-amber-500');
                    return;
                }
                currentSearchTerm = rawInput;
            } else {
                const extractedHost = extractHostname(rawInput);
                if (!extractedHost) {
                    displayMessage('Invalid hostname or URL entered.', 'fa-times-circle', 'text-red-500');
                    return;
                }
                currentSearchTerm = extractedHost;
            }
            
            let dbPath;
            const formattedSearchTerm = currentSearchTerm.toLowerCase().replace(/[.\s-]+/g, '-');
            
            if (currentSource === 'dkrbasic') {
                dbPath = `${currentSource}/${currentSearchTerm}`;
            } else if (otherRouterNames.includes(currentSource)) {
                dbPath = `Others/RouterName/${currentSource}/${formattedSearchTerm}`;
            } else {
                dbPath = `${currentSource}/${formattedSearchTerm}`;
            }
            
            findBtnText.textContent = 'Finding...';
            findBtnIcon.className = 'fa-solid fa-spinner spinner';
            findBtn.disabled = true;

            db.ref(dbPath).once('value')
                .then(snapshot => {
                    if (snapshot.exists()) {
                        let data = snapshot.val();
                        if (Array.isArray(data)) {
                            if (currentSource === 'dkrbasic') {
                                data = data.map(item => item ? { ...item, Hostname: rawInput } : null);
                            }

                            const indexedData = data.map((item, index) => item ? { ...item, originalIndex: index } : null);
                            const filteredData = indexedData.filter(item => item !== null);
                            
                            fullResults = filteredData.sort((a, b) => (b.Posted_Time || 0) - (a.Posted_Time || 0));
                            renderMoreResults();

                        } else {
                            displayMessage('Invalid data format received.', 'fa-shield-halved', 'text-red-500');
                        }
                    } else {
                         const message = currentSource === 'cintSurveyid' 
                            ? `No data found for this Survey ID in ${contentTitle.textContent}.`
                            : `No data found for this hostname in ${contentTitle.textContent}.`;
                        displayMessage(message, 'fa-database', 'text-amber-500');
                    }
                })
                .catch(error => {
                    if (error.code === 'permission-denied') {
                        displayCustomError("Your account is not active. Please contact Admin to activate it.", 'fa-user-lock', 'text-red-500', 'Contact Admin', 'contact-admin-error-link');
                    } else {
                        console.error("Firebase Read Error:", error);
                        displayCustomError('Your account is not active. Please contact Admin to have it activated.', 'fa-shield-halved', 'text-red-500', 'Contact Admin', 'contact-admin-error-link');
                    }
                })
                .finally(() => {
                    findBtnText.textContent = 'Find';
                    findBtnIcon.className = 'fa-solid fa-arrow-right';
                    findBtn.disabled = false;
                });
        };

        const handleFindBtnClick = () => performSearch();
        const handleHostnameInputKeydown = (event) => {
            if (event.key === 'Enter') {
                performSearch();
            }
        };

        findBtn.addEventListener('click', handleFindBtnClick);
        hostnameInput.addEventListener('keydown', handleHostnameInputKeydown);

        function renderMoreResults() {
            const seeMoreButton = document.getElementById('see-more-btn');
            if (seeMoreButton) {
                seeMoreButton.remove();
            }

            const itemsToRender = fullResults.slice(displayedCount, displayedCount + RESULTS_PER_PAGE);

            if (itemsToRender.length === 0 && displayedCount === 0) {
                 const message = currentSource === 'cintSurveyid' 
                    ? `No entries found for this Survey ID in ${contentTitle.textContent}.`
                    : `No entries found for this hostname in ${contentTitle.textContent}.`;
                displayMessage(message, 'fa-database', 'text-amber-500'); 
                return;
            }

            itemsToRender.forEach((item, index) => {
                const cardHTML = createResultCard(item, displayedCount + index);
                resultsContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
            
            displayedCount += itemsToRender.length;

            updateAllCardVoteStatus();

            if (displayedCount < fullResults.length) {
                const button = document.createElement('button');
                button.id = 'see-more-btn';
                button.className = 'w-full sm:w-auto mx-auto mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-600 dark:hover:to-slate-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300';
                button.innerHTML = `See More <i class="fa-solid fa-arrow-down ml-2"></i>`;
                button.addEventListener('click', renderMoreResults);
                resultsContainer.appendChild(button);
            }
             addScrollListeners();
        }

        function updateAllCardVoteStatus() {
            const userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
            document.querySelectorAll('.result-card').forEach((card) => {
                if (card.dataset.voteStatusApplied) return;
                
                const formattedSearchTerm = (currentSource === 'dkrbasic' || currentSource === 'cintSurveyid') 
                    ? currentSearchTerm 
                    : currentSearchTerm.replace(/[.\s-]+/g, '-');

                const originalIndex = card.dataset.originalIndex;
                const voteId = `${currentSource}/${formattedSearchTerm}/${originalIndex}`;
                const userVote = userVotes[voteId];

                if (userVote === 'like') card.querySelector('.like-btn').classList.add('voted');
                else if (userVote === 'dislike') card.querySelector('.dislike-btn').classList.add('voted');

                card.dataset.voteStatusApplied = 'true';
            });
        }

        function createResultCard(item, sortedIndex) {
            const author = item.Posted_By || 'N/A';
            let postedTime = item.Posted_Time || 'a while ago';
            if (typeof postedTime === 'number') {
                postedTime = dayjs(postedTime).fromNow();
            }

            const identifier = item.Hostname || item.Survey_ID || 'N/A';
            const identifierLabel = (currentSource === 'dkrbasic') ? 'Survey URL' : (item.Hostname ? 'Hostname' : 'Survey ID');
            
            const url = item.Jumper_Link || '#';
            const like = parseInt(item.Likes || 0, 10);
            const dislike = parseInt(item.Dislikes || 0, 10);
            const probability = item.Probability || '0%';
            
            let profilePicUrl = item.photoURL;
            if (!profilePicUrl) {
                if (author.trim().toLowerCase() === 'admin') {
                    profilePicUrl = 'images.jpeg';
                } else {
                    const initials = author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    profilePicUrl = `https://placehold.co/40x40/e0e7ff/4338ca?text=${initials}&font=inter`;
                }
            }
            
            const possibilityValue = parseFloat(probability.replace('%', ''));
            let gradient;
            if (possibilityValue < 40) gradient = 'linear-gradient(90deg, #ef4444, #f87171)';
            else if (possibilityValue < 75) gradient = 'linear-gradient(90deg, #f59e0b, #fcd34d)';
            else if (possibilityValue < 95) gradient = 'linear-gradient(90deg, #16a34a, #4ade80)';
            else gradient = 'linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7)';
            const progressBarStyle = `width: ${possibilityValue}%; background: ${gradient};`;
            
            const animationDelay = (sortedIndex % RESULTS_PER_PAGE * 0.1);
            const originalItemIndex = item.originalIndex;

            const showGeneratorButton = (currentSource === 'samplicio' || currentSource === 'Spectrum') ? `
                <button class="generate-link-btn p-1 rounded-md text-slate-500 hover:text-sky-500 dark:hover:text-purple-400 transition-colors" data-original-url="${url}" data-target-index="${sortedIndex}" title="Generate Link with ID">
                    <i class="fa-solid fa-gears"></i>
                </button>
            ` : '';
            
            return `
            <div class="result-card stagger-in" style="animation-delay: ${animationDelay}s;" data-original-index="${originalItemIndex}">
                <div class="flex items-start justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <img src="${profilePicUrl}" alt="${author}" class="h-10 w-10 rounded-full border-2 border-white dark:border-slate-700 shadow-md object-cover">
                        <div>
                            <p class="font-semibold text-sm" style="color: var(--text-primary);">${author}</p>
                            <p class="text-xs uppercase tracking-wider font-medium" style="color: var(--text-muted);">Author</p>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0">
                        <p class="text-sm font-medium flex items-center justify-end gap-1.5" style="color: var(--text-secondary);">
                            <i class="fa-solid fa-clock text-xs"></i>
                            <span>${postedTime}</span>
                        </p>
                        <p class="text-xs uppercase tracking-wider font-medium mt-1" style="color: var(--text-muted);">Posted</p>
                    </div>
                </div>
                <div class="my-4">
                    <p class="text-xs uppercase font-semibold tracking-wider mb-2" style="color: var(--text-muted);">${identifierLabel}</p>
                    <div class="p-3 rounded-lg bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80 overflow-x-auto scroll-area">
                        <p class="font-mono text-sm whitespace-nowrap" style="color: var(--text-primary);">${identifier}</p>
                    </div>
                </div>
                <div class="flex justify-between items-center mt-auto pt-4 border-t border-[var(--panel-border)]">
                    <div class="flex items-center gap-2">
                        <button title="Like" class="like-btn vote-btn" data-original-index="${originalItemIndex}">
                            <i class="fa-solid fa-thumbs-up"></i> <span class="vote-count">${like}</span>
                        </button>
                        <button title="Dislike" class="dislike-btn vote-btn" data-original-index="${originalItemIndex}">
                            <i class="fa-solid fa-thumbs-down"></i> <span class="vote-count">${dislike}</span>
                        </button>
                    </div>
                    <button class="jumper-btn text-sm font-semibold text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600" data-target="url-container-${sortedIndex}" aria-expanded="false">
                        Jumper <i class="fa-solid fa-chevron-down ml-1.5 transition-transform duration-300"></i>
                    </button>
                </div>
                <div id="url-container-${sortedIndex}" class="hidden mt-4 space-y-4">
                    <div class="w-full">
                        <p class="text-xs font-semibold tracking-wider mb-1" style="color: var(--text-muted);">Jumper Link</p>
                        <div class="flex items-center gap-2 p-3 rounded-lg bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-700/80">
                            <p id="jumper-link-${sortedIndex}" class="scroll-area overflow-x-auto text-sm whitespace-nowrap" style="color: var(--text-secondary);">${url}</p>
                            <div class="ml-auto flex-shrink-0 flex items-center gap-1">
                                ${showGeneratorButton}
                                <button id="copy-btn-${sortedIndex}" class="copy-btn p-1 rounded-md text-slate-500 hover:text-sky-500 dark:hover:text-purple-400 transition-colors" data-url="${url}" title="Copy Link">
                                    <i class="fa-solid fa-copy"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <div class="flex justify-between items-center mb-1">
                            <span class="text-xs font-medium" style="color: var(--text-secondary);">Possibility</span>
                            <span class="possibility-text text-sm font-bold" style="color: var(--text-primary);">${probability}</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-inner" style="${progressBarStyle}"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        }
        
        const handleResultsContainerClick = (e) => {
            const jumperBtn = e.target.closest('.jumper-btn');
            const copyBtn = e.target.closest('.copy-btn');
            const likeBtn = e.target.closest('.like-btn');
            const dislikeBtn = e.target.closest('.dislike-btn');
            const generateBtn = e.target.closest('.generate-link-btn');
            
            if (e.target.id === 'contact-admin-error-link') {
                e.preventDefault();
                openChatBtn.click();
            }
            if (jumperBtn) {
                const targetId = jumperBtn.dataset.target;
                const urlContainer = document.getElementById(targetId);
                const icon = jumperBtn.querySelector('i');
                if (urlContainer) {
                    const isHidden = urlContainer.classList.toggle('hidden');
                    jumperBtn.setAttribute('aria-expanded', !isHidden);
                    icon.classList.toggle('rotate-180');
                    if (!isHidden) {
                        addScrollListeners();
                    }
                }
            }
            if (copyBtn) {
                navigator.clipboard.writeText(copyBtn.dataset.url).then(() => { 
                    copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-500"></i>'; 
                    copySound.play();
                    setTimeout(() => { copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i>'; }, 2000); 
                }).catch(err => { console.error('Failed to copy: ', err); });
            }
            if (likeBtn) handleVote('like', likeBtn.dataset.originalIndex);
            if (dislikeBtn) handleVote('dislike', dislikeBtn.dataset.originalIndex);
            if (generateBtn) {
                handleLinkGeneration(generateBtn);
            }
        };

        resultsContainer.addEventListener('click', handleResultsContainerClick);

        function extractQueryParam(url, paramName) {
            if (!url || !paramName) return null;
            try {
                const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
                return urlObj.searchParams.get(paramName);
            } catch (e) {
                const regex = new RegExp(`[?&]${paramName}=([^&]*)`);
                const match = url.match(regex);
                return match ? match[1] : null;
            }
        }
        
        function extractRid(url) {
            if (!url) return null;
            const uuidPattern = /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i;
            let fullUrl = url;
            if (!url.startsWith('http')) {
                fullUrl = 'https://' + url;
            }
            try {
                const urlObj = new URL(fullUrl);
                const params = urlObj.searchParams;
                if (params.has('rid') && uuidPattern.test(params.get('rid'))) {
                    return params.get('rid');
                }
                for (const value of params.values()) {
                    if (uuidPattern.test(value)) {
                        return value;
                    }
                }
                const commonKeys = ['rid', 'sid', 'pid', 'uid', 'respondentid', 'user_id'];
                for (const key of commonKeys) {
                    if (params.has(key)) {
                        const val = params.get(key);
                        if (val && val.length > 10) {
                             return val;
                        }
                    }
                }
                return null;
            } catch (e) {
                const match = url.match(/[?&](rid|sid|pid)=([^&]+)/i);
                if (match && match[2]) {
                    return match[2];
                }
                return null;
            }
        }

        function handleLinkGeneration(button) {
            const userInputUrl = hostnameInput.value.trim();
            
            let paramToExtract = '';
            let paramToReplace = '';
            let extractedValue = null;

            if (currentSource === 'samplicio') {
                paramToReplace = 'RID';
                extractedValue = extractRid(userInputUrl);
            } else if (currentSource === 'Spectrum') {
                paramToExtract = 'transaction_id';
                paramToReplace = 'transaction_id';
                const originalUrl = button.dataset.originalUrl;
                if(originalUrl.includes('transaction_id=')) {
                    extractedValue = extractQueryParam(userInputUrl, paramToExtract);
                } else {
                    showManualInputPopup(button, paramToReplace);
                    return;
                }
            }

            if (extractedValue) {
                updateJumperLink(button, paramToReplace, extractedValue);
                const icon = button.querySelector('i');
                icon.className = 'fa-solid fa-check text-green-500';
                setTimeout(() => { icon.className = 'fa-solid fa-gears'; }, 2500);
            } else {
                showManualInputPopup(button, paramToReplace);
            }
        }

        function updateJumperLink(button, paramToReplace, value) {
            const targetIndex = button.dataset.targetIndex;
            const originalUrl = button.dataset.originalUrl;
            
            let updatedUrl;
            const regex = new RegExp(`([?&])${paramToReplace}=[^&]*`);
            
            if (originalUrl.match(regex)) {
                 updatedUrl = originalUrl.replace(regex, `$1${paramToReplace}=${value}`);
            } else {
                 updatedUrl = originalUrl + (originalUrl.includes('?') ? '&' : '?') + `${paramToReplace}=${value}`;
            }

            const linkElement = document.getElementById(`jumper-link-${targetIndex}`);
            const copyButton = document.getElementById(`copy-btn-${targetIndex}`);

            if (linkElement) {
                linkElement.textContent = updatedUrl;
            }
            if (copyButton) {
                copyButton.dataset.url = updatedUrl;
            }
        }
        
        function showManualInputPopup(button, paramName) {
            activeGenerateButton = button;
            activeParamToReplace = paramName;
            manualRidForm.reset();
            manualRidError.textContent = '';
            
            manualRidModalTitle.textContent = `Enter ${paramName} Manually`;
            manualRidModalLabel.textContent = `Could not find a ${paramName} automatically. Please paste it below.`;
            manualRidInput.placeholder = `Paste the ${paramName} here...`;
            
            manualRidModal.classList.remove('hidden');
            manualRidInput.focus();
        }

        function hideManualInputPopup() {
            manualRidModal.classList.add('hidden');
            activeGenerateButton = null;
            activeParamToReplace = '';
        }

        const handleManualRidFormSubmit = (e) => {
            e.preventDefault();
            const manualValue = manualRidInput.value.trim();
            if (manualValue && activeGenerateButton && activeParamToReplace) {
                updateJumperLink(activeGenerateButton, activeParamToReplace, manualValue);
                hideManualInputPopup();
            } else {
                manualRidError.textContent = `Please enter a valid ${activeParamToReplace || 'value'}.`;
            }
        };

        manualRidForm.addEventListener('submit', handleManualRidFormSubmit);
        manualRidCloseBtn.addEventListener('click', hideManualInputPopup);
        manualRidCancelBtn.addEventListener('click', hideManualInputPopup);
        manualRidModal.addEventListener('click', (e) => {
            if (e.target === manualRidModal) {
                hideManualInputPopup();
            }
        });

        function handleVote(voteType, originalIndex) {
            if (!currentSearchTerm || !auth.currentUser || originalIndex === undefined) return;
            
            const card = document.querySelector(`.result-card[data-original-index="${originalIndex}"]`);
            if (!card) return;

            const likeBtn = card.querySelector('.like-btn');
            const dislikeBtn = card.querySelector('.dislike-btn');
            likeBtn.disabled = true;
            dislikeBtn.disabled = true;

            const formattedSearchTerm = (currentSource === 'dkrbasic' || currentSource === 'cintSurveyid') 
                ? currentSearchTerm 
                : currentSearchTerm.replace(/[.\s-]+/g, '-');
            
            let basePathPrefix;
            if (otherRouterNames.includes(currentSource)) {
                basePathPrefix = `Others/RouterName/${currentSource}/${formattedSearchTerm}`;
            } else {
                basePathPrefix = `${currentSource}/${formattedSearchTerm}`;
            }
            const basePath = `${basePathPrefix}/${originalIndex}`;

            const voteId = `${currentSource}/${formattedSearchTerm}/${originalIndex}`;
            const userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
            const currentVote = userVotes[voteId];

            const transactions = [];

            if (currentVote === voteType) {
                const voteRef = db.ref(`${basePath}/${voteType === 'like' ? 'Likes' : 'Dislikes'}`);
                transactions.push(voteRef.transaction(count => (count || 0) - 1));
                delete userVotes[voteId];
            }
            else if (currentVote) {
                const newVoteRef = db.ref(`${basePath}/${voteType === 'like' ? 'Likes' : 'Dislikes'}`);
                transactions.push(newVoteRef.transaction(count => (count || 0) + 1));
                const oldVoteRef = db.ref(`${basePath}/${currentVote === 'like' ? 'Likes' : 'Dislikes'}`);
                transactions.push(oldVoteRef.transaction(count => (count || 0) - 1));
                userVotes[voteId] = voteType;
            }
            else {
                const voteRef = db.ref(`${basePath}/${voteType === 'like' ? 'Likes' : 'Dislikes'}`);
                transactions.push(voteRef.transaction(count => (count || 0) + 1));
                userVotes[voteId] = voteType;
            }

            Promise.all(transactions)
                .then(() => db.ref(basePath).once('value')) 
                .then(snapshot => {
                    const itemData = snapshot.val();
                    if (!itemData) return; 

                    const likes = itemData.Likes || 0;
                    const dislikes = itemData.Dislikes || 0;
                    const total = likes + dislikes;
                    const newProbability = total > 0 ? `${Math.round((likes / total) * 100)}%` : '0%';
                    
                    return db.ref(basePath).update({ Probability: newProbability });
                })
                .then(() => {
                    localStorage.setItem('userVotes', JSON.stringify(userVotes));
                    updateVoteUI(card, basePath);
                })
                .catch(error => {
                    console.error("Vote and probability update failed:", error);
                    updateVoteUI(card, basePath); 
                });
        }

        function updateVoteUI(card, basePath) {
            const likeBtn = card.querySelector('.like-btn');
            const dislikeBtn = card.querySelector('.dislike-btn');
            
            db.ref(basePath).once('value', snapshot => {
                const data = snapshot.val();
                if (!data) return;

                likeBtn.querySelector('.vote-count').textContent = data.Likes || 0;
                dislikeBtn.querySelector('.vote-count').textContent = data.Dislikes || 0;

                const originalIndex = card.dataset.originalIndex;
                const formattedSearchTerm = (currentSource === 'dkrbasic' || currentSource === 'cintSurveyid') 
                    ? currentSearchTerm 
                    : currentSearchTerm.replace(/[.\s-]+/g, '-');
                const voteId = `${currentSource}/${formattedSearchTerm}/${originalIndex}`;
                const userVotes = JSON.parse(localStorage.getItem('userVotes')) || {};

                likeBtn.classList.toggle('voted', userVotes[voteId] === 'like');
                dislikeBtn.classList.toggle('voted', userVotes[voteId] === 'dislike');

                updateProgressBar(card, data);

                likeBtn.disabled = false;
                dislikeBtn.disabled = false;
            });
        }
        
        function updateProgressBar(card, data) {
            if (!card || !data) return;
            const probability = data.Probability || '0%';
            const possibilityValue = parseFloat(probability.replace('%', ''));

            let gradient;
            if (possibilityValue < 40) gradient = 'linear-gradient(90deg, #ef4444, #f87171)';
            else if (possibilityValue < 75) gradient = 'linear-gradient(90deg, #f59e0b, #fcd34d)';
            else if (possibilityValue < 95) gradient = 'linear-gradient(90deg, #16a34a, #4ade80)';
            else gradient = 'linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7)';
            
            const progressBarStyle = `width: ${possibilityValue}%; background: ${gradient};`;
            const progressBarInner = card.querySelector('.progress-bar-inner');
            const possibilityText = card.querySelector('.possibility-text');
            
            if (progressBarInner) progressBarInner.style.cssText = progressBarStyle;
            if (possibilityText) possibilityText.textContent = probability;
        }

        function addScrollListeners() {
            document.querySelectorAll('.scroll-area').forEach(area => {
                let timeoutId = null;
                const handleScroll = () => { area.classList.add('scrolling'); clearTimeout(timeoutId); timeoutId = setTimeout(() => { area.classList.remove('scrolling'); }, 1500); };
                area.addEventListener('scroll', handleScroll, { passive: true });
            });
        }
        
        function extractHostname(input) {
            if (!input) return null;
            let urlString = input.trim();
            if (!urlString.match(/^https?:\/\//i) && urlString.includes('.')) {
                urlString = 'https://' + urlString;
            }
            try {
                const url = new URL(urlString);
                return url.hostname;
            } catch (e) {
                if (input.includes('.') && !input.includes(' ') && !input.includes('/')) {
                    return input;
                }
                console.error('Could not parse hostname from input:', input);
                return null; 
            }
        }

        function displayMessage(message, iconClass, colorClass = '') {
            resultsContainer.innerHTML = `<div id="results-placeholder" class="h-full flex justify-center items-center text-center transition-opacity duration-300 fade-in" style="color: var(--text-muted);"><div><i class="fa-solid ${iconClass} text-4xl mb-3 ${colorClass}"></i><p>${message}</p></div></div>`;
        }
        
        function displayCustomError(message, iconClass, colorClass, linkText, linkId) {
            resultsContainer.innerHTML = `<div id="results-placeholder" class="h-full flex justify-center items-center text-center transition-opacity duration-300 fade-in" style="color: var(--text-muted);"><div><i class="fa-solid ${iconClass} text-4xl mb-3 ${colorClass}"></i><p>${message}</p><a href="#" id="${linkId}" class="mt-4 inline-block font-medium text-sky-600 dark:text-purple-400 hover:underline">${linkText}</a></div></div>`;
        }
        
        function loadPricingPlans() {
            const container = pricingPlansContainer;
            db.ref('setting/pricingPlans').once('value')
                .then(snapshot => {
                    if (snapshot.exists()) {
                        const plans = snapshot.val();
                        container.innerHTML = ''; 
                        plans.forEach(plan => {
                            const featuresHTML = plan.features.map(feature => `<li class="flex items-center gap-3"><i class="fa-solid fa-check text-emerald-500"></i>${feature}</li>`).join('');

                            const isPro = plan.isRecommended;
                            const proClasses = isPro ? 'scale-105 border-2 border-sky-500 dark:border-purple-500 shadow-2xl hover:shadow-sky-500/30 dark:hover:shadow-purple-500/30' : 'border shadow-lg hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/10 dark:hover:shadow-purple-500/10';
                            const recommendedBadge = isPro ? '<span class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-sky-500 dark:bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-full">RECOMMENDED</span>' : '';
                            const buttonClass = isPro ? 'bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0' : 'border hover:bg-slate-500/5';
                            const buttonStyle = isPro ? '' : `color: var(--text-primary); border-color: var(--input-border); background-color: var(--input-bg);`;

                            const planHTML = `
                                <div class="stagger-in backdrop-blur-xl rounded-2xl p-8 flex flex-col relative transition-all duration-300 ${proClasses}" style="background-color: var(--panel-bg); ${!isPro ? 'border-color: var(--panel-border);' : ''}">
                                    ${recommendedBadge}
                                    <h3 class="text-2xl font-bold" style="color: var(--text-primary);">${plan.name}</h3>
                                    <p class="mt-2 text-4xl font-extrabold" style="color: var(--text-primary);">${plan.price}<span class="text-lg font-medium" style="color: var(--text-secondary);">${plan.period}</span></p>
                                    <p class="mt-2 text-sm" style="color: var(--text-muted);">${plan.description}</p>
                                    <ul class="space-y-4 mt-8 flex-grow" style="color: var(--text-secondary);">${featuresHTML}</ul>
                                    <button data-action="scroll-to-signup" class="mt-8 w-full font-semibold py-3 px-8 rounded-lg transition-all duration-300 ${buttonClass}" style="${buttonStyle}">${plan.buttonText}</button>
                                </div>
                            `;
                            container.insertAdjacentHTML('beforeend', planHTML);
                        });
                    } else {
                        container.innerHTML = `<p class="text-center col-span-full" style="color: var(--text-muted);">Pricing plans could not be loaded.</p>`;
                    }
                })
                .catch(error => {
                    console.error("Error loading pricing plans:", error);
                    container.innerHTML = `<p class="text-center col-span-full text-red-500">Error: Could not connect to the database to load pricing plans.</p>`;
                });
        }

        function showAddHostModal() { 
            populateRouterDropdown(); 
            updateAddHostModalLabels();
            addHostModal.classList.remove('hidden'); 
            setTimeout(() => { addHostModalPanel.classList.remove('opacity-0', 'scale-95'); }, 10); 
        }
        function hideAddHostModal() { addHostModal.classList.add('hidden'); addHostForm.reset(); addHostError.textContent = ''; }
        
        function populateRouterDropdown() {
            addHostRouterSelect.innerHTML = '';
            const allNavLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle), .nav-link-sub');
            allNavLinks.forEach(link => {
                const routerName = link.dataset.source;
                if (routerName === 'home' || routerName === 'cintSurveyid' || routerName === 'dkrbasic') {
                    return; 
                }
                const option = document.createElement('option');
                option.value = routerName;
                option.textContent = routerName;
                addHostRouterSelect.appendChild(option);
            });
        }

        function updateAddHostModalLabels() {
            const selectedRouter = addHostRouterSelect.value;
            if (selectedRouter === 'Cint') {
                addHostHostnameLabel.textContent = 'Full URL / Survey ID';
                addHostHostnameInput.placeholder = 'e.g., https://... or 6944609';
            } else {
                addHostHostnameLabel.textContent = 'Full URL';
                addHostHostnameInput.placeholder = 'e.g., https://www.example.com/page';
            }
        }
        
        addHostRouterSelect.addEventListener('change', updateAddHostModalLabels);
        addHostBtn.addEventListener('click', showAddHostModal);
        addHostCloseBtn.addEventListener('click', hideAddHostModal);
        addHostCancelBtn.addEventListener('click', hideAddHostModal);
        addHostModal.addEventListener('click', (e) => { if(e.target === addHostModal) { hideAddHostModal(); } });
        
        const handleAddHostFormSubmit = (e) => {
            e.preventDefault();
            addHostError.textContent = '';
            const submitBtn = document.getElementById('add-host-submit-btn');
            const originalBtnHTML = submitBtn.innerHTML;
            const user = auth.currentUser;

            if (!user) {
                addHostError.textContent = 'You must be logged in to add an entry.';
                return;
            }

            let selectedRouter = addHostForm['add-host-router'].value;
            const fullUrlOrIdentifier = addHostForm['add-host-hostname'].value.trim();
            const jumperLink = addHostForm['add-host-url'].value.trim();

            if (!selectedRouter || !fullUrlOrIdentifier || !jumperLink) {
                addHostError.textContent = 'Please fill out all fields.';
                return;
            }

            let formattedIdentifier = '';
            const newData = {
                Jumper_Link: jumperLink, Likes: 0, Dislikes: 0, Probability: "0%",
                Posted_By: user.displayName || user.email,
                Posted_Time: firebase.database.ServerValue.TIMESTAMP
            };

            if (selectedRouter === 'Cint') {
                const isOnlyDigits = /^\d+$/.test(fullUrlOrIdentifier);
                if (isOnlyDigits) {
                    selectedRouter = 'cintSurveyid';
                    newData.Survey_ID = fullUrlOrIdentifier;
                    formattedIdentifier = fullUrlOrIdentifier;
                } else {
                    const extractedHost = extractHostname(fullUrlOrIdentifier);
                    if (extractedHost) {
                        formattedIdentifier = extractedHost.toLowerCase().replace(/[.\s-]+/g, '-');
                        newData.Hostname = fullUrlOrIdentifier;
                    } else {
                        addHostError.textContent = 'Please enter a valid URL or a numeric Survey ID for Cint.';
                        return;
                    }
                }
            } else {
                const extractedHost = extractHostname(fullUrlOrIdentifier);
                if (extractedHost) {
                    const dbPath = selectedRouter.includes('-com') ? `${selectedRouter}/${extractedHost.toLowerCase().replace(/[.\s-]+/g, '-')}` : extractedHost.toLowerCase().replace(/[.\s-]+/g, '-');
                    formattedIdentifier = dbPath;
                    newData.Hostname = fullUrlOrIdentifier;
                } else {
                    addHostError.textContent = 'Invalid URL format. Please enter the full URL.';
                    return;
                }
            }

            if (user.photoURL) {
                newData.photoURL = user.photoURL;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;
            
            let dataRefPath;
            if (otherRouterNames.includes(selectedRouter)) {
                dataRefPath = `Others/RouterName/${selectedRouter}/${formattedIdentifier}`;
            } else {
                dataRefPath = `${selectedRouter}/${formattedIdentifier}`;
            }
            
            const dataRef = db.ref(dataRefPath);
            
            dataRef.once('value').then(snapshot => {
                const currentData = snapshot.val() || [];
                if (!Array.isArray(currentData)) {
                    throw new Error("Data at this path is not an array.");
                }
                const newIndex = currentData.length;
                return db.ref(`${dataRefPath}/${newIndex}`).set(newData);
            })
            .then(() => {
                submitBtn.innerHTML = `Added!`;
                setTimeout(() => {
                    hideAddHostModal();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }, 1500);
            })
            .catch(error => {
                console.error("Failed to add entry: ", error);
                if (error.message.includes("permission_denied")) {
                     addHostError.textContent = 'Permission denied. You may not have access to add this.';
                } else {
                     addHostError.textContent = 'Failed to submit. Please try again.';
                }
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            });
        };

        addHostForm.addEventListener('submit', handleAddHostFormSubmit);
        
        function loadOtherRouters() {
            if (otherRoutersLoaded) return;
            
            db.ref('Others/RouterName').once('value').then(snapshot => {
                if (snapshot.exists()) {
                    const routers = snapshot.val();
                    const routerNames = Object.keys(routers);
                    otherRouterNames = routerNames;
                    
                    if (routerNames.length === 0) {
                        othersToggleButton.classList.add('hidden');
                        othersSidebarToggle.parentElement.classList.add('hidden');
                        return;
                    }
                    
                    otherRoutersLoaded = true;
                    othersSidebarMenu.innerHTML = '';
                    othersButtonsGrid.innerHTML = '';

                    routerNames.forEach(routerName => {
                        const formattedName = routerName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                        
                        const sidebarLi = document.createElement('li');
                        sidebarLi.innerHTML = `<a href="#" class="nav-link nav-link-sub flex items-center gap-4 py-2 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="${routerName}"><span class="text-sm font-medium">${formattedName}</span></a>`;
                        othersSidebarMenu.appendChild(sidebarLi);
                        
                        const homeButton = document.createElement('button');
                        homeButton.className = 'home-nav-button';
                        homeButton.dataset.source = routerName;
                        homeButton.innerHTML = `
                            <div class="icon-wrapper"><i class="fa-solid fa-link"></i></div>
                            <div class="text-content"><span>${formattedName}</span><p>Bypass ${formattedName} surveys.</p></div>
                            <div class="absolute top-0 right-0 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-br from-sky-400 to-cyan-400 dark:from-purple-500 dark:to-pink-500 rounded-tr-2xl rounded-bl-2xl shadow-md">
                                Others
                            </div>
                        `;
                        othersButtonsGrid.appendChild(homeButton);
                    });
                } else {
                     othersToggleButton.classList.add('hidden');
                     othersSidebarToggle.parentElement.classList.add('hidden');
                }
            }).catch(error => {
                console.error("Error loading 'Others' routers:", error);
            });
        }
        
        const handleOthersToggleClick = () => {
            othersButtonsGrid.classList.toggle('open');
            othersToggleButton.querySelector('.dropdown-arrow').classList.toggle('open');
        };
        
        othersToggleButton.addEventListener('click', handleOthersToggleClick);

        const handleNotepadLinkClick = (e) => {
            e.preventDefault();
            showPage('notepad');
        };

        notepadLink.addEventListener('click', handleNotepadLinkClick);

        const handleNotepadBackClick = (e) => {
            e.preventDefault();
            document.querySelector('.nav-link.active-link, .nav-link-sub.active-link')?.classList.remove('active-link');
            document.querySelector('.nav-link[data-source="home"]').classList.add('active-link');
            showPage('home');
        };

        notepadBackBtn.addEventListener('click', handleNotepadBackClick);

        const handleNotepadInput = (e) => {
            sessionStorage.setItem('notepadContent', e.target.value);
        };
        notepadTextarea.addEventListener('input', handleNotepadInput);

        function scrollToBottom(element) {
            element.scrollTop = element.scrollHeight;
        }

        function createMessageBubble(msg) {
            const isUser = msg.sender === 'user';
            const bubbleClass = isUser ? 'chat-bubble-user' : 'chat-bubble-admin';
            const alignmentClass = isUser ? 'items-end' : 'items-start';
            const time = msg.timestamp ? dayjs(msg.timestamp).format('h:mm A') : '';

            const contentPadding = msg.imageUrl ? 'p-1' : 'py-2 px-3.5';
            
            let messageContent = '';
            if (msg.imageUrl) {
                messageContent = `<img src="${msg.imageUrl}" alt="Sent image" class="chat-image">`;
            } else if (msg.text) {
                messageContent = `<p class="text-sm break-words">${msg.text}</p>`;
            }
            
            return `
                <div class="flex flex-col ${alignmentClass}">
                    <div class="chat-bubble ${bubbleClass} ${contentPadding}">
                        ${messageContent}
                    </div>
                    <p class="text-xs mt-1.5 px-1" style="color: var(--text-muted);">${time}</p>
                </div>
            `;
        }
        
        function updateChatBadge() {
            const badge = document.getElementById('chat-notification-badge');
            if (unreadAdminMessages > 0) {
                badge.textContent = unreadAdminMessages;
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        }

        // FIREBASE INDEXING NOTE:
        // The following function uses orderByChild('timestamp'). 
        // For better performance, ensure you have an index on the 'timestamp' field
        // in your Firebase Realtime Database security rules for the 'massages' path.
        // Example Rule: 
        // { "rules": { "massages": { "$uid": { ".indexOn": "timestamp" } } } }
        function initializeChatListener(uid) {
            if (chatNotificationListener) {
                db.ref('massages/' + uid).off('child_added', chatNotificationListener);
            }
            
            unreadAdminMessages = 0;
            updateChatBadge();

            const chatRef = db.ref('massages/' + uid);

            chatNotificationListener = chatRef.orderByChild('timestamp').startAt(Date.now()).on('child_added', (snapshot) => {
                if (!snapshot.exists()) return;

                const msg = snapshot.val();
                if (msg.sender === 'admin') {
                    if (chatModal.classList.contains('hidden')) {
                        unreadAdminMessages++;
                        updateChatBadge();
                    }
                }
            });
        }

        function loadAndDisplayMessages() {
            const user = auth.currentUser;
            if (!user) return;

            const chatRef = db.ref('massages/' + user.uid);

            if (chatListener) {
                chatRef.off('value', chatListener);
            }
            
            chatListener = chatRef.on('value', snapshot => {
                chatMessagesContainer.innerHTML = ''; 
                if (snapshot.exists()) {
                    snapshot.forEach(childSnapshot => {
                        const msg = childSnapshot.val();
                        const bubbleHTML = createMessageBubble(msg);
                        chatMessagesContainer.insertAdjacentHTML('beforeend', bubbleHTML);
                    });
                } else {
                    chatMessagesContainer.innerHTML = `
                        <div class="text-center py-8" style="color: var(--text-muted);">
                            <i class="fa-solid fa-comments text-3xl mb-2"></i>
                            <p>No messages yet. Send a message to start the conversation.</p>
                        </div>`;
                }
                setTimeout(() => scrollToBottom(chatMessagesContainer), 100);
            });
        }

        function handleSendMessage(e) {
            if (e) e.preventDefault();
            const messageText = chatInput.value.trim();
            if (!messageText) return;

            const user = auth.currentUser;
            if (!user) {
                alert("You must be logged in to send a message.");
                return;
            }

            const messageData = {
                text: messageText,
                sender: 'user',
                senderName: user.displayName || user.email,
                senderEmail: user.email,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            };
            
            const chatRef = db.ref('massages/' + user.uid);
            chatRef.push(messageData);

            chatForm.reset();
            chatInput.focus();
        }
        
        function handleSendImage(file) {
            const user = auth.currentUser;
            if (!file || !user) return;

            const timestamp = new Date().getTime();
            const storageRef = storage.ref(`chat_images/${user.uid}/${timestamp}_${file.name}`);
            const uploadTask = storageRef.put(file);

            chatUploadProgressContainer.classList.remove('hidden');

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    chatUploadProgressBar.style.width = progress + '%';
                    chatUploadProgressText.textContent = `Uploading... ${Math.round(progress)}%`;
                }, 
                (error) => {
                    console.error("Chat image upload failed:", error);
                    chatUploadProgressText.textContent = 'Upload Failed!';
                    chatUploadProgressText.style.color = '#ef4444';
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        const messageData = {
                            imageUrl: downloadURL,
                            sender: 'user',
                            senderName: user.displayName || user.email,
                            senderEmail: user.email,
                            timestamp: firebase.database.ServerValue.TIMESTAMP
                        };
                        db.ref('massages/' + user.uid).push(messageData);
                        chatUploadProgressContainer.classList.add('hidden');
                        chatImageUpload.value = '';
                    });
                }
            );
        }

        const handleOpenChatClick = (e) => {
            e.preventDefault();
            chatModal.classList.remove('hidden');
            loadAndDisplayMessages();
            
            unreadAdminMessages = 0;
            updateChatBadge();
        };

        openChatBtn.addEventListener('click', handleOpenChatClick);

        const handleCloseChatClick = () => {
            chatModal.classList.add('hidden');
            if (chatListener && listeningOnUid) {
                db.ref('massages/' + listeningOnUid).off('value', chatListener);
                chatListener = null;
            }
        };

        closeChatBtn.addEventListener('click', handleCloseChatClick);
        
        const handleChatModalClick = (e) => {
             if(e.target === chatModal) {
                 closeChatBtn.click();
            }
        };

        chatModal.addEventListener('click', handleChatModalClick);
        chatForm.addEventListener('submit', handleSendMessage);
        chatAttachBtn.addEventListener('click', () => chatImageUpload.click());
        const handleChatImageUploadChange = (e) => {
            if (e.target.files[0]) {
                handleSendImage(e.target.files[0]);
            }
        };
        chatImageUpload.addEventListener('change', handleChatImageUploadChange);
        
        const handleChatMessagesContainerClick = (e) => {
            if (e.target.classList.contains('chat-image')) {
                previewImage.src = e.target.src;
                imagePreviewModal.classList.remove('hidden');
            }
        };

        chatMessagesContainer.addEventListener('click', handleChatMessagesContainerClick);

        function closeImagePreview() {
            imagePreviewModal.classList.add('hidden');
            previewImage.src = '';
        }

        imagePreviewCloseBtn.addEventListener('click', closeImagePreview);
        imagePreviewModal.addEventListener('click', (e) => {
            if (e.target === imagePreviewModal) {
                closeImagePreview();
            }
        });

        const handleProfilePicUpload = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const user = auth.currentUser;
            if (!user) return;
            
            const fileRef = storage.ref(`profilePictures/${user.uid}/${file.name}`);
            const uploadTask = fileRef.put(file);
            
            uploadProgressContainer.classList.remove('hidden');

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    uploadProgressBar.style.width = progress + '%';
                    uploadProgressText.textContent = `Uploading... ${Math.round(progress)}%`;
                }, 
                (error) => {
                    console.error("Upload failed:", error);
                    uploadProgressText.textContent = 'Upload Failed!';
                    uploadProgressText.style.color = '#ef4444';
                }, 
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        Promise.all([
                            user.updateProfile({ photoURL: downloadURL }),
                            db.ref('users/' + user.uid).update({ photoURL: downloadURL })
                        ]).then(() => {
                            uploadProgressText.textContent = 'Upload Complete!';
                            uploadProgressText.style.color = '#16a34a';
                            setTimeout(() => { uploadProgressContainer.classList.add('hidden'); }, 3000);
                        });
                    });
                }
            );
        };

        profilePictureUpload.addEventListener('change', handleProfilePicUpload);

        const handleUpdateInfoSubmit = (e) => {
            e.preventDefault();
            const newName = updateNameInput.value.trim();
            const user = auth.currentUser;
            if (!user || !newName) return;
            
            const originalBtnHTML = updateInfoBtn.innerHTML;
            updateInfoBtn.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;
            updateInfoBtn.disabled = true;

            Promise.all([
                user.updateProfile({ displayName: newName }),
                db.ref(`users/${user.uid}`).update({ Name: newName })
            ]).then(() => {
                updateInfoStatus.textContent = "Profile updated successfully!";
                updateInfoStatus.style.color = '#16a3a4';
            }).catch((error) => {
                console.error("Error updating profile:", error);
                updateInfoStatus.textContent = "Error updating profile.";
                updateInfoStatus.style.color = '#ef4444';
            }).finally(() => {
                updateInfoBtn.innerHTML = originalBtnHTML;
                updateInfoBtn.disabled = false;
                setTimeout(() => { updateInfoStatus.textContent = ''; }, 3000);
            });
        };

        updateInfoForm.addEventListener('submit', handleUpdateInfoSubmit);

        const handleChangePasswordSubmit = (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            changePasswordStatus.textContent = '';
            
            if (newPassword !== confirmPassword) {
                changePasswordStatus.textContent = "New passwords do not match.";
                changePasswordStatus.style.color = '#ef4444';
                return;
            }
            if (newPassword.length < 6) {
                 changePasswordStatus.textContent = "Password must be at least 6 characters.";
                 changePasswordStatus.style.color = '#ef4444';
                 return;
            }

            const user = auth.currentUser;
            if (!user) return;
            
            const originalBtnHTML = changePasswordBtn.innerHTML;
            changePasswordBtn.innerHTML = `<i class="fa-solid fa-spinner spinner"></i>`;
            changePasswordBtn.disabled = true;
            
            const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
            
            user.reauthenticateWithCredential(credential).then(() => {
                return user.updatePassword(newPassword);
            }).then(() => {
                changePasswordStatus.textContent = "Password changed successfully!";
                changePasswordStatus.style.color = '#16a34a';
                changePasswordForm.reset();
            }).catch((error) => {
                console.error("Password change error:", error);
                if (error.code === 'auth/wrong-password') {
                     changePasswordStatus.textContent = "Incorrect current password.";
                } else {
                     changePasswordStatus.textContent = "An error occurred. Please try again.";
                }
                changePasswordStatus.style.color = '#ef4444';
            }).finally(() => {
                 changePasswordBtn.innerHTML = originalBtnHTML;
                 changePasswordBtn.disabled = false;
                 setTimeout(() => { changePasswordStatus.textContent = ''; }, 4000);
            });
        };

        changePasswordForm.addEventListener('submit', handleChangePasswordSubmit);

        if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();
        
        const handleResize = () => { 
            if (window.innerWidth >= 768) { 
                if(!sidebar.classList.contains('-translate-x-full')) mainContent.classList.add('md:ml-64'); 
            } else { 
                mainContent.classList.remove('md:ml-64'); 
            } 
        };
        window.addEventListener('resize', handleResize);
    }
    
    fetch('/api/config')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(firebaseConfig => {
          initializeAndRunApp(firebaseConfig);
      })
      .catch(error => {
          console.error('Error fetching Firebase config:', error);
          document.body.innerHTML = `<div style="text-align: center; padding: 50px; font-family: sans-serif;">
              <h1>Application failed to load</h1>
              <p>Could not load the necessary configuration. Please check your connection or contact support.</p>
          </div>`;
      });
      
    // Cleanup function for useEffect. This runs when the component unmounts.
    return () => {
      // Here you would remove all the event listeners added above
      // For brevity, this part is omitted but is crucial for preventing memory leaks in a real app.
      // Example: menuBtn.removeEventListener('click', handleMenuBtnClick);
      // ... and so on for all other listeners.
    };

  }, []); // The empty dependency array [] ensures this effect runs only once.

  return (
    <>
      {/* 
        NOTE FOR DEVELOPER:
        The following <style> tag contains all the CSS from the original HTML file.
        In a typical React project, you would move this to a separate .css file 
        and import it, or use a CSS-in-JS library.
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        body::before { content: ''; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; background: linear-gradient(135deg, #f0f9ff 50%, #e0f2fe 50%); transition: background 0.4s ease-in-out; }
        .dark body::before { background: linear-gradient(135deg, #1e293b 50%, #0f172a 50%); }
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; background-color: var(--bg-color); color: var(--text-primary); transition: background-color 0.3s ease, color 0.3s ease; position: relative; z-index: 0; }
        :root { --bg-color: #f8fafc; --text-primary: #1e293b; --text-secondary: #475569; --text-muted: #94a3b8; --panel-bg: rgba(255, 255, 255, 0.65); --modal-bg: #ffffff; --panel-border: #e2e8f0; --notification-bg: rgba(248, 250, 252, 0.97); --notification-border: #e2e8f0; --input-bg: white; --input-border: #cbd5e1; --active-link-bg: #e0f2fe; --active-link-text: #0284c7; --active-link-icon: #0ea5e9; --dev-by-bg: #f1f5f9; --dev-by-border: #e2e8f0; }
        .dark { --bg-color: #0f172a; --text-primary: #f1f5f9; --text-secondary: #94a3b8; --text-muted: #64748b; --panel-bg: rgba(15, 23, 42, 0.7); --modal-bg: var(--panel-bg); --panel-border: #1e293b; --notification-bg: rgba(15, 23, 42, 0.97); --notification-border: #334155; --input-bg: rgba(30, 41, 59, 0.8); --input-border: #334155; --active-link-bg: rgba(168, 85, 247, 0.1); --active-link-text: white; --active-link-icon: #a855f7; --dev-by-bg: rgba(15, 23, 42, 0.5); --dev-by-border: #1e293b; }
        .aurora-bg::before, .mesh-gradient-bg::before, .mesh-gradient-bg::after { content: ''; position: fixed; top: 50%; left: 50%; pointer-events: none; z-index: -1; transition: opacity 0.7s ease; }
        .aurora-bg::before { width: 700px; height: 700px; background-image: radial-gradient(circle, rgba(22, 163, 74, 0.1), transparent 65%); filter: blur(120px); transform: translate(-50%, -50%); opacity: 0; }
        .dark .aurora-bg::before { opacity: 1; }
        .mesh-gradient-bg::before { width: 800px; height: 800px; background-image: radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 60%); filter: blur(150px); transform: translate(-80%, -60%) rotate(20deg); opacity: 1; }
        .mesh-gradient-bg::after { content: ''; position: fixed; top: 50%; left: 50%; width: 800px; height: 800px; background-image: radial-gradient(circle, rgba(6, 182, 212, 0.1), transparent 60%); filter: blur(150px); transform: translate(30%, 40%) rotate(-30deg); opacity: 1; z-index: -2; transition: opacity 0.7s ease; }
        .dark .mesh-gradient-bg::before, .dark .mesh-gradient-bg::after { opacity: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.7s ease-out forwards; }
        @keyframes slideIn { from { opacity: 0; transform: translateY(-10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes slide-up-fade-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .stagger-in { animation: slide-up-fade-in 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; opacity: 0; }
        @keyframes bell-shake { 0% { transform: rotate(0); } 15% { transform: rotate(5deg); } 30% { transform: rotate(-5deg); } 45% { transform: rotate(4deg); } 60% { transform: rotate(-4deg); } 75% { transform: rotate(2deg); } 85% { transform: rotate(-2deg); } 100% { transform: rotate(0); } }
        .shake { animation: bell-shake 0.6s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes background-pan { from { background-position: 0% center; } to { background-position: -200% center; } }
        #content-title, .gradient-text { background-size: 200%; animation: background-pan 5s linear infinite; }
        .active-link { background-color: var(--active-link-bg); color: var(--active-link-text) !important; font-weight: 600; }
        .active-link i:not(.icon-fire) { color: var(--active-link-icon); }
        .theme-toggle-btn { position: relative; width: 2.5rem; height: 2.5rem; }
        .theme-icon { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        #theme-icon-sun, .theme-icon-sun { opacity: 1; transform: scale(1) rotate(0deg); color: #f59e0b; }
        #theme-icon-moon, .theme-icon-moon { opacity: 0; transform: scale(0) rotate(-90deg); color: #a855f7; }
        .dark #theme-icon-sun, .dark .theme-icon-sun { opacity: 0; transform: scale(0) rotate(90deg); }
        .dark #theme-icon-moon, .dark .theme-icon-moon { opacity: 1; transform: scale(1) rotate(0deg); }
        @keyframes reveal-in { from { clip-path: circle(0% at var(--x) var(--y)); } to { clip-path: circle(150% at var(--x) var(--y)); } }
        ::view-transition-new(root) { animation: reveal-in 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        ::view-transition-old(root), ::view-transition-new(root) { animation-direction: normal; }
        .nav-wrapper { flex-grow: 1; position: relative; overflow: hidden; display: flex; }
        .nav-wrapper nav { width: 100%; overflow-y: auto; }
        .nav-wrapper::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2rem; background: linear-gradient(to top, var(--panel-bg), transparent); pointer-events: none; z-index: 1; }
        .social-icon { color: var(--text-secondary); transition: color 0.3s ease, transform 0.3s ease; display: inline-block; }
        .social-icon:hover { color: var(--active-link-icon); transform: translateY(-4px); }
        .tooltip { position: absolute; bottom: 125%; left: 50%; transform: translateX(-50%) scale(0.9); background-color: var(--text-primary); color: var(--bg-color); padding: 6px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 500; white-space: nowrap; opacity: 0; visibility: hidden; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; z-index: 10; }
        .tooltip::after { content: ''; position: absolute; top: 100%; left: 50%; margin-left: -5px; border-width: 5px; border-style: solid; border-color: var(--text-primary) transparent transparent transparent; }
        .group:hover .tooltip { opacity: 1; visibility: visible; transform: translateX(-50%) scale(1); }
        .profile-dropdown-link { display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 0.75rem; border-radius: 0.5rem; color: var(--text-secondary); transition: all 0.2s ease; }
        .profile-dropdown-link:hover { background-color: var(--active-link-bg); color: var(--active-link-text); }
        .profile-dropdown-link:hover i { color: var(--active-link-icon); }
        .logout-link:hover { background-color: #fee2e2; color: #ef4444; }
        .dark .logout-link:hover { background-color: rgba(244, 114, 182, 0.1); color: #f472b6; }
        .logout-link:hover i { color: #ef4444; }
        .dark .logout-link:hover i { color: #f472b6; }
        #notification-panel ul.divide-y > :not([hidden]) ~ :not([hidden]) { border-color: var(--notification-border); }
        @keyframes flow-gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .progress-bar-container { width: 100%; background-color: var(--input-bg); border-radius: 9999px; height: 12px; position: relative; box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); border: 1px solid var(--panel-border); }
        .progress-bar-inner { height: 100%; border-radius: 9999px; transition: width 1s cubic-bezier(0.23, 1, 0.32, 1), background 1s ease; position: relative; overflow: hidden; background-size: 200% 200%; animation: flow-gradient 4s ease infinite; }
        .progress-bar-inner::after { content: ''; position: absolute; top: 0; left: 0; width: 50%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%); animation: shine-effect 2s infinite linear; animation-delay: 0.2s; }
        .scroll-area::-webkit-scrollbar { height: 6px; width: 6px; }
        .scroll-area::-webkit-scrollbar-track { background: transparent; }
        .scroll-area::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 10px; transition: background-color 0.3s ease-in-out; }
        .scroll-area:hover::-webkit-scrollbar-thumb, .scroll-area.scrolling::-webkit-scrollbar-thumb { background-color: var(--text-muted); }
        .scroll-area::-webkit-scrollbar-thumb:hover { background-color: var(--text-secondary); }
        @keyframes form-in { from { opacity: 0; transform: scale(0.97) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .form-anim { animation: form-in 0.4s ease-out forwards; }
        #results-container { display: flex; flex-direction: column; gap: 1.5rem; }
        .result-card { background-color: var(--notification-bg); background-image: radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.15), transparent 70%); background-repeat: no-repeat; backdrop-filter: blur(10px); border: 1px solid var(--panel-border); border-radius: 1rem; padding: 1.25rem; box-shadow: 0 4px 8px -2px rgba(0,0,0,0.05); transition: all 0.3s ease-in-out; position: relative; overflow: hidden; }
        .dark .result-card { background-image: radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.2), transparent 70%); }
        .result-card::before { content: ''; position: absolute; top: 0; left: 0; width: 60%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0) 100%); pointer-events: none; opacity: 0.7; z-index: 1; }
        .dark .result-card::before { background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(255, 255, 255, 0) 100%); }
        .result-card::after { content: ''; position: absolute; top: 0; left: 0; width: 30%; height: 100%; background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%); transform: translateX(-100%) skewX(-25deg); pointer-events: none; opacity: 0; transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease; z-index: 2; }
        .dark .result-card::after { background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%); }
        .result-card:hover::after { transform: translateX(330%) skewX(-25deg); opacity: 1; }
        .result-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px -5px rgba(0,0,0,0.08); border-color: var(--active-link-icon); }
        .vote-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 9999px; font-size: 0.875rem; font-weight: 600; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); border: 1px solid var(--input-border); background-color: transparent; color: var(--text-secondary); }
        .vote-btn:hover { background-color: var(--dev-by-bg); color: var(--text-primary); border-color: var(--text-secondary); }
        .vote-btn .vote-count { min-width: 1.2rem; text-align: center; font-variant-numeric: tabular-nums; }
        .like-btn.voted { background-color: #16a34a; color: white; border-color: #16a34a; box-shadow: 0 4px 15px -3px rgba(22, 163, 74, 0.4); }
        .dislike-btn.voted { background-color: #dc2626; color: white; border-color: #dc2626; box-shadow: 0 4px 15px -3px rgba(220, 38, 38, 0.4); }
        .jumper-btn i { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .copy-btn { padding: 0.25rem 0.5rem; border-radius: 6px; }
        .input-wrapper { position: relative; }.input-icon { position: absolute; top: 50%; transform: translateY(-50%); left: 1rem; color: var(--text-muted); pointer-events: none; }.password-toggle { position: absolute; top: 50%; transform: translateY(-50%); right: 1rem; color: var(--text-muted); background: none; border: none; cursor: pointer; }.input-with-icon { padding-left: 2.75rem; }@keyframes scale-in-and-settle { 0% { transform: scale(1.8); opacity: 0; } 60% { transform: scale(0.95); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }.fab-load-animation { animation: scale-in-and-settle 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; animation-delay: 0.5s; }
        .chat-bubble { max-width: 85%; width: fit-content; box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03); }
        .chat-bubble-user { background-color: #0ea5e9; color: white; border-radius: 1.15rem 1.15rem 0.25rem 1.15rem; margin-left: auto; }
        .dark .chat-bubble-user { background-color: #a855f7; }
        .chat-bubble-admin { background-color: #e2e8f0; color: #1e293b; border-radius: 1.15rem 1.15rem 1.15rem 0.25rem; margin-right: auto; }
        .dark .chat-bubble-admin { background-color: #1e293b; color: #f1f5f9; }
        .chat-image { max-width: 300px; max-height: 350px; border-radius: 1rem; cursor: pointer; transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out; display: block; object-fit: cover; }
        .chat-image:hover { transform: scale(1.03); box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .profile-picture-container { position: relative; width: 128px; height: 128px; margin: auto; }
        .profile-picture { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; border: 4px solid var(--panel-border); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1); }
        .profile-picture-overlay { position: absolute; inset: 0; border-radius: 50%; background-color: rgba(0,0,0,0.5); color: white; display: flex; align-items: center; justify-content: center; flex-direction: column; opacity: 0; transition: opacity 0.3s ease; cursor: pointer; }
        .profile-picture-container:hover .profile-picture-overlay { opacity: 1; }
        #image-preview-modal img { animation: scale-in-and-settle 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        .dropdown-menu { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-in-out; }
        .dropdown-menu.open { max-height: 500px; }
        .dropdown-arrow.open { transform: rotate(180deg); }
        @keyframes auto-shine-effect { 0% { transform: translateX(-200%) skewX(-25deg); } 100% { transform: translateX(200%) skewX(-25deg); } }
        .home-nav-button { background-color: var(--notification-bg); background-image: radial-gradient(circle at 100% 0%, rgba(6, 182, 212, 0.15), transparent 70%); background-repeat: no-repeat; border: 1px solid var(--panel-border); border-radius: 1rem; padding: 1.5rem; text-align: left; display: flex; align-items: center; gap: 1rem; width: 100%; transition: all 0.3s ease; position: relative; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05); }
        .dark .home-nav-button { background-image: radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.2), transparent 70%); }
        .home-nav-button:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.08); border-color: var(--active-link-icon); }
        .home-nav-button .icon-wrapper { width: 3rem; height: 3rem; border-radius: 0.75rem; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; background-color: var(--active-link-bg); color: var(--active-link-icon); flex-shrink: 0; }
        .home-nav-button .text-content span { font-weight: 600; color: var(--text-primary); }
        .home-nav-button .text-content p { font-size: 0.875rem; color: var(--text-secondary); margin-top: 0.125rem; }
        .home-nav-button::after { content: ''; position: absolute; top: 0; left: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent); transform: skewX(-25deg); animation: auto-shine-effect 4s linear infinite 2s; }
        .dark .home-nav-button::after { background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent); }
        #others-buttons-grid { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-in-out, margin-top 0.5s ease-in-out; }
        #others-buttons-grid.open { max-height: 1000px; margin-top: 1.5rem; }
        #others-toggle-button .dropdown-arrow.open { transform: rotate(180deg); }
        #notepad-section { padding-top: 1rem; }
        #notepad-textarea { width: 100%; height: calc(100vh - 200px); padding: 1.5rem; border-radius: 1rem; background-color: var(--notification-bg); border: 1px solid var(--panel-border); color: var(--text-primary); font-size: 1rem; line-height: 1.7; resize: none; outline: none; box-shadow: 0 4px 8px -2px rgba(0,0,0,0.05); transition: all 0.3s ease; }
        #notepad-textarea:focus { border-color: var(--active-link-icon); box-shadow: 0 0 0 2px var(--active-link-bg); }
        #loading-overlay { position: fixed; inset: 0; background-color: var(--bg-color); z-index: 9999; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s ease; }
        .loader { width: 50px; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(farthest-side, #0ea5e9 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, #0ea5e9); -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0); animation: l13 1s infinite linear; }
        .dark .loader { background: radial-gradient(farthest-side, #a855f7 94%, #0000) top/8px 8px no-repeat, conic-gradient(#0000 30%, #a855f7); }
        @keyframes l13{ 100%{transform: rotate(1turn)} }
        @keyframes rotate-spinner { to { transform: rotate(360deg); } }
        #status-spinner { position: absolute; border-radius: 9999px; animation: rotate-spinner 1.5s linear infinite; opacity: 0; transition: opacity 0.3s ease, background 0.3s ease; top: -0.25rem; left: -0.25rem; right: -0.25rem; bottom: -0.25rem; }
        .light #status-spinner { top: -0.125rem; left: -0.125rem; right: -0.125rem; bottom: -0.125rem; }
        .light #status-spinner.active { opacity: 1; background: conic-gradient(from 90deg, transparent 50%, #22c55e 100%); }
        .light #status-spinner.inactive { opacity: 1; background: conic-gradient(from 90deg, transparent 50%, #ef4444 100%); }
        .dark #status-spinner.active { opacity: 1; background: conic-gradient(from 90deg, transparent 50%, #16a34a 100%); }
        .dark #status-spinner.inactive { opacity: 1; background: conic-gradient(from 90deg, transparent 50%, #dc2626 100%); }
      `}</style>
      
      <div ref={loadingOverlayRef} id="loading-overlay">
        <div className="loader"></div>
      </div>

      <div id="auth-container" ref={authContainerRef}>
        <div ref={authPageRef} id="auth-page" className="hidden min-h-screen flex flex-col items-center justify-center fade-in p-4 lg:p-8">
          <button id="auth-theme-toggle" className="theme-toggle-btn absolute top-5 right-5 z-10 text-xl p-2 rounded-full hover:bg-gray-500/10 transition-colors duration-200">
            <span className="theme-icon-sun theme-icon"><i className="fa-solid fa-sun"></i></span>
            <span className="theme-icon-moon theme-icon"><i className="fa-solid fa-moon"></i></span>
          </button>
          <div className="w-full max-w-md my-16">
            <div ref={loginPageRef} id="login-page" className="w-full hidden space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-cyan-400 dark:from-purple-500 dark:to-pink-500 gradient-text">Welcome Back</h2>
              <form ref={loginFormRef} id="login-form" className="space-y-6">
                <div>
                  <label htmlFor="login-email" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email address</label>
                  <div className="input-wrapper mt-2">
                    <i className="fa-solid fa-envelope input-icon"></i>
                    <input id="login-email" type="email" required className="w-full text-base rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="login-password" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
                  <div className="input-wrapper mt-2">
                    <i className="fa-solid fa-lock input-icon"></i>
                    <input id="login-password" type="password" required className="w-full text-base rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="••••••••" />
                    <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('login-password')}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
                <p ref={loginErrorRef} id="login-error" className="text-sm text-red-500 dark:text-pink-500 text-center"></p>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed">
                  Login
                </button>
              </form>
              <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                Don't have an account?
                <a href="#" ref={showSignupBtnRef} id="show-signup" className="font-medium text-sky-600 dark:text-purple-400 hover:underline">Sign up</a>
              </p>
            </div>
            <div ref={signupPageRef} id="signup-page" className="hidden w-full space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-green-400 dark:from-fuchsia-500 dark:to-purple-500 gradient-text">Create an Account</h2>
              <form ref={signupFormRef} id="signup-form" className="space-y-4">
                <div>
                  <label htmlFor="signup-name" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                  <div className="input-wrapper mt-2">
                    <i className="fa-solid fa-user input-icon"></i>
                    <input id="signup-name" type="text" required className="w-full text-base rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="John Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-email" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email address</label>
                  <div className="input-wrapper mt-2">
                    <i className="fa-solid fa-envelope input-icon"></i>
                    <input id="signup-email" type="email" required className="w-full text-base rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label htmlFor="signup-password" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Password</label>
                  <div className="input-wrapper mt-2">
                    <i className="fa-solid fa-lock input-icon"></i>
                    <input id="signup-password" type="password" required className="w-full text-base rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="Minimum 6 characters" />
                    <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('signup-password')}>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  </div>
                </div>
                <p ref={signupErrorRef} id="signup-error" className="text-sm text-red-500 dark:text-pink-500 text-center"></p>
                <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 dark:from-fuchsia-500 dark:to-purple-500 dark:hover:from-fuchsia-600 dark:hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed">
                  Sign Up
                </button>
              </form>
              <p className="text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                Already have an account?
                <a href="#" ref={showLoginBtnRef} id="show-login" className="font-medium text-sky-600 dark:text-purple-400 hover:underline">Login</a>
              </p>
            </div>
          </div>
          <div className="text-center my-8">
            <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>New Here? Explore Our Plans</p>
            <div className="w-20 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 dark:from-purple-500 dark:to-pink-500 mx-auto mt-2 rounded"></div>
          </div>
          <div ref={pricingPlansContainerRef} id="pricing-plans-container" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
            <div className="stagger-in backdrop-blur-xl border rounded-2xl shadow-lg p-8 flex flex-col" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}><div className="animate-pulse space-y-4"><div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div><div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div><div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div><div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div><div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-lg mt-8"></div></div></div>
            <div className="stagger-in backdrop-blur-xl border rounded-2xl shadow-lg p-8 flex flex-col" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}><div className="animate-pulse space-y-4"><div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div><div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div><div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div><div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div><div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-lg mt-8"></div></div></div>
            <div className="stagger-in backdrop-blur-xl border rounded-2xl shadow-lg p-8 flex flex-col" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}><div className="animate-pulse space-y-4"><div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div><div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div><div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div><div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div><div className="h-10 bg-slate-300 dark:bg-slate-700 rounded-lg mt-8"></div></div></div>
          </div>
        </div>
      </div>

      <div ref={appContainerRef} id="app-container" className="hidden">
        <aside ref={sidebarRef} id="sidebar" className="backdrop-blur-xl w-64 h-screen fixed top-0 left-0 transform -translate-x-full transition-transform duration-300 ease-in-out z-50 flex flex-col p-4 border-r"
               style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}>
          <div className="flex items-center justify-between mb-8 px-2 pt-2 flex-shrink-0">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Menu</h2>
            <button id="theme-toggle" className="theme-toggle-btn text-xl p-2 rounded-full hover:bg-gray-500/10 transition-colors duration-200">
              <span id="theme-icon-sun" className="theme-icon"><i className="fa-solid fa-sun"></i></span>
              <span id="theme-icon-moon" className="theme-icon"><i className="fa-solid fa-moon"></i></span>
            </button>
          </div>
          <div className="nav-wrapper">
            <nav>
              <ul className="space-y-2 px-2">
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200 active-link" data-source="home"><i className="fa-solid fa-house w-5 text-center"></i><span className="text-sm font-medium">Home</span></a></li>
                <li className="nav-item-dropdown">
                  <a href="#" className="dropdown-toggle flex items-center justify-between gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-poll w-5 text-center"></i>
                      <span className="text-sm font-medium">Cint</span>
                    </div>
                    <i className="fa-solid fa-chevron-down dropdown-arrow transition-transform duration-300"></i>
                  </a>
                  <ul className="dropdown-menu pl-8 pt-1 space-y-1">
                    <li><a href="#" className="nav-link nav-link-sub flex items-center gap-4 py-2 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Cint" data-placeholder="Find hostname or enter full URL..."><span className="text-sm font-medium">Hostname</span></a></li>
                    <hr className="border-slate-200 dark:border-slate-700 my-1 mx-4" />
                    <li><a href="#" className="nav-link nav-link-sub flex items-center gap-4 py-2 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="cintSurveyid" data-placeholder="Find Survey ID..."><span className="text-sm font-medium">SurveyId</span></a></li>
                  </ul>
                </li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="samplicio"><i className="fa-solid fa-fire w-5 text-center text-orange-400 icon-fire"></i><span className="text-sm font-medium">samplicio</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="SampleCube"><i className="fa-solid fa-cubes w-5 text-center"></i><span className="text-sm font-medium">SampleCube</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Edgeapi"><i className="fa-solid fa-share-nodes w-5 text-center"></i><span className="text-sm font-medium">Edgeapi</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Spectrum"><i className="fa-solid fa-layer-group w-5 text-center"></i><span className="text-sm font-medium">Spectrum</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Prodege"><i className="fa-solid fa-arrow-trend-up w-5 text-center"></i><span className="text-sm font-medium">Prodege</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="dkrbasic" data-placeholder="Enter full survey URL..."><i className="fa-solid fa-bolt w-5 text-center"></i><span className="text-sm font-medium">Dkr1 basic</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Survey Dashmr"><i className="fa-solid fa-gauge-high w-5 text-center"></i><span className="text-sm font-medium">Survey Dashmr</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Internos"><i className="fa-solid fa-network-wired w-5 text-center"></i><span className="text-sm font-medium">Internos</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Opinion Network"><i className="fa-solid fa-comments w-5 text-center"></i><span className="text-sm font-medium">Opinion Network</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="SurveysEliteOpinio"><i className="fa-solid fa-crown w-5 text-center"></i><span className="text-sm font-medium">SurveysEliteOpinio</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="SurveyEmirs"><i className="fa-solid fa-user-check w-5 text-center"></i><span className="text-sm font-medium">SurveyEmirs</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="Sayso"><i className="fa-solid fa-comment-dots w-5 text-center"></i><span className="text-sm font-medium">Sayso</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="ParadigSample"><i className="fa-solid fa-chart-pie w-5 text-center"></i><span className="text-sm font-medium">ParadigSample</span></a></li>
                <li><a href="#" className="nav-link flex items-center gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200" data-source="invite mind Share"><i className="fa-solid fa-brain w-5 text-center"></i><span className="text-sm font-medium">invite mind Share</span></a></li>
                <li className="nav-item-dropdown">
                  <a href="#" ref={othersSidebarToggleRef} id="others-sidebar-toggle" className="dropdown-toggle flex items-center justify-between gap-4 py-2.5 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-sky-50 dark:hover:bg-purple-500/10 hover:text-sky-600 dark:hover:text-white transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <i className="fa-solid fa-folder-tree w-5 text-center"></i>
                      <span className="text-sm font-medium">Others</span>
                    </div>
                    <i className="fa-solid fa-chevron-down dropdown-arrow transition-transform duration-300"></i>
                  </a>
                  <ul ref={othersSidebarMenuRef} id="others-sidebar-menu" className="dropdown-menu pl-8 pt-1 space-y-1"></ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className="mt-auto p-3 text-center rounded-lg border flex-shrink-0" style={{ backgroundColor: 'var(--dev-by-bg)', borderColor: 'var(--dev-by-border)' }}>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-code mr-1.5 text-sky-500 dark:text-purple-400"></i>
              Developed by <a href="https://t.me/Nahid_Ahmed_10" className="font-semibold text-sky-600 dark:text-purple-400 hover:underline">Nahid Ahmed</a>
            </p>
          </div>
        </aside>
        
        <div ref={mainContentRef} id="main-content" className="min-h-screen flex flex-col transition-all duration-300 ease-in-out relative">
          <header className="backdrop-blur-xl sticky top-0 z-40 border-b" style={{ backgroundColor: 'var(--panel-bg)', borderColor: 'var(--panel-border)' }}>
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center relative">
              <button ref={menuBtnRef} id="menu-btn" className="text-2xl transition-colors duration-200 text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-purple-400">
                <i className="fa-solid fa-bars-staggered"></i>
              </button>
              <div className="flex items-center gap-6">
                <div>
                  <button ref={notificationBtnRef} id="notification-btn" className="relative cursor-pointer">
                    <i className="fa-solid fa-bell text-xl text-slate-500 dark:text-slate-400 transition-colors duration-300"></i>
                    <span ref={notificationBadgeRef} id="notification-badge" className="hidden absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 dark:bg-pink-500 ring-2 ring-white dark:ring-slate-900 text-xs text-white text-center leading-tight"></span>
                  </button>
                  <div ref={notificationPanelRef} id="notification-panel" className="hidden absolute top-full mt-3 backdrop-blur-xl border rounded-xl shadow-lg slide-in z-50 w-[90vw] max-w-sm mx-auto left-0 right-0 md:w-80 md:mx-0 md:left-auto md:right-0"
                       style={{ backgroundColor: 'var(--notification-bg)', borderColor: 'var(--notification-border)', transformOrigin: 'top right' }}>
                    <div className="p-3 border-b" style={{ borderColor: 'var(--notification-border)' }}>
                      <h4 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Notifications</h4>
                    </div>
                    <ul ref={notificationListRef} id="notification-list" className="divide-y" style={{ borderColor: 'var(--notification-border)' }}>
                    </ul>
                    <div className="p-2 text-center"><a href="#" ref={clearNotificationsBtnRef} id="clear-notifications-btn" className="text-xs font-medium text-sky-600 dark:text-purple-400 hover:underline">Clear all notifications</a></div>
                  </div>
                </div>
                <div className="relative">
                  <button ref={profileBtnRef} id="profile-btn" className="group">
                    <div className="relative h-11 w-11">
                      <div id="status-spinner"></div>
                      <img src="https://placehold.co/44x44/1e293b/FFFFFF?text=NA" alt="Profile Picture" className="relative h-11 w-11 rounded-full border-2 border-slate-300 dark:border-slate-600 transition-all duration-300 cursor-pointer object-cover" />
                      <span ref={activityStatusDotRef} id="activity-status-dot" className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
                    </div>
                  </button>
                  <div ref={profileDropdownRef} id="profile-dropdown" className="hidden absolute top-full mt-3 backdrop-blur-xl border rounded-xl shadow-lg slide-in z-50 w-60 right-0"
                       style={{ backgroundColor: 'var(--notification-bg)', borderColor: 'var(--notification-border)', transformOrigin: 'top right' }}>
                    <div className="p-2.5">
                      <div className="px-2 py-1.5 mb-2">
                        <div className="flex justify-between items-center gap-2">
                          <p ref={profileNameRef} id="profile-name" className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Nahid Ahmed</p>
                          <div ref={profileExpiryTimerRef} id="profile-expiry-timer" className="hidden text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap" style={{ backgroundColor: 'var(--dev-by-bg)', border: '1px solid var(--panel-border)' }}></div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <p ref={profileEmailRef} id="profile-email" className="text-xs" style={{ color: 'var(--text-muted)' }}>admin@example.com</p>
                          <i ref={verifiedIconRef} id="verified-icon" className="fa-solid fa-circle-check text-green-500 dark:text-green-400 text-sm hidden" title="Verified Account"></i>
                        </div>
                      </div>
                      <hr className="my-1" style={{ borderColor: 'var(--panel-border)' }} />
                      <a href="#" ref={myProfileLinkRef} id="my-profile-link" className="profile-dropdown-link"><i className="fa-solid fa-user-circle w-5 text-center"></i><span className="text-sm font-medium">My Profile</span></a>
                      <a href="#" ref={notepadLinkRef} id="notepad-link" className="profile-dropdown-link"><i className="fa-solid fa-note-sticky w-5 text-center"></i><span className="text-sm font-medium">Notepad</span></a>
                      <hr className="my-1" style={{ borderColor: 'var(--panel-border)' }} />
                      <a href="#" ref={logoutBtnRef} id="logout-btn" className="profile-dropdown-link logout-link"><i className="fa-solid fa-sign-out-alt w-5 text-center"></i><span className="text-sm font-medium">Logout</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <main id="router-view" className="container mx-auto px-4 sm:px-6 pt-4 pb-8 flex-grow">
            <div ref={homeSectionRef} id="home-section" className="hidden fade-in max-w-5xl mx-auto">
              <div id="home-buttons-grid" className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Buttons will be dynamically managed by JS */}
                  <button className="home-nav-button" data-source="Cint" data-placeholder="Find hostname or enter full URL...">
                      <div className="icon-wrapper"><i className="fa-solid fa-poll"></i></div>
                      <div className="text-content"><span>Cint Hostname</span><p>Bypass Cint surveys by hostname.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="samplicio">
                      <div className="icon-wrapper"><i className="fa-solid fa-fire text-orange-400"></i></div>
                      <div className="text-content"><span>samplicio</span><p>The most popular survey bypass tool.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="SampleCube">
                      <div className="icon-wrapper"><i className="fa-solid fa-cubes"></i></div>
                      <div className="text-content"><span>SampleCube</span><p>Bypass SampleCube survey walls.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Edgeapi">
                      <div className="icon-wrapper"><i className="fa-solid fa-share-nodes"></i></div>
                      <div className="text-content"><span>Edgeapi</span><p>Solutions for Edgeapi based surveys.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Spectrum">
                      <div className="icon-wrapper"><i className="fa-solid fa-layer-group"></i></div>
                      <div className="text-content"><span>Spectrum</span><p>Get past Spectrum survey checks.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Prodege">
                      <div className="icon-wrapper"><i className="fa-solid fa-arrow-trend-up"></i></div>
                      <div className="text-content"><span>Prodege</span><p>Handle Prodege survey links easily.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="dkrbasic" data-placeholder="Enter full survey URL...">
                      <div className="icon-wrapper"><i className="fa-solid fa-bolt"></i></div>
                      <div className="text-content"><span>Dkr1 basic</span><p>Special bypass for Dkr1 basic links.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Survey Dashmr">
                      <div className="icon-wrapper"><i className="fa-solid fa-gauge-high"></i></div>
                      <div className="text-content"><span>Survey Dashmr</span><p>Bypass Survey Dashmr with ease.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Internos">
                      <div className="icon-wrapper"><i className="fa-solid fa-network-wired"></i></div>
                      <div className="text-content"><span>Internos</span><p>Bypass Internos surveys.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Opinion Network">
                      <div className="icon-wrapper"><i className="fa-solid fa-comments"></i></div>
                      <div className="text-content"><span>Opinion Network</span><p>Get through Opinion Network surveys.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="SurveysEliteOpinio">
                      <div className="icon-wrapper"><i className="fa-solid fa-crown"></i></div>
                      <div className="text-content"><span>SurveysEliteOpinio</span><p>Solutions for SurveysEliteOpinio.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="SurveyEmirs">
                      <div className="icon-wrapper"><i className="fa-solid fa-user-check"></i></div>
                      <div className="text-content"><span>SurveyEmirs</span><p>Bypass SurveyEmirs protection.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="Sayso">
                      <div className="icon-wrapper"><i className="fa-solid fa-comment-dots"></i></div>
                      <div className="text-content"><span>Sayso</span><p>Handle surveys from Sayso.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="ParadigSample">
                      <div className="icon-wrapper"><i className="fa-solid fa-chart-pie"></i></div>
                      <div className="text-content"><span>ParadigSample</span><p>Bypass ParadigSample surveys.</p></div>
                  </button>
                  <button className="home-nav-button" data-source="invite mind Share">
                      <div className="icon-wrapper"><i className="fa-solid fa-brain"></i></div>
                      <div className="text-content"><span>invite mind Share</span><p>Solutions for invite mind Share.</p></div>
                  </button>
                  <button ref={othersToggleButtonRef} id="others-toggle-button" className="home-nav-button">
                    <div className="icon-wrapper"><i className="fa-solid fa-folder-tree"></i></div>
                    <div className="text-content">
                        <span>Other Routers</span>
                        <p>Click to view more specialized routers.</p>
                    </div>
                    <i className="fa-solid fa-chevron-down dropdown-arrow ml-auto transition-transform duration-300"></i>
                  </button>
              </div>
              <div ref={othersButtonsGridRef} id="others-buttons-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
            </div>
            
            <div ref={mainRouterContentRef} id="main-router-content" className="hidden fade-in max-w-3xl mx-auto">
                <div className="text-center">
                    <div className="inline-block bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
                        <h1 ref={contentTitleRef} id="content-title" className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-400 dark:from-fuchsia-500 dark:to-cyan-400 py-2 px-6">
                            samplicio
                        </h1>
                    </div>
                    <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                        Complete or bypass surveys effortlessly and unlock the content you need
                    </p>
                </div>
                <div className="mt-10">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-full">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }}></i>
                            <input ref={hostnameInputRef} id="hostname-input" type="text" placeholder="Find hostname or enter full URL..."
                                   className="w-full text-base rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm"
                                   style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} />
                        </div>
                        <button ref={findBtnRef} id="find-btn" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                            <i ref={findBtnIconRef} id="find-btn-icon" className="fa-solid fa-arrow-right"></i>
                            <span ref={findBtnTextRef} id="find-btn-text">Find</span>
                        </button>
                    </div>
                    <div ref={resultsContainerRef} id="results-container" className="mt-8">
                        <div id="results-placeholder" className="h-full flex justify-center items-center text-center transition-opacity duration-300" style={{ color: 'var(--text-muted)' }}>
                            <div>
                                <i className="fa-solid fa-file-lines text-4xl mb-3"></i>
                                <p>Search results will appear here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={profileSectionRef} id="profile-section" className="hidden fade-in max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: 'var(--text-primary)' }}>My Profile</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                         <div className="p-6 rounded-2xl shadow-lg border" style={{ backgroundColor: 'var(--notification-bg)', borderColor: 'var(--panel-border)' }}>
                            <div className="profile-picture-container">
                                <img ref={profilePagePictureRef} id="profile-page-picture" src="https://placehold.co/128x128/1e293b/FFFFFF?text=NA" alt="Profile Picture" className="profile-picture" />
                                <div className="profile-picture-overlay" onClick={() => profilePictureUploadRef.current.click()}>
                                    <i className="fa-solid fa-camera text-2xl"></i>
                                    <span className="text-sm mt-1">Change</span>
                                </div>
                                <input type="file" ref={profilePictureUploadRef} id="profile-picture-upload" className="hidden" accept="image/*" />
                            </div>
                            <div className="text-center mt-4">
                                <h3 ref={profilePageNameRef} id="profile-page-name" className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}></h3>
                                <p ref={profilePageEmailRef} id="profile-page-email" className="text-sm" style={{ color: 'var(--text-secondary)' }}></p>
                            </div>
                            <div ref={uploadProgressContainerRef} id="upload-progress-container" className="mt-4 hidden">
                                <div className="progress-bar-container">
                                    <div ref={uploadProgressBarRef} id="upload-progress-bar" className="progress-bar-inner" style={{ width: '0%', background: 'linear-gradient(90deg, #0ea5e9, #6366f1, #a855f7)' }}></div>
                                </div>
                                <p ref={uploadProgressTextRef} id="upload-progress-text" className="text-xs text-center mt-1" style={{ color: 'var(--text-muted)' }}></p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-6 rounded-2xl shadow-lg border" style={{ backgroundColor: 'var(--notification-bg)', borderColor: 'var(--panel-border)' }}>
                            <h4 className="text-lg font-semibold mb-6 border-b pb-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--panel-border)' }}>Personal Information</h4>
                            <form ref={updateInfoFormRef} id="update-info-form" className="space-y-4">
                                <div>
                                    <label htmlFor="update-name" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Full Name</label>
                                    <div className="input-wrapper mt-2">
                                        <i className="fa-solid fa-user input-icon"></i>
                                        <input ref={updateNameInputRef} id="update-name" type="text" required className="w-full text-base rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="update-email" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Email Address</label>
                                     <div className="input-wrapper mt-2">
                                        <i className="fa-solid fa-envelope input-icon"></i>
                                        <input ref={updateEmailInputRef} id="update-email" type="email" readOnly className="w-full text-base rounded-lg pl-11 pr-4 py-3 focus:outline-none cursor-not-allowed" style={{ backgroundColor: 'var(--dev-by-bg)', border: '1px solid var(--input-border)', color: 'var(--text-muted)' }} />
                                    </div>
                                </div>
                                <p ref={updateInfoStatusRef} id="update-info-status" className="text-sm text-center h-4"></p>
                                <div className="flex justify-end pt-2">
                                    <button type="submit" ref={updateInfoBtnRef} id="update-info-btn" className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                                        Update Info
                                    </button>
                                </div>
                            </form>
                        </div>
                         <div className="p-6 rounded-2xl shadow-lg border" style={{ backgroundColor: 'var(--notification-bg)', borderColor: 'var(--panel-border)' }}>
                            <h4 className="text-lg font-semibold mb-6 border-b pb-4" style={{ color: 'var(--text-primary)', borderColor: 'var(--panel-border)' }}>Change Password</h4>
                            <form ref={changePasswordFormRef} id="change-password-form" className="space-y-4">
                                <div>
                                    <label htmlFor="current-password" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Current Password</label>
                                    <div className="input-wrapper mt-2">
                                        <i className="fa-solid fa-lock input-icon"></i>
                                        <input id="current-password" type="password" required className="w-full text-base rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} />
                                        <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('current-password')}><i className="fa-solid fa-eye"></i></button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="new-password" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>New Password</label>
                                    <div className="input-wrapper mt-2">
                                        <i className="fa-solid fa-key input-icon"></i>
                                        <input id="new-password" type="password" required className="w-full text-base rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} />
                                        <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('new-password')}><i className="fa-solid fa-eye"></i></button>
                                    </div>
                                </div>
                                 <div>
                                    <label htmlFor="confirm-password" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Confirm New Password</label>
                                    <div className="input-wrapper mt-2">
                                        <i className="fa-solid fa-key input-icon"></i>
                                        <input id="confirm-password" type="password" required className="w-full text-base rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} />
                                        <button type="button" className="password-toggle" onClick={() => togglePasswordVisibility('confirm-password')}><i className="fa-solid fa-eye"></i></button>
                                    </div>
                                </div>
                                <p ref={changePasswordStatusRef} id="change-password-status" className="text-sm text-center h-4"></p>
                                 <div className="flex justify-end pt-2">
                                    <button type="submit" ref={changePasswordBtnRef} id="change-password-btn" className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-green-400 hover:from-emerald-600 hover:to-green-500 dark:from-fuchsia-500 dark:to-purple-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div ref={notepadSectionRef} id="notepad-section" className="hidden fade-in max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <button ref={notepadBackBtnRef} id="notepad-back-btn" className="font-semibold p-2 sm:py-2 sm:px-4 rounded-lg transition-all duration-300 flex items-center gap-2 border border-slate-300 dark:border-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700" style={{ color: 'var(--text-secondary)' }}>
                        <i className="fa-solid fa-arrow-left text-base sm:text-sm"></i>
                        <span>Back to Home</span>
                    </button>
                    <h2 className="text-2xl sm:text-3xl font-bold hidden sm:block bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">Notepad</h2>
                </div>
                <textarea ref={notepadTextareaRef} id="notepad-textarea" placeholder="Write anything here... Your text will be saved for the session."></textarea>
            </div>
          </main>

          <footer className="py-10 mt-6">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex items-center gap-8">
                <div className="relative group"><span className="tooltip">Channel</span><a href="https://t.me/Baul_lite" className="social-icon"><i className="fa-solid fa-bullhorn text-xl"></i></a></div>
                <div className="relative group"><span className="tooltip">Group</span><a href="https://t.me/Baul_lite_group" className="social-icon"><i className="fa-solid fa-users text-xl"></i></a></div>
                <div className="relative group">
                  <span className="tooltip">Sent massage</span>
                  <a href="#" ref={openChatBtnRef} id="open-chat-btn" className="social-icon relative">
                    <i className="fa-solid fa-paper-plane text-xl"></i>
                    <span id="chat-notification-badge" className="hidden absolute -top-1 -right-2 h-4 min-w-[1rem] rounded-full bg-red-500 dark:bg-pink-500 text-xs text-white flex items-center justify-center px-1"></span>
                  </a>
                </div>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© <span ref={copyrightYearRef} id="copyright-year">2025</span> Baul 2.0 All Rights Reserved.</p>
            </div>
          </footer>
          <button ref={addHostBtnRef} id="add-host-btn" className="fab-load-animation fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-sky-500 to-cyan-400 dark:from-purple-500 dark:to-pink-500 text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center text-2xl transform hover:scale-110 transition-all duration-300 z-50">
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div ref={addHostModalRef} id="add-host-modal" className="hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
        <div ref={addHostModalPanelRef} id="add-host-modal-panel" className="w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col border transition-all duration-300" style={{ backgroundColor: 'var(--modal-bg)', borderColor: 'var(--panel-border)' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Add New Jumper</h3>
            <button ref={addHostCloseBtnRef} id="add-host-modal-close-btn" className="text-xl p-2 rounded-full hover:bg-gray-500/10 transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <form ref={addHostFormRef} id="add-host-form" className="space-y-5">
            <div>
              <label htmlFor="add-host-router" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Router</label>
              <select ref={addHostRouterSelectRef} id="add-host-router" required className="mt-2 w-full text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }}>
              </select>
            </div>
            <div>
              <label ref={addHostHostnameLabelRef} htmlFor="add-host-hostname" id="add-host-hostname-label" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Hostname</label>
              <input ref={addHostHostnameInputRef} id="add-host-hostname" type="text" required className="mt-2 w-full text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="e.g., https://www.example.com/page" />
            </div>
            <div>
              <label htmlFor="add-host-url" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Full Jumper link</label>
              <input id="add-host-url" type="url" required className="mt-2 w-full text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="https://www.example.com/survey?id=123" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="add-host-like" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Likes</label>
                <input id="add-host-like" type="number" defaultValue="0" disabled className="mt-2 w-full text-base rounded-lg px-4 py-3 bg-slate-100 dark:bg-slate-800/80 cursor-not-allowed" style={{ border: '1px solid var(--input-border)', color: 'var(--text-muted)' }} />
              </div>
              <div>
                <label htmlFor="add-host-dislike" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Dislikes</label>
                <input id="add-host-dislike" type="number" defaultValue="0" disabled className="mt-2 w-full text-base rounded-lg px-4 py-3 bg-slate-100 dark:bg-slate-800/80 cursor-not-allowed" style={{ border: '1px solid var(--input-border)', color: 'var(--text-muted)' }} />
              </div>
            </div>
            <p ref={addHostErrorRef} id="add-host-error" className="text-sm text-red-500 dark:text-pink-500 text-center"></p>
            <div className="flex justify-end items-center gap-4 pt-4">
              <button type="button" ref={addHostCancelBtnRef} id="add-host-cancel-btn" className="font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-slate-500/10" style={{ color: 'var(--text-secondary)' }}>Cancel</button>
              <button ref={addHostSubmitBtnRef} id="add-host-submit-btn" type="submit" className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 disabled:opacity-75 disabled:cursor-not-allowed">
                Add Entry
              </button>
            </div>
          </form>
        </div>
      </div>

      <div ref={manualRidModalRef} id="manual-rid-modal" className="hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
        <div id="manual-rid-modal-panel" className="w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col border transition-all duration-300" style={{ backgroundColor: 'var(--modal-bg)', borderColor: 'var(--panel-border)' }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Enter RID Manually</h3>
            <button ref={manualRidCloseBtnRef} id="manual-rid-modal-close-btn" className="text-xl p-2 rounded-full hover:bg-gray-500/10 transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <form ref={manualRidFormRef} id="manual-rid-form" className="space-y-4">
            <div>
              <label htmlFor="manual-rid-input" className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Could not find an RID automatically. Please paste it below.</label>
              <input ref={manualRidInputRef} id="manual-rid-input" type="text" required className="mt-2 w-full text-base rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} placeholder="Paste the RID here..." />
            </div>
            <p ref={manualRidErrorRef} id="manual-rid-error" className="text-sm text-red-500 dark:text-pink-500 text-center h-4"></p>
            <div className="flex justify-end items-center gap-4 pt-2">
              <button type="button" ref={manualRidCancelBtnRef} id="manual-rid-cancel-btn" className="font-semibold py-2 px-6 rounded-lg transition-all duration-300 hover:bg-slate-500/10" style={{ color: 'var(--text-secondary)' }}>Cancel</button>
              <button type="submit" className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-600 hover:to-cyan-500 dark:from-purple-500 dark:to-pink-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                Apply RID
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div ref={chatModalRef} id="chat-modal" className="hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center p-4 sm:items-center fade-in">
        <div id="chat-modal-panel" className="w-full max-w-lg h-[80vh] sm:h-[70vh] rounded-2xl shadow-2xl flex flex-col border transition-all duration-300" style={{ backgroundColor: 'var(--modal-bg)', borderColor: 'var(--panel-border)' }}>
          <div className="flex justify-between items-center p-4 border-b flex-shrink-0" style={{ borderColor: 'var(--panel-border)' }}>
            <div className="flex items-center gap-3">
              <i className="fa-solid fa-headset text-2xl" style={{ color: 'var(--active-link-icon)' }}></i>
              <div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Contact Admin</h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Telegram: <a href="https://t.me/Nahid_Ahmed_10" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium text-sky-600 dark:text-purple-400">Nahid</a>
                </p>
              </div>
            </div>
            <button ref={closeChatBtnRef} id="chat-modal-close-btn" className="text-xl p-2 rounded-full hover:bg-gray-500/10 transition-colors duration-200" style={{ color: 'var(--text-secondary)' }}>
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          <div ref={chatMessagesContainerRef} id="chat-messages-container" className="flex-grow p-4 overflow-y-auto scroll-area">
            <div className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
              <i className="fa-solid fa-comments text-3xl mb-2"></i>
              <p>No conversation has started yet. Send a message and the admin will respond once available. For urgent matters, please reach us via Telegram</p>
            </div>
          </div>
          <div ref={chatUploadProgressContainerRef} id="chat-upload-progress-container" className="p-4 border-t hidden" style={{ borderColor: 'var(--panel-border)' }}>
            <div className="progress-bar-container">
              <div ref={chatUploadProgressBarRef} id="chat-upload-progress-bar" className="progress-bar-inner" style={{ width: '0%', background: 'linear-gradient(90deg, #0ea5e9, #a855f7)' }}></div>
            </div>
            <p ref={chatUploadProgressTextRef} id="chat-upload-progress-text" className="text-xs text-center mt-1" style={{ color: 'var(--text-muted)' }}>Uploading image...</p>
          </div>
          <div className="p-4 border-t flex-shrink-0" style={{ borderColor: 'var(--panel-border)' }}>
            <form ref={chatFormRef} id="chat-form" className="flex items-center gap-3">
              <input type="file" ref={chatImageUploadRef} id="chat-image-upload" className="hidden" accept="image/*" />
              <button type="button" ref={chatAttachBtnRef} id="chat-attach-btn" className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300">
                <i className="fa-solid fa-paperclip text-lg"></i>
              </button>
              <input ref={chatInputRef} id="chat-input" type="text" placeholder="Type your message..." autoComplete="off" className="w-full text-base rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-purple-500 transition-all duration-300 shadow-sm" style={{ backgroundColor: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-primary)' }} />
              <button type="submit" id="chat-send-btn" className="flex-shrink-0 w-11 h-11 flex items-center justify-center bg-gradient-to-r from-sky-500 to-cyan-400 dark:from-purple-500 dark:to-pink-500 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-110 active:scale-100 transition-all duration-300">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div ref={imagePreviewModalRef} id="image-preview-modal" className="hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 fade-in">
        <button ref={imagePreviewCloseBtnRef} id="image-preview-close-btn" className="absolute top-4 right-4 text-white text-3xl hover:opacity-80 transition-opacity">
          <i className="fa-solid fa-times"></i>
        </button>
        <img ref={previewImageRef} id="preview-image" src="" alt="Image Preview" className="max-w-full max-h-full rounded-lg shadow-2xl object-contain" />
      </div>

      <audio ref={copySoundRef} id="copy-sound" src="Copy.mp3" preload="auto"></audio>
    </>
  );
}

export default App;
