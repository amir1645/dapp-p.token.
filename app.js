// تنظیمات DApp
const CONFIG = {
    CONTRACT_ADDRESS: "0x166dd205590240c90ca4e0e545ad69db47d8f22f",
    NETWORK: {
        chainId: "0x89", // Polygon Mainnet
        chainName: "Polygon Mainnet",
        rpcUrls: ["https://polygon-rpc.com/"],
        blockExplorerUrls: ["https://polygonscan.com/"],
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
        }
    }
};

// ABI قرارداد
const CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "uint256", "name": "uplineCode", "type": "uint256"},
            {"internalType": "bool", "name": "placeOnLeft", "type": "bool"}
        ],
        "name": "register",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "contributeToMinerPool",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buyMinerTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "distributeMinerTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawPool",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdrawSpecials",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "getUserInfo",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "uint256", "name": "uplineId", "type": "uint256"},
            {"internalType": "uint256", "name": "leftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "rightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "saveLeft", "type": "uint256"},
            {"internalType": "uint256", "name": "saveRight", "type": "uint256"},
            {"internalType": "uint256", "name": "balanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "specialBalanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalMinerRewards", "type": "uint256"},
            {"internalType": "uint256", "name": "entryPrice", "type": "uint256"},
            {"internalType": "bool", "name": "isMiner", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "userId", "type": "uint256"}],
        "name": "getUserDirects",
        "outputs": [
            {"internalType": "uint256", "name": "leftId", "type": "uint256"},
            {"internalType": "uint256", "name": "rightId", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMinerStats",
        "outputs": [
            {"internalType": "uint256", "name": "checkedOutPaidCount", "type": "uint256"},
            {"internalType": "uint256", "name": "eligibleInProgressCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalRemain", "type": "uint256"},
            {"internalType": "uint256", "name": "networkerCount", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256", "name": "userId", "type": "uint256"}],
        "name": "_getSpecialUserInfoForMigrateToNewFork",
        "outputs": [
            {"internalType": "uint256", "name": "id", "type": "uint256"},
            {"internalType": "address", "name": "userAddress", "type": "address"},
            {"internalType": "uint256", "name": "leftCount", "type": "uint256"},
            {"internalType": "uint256", "name": "rightCount", "type": "uint256"},
            {"internalType": "uint256", "name": "saveLeft", "type": "uint256"},
            {"internalType": "uint256", "name": "saveRight", "type": "uint256"},
            {"internalType": "uint256", "name": "balanceCount", "type": "uint256"},
            {"internalType": "address", "name": "upline", "type": "address"},
            {"internalType": "uint256", "name": "specialBalanceCount", "type": "uint256"},
            {"internalType": "uint256", "name": "totalMinerRewards", "type": "uint256"},
            {"internalType": "uint256", "name": "entryPrice", "type": "uint256"},
            {"internalType": "bool", "name": "isMiner", "type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

class PTokenDApp {
    constructor() {
        this.provider = null;
        this.signer = null;
        this.contract = null;
        this.userAddress = null;
        this.userInfo = null;
        this.isRegistered = false;
        
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
                await this.onWalletConnected();
            }
        } else {
            this.showToast('لطفاً MetaMask را نصب کنید', 'error');
        }
        
        // تنظیم رویدادها
        this.setupEventListeners();
        this.setupContract();
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

            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
        }

        // رویدادهای دکمه‌ها
        document.getElementById('connect-wallet').addEventListener('click', () => this.connectWallet());
        document.getElementById('disconnect-wallet').addEventListener('click', () => this.disconnectWallet());
        document.getElementById('register-btn').addEventListener('click', () => this.register());
        document.getElementById('refresh-tree').addEventListener('click', () => this.displayTree());
        document.getElementById('buy-tokens').addEventListener('click', () => this.buyMinerTokens());
        document.getElementById('claim-rewards').addEventListener('click', () => this.claimMinerRewards());
        document.getElementById('withdraw-pool').addEventListener('click', () => this.withdrawPool());
        document.getElementById('withdraw-special').addEventListener('click', () => this.withdrawSpecial());

        // رویدادهای ناوبری
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tabId = item.getAttribute('data-tab');
                this.switchTab(tabId);
            });
        });
    }

    async setupContract() {
        if (this.provider) {
            try {
                this.contract = new ethers.Contract(
                    CONFIG.CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    this.provider
                );
            } catch (error) {
                console.error('خطا در راه‌اندازی قرارداد:', error);
            }
        }
    }

    async connectWallet() {
        try {
            if (!window.ethereum) {
                this.showToast('لطفاً MetaMask را نصب کنید', 'error');
                return;
            }

            // درخواست اتصال
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            this.provider = new ethers.providers.Web3Provider(window.ethereum);
            this.signer = this.provider.getSigner();
            this.userAddress = await this.signer.getAddress();
            
            await this.onWalletConnected();
            this.showToast('اتصال موفقیت‌آمیز بود', 'success');
            
        } catch (error) {
            console.error('خطا در اتصال:', error);
            this.showToast('خطا در اتصال به کیف پول', 'error');
        }
    }

    async onWalletConnected() {
        // به‌روزرسانی UI
        document.getElementById('connect-wallet').style.display = 'none';
        document.getElementById('wallet-info').style.display = 'block';
        
        // نمایش آدرس کاربر
        const shortAddress = `${this.userAddress.slice(0, 6)}...${this.userAddress.slice(-4)}`;
        document.getElementById('wallet-address').textContent = shortAddress;
        document.getElementById('account-info').textContent = shortAddress;
        
        // راه‌اندازی قرارداد با signer
        this.contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, this.signer);
        
        // دریافت اطلاعات
        await this.updateWalletBalance();
        await this.checkUserRegistration();
        
        this.showToast('اتصال با موفقیت برقرار شد', 'success');
    }

    onWalletDisconnected() {
        // بازنشانی UI
        document.getElementById('connect-wallet').style.display = 'block';
        document.getElementById('wallet-info').style.display = 'none';
        document.getElementById('account-info').textContent = 'اتصال کیف پول';
        
        this.userAddress = null;
        this.userInfo = null;
        this.isRegistered = false;
        
        // بازنشانی تب‌ها
        this.resetTabs();
    }

    async disconnectWallet() {
        // در این نسخه، فقط UI را بازنشانی می‌کنیم
        this.onWalletDisconnected();
        this.showToast('اتصال قطع شد', 'info');
    }

    async updateWalletBalance() {
        try {
            const balance = await this.provider.getBalance(this.userAddress);
            const balanceInMatic = ethers.utils.formatEther(balance);
            document.getElementById('matic-balance').textContent = `${parseFloat(balanceInMatic).toFixed(4)} MATIC`;
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

    updateRegistrationUI() {
        const registrationSection = document.getElementById('registration-section');
        const userInfoSection = document.getElementById('user-info-section');
        
        if (this.isRegistered) {
            registrationSection.style.display = 'none';
            userInfoSection.style.display = 'block';
        } else {
            registrationSection.style.display = 'block';
            userInfoSection.style.display = 'none';
        }
    }

    async register() {
        try {
            const uplineId = document.getElementById('upline-id').value;
            const position = document.querySelector('input[name="position"]:checked').value;
            const placeOnLeft = position === 'left';
            
            if (!uplineId || isNaN(uplineId)) {
                this.showToast('لطفاً شناسه آپلاین معتبر وارد کنید', 'warning');
                return;
            }
            
            this.showToast('در حال پردازش تراکنش...', 'info');
            
            const registrationFee = ethers.utils.parseEther('350');
            const tx = await this.contract.register(uplineId, placeOnLeft, {
                value: registrationFee,
                gasLimit: 2000000
            });
            
            await tx.wait();
            
            this.showToast('ثبت‌نام با موفقیت انجام شد', 'success');
            await this.checkUserRegistration();
            
        } catch (error) {
            console.error('خطا در ثبت‌نام:', error);
            this.showToast('خطا در ثبت‌نام: ' + (error.reason || error.message), 'error');
        }
    }

    async loadUserData() {
        try {
            if (!this.userInfo) return;

            // به‌روزرسانی اطلاعات کاربر
            document.getElementById('user-id').textContent = this.userInfo.id.toString();
            document.getElementById('display-user-id').textContent = this.userInfo.id.toString();
            document.getElementById('display-upline').textContent = this.userInfo.uplineId.toString();
            document.getElementById('total-referrals').textContent = 
                (this.userInfo.leftCount.add(this.userInfo.rightCount)).toString();
            
            document.getElementById('left-balance').textContent = this.userInfo.leftCount.toString();
            document.getElementById('right-balance').textContent = this.userInfo.rightCount.toString();
            document.getElementById('total-balance').textContent = this.userInfo.balanceCount.toString();
            document.getElementById('save-left').textContent = this.userInfo.saveLeft.toString();
            document.getElementById('save-right').textContent = this.userInfo.saveRight.toString();
            
            // به‌روزرسانی وضعیت ماینر
            this.updateMinerStatus(this.userInfo.isMiner);
            
        } catch (error) {
            console.error('خطا در بارگذاری اطلاعات کاربر:', error);
        }
    }

    updateMinerStatus(isActive) {
        const minerAnimation = document.getElementById('miner-animation');
        const minerStatus = document.getElementById('miner-status');
        
        if (isActive) {
            minerAnimation.innerHTML = `
                <div class="miner-icon active">
                    <i class="fas fa-hard-hat"></i>
                </div>
                <div class="status-text">ماینر در حال کار</div>
            `;
            minerStatus.textContent = 'فعال';
            minerStatus.style.color = 'var(--success)';
        } else {
            minerAnimation.innerHTML = `
                <div class="miner-icon sleeping">
                    <i class="fas fa-bed"></i>
                </div>
                <div class="status-text">ماینر غیرفعال</div>
            `;
            minerStatus.textContent = 'غیرفعال';
            minerStatus.style.color = 'var(--gray)';
        }
    }

    async displayTree() {
        const treeContainer = document.getElementById('tree-container');
        
        if (!this.isRegistered) {
            treeContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-sitemap"></i>
                    <h3>شبکه شما خالی است</h3>
                    <p>پس از ثبت‌نام، ساختار شجره‌نامه شما اینجا نمایش داده می‌شود</p>
                </div>
            `;
            return;
        }
        
        try {
            this.showToast('در حال بارگذاری شجره‌نامه...', 'info');
            
            const treeData = await this.buildTree(this.userInfo.id, 0);
            treeContainer.innerHTML = treeData;
            
            // به‌روزرسانی آمار
            const totalMembers = await this.calculateTotalMembers(this.userInfo.id);
            document.getElementById('total-members').textContent = totalMembers;
            
            this.showToast('شجره‌نامه بارگذاری شد', 'success');
            
        } catch (error) {
            console.error('خطا در نمایش شجره‌نامه:', error);
            treeContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>خطا در بارگذاری</h3>
                    <p>مشکلی در بارگذاری شجره‌نامه پیش آمده است</p>
                </div>
            `;
        }
    }

    async buildTree(userId, level = 0) {
        if (level > 3) return ''; // محدودیت سطح

        try {
            const userData = await this.contract._getSpecialUserInfoForMigrateToNewFork(userId);
            const directs = await this.contract.getUserDirects(userId);
            
            const isCurrentUser = userData.userAddress.toLowerCase() === this.userAddress.toLowerCase();
            const nodeClass = isCurrentUser ? 'tree-node current' : 'tree-node';
            
            let treeHTML = `
                <div class="${nodeClass}">
                    <div class="node-id">${userData.id.toString()}</div>
                    ${isCurrentUser ? '<div class="node-badge">شما</div>' : ''}
                </div>
            `;

            if (directs.leftId.toString() !== '0' || directs.rightId.toString() !== '0') {
                treeHTML = `
                    <div class="tree">
                        <div class="tree-level">
                            ${treeHTML}
                        </div>
                        <div class="tree-level">
                `;
                
                // سمت چپ
                if (directs.leftId.toString() !== '0') {
                    treeHTML += await this.buildTree(directs.leftId, level + 1);
                } else {
                    treeHTML += '<div class="tree-node empty">خالی</div>';
                }
                
                // سمت راست
                if (directs.rightId.toString() !== '0') {
                    treeHTML += await this.buildTree(directs.rightId, level + 1);
                } else {
                    treeHTML += '<div class="tree-node empty">خالی</div>';
                }
                
                treeHTML += '</div></div>';
            }
            
            return treeHTML;
            
        } catch (error) {
            return '<div class="tree-node error">خطا</div>';
        }
    }

    async calculateTotalMembers(userId) {
        let total = 1; // خود کاربر
        
        try {
            const directs = await this.contract.getUserDirects(userId);
            
            if (directs.leftId.toString() !== '0') {
                total += await this.calculateTotalMembers(directs.leftId);
            }
            
            if (directs.rightId.toString() !== '0') {
                total += await this.calculateTotalMembers(directs.rightId);
            }
        } catch (error) {
            console.error('خطا در محاسبه کل اعضا:', error);
        }
        
        return total;
    }

    async buyMinerTokens() {
        try {
            this.showToast('در حال خرید توکن...', 'info');
            
            const tx = await this.contract.contributeToMinerPool({
                value: ethers.utils.parseEther('0.1'),
                gasLimit: 200000
            });
            
            await tx.wait();
            
            this.showToast('خرید توکن با موفقیت انجام شد', 'success');
            await this.checkUserRegistration();
            
        } catch (error) {
            console.error('خطا در خرید توکن:', error);
            this.showToast('خطا در خرید توکن: ' + (error.reason || error.message), 'error');
        }
    }

    async claimMinerRewards() {
        try {
            this.showToast('در حال دریافت پاداش...', 'info');
            
            const tx = await this.contract.distributeMinerTokens({ gasLimit: 200000 });
            await tx.wait();
            
            this.showToast('پاداش با موفقیت دریافت شد', 'success');
            await this.checkUserRegistration();
            
        } catch (error) {
            console.error('خطا در دریافت پاداش:', error);
            this.showToast('خطا در دریافت پاداش: ' + (error.reason || error.message), 'error');
        }
    }

    async withdrawPool() {
        try {
            this.showToast('در حال برداشت از استخر...', 'info');
            
            const tx = await this.contract.withdrawPool({ gasLimit: 200000 });
            await tx.wait();
            
            this.showToast('برداشت با موفقیت انجام شد', 'success');
            await this.updateWithdrawInfo();
            
        } catch (error) {
            console.error('خطا در برداشت:', error);
            this.showToast('خطا در برداشت: ' + (error.reason || error.message), 'error');
        }
    }

    async withdrawSpecial() {
        try {
            this.showToast('در حال برداشت ویژه...', 'info');
            
            const tx = await this.contract.withdrawSpecials({ gasLimit: 200000 });
            await tx.wait();
            
            this.showToast('برداشت ویژه با موفقیت انجام شد', 'success');
            await this.updateWithdrawInfo();
            
        } catch (error) {
            console.error('خطا در برداشت ویژه:', error);
            this.showToast('خطا در برداشت ویژه: ' + (error.reason || error.message), 'error');
        }
    }

    async updateWithdrawInfo() {
        try {
            const poolBalance = await this.contract.poolBalance();
            document.getElementById('pool-balance').textContent = 
                parseFloat(ethers.utils.formatEther(poolBalance)).toFixed(4);
            
            if (this.userInfo) {
                document.getElementById('special-balance').textContent = 
                    parseFloat(ethers.utils.formatEther(this.userInfo.specialBalanceCount || '0')).toFixed(4);
            }
            
        } catch (error) {
            console.error('خطا در به‌روزرسانی اطلاعات برداشت:', error);
        }
    }

    switchTab(tabId) {
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

    async updateMinerStats() {
        try {
            const minerStats = await this.contract.getMinerStats();
            
            // به‌روزرسانی آمار ماینر
            document.getElementById('miner-rewards').textContent = 
                this.userInfo ? ethers.utils.formatEther(this.userInfo.totalMinerRewards || '0') + ' PToken' : '0 PToken';
            
            // سایر آمارها می‌توانند اینجا به‌روزرسانی شوند
            
        } catch (error) {
            console.error('خطا در به‌روزرسانی آمار ماینر:', error);
        }
    }

    resetTabs() {
        // بازنشانی تمام تب‌ها به حالت اولیه
        this.updateRegistrationUI();
        
        // بازنشانی شجره‌نامه
        const treeContainer = document.getElementById('tree-container');
        treeContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sitemap"></i>
                <h3>لطفاً ابتدا به کیف پول متصل شوید</h3>
            </div>
        `;
        
        // بازنشانی ماینر
        this.updateMinerStatus(false);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

// مقداردهی اولیه DApp
let dapp;

document.addEventListener('DOMContentLoaded', () => {
    dapp = new PTokenDApp();
});