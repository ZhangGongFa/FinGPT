"""
Cấu hình cho FinGPT Việt Nam
"""

# Cấu hình Gemini API
GEMINI_API_KEY = "AIzaSyDk0OiO2KlMyx1vCr8ZF6d6EiIHWUV0TFw"
GEMINI_MODEL = "gemini-1.5-pro"

# Cấu hình dữ liệu
DATA_DIR = "/home/ubuntu/fingpt_complete/data"
STOCK_DATA_FILE = f"{DATA_DIR}/stock_data.csv"
NEWS_DATA_FILE = f"{DATA_DIR}/news_data.csv"
SENTIMENT_RESULTS_FILE = f"{DATA_DIR}/sentiment_results.csv"

# Cấu hình web
STATIC_DIR = "/home/ubuntu/fingpt_complete/static"
TEMPLATES_DIR = "/home/ubuntu/fingpt_complete/templates"
PORT = 5000
HOST = "0.0.0.0"

# Danh sách các mã cổ phiếu VN30
VN30_SYMBOLS = [
    "VNM", "VIC", "VCB", "FPT", "MWG", "HPG", "MSN", "VHM", "VRE", "BID",
    "CTG", "GAS", "SAB", "POW", "PLX", "TCB", "VPB", "MBB", "HDB", "STB",
    "TPB", "SSI", "VJC", "PDR", "NVL", "BCM", "KDH", "PNJ", "ACB", "REE"
]
