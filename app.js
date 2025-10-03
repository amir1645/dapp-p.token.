// تنظیمات DApp
const CONFIG = {
    CONTRACT_ADDRESS: "0x166dd205590240c90ca4e0e545ad69db47d8f22f",
    SUPPORTED_NETWORKS: {
        137: {
            name: "Polygon Mainnet",
            symbol: "MATIC",
            rpc: "https://polygon-rpc.com/",
            explorer: "https://polygonscan.com/",
            decimals: 18
        },
        80001: {
            name: "Polygon Mumbai Testnet",
            symbol: "MATIC",
            rpc: "https://rpc-mumbai.maticvigil.com/",
            explorer: "https://mumbai.polygonscan.com/",
            decimals: 18
        }
    }
};

// ABI قرارداد (همان ABI قبلی)
const CONTRACT_ABI = [
    // ... ABI کامل قرارداد (همانند کد قبلی)
];

class PTokenDApp {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.userInfo = null;
        this.isRegistered = false;
        this.currentNetwork = null;
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.checkPreviousConnection();
        this.setupContract();
    }

    setupEventListeners() {
        // رویدادهای دکمه‌ها
        document.getElementById('connect-wallet-simple').addEventListener('click', () => this.connectWallet());
        document.getElementById('disconnect-wallet').addEventListener('click', () => this.disconnectWallet());
        
        // رویدادهای کیف پول‌های خاص
        document.querySelectorAll('.wallet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const walletType = e.target.closest('.wallet-btn').dataset.wallet;
                this.connectSpecificWallet(walletType);
            });
        });

        // رویدادهای ناوبری
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tabId = item.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });

        // رویدادهای تغییر شبکه و حساب
        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length > 0) {
                    this.userAddress = accounts[0];
                    this.onWalletConnected();
                } else {
                    this.onWalletDisconnected();
                }
            });

            window.ethereum.on('chainChanged', (chainId) => {
                this.checkNetwork(parseInt(chainId));
                window.location.reload();
            });
        }
    }

    async checkPreviousConnection() {
        // بررسی اتصال قبلی از localStorage
        const savedConnection = localStorage.getItem('ptoken_connection');
        if (savedConnection && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ 
                    method: 'eth_accounts' 
                });
                if (accounts.length > 0) {
                    this.userAddress = accounts[0];
                    await this.setupProvider();
                    await this.onWalletConnected();
                }
            } catch (error) {
                console.error('خطا در بررسی اتصال قبلی:', error);
                localStorage.removeItem('ptoken_connection');
            }
        }
    }

    async setupProvider() {
        if (window.ethereum) {
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
        }
    }

    async connectWallet() {
        try {
            this.showConnectionStatus(true);
            
            // اگر ethereum موجود باشد (MetaMask، Trust Wallet، etc.)
            if (window.ethereum) {
                await this.connectInjectedWallet();
            } 
            // اگر کیف پول موبایل باشد
            else if (window.web3) {
                await this.connectLegacyWallet();
            }
            // اگر هیچ کیف پولی نباشد
            else {
                this.showWalletOptions();
            }
            
        } catch (error) {
            console.error('خطا در اتصال:', error);
            this.showToast(this.getErrorMessage(error), 'error');
            this.showConnectionStatus(false);
        }
    }

    async connectInjectedWallet() {
        try {
            // درخواست اتصال حساب‌ها
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            if (accounts.length > 0) {
                this.userAddress = accounts[0];
                await this.setupProvider();
                await this.onWalletConnected();
            }
            
        } catch (error) {
            if (error.code === 4001) {
                throw new Error('اتصال توسط کاربر لغو شد');
            }
            throw error;
        }
    }

    async connectLegacyWallet() {
        // پشتیبانی از web3 قدیمی
        this.provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
        this.signer = this.provider.getSigner();
        this.userAddress = await this.signer.getAddress();
        await this.onWalletConnected();
    }

    async connectSpecificWallet(walletType) {
        try {
            this.showConnectionStatus(true);
            
            switch(walletType) {
                case 'injected':
                    await this.connectInjectedWallet();
                    break;
                case 'walletconnect':
                    await this.connectWalletConnect();
                    break;
                case 'coinbase':
                    await this.connectCoinbaseWallet();
                    break;
                default:
                    await this.connectInjectedWallet();
            }
            
        } catch (error) {
            console.error('خطا در اتصال کیف پول:', error);
            this.showToast(this.getErrorMessage(error), 'error');
            this.showConnectionStatus(false);
        }
    }

    async connectWalletConnect() {
        // پیاده‌سازی WalletConnect (نیاز به نصب کتابخانه دارد)
        this.showToast('WalletConnect به زودی اضافه خواهد شد', 'info');
        this.showConnectionStatus(false);
    }

    async connectCoinbaseWallet() {
        // پیاده‌سازی Coinbase Wallet
        if (window.ethereum && window.ethereum.isCoinbaseWallet) {
            await this.connectInjectedWallet();
        } else {
            this.showToast('لطفاً Coinbase Wallet را نصب کنید', 'warning');
            this.showConnectionStatus(false);
        }
    }

    showWalletOptions() {
        // نمایش گزینه‌های کیف پول
        document.getElementById('wallet-options').style.display = 'block';
        document.getElementById('connect-wallet-simple').style.display = 'none';
    }

    async onWalletConnected() {
        try {
            // بررسی شبکه
            const network = await this.provider.getNetwork();
            await this.checkNetwork(network.chainId);
            
            // ذخیره اتصال
            localStorage.setItem('ptoken_connection', 'connected');
            
            // به‌روزرسانی UI
            this.updateConnectionUI();
            
            // راه‌اندازی قرارداد
            this.contract = new ethers.Contract(
                CONFIG.CONTRACT_ADDRESS, 
                CONTRACT_ABI, 
                this.signer
            );
            
            // دریافت اطلاعات
            await this.updateWalletBalance();
            await this.checkUserRegistration();
            
            this.showToast('اتصال با موفقیت برقرار شد', 'success');
            
        } catch (error) {
            console.error('خطا در راه‌اندازی اتصال:', error);
            this.showToast('خطا در راه‌اندازی اتصال', 'error');
        } finally {
            this.showConnectionStatus(false);
        }
    }

    async checkNetwork(chainId) {
        this.currentNetwork = chainId;
        
        const networkInfo = CONFIG.SUPPORTED_NETWORKS[chainId];
        const networkElement = document.getElementById('network-name');
        
        if (networkInfo) {
            networkElement.textContent = networkInfo.name;
            networkElement.style.color = 'var(--success)';
        } else {
            networkElement.textContent = 'شبکه نامعتبر';
            networkElement.style.color = 'var(--warning)';
            this.showNetworkWarning(chainId);
        }
    }

    showNetworkWarning(chainId) {
        // نمایش هشدار شبکه نامعتبر
        const warningHtml = `
            <div class="network-warning">
                <i class="fas fa-exclamation-triangle"></i>
                <p>شبکه فعلی پشتیبانی نمی‌شود</p>
                <p>لطفاً به شبکه Polygon Mainnet سوئیچ کنید</p>
                <button onclick="switchToPolygon()" class="switch-network-btn">
                    سوئیچ به Polygon
                </button>
            </div>
        `;
        
        document.querySelector('.wallet-container').insertAdjacentHTML('afterbegin', warningHtml);
    }

    async switchToPolygon() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }], // Polygon Mainnet
            });
        } catch (error) {
            if (error.code === 4902) {
                // اگر شبکه اضافه نشده باشد
                await this.addPolygonNetwork();
            }
        }
    }

    async addPolygonNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0x89',
                    chainName: 'Polygon Mainnet',
                    rpcUrls: ['https://polygon-rpc.com/'],
                    blockExplorerUrls: ['https://polygonscan.com/'],
                    nativeCurrency: {
                        name: 'MATIC',
                        symbol: 'MATIC',
                        decimals: 18
                    }
                }]
            });
        } catch (error) {
            this.showToast('خطا در اضافه کردن شبکه', 'error');
        }
    }

    updateConnectionUI() {
        // نمایش اطلاعات کیف پول
        document.getElementById('connection-card').style.display = 'none';
        document.getElementById('wallet-info').style.display = 'block';
        
        // نمایش آدرس کاربر
        const shortAddress = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
        document.getElementById('wallet-address').textContent = shortAddress;
        document.getElementById('account-info').textContent = shortAddress;
        
        // فعال کردن سایر تب‌ها
        this.enableOtherTabs();
    }

    showConnectionStatus(show) {
        document.getElementById('connection-status').style.display = show ? 'block' : 'none';
    }

    async disconnectWallet() {
        // قطع اتصال از localStorage
        localStorage.removeItem('ptoken_connection');
        
        // بازنشانی متغیرها
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.userInfo = null;
        this.isRegistered = false;
        
        // بازنشانی UI
        this.onWalletDisconnected();
        this.showToast('اتصال قطع شد', 'info');
    }

    onWalletDisconnected() {
        // بازنشانی UI
        document.getElementById('connection-card').style.display = 'block';
        document.getElementById('wallet-info').style.display = 'none';
        document.getElementById('wallet-options').style.display = 'none';
        document.getElementById('connect-wallet-simple').style.display = 'block';
        document.getElementById('account-info').textContent = 'اتصال کیف پول';
        
        // حذف هشدار شبکه
        const warning = document.querySelector('.network-warning');
        if (warning) warning.remove();
        
        // غیرفعال کردن سایر تب‌ها
        this.disableOtherTabs();
    }

    enableOtherTabs() {
        // فعال کردن آیتم‌های ناوبری
        document.querySelectorAll('.nav-item:not([data-tab="wallet-tab"])').forEach(item => {
            item.style.opacity = '1';
            item.style.cursor = 'pointer';
        });
    }

    disableOtherTabs() {
        // غیرفعال کردن آیتم‌های ناوبری
        document.querySelectorAll('.nav-item:not([data-tab="wallet-tab"])').forEach(item => {
            item.style.opacity = '0.5';
            item.style.cursor = 'not-allowed';
        });
        
        // بازگشت به تب کیف پول
        this.switchTab('wallet-tab');
    }

    async updateWalletBalance() {
        try {
            const balance = await this.provider.getBalance(this.userAddress);
            const balanceInMatic = ethers.utils.formatEther(balance);
            document.getElementById('matic-balance').textContent = 
                `${parseFloat(balanceInMatic).toFixed(4)} MATIC`;
        } catch (error) {
            console.error('خطا در دریافت موجودی:', error);
        }
    }

    async checkUserRegistration() {
        try {
            this.userInfo = await this.contract.getUserInfo(this.userAddress);
            
            if (this.userInfo.id.toString() !== '0') {
                this.isRegistered = true;
                await this.loadUserData();
            } else {
                this.isRegistered = false;
            }
            
            this.updateRegistrationUI();
            
        } catch (error) {
            console.error('خطا در بررسی ثبت‌نام:', error);
            this.isRegistered = false;
            this.updateRegistrationUI();
        }
    }

    getErrorMessage(error) {
        if (error.code === 4001) {
            return 'اتصال توسط کاربر لغو شد';
        } else if (error.code === -32002) {
            return 'درخواست اتصال در حال انجام است';
        } else if (error.message.includes('user rejected')) {
            return 'اتصال توسط کاربر رد شد';
        } else if (error.message.includes('already pending')) {
            return 'درخواست اتصال در حال انجام است';
        } else {
            return error.message || 'خطای ناشناخته';
        }
    }

    // سایر متدها (register, displayTree, etc.) مانند قبل باقی می‌مانند
    // ...

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    switchTab(tabId) {
        // فقط اگر کیف پول متصل باشد اجازه تغییر تب داده می‌شود
        if (!this.userAddress && tabId !== 'wallet-tab') {
            this.showToast('لطفاً ابتدا کیف پول خود را متصل کنید', 'warning');
            return;
        }
        
        // مخفی کردن تمام تب‌ها
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // غیرفعال کردن تمام آیتم‌های ناوبری
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // نمایش تب انتخاب شده
        document.getElementById(tabId).classList.add('active');
        
        // فعال کردن آیتم ناوبری مربوطه
        document.querySelector(`.nav-item[data-tab="${tabId}"]`).classList.add('active');
        
        // بارگذاری داده‌های مربوطه
        if (this.userAddress) {
            switch(tabId) {
                case 'genealogy-tab':
                    this.displayTree();
                    break;
                case 'miner-tab':
                    this.updateMinerStats();
                    break;
                case 'withdraw-tab':
                    this.updateWithdrawInfo();
                    break;
            }
        }
    }
}

// توابع سراسری برای استفاده در HTML
async function switchToPolygon() {
    if (window.dapp) {
        await window.dapp.switchToPolygon();
    }
}

// مقداردهی اولیه DApp
let dapp;

document.addEventListener('DOMContentLoaded', () => {
    dapp = new PTokenDApp();
    window.dapp = dapp; // در دسترس قرار دادن برای توابع سراسری
});