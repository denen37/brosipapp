 
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const resetBtn = document.getElementById('resetBtn');
    const saveBtn = document.getElementById('saveBtn');
    const toast = document.getElementById('toast');
    const toastClose = document.querySelector('.toast-close');
    const username = document.getElementById('username');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    // Form data state
    let formData = {
      firstName: '',
      lastName: '',
      officeNumber: '',
      workEmail: '',
      residentAddress: '',
      username: '@username',
      userCategory: '',
      postalCode: '',
      accountPrivacy: 'public',
      portfolioUrl: ''
    };
    
    // Create overlay element for mobile sidebar
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);
    
    // Toggle sidebar on mobile - using the menu button next to profile
    if (menuToggle) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
      });
    }
    
    // Close sidebar when clicking on overlay
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('show');
    });
    
    // Handle bottom navigation items
    bottomNavItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all items
        bottomNavItems.forEach(navItem => navItem.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        
        // Here you would handle navigation - for now we just show a toast
        const page = this.getAttribute('data-page');
        if (page !== 'create') { // Only show toast if not on the current page
          showToast('Navigation', `Navigating to ${page} page`, 'info');
        }
      });
    });
    
    // Update username display when username input changes
    if (username && usernameDisplay) {
      username.addEventListener('input', function() {
        const value = this.value;
        usernameDisplay.textContent = value;
        formData.username = value;
      });
    }
    
    // Collect form input elements
    const formInputs = document.querySelectorAll('.form-input:not([readonly]), .form-select');
    
    // Add event listeners to form inputs
    formInputs.forEach(input => {
      input.addEventListener('change', function() {
        // Update form data state
        if (this.id) {
          formData[this.id] = this.value;
        }
      });
    });
    
    // Reset form
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        // Reset form data
        formData = {
          firstName: '',
          lastName: '',
          officeNumber: '',
          workEmail: '',
          residentAddress: '',
          username: '@username',
          userCategory: '',
          postalCode: '',
          accountPrivacy: 'public',
          portfolioUrl: ''
        };
        
        // Reset form inputs
        formInputs.forEach(input => {
          if (input.id === 'username') {
            input.value = '@username';
            if (usernameDisplay) usernameDisplay.textContent = '@username';
          } else if (input.id === 'accountPrivacy') {
            input.value = 'public';
          } else {
            input.value = '';
          }
        });
        
        // Show toast
        showToast('Changes Reset', 'Your changes have been discarded.', 'error');
      });
    }
    
    // Save form
    if (saveBtn) {
      saveBtn.addEventListener('click', function() {
        // Here you would typically send the form data to a server
        // For now, we'll just show a success toast
        showToast('Profile Updated', 'Your profile has been successfully updated.');
        
        // Log the form data to console
        console.log('Form data saved:', formData);
      });
    }
    
    // Close toast
    if (toastClose) {
      toastClose.addEventListener('click', function() {
        toast.classList.remove('show');
      });
    }
    
    // Function to show toast notification
    function showToast(title, message, type = 'success') {
      if (!toast) return;
      
      const toastTitle = document.querySelector('.toast-title');
      const toastDescription = document.querySelector('.toast-description');
      
      if (toastTitle) toastTitle.textContent = title;
      if (toastDescription) toastDescription.textContent = message;
      
      // Set toast type (success, error, or info)
      if (type === 'error') {
        toast.style.borderLeft = '4px solid var(--red)';
      } else if (type === 'info') {
        toast.style.borderLeft = '4px solid var(--blue)';
      } else {
        toast.style.borderLeft = '4px solid var(--green)';
      }
      
      // Show toast
      toast.classList.add('show');
      
      // Auto hide after 5 seconds
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    }
    
    // Initialize sidebar items functionality
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all items
        sidebarItems.forEach(i => i.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
      });
    });
    
    // Initialize navbar tabs functionality
    const navbarTabs = document.querySelectorAll('.navbar-tab');
    navbarTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        navbarTabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
      });
    });
    
    // Check for viewport resize to handle sidebar visibility
    function handleResize() {
      if (window.innerWidth >= 768) {
        // Reset sidebar for desktop view
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      }
    }
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();
  });