// DApp Settings
const CONFIG = {
    CONTRACT_ADDRESS: "0x166dd205590240c90ca4e0e545ad69db47d8f22f",
    TOKEN_P_CONTRACT_ADDRESS: "0x82F7dBe1792436d15bdA22bB3340bD3f45D614Fa",
    GAS_SETTINGS: {
        HIGH: { gasLimit: 1000000, gasPrice: ethers.utils.parseUnits('50', 'gwei') },
        MEDIUM: { gasLimit: 500000, gasPrice: ethers.utils.parseUnits('40', 'gwei') },
        LOW: { gasLimit: 300000, gasPrice: ethers.utils.parseUnits('30', 'gwei') }
    }
};

// Multi-language System
const translations = {
    fa: {
        // عمومی
        'app.title': 'PToken',
        'app.subtitle': 'شبکه پالیگان',
        'status.online': 'آنلاین',
        'status.active': 'فعال',
        'status.inactive': 'غیرفعال',
        'status.loading': 'در حال بارگذاری...',
        'status.fetchingInfo': 'در حال دریافت اطلاعات...',
        
        // کیف پول
        'wallet.welcome': 'خوش آمدید',
        'wallet.connectToStart': 'برای شروع، کیف پول خود را متصل کنید',
        'wallet.connect': 'اتصال به کیف پول',
        'wallet.disconnect': 'قطع اتصال',
        'wallet.connected': 'اتصال موفق',
        'wallet.balance': 'موجودی:',
        
        // ناوبری
        'nav.wallet': 'کیف پول',
        'nav.profile': 'پروفایل',
        'nav.tokenP': 'توکن P',
        'nav.miner': 'ماینر',
        'nav.withdraw': 'برداشت',
        
        // کاربر
        'user.profile': 'پروفایل کاربری',
        'user.newRegistration': 'ثبت‌نام جدید',
        'user.uplineId': 'شناسه عددی کاربر آپلاین',
        'user.uplineHint': 'شناسه عددی کاربری که شما را دعوت کرده است',
        'user.position': 'موقعیت قرارگیری در شبکه',
        'user.left': 'سمت چپ',
        'user.right': 'سمت راست',
        'user.leftDesc': 'قرارگیری در شاخه چپ',
        'user.rightDesc': 'قرارگیری در شاخه راست',
        'user.completeRegistration': 'تکمیل ثبت‌نام',
        'user.yourId': 'شناسه کاربری شما:',
        'user.entryPrice': 'قیمت ورود',
        'user.teamStats': 'آمار تیم شما',
        'user.leftTeam': 'تیم چپ',
        'user.rightTeam': 'تیم راست',
        'user.totalTeam': 'کل تیم',
        'user.networkBalance': 'تعادل شبکه',
        'user.leftVolts': 'ولت‌های تیم چپ',
        'user.rightVolts': 'ولت‌های تیم راست',
        'user.balanceProgress': 'پیشرفت تعادل',
        'user.advancedStats': 'آمار پیشرفته',
        'user.saveLeft': 'ذخیره چپ',
        'user.saveRight': 'ذخیره راست',
        'user.specialBalance': 'تعادل ویژه',
        'user.totalRewards': 'پاداش‌های کل',
        'user.networkStatus': 'وضعیت شبکه',
        'user.registrationDate': 'تاریخ ثبت‌نام',
        'user.registrationNote': 'هزینه ثبت‌نام: 350 پالیگان',
        'user.securityNote': 'تمامی تراکنش‌ها امن و بر بلاکچین هستند',
        
        // توکن
        'token.title': 'توکن P',
        'token.currentPrice': 'قیمت فعلی هر توکن P',
        'token.marketCap': 'ارزش بازار',
        'token.totalSupply': 'عرضه کل:',
        'token.pTokenBalance': 'موجودی توکن P',
        'token.polygonBalance': 'موجودی پالیگان',
        'token.inWallet': 'در کیف پول',
        'token.buyTitle': 'خرید توکن P',
        'token.amountToBuy': 'مقدار پالیگان برای خرید',
        'token.youWillReceive': 'دریافت می‌کنید:',
        'token.transactionFee': 'کارمزد تراکنش:',
        'token.buyButton': 'خرید توکن P',
        'token.sellTitle': 'فروش توکن P',
        'token.amountToSell': 'مقدار توکن P برای فروش',
        'token.sellButton': 'فروش توکن P',
        'token.max': 'MAX',
        
        // واحدها
        'unit.polygon': 'پالیگان',
        'unit.token': 'توکن P',
        'unit.pToken': 'توکن P',
        'unit.matic': 'پالیگان',
        
        // ماینر
        'miner.title': 'سیستم ماینر',
        'miner.checkingStatus': 'در حال بارگذاری...',
        'miner.yourStatus': 'وضعیت ماینر شما',
        'miner.loading': 'در حال دریافت اطلاعات...',
        'miner.totalRewards': 'پاداش‌های کل ماینر',
        'miner.tokensAvailable': 'توکن‌های موجود',
        'miner.activeMiners': 'ماینرهای فعال',
        'miner.distributionRate': 'نرخ توزیع',
        'miner.nextBuyTimer': 'زمان باقی‌مانده تا خرید بعدی',
        'miner.buyNote': 'هر 24 ساعت یکبار امکان خرید وجود دارد',
        'miner.buyTokens': 'خرید توکن ماینر',
        'miner.buyFromPool': 'خرید از استخر ماینر:',
        'miner.buyDescription': 'با استفاده از موجودی استخر ماینر',
        'miner.buyButton': 'خرید توکن ماینر',
        'miner.distributeTokens': 'توزیع توکن ماینر',
        'miner.distributeDescription': 'موجودی استخر برای توزیع:',
        'miner.distributeNote': 'این توکن‌ها بین ماینرها توزیع می‌شود',
        'miner.distributeButton': 'توزیع توکن ماینر',
        'miner.distributionInfo': 'اطلاعات توزیع',
        'miner.poolBalance': 'موجودی استخر',
        'miner.eligibleUsers': 'کاربران واجد شرایط',
        'miner.pendingDistribution': 'توزیع در انتظار',
        'miner.checkingDistribution': 'در حال بررسی وضعیت توزیع...',
        'miner.status.active': 'ماینر فعال',
        'miner.status.inactive': 'ماینر غیرفعال',
        'miner.status.loading': 'در حال بارگذاری...',
        'miner.detailedStatus.active': 'شما به عنوان ماینر فعال در سیستم ثبت شده‌اید',
        'miner.detailedStatus.inactive': 'شما در حال حاضر به عنوان ماینر فعال نیستید',
        'miner.detailedStatus.loading': 'در حال دریافت اطلاعات...',
        'miner.readyToBuy': 'آماده برای خرید',
        'miner.distributionExplanation': 'توزیع توکن‌های ماینر در روز پنجم هر ماه میلادی انجام می‌شود',
        'miner.distributionNote': 'توزیع خودکار در تاریخ مشخص شده انجام خواهد شد',
        
        // برداشت
        'withdraw.title': 'برداشت از استخرها',
        'withdraw.nextWithdrawTimer': 'زمان باقی‌مانده تا برداشت بعدی',
        'withdraw.withdrawNote': 'هر 6 ساعت یکبار قابلیت برداشت است',
        'withdraw.developmentPool': 'استخر پاداش توسعه',
        'withdraw.polygonAvailable': 'پالیگان موجود',
        'withdraw.totalRegistrations': 'تعداد ثبت‌نام',
        'withdraw.yourBalances': 'تعادل‌های شما',
        'withdraw.withdrawDevelopment': 'برداشت پاداش توسعه',
        'withdraw.specialPool': 'استخر پاداش ویژه',
        'withdraw.totalBalances': 'تعداد تعادل‌ها',
        'withdraw.yourSpecialBalances': 'امتیازهای ویژه شما',
        'withdraw.withdrawSpecial': 'برداشت ویژه',
        'withdraw.checkingStatus': 'در حال بررسی وضعیت استخر...',
        'withdraw.readyToWithdraw': 'آماده برای برداشت',
        
        // استخر ویژه
        'specialPool.empty': 'استخر ویژه در حال حاضر خالی است',
        'specialPool.noEligibleUsers': 'هیچ کاربر واجد شرایطی برای برداشت وجود ندارد',
        'specialPool.eligibleUsers': 'کاربر واجد شرایط برای برداشت',
        
        // پیام‌ها
        'message.installMetamask': 'لطفاً MetaMask را نصب کنید',
        'message.connecting': 'در حال اتصال...',
        'message.connected': 'اتصال با موفقیت برقرار شد!',
        'message.disconnected': 'اتصال قطع شد',
        'message.processing': 'در حال پردازش...',
        'message.transactionSent': 'تراکنش ارسال شد - در انتظار تایید...',
        'message.success': 'عملیات با موفقیت انجام شد!',
        'message.insufficientFunds': 'موجودی کافی نیست',
        'message.userRejected': 'کاربر تراکنش را رد کرد',
        'message.invalidUpline': 'لطفاً شناسه آپلاین معتبر وارد کنید',
        'message.positiveNumber': 'شناسه آپلاین باید یک عدد مثبت باشد',
        'message.connectFirst': 'لطفاً ابتدا به کیف پول متصل شوید',
        'message.wrongNetwork': 'لطفاً به شبکه Polygon متصل شوید',
        'message.registrationSuccess': 'ثبت‌نام با موفقیت انجام شد!',
        'message.buySuccess': 'خرید با موفقیت انجام شد!',
        'message.sellSuccess': 'فروش با موفقیت انجام شد!',
        'message.minerBuySuccess': 'خرید توکن ماینر با موفقیت انجام شد!',
        'message.distributionSuccess': 'توزیع توکن ماینر با موفقیت انجام شد!',
        'message.withdrawSuccess': 'برداشت با موفقیت انجام شد!',
        'message.specialWithdrawSuccess': 'برداشت ویژه با موفقیت انجام شد!',
        
        // خطاها
        'error.timeFetch': 'خطا در دریافت زمان',
        'error.calculation': 'خطا در محاسبه',
        'error.invalidAmount': 'لطفاً یک مقدار معتبر وارد کنید',
        'error.insufficientBalance': 'موجودی کافی نیست',
        'error.loadingUserInfo': 'خطا در بارگذاری اطلاعات کاربر',
        'error.networkCheck': 'خطا در بررسی شبکه',
        'error.contractConnection': 'خطا در اتصال به قرارداد'
    },
    en: {
        // General
        'app.title': 'PToken',
        'app.subtitle': 'Polygon Network',
        'status.online': 'Online',
        'status.active': 'Active',
        'status.inactive': 'Inactive',
        'status.loading': 'Loading...',
        'status.fetchingInfo': 'Fetching information...',
        
        // Wallet
        'wallet.welcome': 'Welcome',
        'wallet.connectToStart': 'Connect your wallet to start',
        'wallet.connect': 'Connect Wallet',
        'wallet.disconnect': 'Disconnect',
        'wallet.connected': 'Connected Successfully',
        'wallet.balance': 'Balance:',
        
        // Navigation
        'nav.wallet': 'Wallet',
        'nav.profile': 'Profile',
        'nav.tokenP': 'Token P',
        'nav.miner': 'Miner',
        'nav.withdraw': 'Withdraw',
        
        // User
        'user.profile': 'User Profile',
        'user.newRegistration': 'New Registration',
        'user.uplineId': 'Upline User ID',
        'user.uplineHint': 'Numeric ID of the user who invited you',
        'user.position': 'Network Position',
        'user.left': 'Left Side',
        'user.right': 'Right Side',
        'user.leftDesc': 'Placement in left branch',
        'user.rightDesc': 'Placement in right branch',
        'user.completeRegistration': 'Complete Registration',
        'user.yourId': 'Your User ID:',
        'user.entryPrice': 'Entry Price',
        'user.teamStats': 'Your Team Stats',
        'user.leftTeam': 'Left Team',
        'user.rightTeam': 'Right Team',
        'user.totalTeam': 'Total Team',
        'user.networkBalance': 'Network Balance',
        'user.leftVolts': 'Left Team Volts',
        'user.rightVolts': 'Right Team Volts',
        'user.balanceProgress': 'Balance Progress',
        'user.advancedStats': 'Advanced Stats',
        'user.saveLeft': 'Save Left',
        'user.saveRight': 'Save Right',
        'user.specialBalance': 'Special Balance',
        'user.totalRewards': 'Total Rewards',
        'user.networkStatus': 'Network Status',
        'user.registrationDate': 'Registration Date',
        'user.registrationNote': 'Registration fee: 350 Polygon',
        'user.securityNote': 'All transactions are secure and on blockchain',
        
        // Token
        'token.title': 'Token P',
        'token.currentPrice': 'Current P Token Price',
        'token.marketCap': 'Market Cap',
        'token.totalSupply': 'Total Supply:',
        'token.pTokenBalance': 'P Token Balance',
        'token.polygonBalance': 'Polygon Balance',
        'token.inWallet': 'In Wallet',
        'token.buyTitle': 'Buy P Token',
        'token.amountToBuy': 'Amount of Polygon to Buy',
        'token.youWillReceive': 'You will receive:',
        'token.transactionFee': 'Transaction fee:',
        'token.buyButton': 'Buy P Token',
        'token.sellTitle': 'Sell P Token',
        'token.amountToSell': 'Amount of P Token to Sell',
        'token.sellButton': 'Sell P Token',
        'token.max': 'MAX',
        
        // Units
        'unit.polygon': 'Polygon',
        'unit.token': 'P Token',
        'unit.pToken': 'P Token',
        'unit.matic': 'MATIC',
        
        // Miner
        'miner.title': 'Miner System',
        'miner.checkingStatus': 'Loading...',
        'miner.yourStatus': 'Your Miner Status',
        'miner.loading': 'Fetching information...',
        'miner.totalRewards': 'Total Miner Rewards',
        'miner.tokensAvailable': 'Tokens Available',
        'miner.activeMiners': 'Active Miners',
        'miner.distributionRate': 'Distribution Rate',
        'miner.nextBuyTimer': 'Time until next buy',
        'miner.buyNote': 'Available every 24 hours',
        'miner.buyTokens': 'Buy Miner Tokens',
        'miner.buyFromPool': 'Buy from miner pool:',
        'miner.buyDescription': 'Using miner pool balance',
        'miner.buyButton': 'Buy Miner Tokens',
        'miner.distributeTokens': 'Distribute Miner Tokens',
        'miner.distributeDescription': 'Pool balance for distribution:',
        'miner.distributeNote': 'These tokens are distributed among miners',
        'miner.distributeButton': 'Distribute Miner Tokens',
        'miner.distributionInfo': 'Distribution Information',
        'miner.poolBalance': 'Pool Balance',
        'miner.eligibleUsers': 'Eligible Users',
        'miner.pendingDistribution': 'Pending Distribution',
        'miner.checkingDistribution': 'Checking distribution status...',
        'miner.status.active': 'Active Miner',
        'miner.status.inactive': 'Inactive Miner',
        'miner.status.loading': 'Loading...',
        'miner.detailedStatus.active': 'You are registered as an active miner in the system',
        'miner.detailedStatus.inactive': 'You are currently not an active miner',
        'miner.detailedStatus.loading': 'Fetching information...',
        'miner.readyToBuy': 'Ready to buy',
        'miner.distributionExplanation': 'Miner tokens distribution occurs on the 5th day of each Gregorian month',
        'miner.distributionNote': 'Automatic distribution will occur on the specified date',
        
        // Withdraw
        'withdraw.title': 'Withdraw from Pools',
        'withdraw.nextWithdrawTimer': 'Time until next withdraw',
        'withdraw.withdrawNote': 'Available every 6 hours',
        'withdraw.developmentPool': 'Development Reward Pool',
        'withdraw.polygonAvailable': 'Polygon Available',
        'withdraw.totalRegistrations': 'Total Registrations',
        'withdraw.yourBalances': 'Your Balances',
        'withdraw.withdrawDevelopment': 'Withdraw Development Reward',
        'withdraw.specialPool': 'Special Reward Pool',
        'withdraw.totalBalances': 'Total Balances',
        'withdraw.yourSpecialBalances': 'Your Special Balances',
        'withdraw.withdrawSpecial': 'Withdraw Special',
        'withdraw.checkingStatus': 'Checking pool status...',
        'withdraw.readyToWithdraw': 'Ready to withdraw',
        
        // Special Pool
        'specialPool.empty': 'Special pool is currently empty',
        'specialPool.noEligibleUsers': 'No eligible users for withdrawal',
        'specialPool.eligibleUsers': 'eligible users for withdrawal',
        
        // Messages
        'message.installMetamask': 'Please install MetaMask',
        'message.connecting': 'Connecting...',
        'message.connected': 'Connected successfully!',
        'message.disconnected': 'Disconnected',
        'message.processing': 'Processing...',
        'message.transactionSent': 'Transaction sent - waiting for confirmation...',
        'message.success': 'Operation completed successfully!',
        'message.insufficientFunds': 'Insufficient funds',
        'message.userRejected': 'User rejected the transaction',
        'message.invalidUpline': 'Please enter a valid upline ID',
        'message.positiveNumber': 'Upline ID must be a positive number',
        'message.connectFirst': 'Please connect your wallet first',
        'message.wrongNetwork': 'Please connect to Polygon network',
        'message.registrationSuccess': 'Registration completed successfully!',
        'message.buySuccess': 'Purchase completed successfully!',
        'message.sellSuccess': 'Sale completed successfully!',
        'message.minerBuySuccess': 'Miner tokens purchased successfully!',
        'message.distributionSuccess': 'Miner tokens distributed successfully!',
        'message.withdrawSuccess': 'Withdrawal completed successfully!',
        'message.specialWithdrawSuccess': 'Special withdrawal completed successfully!',
        
        // Errors
        'error.timeFetch': 'Error getting time',
        'error.calculation': 'Calculation error',
        'error.invalidAmount': 'Please enter a valid amount',
        'error.insufficientBalance': 'Insufficient balance',
        'error.loadingUserInfo': 'Error loading user information',
        'error.networkCheck': 'Network check error',
        'error.contractConnection': 'Error connecting to contract'
    }
};

let currentLanguage = 'fa';
let provider = null;
let signer = null;
let contract = null;
let tokenPContract = null;
let userAccount = null;
let withdrawTimer = null;
let minerBuyTimer = null;

// Main Contract ABI
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
        "inputs": [],
        "name": "poolBalance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "minerTokenPool",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastMinerBuyTime",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lastPoolWithdrawTime",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "specialRewardPool",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getSpecialPoolCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "registrationFee",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalUsers",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTokenPrice",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pendingMinerFunds",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eligiblePoolUserCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "eligibleSpecialUserCount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Token P Contract ABI
const TOKEN_P_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "buyPToken",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPTokenPriceInWei",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256", "name": "pTokenAmount", "type": "uint256"}
        ],
        "name": "sellPToken",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lockedSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }
];

// Helper function to get translation
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}

// Language change function
function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    updateTextDirection(lang);
    translatePage();
    updateDynamicContent();
    initializeStatusDisplays();
}

// Text direction update function
function updateTextDirection(lang) {
    const body = document.body;
    if (lang === 'fa') {
        body.classList.add('rtl');
        body.classList.remove('ltr');
    } else {
        body.classList.add('ltr');
        body.classList.remove('rtl');
    }
}

// Page translation function
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
}

// Dynamic content update function
function updateDynamicContent() {
    if (contract && userAccount) {
        updateWalletBalance();
        updatePTokenInfo();
        updateMinerStats();
        updateWithdrawInfo();
    }
}

// Message display function
function showMessage(messageKey, type = 'info', customMessage = null) {
    const messageElement = document.getElementById('message');
    let messageText = customMessage || translations[currentLanguage][messageKey] || messageKey;
    
    messageElement.textContent = messageText;
    messageElement.className = `message-toast ${type}`;
    messageElement.classList.add('show');
    
    setTimeout(() => {
        messageElement.classList.remove('show');
    }, 5000);
}

// Polygon network check
const POLYGON_MAINNET = {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    blockExplorerUrls: ['https://polygonscan.com/'],
    nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
    }
};

async function checkNetwork() {
    if (window.ethereum) {
        try {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            if (chainId !== POLYGON_MAINNET.chainId) {
                showMessage('message.wrongNetwork', 'error');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Network check error:', error);
            showMessage('error.networkCheck', 'error');
            return false;
        }
    }
    return false;
}

// Wallet connection function
async function connectWallet() {
    try {
        if (!window.ethereum) {
            showMessage('message.installMetamask', 'error');
            return;
        }

        showMessage('message.connecting', 'info');
        
        // Network check
        if (!await checkNetwork()) {
            return;
        }

        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        userAccount = await signer.getAddress();
        
        contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        tokenPContract = new ethers.Contract(CONFIG.TOKEN_P_CONTRACT_ADDRESS, TOKEN_P_ABI, signer);
        
        // Display account info
        updateUIAfterConnection();
        
        // Load initial data
        await loadInitialData();
        
        showMessage('message.connected', 'success');
        
    } catch (err) {
        console.error('Connection error:', err);
        showMessage('error.contractConnection', 'error');
    }
}

// UI update after connection
function updateUIAfterConnection() {
    const accountDisplay = document.getElementById('account');
    const accountAddress = document.querySelector('.account-address');
    accountAddress.textContent = `${userAccount.substring(0, 6)}...${userAccount.substring(38)}`;
    accountDisplay.style.display = 'block';
    
    document.getElementById('connect-btn').style.display = 'none';
    document.getElementById('disconnect-btn').style.display = 'flex';
}

// Initial data loading
async function loadInitialData() {
    await Promise.all([
        updateWalletBalance(),
        updateRegistrationFee(),
        checkRegistrationStatus()
    ]);
}

// Wallet disconnection function
function disconnectWallet() {
    if (withdrawTimer) {
        clearInterval(withdrawTimer);
        withdrawTimer = null;
    }
    
    if (minerBuyTimer) {
        clearInterval(minerBuyTimer);
        minerBuyTimer = null;
    }
    
    provider = null;
    signer = null;
    contract = null;
    tokenPContract = null;
    userAccount = null;
    
    document.getElementById('account').style.display = 'none';
    document.getElementById('connect-btn').style.display = 'flex';
    document.getElementById('disconnect-btn').style.display = 'none';
    
    document.getElementById('unregistered-view').style.display = 'block';
    document.getElementById('registered-view').style.display = 'none';
    
    showMessage('message.disconnected', 'info');
}

// Registration fee update
async function updateRegistrationFee() {
    if (!contract) return;

    try {
        const fee = await contract.registrationFee();
        const feeInMatic = ethers.utils.formatEther(fee);
        
        const priceTag = document.querySelector('.price-tag');
        if (priceTag) {
            priceTag.textContent = `${parseFloat(feeInMatic).toFixed(1)} ${getTranslation('unit.polygon')}`;
        }
        
    } catch (err) {
        console.error('Error fetching registration fee:', err);
    }
}

// Registration status check
async function checkRegistrationStatus() {
    if (!contract || !userAccount) return;

    try {
        const user = await contract.getUserInfo(userAccount);
        
        if (user.id.toString() === '0') {
            document.getElementById('unregistered-view').style.display = 'block';
            document.getElementById('registered-view').style.display = 'none';
        } else {
            document.getElementById('unregistered-view').style.display = 'none';
            document.getElementById('registered-view').style.display = 'block';
            await loadUserInfo();
        }
    } catch (err) {
        console.error('Error checking registration:', err);
        document.getElementById('unregistered-view').style.display = 'block';
        document.getElementById('registered-view').style.display = 'none';
    }
}

// Registration function with optimized gas
async function register() {
    if (!contract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    const uplineCodeInput = document.getElementById('upline-address');
    const uplineCode = uplineCodeInput.value.trim();
    const placeOnLeft = document.querySelector('input[name="place"]:checked').value === 'left';

    if (!uplineCode) {
        showMessage('message.invalidUpline', 'error');
        return;
    }

    const uplineCodeNumber = parseInt(uplineCode);
    if (isNaN(uplineCodeNumber) || uplineCodeNumber <= 0) {
        showMessage('message.positiveNumber', 'error');
        return;
    }

    try {
        showMessage('message.processing', 'info');
        
        const registrationFee = await contract.registrationFee();
        
        const tx = await contract.register(uplineCodeNumber, placeOnLeft, {
            value: registrationFee,
            ...CONFIG.GAS_SETTINGS.HIGH
        });

        showMessage('message.transactionSent', 'info');
        
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
            showMessage('message.registrationSuccess', 'success');
            await checkRegistrationStatus();
            uplineCodeInput.value = '';
        } else {
            throw new Error('Transaction failed');
        }
        
    } catch (err) {
        console.error('Registration error:', err);
        let errorMessage = 'Registration error: ';
        
        if (err.code === 'INSUFFICIENT_FUNDS') {
            errorMessage = 'message.insufficientFunds';
        } else if (err.code === 'ACTION_REJECTED') {
            errorMessage = 'message.userRejected';
        } else if (err.reason) {
            errorMessage = err.reason;
        } else {
            errorMessage = err.message;
        }
        
        showMessage(typeof errorMessage === 'string' && errorMessage.startsWith('message.') ? errorMessage : '', 'error', errorMessage);
    }
}

// User info loading
async function loadUserInfo() {
    if (!contract || !userAccount) return;

    try {
        console.log('در حال دریافت اطلاعات کاربر از قرارداد...');
        const user = await contract.getUserInfo(userAccount);
        console.log('اطلاعات کاربر دریافت شد:', {
            id: user.id.toString(),
            uplineId: user.uplineId.toString(),
            leftCount: user.leftCount.toString(),
            rightCount: user.rightCount.toString(),
            balanceCount: user.balanceCount.toString(),
            specialBalanceCount: user.specialBalanceCount.toString()
        });
        
        updateUserUI(user);
        
    } catch (err) {
        console.error('خطا در بارگذاری اطلاعات کاربر از قرارداد:', err);
        showMessage('error.loadingUserInfo', 'error');
    }
}

// User UI update
function updateUserUI(user) {
    // Basic info
    document.getElementById('user-id').textContent = user.id.toString();
    document.getElementById('user-upline').textContent = user.uplineId.toString();
    
    // Team stats
    const totalTeam = parseInt(user.leftCount) + parseInt(user.rightCount);
    document.getElementById('team-stats-left').textContent = user.leftCount.toString();
    document.getElementById('team-stats-right').textContent = user.rightCount.toString();
    document.getElementById('team-stats-total').textContent = totalTeam.toString();
    
    // Entry price
    const entryPrice = user.entryPrice ? ethers.utils.formatEther(user.entryPrice) : '0';
    document.getElementById('entry-price').textContent = `${parseFloat(entryPrice).toFixed(2)} ${getTranslation('unit.polygon')}`;
}

// Tab switching function
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Deactivate all navigation items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Activate corresponding navigation item
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    // Load relevant data
    if (contract && userAccount) {
        switch(tabName) {
            case 'user':
                loadUserInfo();
                break;
            case 'token-p':
                loadTokenInfo();
                break;
            case 'miner':
                loadMinerInfo();
                break;
            case 'withdraw':
                console.log('تب برداشت انتخاب شد');
                loadWithdrawInfo();
                break;
        }
    }
}

// Token info loading
async function loadTokenInfo() {
    await Promise.all([
        updatePTokenInfo(),
        updateWalletBalance()
    ]);
}

// PToken info update
async function updatePTokenInfo() {
    if (!tokenPContract || !userAccount) return;

    try {
        const [priceInWei, tokenBalance, decimals, totalSupply] = await Promise.all([
            tokenPContract.getPTokenPriceInWei(),
            tokenPContract.balanceOf(userAccount),
            tokenPContract.decimals(),
            tokenPContract.totalSupply()
        ]);

        const priceInMatic = ethers.utils.formatEther(priceInWei);
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        const tokenValue = parseFloat(formattedBalance) * parseFloat(priceInMatic);
        const formattedTotalSupply = ethers.utils.formatUnits(totalSupply, decimals);
        
        // UI update
        document.getElementById('p-token-price').textContent = parseFloat(priceInMatic).toFixed(8);
        document.getElementById('p-token-balance').textContent = parseFloat(formattedBalance).toFixed(4);
        document.getElementById('p-token-value').textContent = `≈ ${tokenValue.toFixed(6)} ${getTranslation('unit.polygon')}`;
        document.getElementById('available-tokens-sell').textContent = `${parseFloat(formattedBalance).toFixed(4)} ${getTranslation('unit.token')}`;
        document.getElementById('total-supply').textContent = `${parseFloat(formattedTotalSupply).toFixed(2)}`;
        
    } catch (err) {
        console.error('Error updating PToken info:', err);
        showMessage('error.loadingUserInfo', 'error');
    }
}

// تابع برای پر کردن کل موجودی در خرید
function fillMaxBuy() {
    const walletBalanceElements = document.querySelectorAll('.wallet-balance');
    if (walletBalanceElements.length > 0) {
        const balanceText = walletBalanceElements[0].textContent;
        const balance = parseFloat(balanceText);
        if (!isNaN(balance) && balance > 0) {
            // کمی کمتر از کل موجودی برای کارمزد در نظر بگیریم
            const maxAmount = Math.max(0, balance - 0.01);
            document.getElementById('buy-amount').value = maxAmount.toFixed(4);
            calculateBuyTokens(); // محاسبه خودکار
        }
    }
}

// تابع برای پر کردن کل موجودی در فروش
function fillMaxSell() {
    const pTokenBalance = document.getElementById('p-token-balance').textContent;
    const balance = parseFloat(pTokenBalance);
    if (!isNaN(balance) && balance > 0) {
        document.getElementById('sell-amount').value = balance.toFixed(4);
        calculateSellMatic(); // محاسبه خودکار
    }
}

// Buy tokens calculation
async function calculateBuyTokens() {
    const buyAmount = parseFloat(document.getElementById('buy-amount').value);
    
    if (!buyAmount || buyAmount <= 0) {
        document.getElementById('tokens-received').textContent = `0 ${getTranslation('unit.token')}`;
        return;
    }

    try {
        const priceInWei = await tokenPContract.getPTokenPriceInWei();
        const priceInMatic = ethers.utils.formatEther(priceInWei);
        const tokensReceived = buyAmount / parseFloat(priceInMatic);
        
        document.getElementById('tokens-received').textContent = `${tokensReceived.toFixed(4)} ${getTranslation('unit.token')}`;
        
    } catch (err) {
        console.error('Error calculating buy tokens:', err);
        document.getElementById('tokens-received').textContent = getTranslation('error.calculation');
    }
}

// Sell Matic calculation
async function calculateSellMatic() {
    const sellAmount = parseFloat(document.getElementById('sell-amount').value);
    
    if (!sellAmount || sellAmount <= 0) {
        document.getElementById('matic-received').textContent = `0 ${getTranslation('unit.polygon')}`;
        return;
    }

    try {
        const priceInWei = await tokenPContract.getPTokenPriceInWei();
        const priceInMatic = ethers.utils.formatEther(priceInWei);
        const maticReceived = sellAmount * parseFloat(priceInMatic);
        
        document.getElementById('matic-received').textContent = `${maticReceived.toFixed(6)} ${getTranslation('unit.polygon')}`;
        
    } catch (err) {
        console.error('Error calculating sell matic:', err);
        document.getElementById('matic-received').textContent = getTranslation('error.calculation');
    }
}

// Buy PTokens function
async function buyPTokens() {
    if (!tokenPContract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    const buyAmount = document.getElementById('buy-amount').value;
    
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
        showMessage('error.invalidAmount', 'error');
        return;
    }

    try {
        showMessage('message.processing', 'info');
        
        const amountInWei = ethers.utils.parseEther(buyAmount);
        const tx = await tokenPContract.buyPToken({
            value: amountInWei,
            ...CONFIG.GAS_SETTINGS.MEDIUM
        });
        
        showMessage('message.transactionSent', 'info');
        
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
            showMessage('message.buySuccess', 'success');
            await updatePTokenInfo();
            await updateWalletBalance();
            document.getElementById('buy-amount').value = '';
            document.getElementById('tokens-received').textContent = `0 ${getTranslation('unit.token')}`;
        }
        
    } catch (err) {
        console.error('Buy PToken error:', err);
        showMessage('', 'error', 'Error buying tokens: ' + (err.reason || err.message));
    }
}

// Sell PTokens function
async function sellPTokens() {
    if (!tokenPContract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    const sellAmount = document.getElementById('sell-amount').value;
    
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
        showMessage('error.invalidAmount', 'error');
        return;
    }

    try {
        // Balance check
        const tokenBalance = await tokenPContract.balanceOf(userAccount);
        const decimals = await tokenPContract.decimals();
        const formattedBalance = ethers.utils.formatUnits(tokenBalance, decimals);
        
        if (parseFloat(sellAmount) > parseFloat(formattedBalance)) {
            showMessage('error.insufficientBalance', 'error');
            return;
        }

        showMessage('message.processing', 'info');
        
        const tokenAmount = ethers.utils.parseUnits(sellAmount, decimals);
        const tx = await tokenPContract.sellPToken(tokenAmount, {
            ...CONFIG.GAS_SETTINGS.MEDIUM
        });
        
        showMessage('message.transactionSent', 'info');
        
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
            showMessage('message.sellSuccess', 'success');
            await updatePTokenInfo();
            await updateWalletBalance();
            document.getElementById('sell-amount').value = '';
            document.getElementById('matic-received').textContent = `0 ${getTranslation('unit.polygon')}`;
        }
        
    } catch (err) {
        console.error('Sell PToken error:', err);
        showMessage('', 'error', 'Error selling tokens: ' + (err.reason || err.message));
    }
}

// Miner info loading
async function loadMinerInfo() {
    await Promise.all([
        updateMinerStats(),
        updateWalletBalance()
    ]);
}

// Miner stats update
async function updateMinerStats() {
    if (!contract || !userAccount) return;

    try {
        const [user, minerTokenPool] = await Promise.all([
            contract.getUserInfo(userAccount),
            contract.minerTokenPool()
        ]);
        
        updateMinerUI(user, minerTokenPool);
        await startMinerBuyTimer();
        
    } catch (err) {
        console.error('Error updating miner stats:', err);
    }
}

// Miner UI update
function updateMinerUI(user, minerTokenPool) {
    // Miner status
    const isMiner = user.isMiner;
    const minerStatusElement = document.getElementById('miner-status');
    const minerGlobalStatusElement = document.getElementById('miner-global-status');
    const minerDetailedStatusElement = document.getElementById('miner-detailed-status');
    
    if (isMiner) {
        minerStatusElement.textContent = getTranslation('status.active');
        minerStatusElement.style.color = '#10B981';
        minerGlobalStatusElement.innerHTML = '<div class="status-indicator" style="background: #10B981"></div><span>' + getTranslation('miner.status.active') + '</span>';
        minerGlobalStatusElement.classList.remove('inactive');
        minerDetailedStatusElement.textContent = getTranslation('miner.detailedStatus.active');
    } else {
        minerStatusElement.textContent = getTranslation('status.inactive');
        minerStatusElement.style.color = '#FF6584';
        minerGlobalStatusElement.innerHTML = '<div class="status-indicator" style="background: #FF6584"></div><span>' + getTranslation('miner.status.inactive') + '</span>';
        minerGlobalStatusElement.classList.add('inactive');
        minerDetailedStatusElement.textContent = getTranslation('miner.detailedStatus.inactive');
    }
    
    // Total miner rewards
    const totalMinerRewardsMatic = ethers.utils.formatEther(user.totalMinerRewards || '0');
    document.getElementById('miner-total-rewards').textContent = `${parseFloat(totalMinerRewardsMatic).toFixed(4)} ${getTranslation('unit.polygon')}`;
    
    // Miner pool balance
    const minerTokens = ethers.utils.formatEther(minerTokenPool || '0');
    document.getElementById('miner-pool-balance').textContent = `${parseFloat(minerTokens).toFixed(2)} ${getTranslation('unit.token')}`;
    document.getElementById('miner-tokens-available').textContent = `${parseFloat(minerTokens).toFixed(2)} ${getTranslation('unit.token')}`;
    document.getElementById('miner-pool-total').textContent = `${parseFloat(minerTokens).toFixed(2)} ${getTranslation('unit.token')}`;
    
    // اضافه کردن توضیح توزیع دو زبانه
    const distributeDescription = document.querySelector('.miner-action-card:nth-child(2) .action-description');
    if (distributeDescription) {
        distributeDescription.innerHTML = `<strong>${getTranslation('miner.distributionExplanation')}</strong><br>${getTranslation('miner.distributionNote')}`;
    }
    
    // Distribution status
    const distributionStatusElement = document.getElementById('miner-distribution-status');
    if (parseFloat(minerTokens) > 0) {
        distributionStatusElement.className = 'distribution-status active';
        distributionStatusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>' + getTranslation('miner.distributionInfo') + '</span>';
    } else {
        distributionStatusElement.className = 'distribution-status inactive';
        distributionStatusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>' + getTranslation('specialPool.empty') + '</span>';
    }
}

// Miner buy timer start
async function startMinerBuyTimer() {
    if (!contract) return;

    try {
        if (minerBuyTimer) {
            clearInterval(minerBuyTimer);
        }

        const lastMinerBuyTime = await contract.lastMinerBuyTime();
        const minerBuyInterval = 24 * 60 * 60;
        
        const currentTime = Math.floor(Date.now() / 1000);
        const nextMinerBuyTime = parseInt(lastMinerBuyTime) + minerBuyInterval;
        const timeRemaining = Math.max(0, nextMinerBuyTime - currentTime);
        
        updateMinerTimerDisplay(timeRemaining);
        
        minerBuyTimer = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const newTimeRemaining = Math.max(0, nextMinerBuyTime - currentTime);
            
            if (newTimeRemaining <= 0) {
                clearInterval(minerBuyTimer);
                document.getElementById('miner-buy-timer').textContent = getTranslation('miner.readyToBuy');
                document.getElementById('buy-miner-btn').disabled = false;
            } else {
                updateMinerTimerDisplay(newTimeRemaining);
            }
        }, 1000);
        
    } catch (err) {
        console.error('Error starting miner buy timer:', err);
        document.getElementById('miner-buy-timer').textContent = getTranslation('error.timeFetch');
    }
}

// Miner timer display update
function updateMinerTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    document.getElementById('miner-buy-timer').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    document.getElementById('buy-miner-btn').disabled = seconds > 0;
}

// Buy miner tokens function
async function buyMinerTokens() {
    if (!contract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    try {
        showMessage('message.processing', 'info');
        
        const tx = await contract.buyMinerTokens({
            ...CONFIG.GAS_SETTINGS.MEDIUM
        });
        
        await tx.wait();
        
        showMessage('message.minerBuySuccess', 'success');
        await updateMinerStats();
        await updateWalletBalance();
        
    } catch (err) {
        console.error('Buy miner tokens error:', err);
        showMessage('', 'error', 'Error buying miner tokens: ' + (err.reason || err.message));
    }
}

// Distribute miner tokens function
async function distributeMinerTokens() {
    if (!contract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    try {
        showMessage('message.processing', 'info');
        
        const tx = await contract.distributeMinerTokens({
            ...CONFIG.GAS_SETTINGS.MEDIUM
        });
        
        await tx.wait();
        
        showMessage('message.distributionSuccess', 'success');
        await updateMinerStats();
        await updateWalletBalance();
        
    } catch (err) {
        console.error('Distribute miner tokens error:', err);
        showMessage('', 'error', 'Error distributing tokens: ' + (err.reason || err.message));
    }
}

// Withdraw info loading - نسخه اصلاح شده
async function loadWithdrawInfo() {
    if (!contract || !userAccount) {
        console.log('قرارداد یا حساب کاربری موجود نیست');
        return;
    }

    try {
        console.log('در حال بارگذاری اطلاعات برداشت...');
        await Promise.all([
            updateWithdrawInfo(),
            startWithdrawTimer(),
            updateSpecialPoolStatus()
        ]);
        console.log('اطلاعات برداشت با موفقیت بارگذاری شد');
    } catch (err) {
        console.error('Error loading withdraw info:', err);
        showMessage('error.loadingUserInfo', 'error');
    }
}

// Withdraw info update - نسخه اصلاح شده
async function updateWithdrawInfo() {
    if (!contract || !userAccount) {
        console.log('قرارداد یا حساب کاربری موجود نیست');
        return;
    }

    try {
        console.log('در حال دریافت اطلاعات برداشت از قرارداد...');
        
        // دریافت داده‌های اصلی از قرارداد
        const [user, poolBalance, specialPoolBalance, totalUsers] = await Promise.all([
            contract.getUserInfo(userAccount),
            contract.poolBalance(),
            contract.specialRewardPool(),
            contract.totalUsers()
        ]);

        console.log('داده‌های دریافتی از قرارداد:', {
            userId: user.id.toString(),
            poolBalance: poolBalance.toString(),
            specialPoolBalance: specialPoolBalance.toString(),
            totalUsers: totalUsers.toString(),
            userBalanceCount: user.balanceCount.toString(),
            userSpecialBalanceCount: user.specialBalanceCount.toString()
        });

        // Development reward pool
        const poolBalanceMatic = ethers.utils.formatEther(poolBalance);
        document.getElementById('pool-balance').textContent = parseFloat(poolBalanceMatic).toFixed(4);
        document.getElementById('pool-amount').textContent = parseFloat(poolBalanceMatic).toFixed(4);
        document.getElementById('pool-balance-count').textContent = user.balanceCount.toString();
        document.getElementById('pool-registrations').textContent = totalUsers.toString();

        // Special reward pool
        const specialPoolBalanceMatic = ethers.utils.formatEther(specialPoolBalance);
        
        // دریافت تعداد کاربران واجد شرایط استخر ویژه
        let specialPoolCount = "0";
        try {
            const eligibleSpecialCount = await contract.eligibleSpecialUserCount();
            specialPoolCount = eligibleSpecialCount.toString();
        } catch (err) {
            console.warn('خطا در دریافت تعداد کاربران ویژه:', err);
            // استفاده از مقدار کاربر در صورت خطا
            specialPoolCount = user.specialBalanceCount.toString();
        }
        
        document.getElementById('special-pool-balance').textContent = parseFloat(specialPoolBalanceMatic).toFixed(4);
        document.getElementById('special-pool-count').textContent = specialPoolCount;
        document.getElementById('special-amount').textContent = parseFloat(specialPoolBalanceMatic).toFixed(4);
        document.getElementById('user-special-balance').textContent = user.specialBalanceCount.toString();
        
        console.log('اطلاعات برداشت با موفقیت به‌روزرسانی شد');

    } catch (err) {
        console.error('خطا در دریافت اطلاعات برداشت از قرارداد:', err);
        showMessage('error.loadingUserInfo', 'error');
    }
}

// Special pool status update - نسخه اصلاح شده
async function updateSpecialPoolStatus() {
    if (!contract) return;

    try {
        const statusElement = document.getElementById('special-pool-status');
        const [specialPoolBalance, eligibleSpecialCount] = await Promise.all([
            contract.specialRewardPool(),
            contract.eligibleSpecialUserCount()
        ]);

        const balanceMatic = parseFloat(ethers.utils.formatEther(specialPoolBalance));
        const eligibleUsers = parseInt(eligibleSpecialCount.toString());

        statusElement.style.display = 'flex';

        if (balanceMatic === 0) {
            statusElement.className = 'distribution-status warning';
            statusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>' + getTranslation('specialPool.empty') + '</span>';
        } else if (eligibleUsers === 0) {
            statusElement.className = 'distribution-status warning';
            statusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>' + getTranslation('specialPool.noEligibleUsers') + '</span>';
        } else {
            statusElement.className = 'distribution-status active';
            statusElement.innerHTML = `<i class="fas fa-check-circle"></i><span>${eligibleUsers} ` + getTranslation('specialPool.eligibleUsers') + '</span>';
        }

    } catch (err) {
        console.error('خطا در به‌روزرسانی وضعیت استخر ویژه:', err);
        const statusElement = document.getElementById('special-pool-status');
        statusElement.style.display = 'flex';
        statusElement.className = 'distribution-status warning';
        statusElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>' + getTranslation('error.loadingUserInfo') + '</span>';
    }
}

// Withdraw timer start
async function startWithdrawTimer() {
    if (!contract) return;

    try {
        if (withdrawTimer) {
            clearInterval(withdrawTimer);
        }

        const lastWithdrawTime = await contract.lastPoolWithdrawTime();
        const withdrawInterval = 6 * 60 * 60;
        
        const currentTime = Math.floor(Date.now() / 1000);
        const nextWithdrawTime = parseInt(lastWithdrawTime) + withdrawInterval;
        const timeRemaining = Math.max(0, nextWithdrawTime - currentTime);
        
        updateWithdrawTimerDisplay(timeRemaining);
        
        withdrawTimer = setInterval(() => {
            const currentTime = Math.floor(Date.now() / 1000);
            const newTimeRemaining = Math.max(0, nextWithdrawTime - currentTime);
            
            if (newTimeRemaining <= 0) {
                clearInterval(withdrawTimer);
                document.getElementById('countdown-timer').textContent = getTranslation('withdraw.readyToWithdraw');
                document.getElementById('pool-withdraw-btn').disabled = false;
                document.getElementById('special-withdraw-btn').disabled = false;
            } else {
                updateWithdrawTimerDisplay(newTimeRemaining);
            }
        }, 1000);
        
    } catch (err) {
        console.error('Error starting withdraw timer:', err);
        document.getElementById('countdown-timer').textContent = getTranslation('error.timeFetch');
    }
}

// Withdraw timer display update
function updateWithdrawTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    document.getElementById('countdown-timer').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    const isDisabled = seconds > 0;
    document.getElementById('pool-withdraw-btn').disabled = isDisabled;
    document.getElementById('special-withdraw-btn').disabled = isDisabled;
}

// Withdraw from development pool
async function withdrawPool() {
    if (!contract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    try {
        showMessage('message.processing', 'info');
        
        const tx = await contract.withdrawPool({
            ...CONFIG.GAS_SETTINGS.MEDIUM
        });
        
        await tx.wait();
        
        showMessage('message.withdrawSuccess', 'success');
        await updateWithdrawInfo();
        await updateWalletBalance();
        await startWithdrawTimer();
        
    } catch (err) {
        console.error('Withdraw pool error:', err);
        showMessage('', 'error', 'Error withdrawing: ' + (err.reason || err.message));
    }
}

// Withdraw from special pool
async function withdrawSpecials() {
    if (!contract || !userAccount) {
        showMessage('message.connectFirst', 'error');
        return;
    }

    try {
        showMessage('message.processing', 'info');
        
        const tx = await contract.withdrawSpecials({
            ...CONFIG.GAS_SETTINGS.MEDIUM
        });
        
        await tx.wait();
        
        showMessage('message.specialWithdrawSuccess', 'success');
        await updateWithdrawInfo();
        await updateWalletBalance();
        await startWithdrawTimer();
        
    } catch (err) {
        console.error('Withdraw specials error:', err);
        showMessage('', 'error', 'Error withdrawing specials: ' + (err.reason || err.message));
    }
}

// Wallet balance update
async function updateWalletBalance() {
    if (!provider || !userAccount) return;

    try {
        const balance = await provider.getBalance(userAccount);
        const balanceInMatic = ethers.utils.formatEther(balance);
        
        const balanceElements = document.querySelectorAll('.wallet-balance');
        balanceElements.forEach(element => {
            element.textContent = `${parseFloat(balanceInMatic).toFixed(4)} ${getTranslation('unit.polygon')}`;
        });
        
    } catch (err) {
        console.error('Error fetching wallet balance:', err);
    }
}

// Initialize all status displays with current language
function initializeStatusDisplays() {
    // Miner status displays
    document.getElementById('miner-status').textContent = getTranslation('status.loading');
    document.getElementById('miner-detailed-status').textContent = getTranslation('status.fetchingInfo');
    
    // Miner global status
    const minerGlobalStatus = document.getElementById('miner-global-status');
    minerGlobalStatus.innerHTML = '<div class="status-indicator"></div><span>' + getTranslation('miner.checkingStatus') + '</span>';
    
    // Miner distribution status
    const minerDistributionStatus = document.getElementById('miner-distribution-status');
    minerDistributionStatus.innerHTML = '<i class="fas fa-sync-alt"></i><span>' + getTranslation('miner.checkingDistribution') + '</span>';
    
    // Special pool status
    const specialPoolStatus = document.getElementById('special-pool-status');
    specialPoolStatus.innerHTML = '<i class="fas fa-info-circle"></i><span>' + getTranslation('withdraw.checkingStatus') + '</span>';
}

// Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Set default language
    changeLanguage('fa');
    
    // Input events
    document.getElementById('buy-amount').addEventListener('input', calculateBuyTokens);
    document.getElementById('sell-amount').addEventListener('input', calculateSellMatic);
    
    // Initialize all status displays with translations
    initializeStatusDisplays();
    
    // MetaMask account change detection
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function(accounts) {
            if (accounts.length === 0) {
                disconnectWallet();
            } else {
                connectWallet();
            }
        });
        
        window.ethereum.on('chainChanged', function() {
            window.location.reload();
        });
        
        // Auto-connect check
        if (window.ethereum.selectedAddress) {
            setTimeout(connectWallet, 1000);
        }
    }
});