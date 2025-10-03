// app.js
class PTokenDApp {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.contract = null;
    this.userAddress = null;
    this.isRegistered = false;
    this.userData = null;
    
    this.init();
  }

  async init() {
    // بررسی وجود MetaMask
    if (typeof window.ethereum !== 'undefined') {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // بررسی اتصال قبلی
      const accounts = await this.provider.listAccounts();
      if (accounts.length > 0) {
        this.userAddress = accounts[0];
        this.onWalletConnected();
      }
    } else {
      this.showMessage('لطفا MetaMask را نصب کنید', 'error');
    }
    
    // تنظیم رویدادها
    this.setupEventListeners();
  }

  setupEventListeners() {
    // رویداد تغییر حساب
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          this.userAddress = accounts[0];
          this.onWalletConnected();
        } else {
          this.onWalletDisconnected();
        }
      });
    }
  }

  async connectWallet() {
    try {
      if (!window.ethereum) {
        this.showMessage('لطفا MetaMask را نصب کنید', 'error');
        return;
      }

      // درخواست اتصال
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      this.signer = this.provider.getSigner();
      this.userAddress = await this.signer.getAddress();
      
      this.onWalletConnected();
      this.showMessage('اتصال موفقیت‌آمیز بود', 'success');
      
    } catch (error) {
      console.error('خطا در اتصال:', error);
      this.showMessage('خطا در اتصال به کیف پول', 'error');
    }
  }

  async onWalletConnected() {
    // به‌روزرسانی UI
    document.getElementById('connect-btn').style.display = 'none';
    document.getElementById('disconnect-btn').style.display = 'flex';
    document.getElementById('account').style.display = 'block';
    
    // نمایش آدرس کاربر
    const shortAddress = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
    document.querySelector('.account-address').textContent = shortAddress;
    
    // دریافت موجودی
    await this.getBalance();
    
    // بررسی وضعیت ثبت‌نام
    await this.checkRegistration();
    
    // بارگذاری اطلاعات کاربر
    if (this.isRegistered) {
      await this.loadUserData();
    }
  }

  onWalletDisconnected() {
    // بازنشانی UI
    document.getElementById('connect-btn').style.display = 'flex';
    document.getElementById('disconnect-btn').style.display = 'none';
    document.getElementById('account').style.display = 'none';
    
    this.userAddress = null;
    this.isRegistered = false;
    this.userData = null;
    
    // بازنشانی تب‌ها
    this.resetTabs();
  }

  async disconnectWallet() {
    // در این نسخه، فقط UI را بازنشانی می‌کنیم
    // در نسخه‌های پیشرفته‌تر می‌توان از متدهای قطع اتصال استفاده کرد
    this.onWalletDisconnected();
    this.showMessage('اتصال قطع شد', 'info');
  }

  async getBalance() {
    try {
      const balance = await this.provider.getBalance(this.userAddress);
      const balanceInMatic = ethers.utils.formatEther(balance);
      document.getElementById('wallet-balance').textContent = `${parseFloat(balanceInMatic).toFixed(4)} MATIC`;
    } catch (error) {
      console.error('خطا در دریافت موجودی:', error);
    }
  }

  async checkRegistration() {
    try {
      // شبیه‌سازی بررسی ثبت‌نام
      // در نسخه واقعی، اینجا با کانترکت تعامل خواهیم داشت
      const isRegistered = Math.random() > 0.5; // شبیه‌سازی
      
      this.isRegistered = isRegistered;
      this.updateRegistrationUI();
      
    } catch (error) {
      console.error('خطا در بررسی ثبت‌نام:', error);
    }
  }

  updateRegistrationUI() {
    const registrationSection = document.getElementById('registration-section');
    const userInfoSection = document.getElementById('user-info-section');
    const statusBadge = document.getElementById('status-badge');
    
    if (this.isRegistered) {
      registrationSection.style.display = 'none';
      userInfoSection.style.display = 'block';
      statusBadge.innerHTML = '<i class="fas fa-check-circle"></i> ثبت‌نام شده';
      statusBadge.className = 'status-badge registered';
    } else {
      registrationSection.style.display = 'block';
      userInfoSection.style.display = 'none';
      statusBadge.innerHTML = '<i class="fas fa-exclamation-circle"></i> ثبت‌نام نشده';
      statusBadge.className = 'status-badge unregistered';
    }
  }

  async register() {
    try {
      const uplineAddress = document.getElementById('upline-address').value;
      const position = document.querySelector('input[name="place"]:checked').value;
      
      if (!uplineAddress) {
        this.showMessage('لطفا شناسه آپلاین را وارد کنید', 'warning');
        return;
      }
      
      // شبیه‌سازی ثبت‌نام
      this.showMessage('در حال ثبت‌نام...', 'info');
      
      // تأخیر برای شبیه‌سازی
      setTimeout(async () => {
        this.isRegistered = true;
        this.updateRegistrationUI();
        await this.loadUserData();
        this.showMessage('ثبت‌نام با موفقیت انجام شد', 'success');
      }, 2000);
      
    } catch (error) {
      console.error('خطا در ثبت‌نام:', error);
      this.showMessage('خطا در ثبت‌نام', 'error');
    }
  }

  async loadUserData() {
    try {
      // شبیه‌سازی داده‌های کاربر
      this.userData = {
        id: Math.floor(Math.random() * 10000),
        upline: Math.floor(Math.random() * 1000),
        referrals: Math.floor(Math.random() * 50),
        balanceCount: Math.floor(Math.random() * 100),
        saveLeft: Math.floor(Math.random() * 20),
        saveRight: Math.floor(Math.random() * 20)
      };
      
      // به‌روزرسانی UI
      document.getElementById('user-id').textContent = this.userData.id;
      document.getElementById('user-upline').textContent = this.userData.upline;
      document.getElementById('total-referrals').textContent = this.userData.referrals;
      document.getElementById('balance-count').textContent = this.userData.balanceCount;
      document.getElementById('save-left').textContent = this.userData.saveLeft;
      document.getElementById('save-right').textContent = this.userData.saveRight;
      
      // بارگذاری شجره‌نامه
      if (document.getElementById('tree-tab').classList.contains('active')) {
        this.displayTree();
      }
      
    } catch (error) {
      console.error('خطا در بارگذاری اطلاعات کاربر:', error);
    }
  }

  displayTree() {
    const treeContainer = document.getElementById('tree');
    
    if (!this.isRegistered) {
      treeContainer.innerHTML = `
        <div class="tree-placeholder">
          <div class="placeholder-icon">
            <i class="fas fa-sitemap"></i>
          </div>
          <p>شبکه شما خالی است</p>
          <span>پس از ثبت‌نام، شجره‌نامه شما اینجا نمایش داده می‌شود</span>
        </div>
      `;
      return;
    }
    
    // شبیه‌سازی شجره‌نامه
    const treeData = this.generateSampleTree();
    treeContainer.innerHTML = this.renderTree(treeData);
    
    // به‌روزرسانی آمار
    document.getElementById('total-members').textContent = this.countTreeMembers(treeData);
    document.getElementById('current-level').textContent = '1';
  }

  generateSampleTree() {
    return {
      id: this.userData.id,
      isCurrent: true,
      children: [
        {
          id: Math.floor(Math.random() * 10000),
          children: [
            { id: Math.floor(Math.random() * 10000), children: [] },
            { id: Math.floor(Math.random() * 10000), children: [] }
          ]
        },
        {
          id: Math.floor(Math.random() * 10000),
          children: [
            { id: Math.floor(Math.random() * 10000), children: [] },
            { id: Math.floor(Math.random() * 10000), children: [] }
          ]
        }
      ]
    };
  }

  renderTree(node) {
    if (!node.children || node.children.length === 0) {
      return `
        <div class="tree-node ${node.isCurrent ? 'current-user' : ''}">
          <div class="node-content">
            <div class="node-id">${node.id}</div>
            ${node.isCurrent ? '<div class="node-badge">شما</div>' : ''}
          </div>
        </div>
      `;
    }
    
    return `
      <div class="tree-node ${node.isCurrent ? 'current-user' : ''}">
        <div class="node-content">
          <div class="node-id">${node.id}</div>
          ${node.isCurrent ? '<div class="node-badge">شما</div>' : ''}
        </div>
        <div class="tree-branch">
          <div class="branch">
            <div class="branch-label">چپ</div>
            ${this.renderTree(node.children[0])}
          </div>
          <div class="branch">
            <div class="branch-label">راست</div>
            ${this.renderTree(node.children[1])}
          </div>
        </div>
      </div>
    `;
  }

  countTreeMembers(node) {
    if (!node.children || node.children.length === 0) return 1;
    return 1 + node.children.reduce((sum, child) => sum + this.countTreeMembers(child), 0);
  }

  resetTabs() {
    // بازنشانی تمام تب‌ها به حالت اولیه
    this.updateRegistrationUI();
    
    // بازنشانی شجره‌نامه
    const treeContainer = document.getElementById('tree');
    treeContainer.innerHTML = `
      <div class="tree-placeholder">
        <div class="placeholder-icon">
          <i class="fas fa-sitemap"></i>
        </div>
        <p>لطفا ابتدا به کیف پول متصل شوید</p>
      </div>
    `;
    
    // بازنشانی ماینر
    this.updateMinerStatus(false);
  }

  updateMinerStatus(isActive) {
    const minerAnimation = document.getElementById('miner-animation');
    const minerStatus = document.getElementById('miner-status');
    const globalMinerStatus = document.getElementById('global-miner-status');
    
    if (isActive) {
      minerAnimation.innerHTML = `
        <div class="miner-icon active">
          <i class="fas fa-hard-hat"></i>
        </div>
        <div class="miner-status-text">ماینر در حال کار</div>
      `;
      minerStatus.textContent = 'فعال';
      globalMinerStatus.textContent = 'فعال';
      document.querySelector('.miner-status .status-indicator').style.background = 'var(--success)';
    } else {
      minerAnimation.innerHTML = `
        <div class="miner-icon sleeping">
          <i class="fas fa-bed"></i>
        </div>
        <div class="miner-status-text">ماینر در حال استراحت</div>
      `;
      minerStatus.textContent = 'غیرفعال';
      globalMinerStatus.textContent = 'غیرفعال';
      document.querySelector('.miner-status .status-indicator').style.background = 'var(--gray)';
    }
  }

  showMessage(message, type = 'info') {
    const toast = document.getElementById('message');
    toast.textContent = message;
    toast.className = `message-toast ${type}`;
    toast.style.display = 'block';
    
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4000);
  }
}

// توابع سراسری
let dapp;

function switchTab(tabName) {
  // مخفی کردن تمام تب‌ها
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // غیرفعال کردن تمام آیتم‌های ناوبری
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // نمایش تب انتخاب شده
  document.getElementById(`${tabName}-tab`).classList.add('active');
  
  // فعال کردن آیتم ناوبری مربوطه
  document.querySelector(`.nav-item[onclick="switchTab('${tabName}')"]`).classList.add('active');
  
  // بارگذاری داده‌های مربوطه
  if (dapp && dapp.userAddress) {
    if (tabName === 'tree') {
      dapp.displayTree();
    } else if (tabName === 'miner') {
      // شبیه‌سازی وضعیت ماینر
      dapp.updateMinerStatus(Math.random() > 0.5);
    }
  }
}

function connectWallet() {
  if (!dapp) {
    dapp = new PTokenDApp();
  }
  dapp.connectWallet();
}

function disconnectWallet() {
  if (dapp) {
    dapp.disconnectWallet();
  }
}

function register() {
  if (dapp) {
    dapp.register();
  }
}

function displayTree() {
  if (dapp) {
    dapp.displayTree();
  }
}

function contributeToMiner() {
  if (dapp) {
    dapp.showMessage('در حال پردازش درخواست...', 'info');
    // شبیه‌سازی خرید توکن ماینر
    setTimeout(() => {
      dapp.showMessage('خرید توکن با موفقیت انجام شد', 'success');
      dapp.updateMinerStatus(true);
    }, 2000);
  }
}

function distributeMinerTokens() {
  if (dapp) {
    dapp.showMessage('در حال توزیع پاداش...', 'info');
    // شبیه‌سازی توزیع پاداش
    setTimeout(() => {
      dapp.showMessage('پاداش با موفقیت توزیع شد', 'success');
    }, 2000);
  }
}

function withdrawPool() {
  if (dapp) {
    dapp.showMessage('در حال برداشت از استخر...', 'info');
    // شبیه‌سازی برداشت
    setTimeout(() => {
      dapp.showMessage('برداشت با موفقیت انجام شد', 'success');
    }, 2000);
  }
}

function withdrawSpecials() {
  if (dapp) {
    dapp.showMessage('در حال برداشت از استخر ویژه...', 'info');
    // شبیه‌سازی برداشت
    setTimeout(() => {
      dapp.showMessage('برداشت با موفقیت انجام شد', 'success');
    }, 2000);
  }
}

// مقداردهی اولیه هنگام لود صفحه
window.addEventListener('DOMContentLoaded', () => {
  dapp = new PTokenDApp();
});