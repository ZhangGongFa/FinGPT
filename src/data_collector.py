import requests
import pandas as pd
import os
import time
from datetime import datetime, timedelta
import json
from bs4 import BeautifulSoup
import sys

# Thêm đường dẫn để import các module khác
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from config import VN30_SYMBOLS, DATA_DIR

# Đảm bảo thư mục tồn tại
CAFEF_DIR = os.path.join(DATA_DIR, 'cafef')
SSI_DIR = os.path.join(DATA_DIR, 'ssi')
YAHOO_DIR = os.path.join(DATA_DIR, 'yahoo')

os.makedirs(CAFEF_DIR, exist_ok=True)
os.makedirs(SSI_DIR, exist_ok=True)
os.makedirs(YAHOO_DIR, exist_ok=True)

# Headers cho requests
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Connection': 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
}

def get_stock_data_from_yahoo(symbol, interval='1d', range='3mo'):
    """
    Lấy dữ liệu cổ phiếu từ Yahoo Finance API
    
    Args:
        symbol (str): Mã cổ phiếu (thêm .VN cho cổ phiếu Việt Nam)
        interval (str): Khoảng thời gian (1d, 1wk, 1mo)
        range (str): Phạm vi thời gian (1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max)
        
    Returns:
        dict: Dữ liệu cổ phiếu từ Yahoo Finance
    """
    try:
        # Sử dụng Data API module
        sys.path.append('/opt/.manus/.sandbox-runtime')
        from data_api import ApiClient
        client = ApiClient()
        
        # Thêm .VN nếu chưa có
        if not symbol.endswith('.VN'):
            yahoo_symbol = f"{symbol}.VN"
        else:
            yahoo_symbol = symbol
        
        # Gọi Yahoo Finance API
        stock_data = client.call_api('YahooFinance/get_stock_chart', query={
            'symbol': yahoo_symbol,
            'interval': interval,
            'range': range,
            'region': 'US',
            'includeAdjustedClose': True
        })
        
        return stock_data
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu {symbol} từ Yahoo Finance: {str(e)}")
        return None

def get_stock_insights_from_yahoo(symbol):
    """
    Lấy thông tin phân tích cổ phiếu từ Yahoo Finance API
    
    Args:
        symbol (str): Mã cổ phiếu (thêm .VN cho cổ phiếu Việt Nam)
        
    Returns:
        dict: Thông tin phân tích cổ phiếu từ Yahoo Finance
    """
    try:
        # Sử dụng Data API module
        sys.path.append('/opt/.manus/.sandbox-runtime')
        from data_api import ApiClient
        client = ApiClient()
        
        # Thêm .VN nếu chưa có
        if not symbol.endswith('.VN'):
            yahoo_symbol = f"{symbol}.VN"
        else:
            yahoo_symbol = symbol
        
        # Gọi Yahoo Finance API
        insights_data = client.call_api('YahooFinance/get_stock_insights', query={
            'symbol': yahoo_symbol
        })
        
        return insights_data
    except Exception as e:
        print(f"Lỗi khi lấy thông tin phân tích {symbol} từ Yahoo Finance: {str(e)}")
        return None

def get_stock_holders_from_yahoo(symbol):
    """
    Lấy thông tin về người nắm giữ cổ phiếu từ Yahoo Finance API
    
    Args:
        symbol (str): Mã cổ phiếu (thêm .VN cho cổ phiếu Việt Nam)
        
    Returns:
        dict: Thông tin về người nắm giữ cổ phiếu từ Yahoo Finance
    """
    try:
        # Sử dụng Data API module
        sys.path.append('/opt/.manus/.sandbox-runtime')
        from data_api import ApiClient
        client = ApiClient()
        
        # Thêm .VN nếu chưa có
        if not symbol.endswith('.VN'):
            yahoo_symbol = f"{symbol}.VN"
        else:
            yahoo_symbol = symbol
        
        # Gọi Yahoo Finance API
        holders_data = client.call_api('YahooFinance/get_stock_holders', query={
            'symbol': yahoo_symbol,
            'region': 'US'
        })
        
        return holders_data
    except Exception as e:
        print(f"Lỗi khi lấy thông tin người nắm giữ {symbol} từ Yahoo Finance: {str(e)}")
        return None

def get_stock_data_from_ssi(symbol):
    """
    Lấy dữ liệu cổ phiếu từ SSI iBoard
    """
    try:
        # URL API của SSI iBoard
        url = f"https://iboard-api.ssi.com.vn/v2/stock/{symbol}"
        
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Lỗi khi lấy dữ liệu {symbol} từ SSI: {response.status_code}")
            return None
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu {symbol} từ SSI: {str(e)}")
        return None

def get_historical_data_from_ssi(symbol, from_date, to_date):
    """
    Lấy dữ liệu lịch sử cổ phiếu từ SSI iBoard
    """
    try:
        # URL API của SSI iBoard cho dữ liệu lịch sử
        url = f"https://iboard-api.ssi.com.vn/v2/stock/{symbol}/historical-quotes"
        
        params = {
            'from': from_date.strftime('%Y-%m-%d'),
            'to': to_date.strftime('%Y-%m-%d'),
            'resolution': 'D'  # Daily data
        }
        
        response = requests.get(url, headers=HEADERS, params=params)
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Lỗi khi lấy dữ liệu lịch sử {symbol} từ SSI: {response.status_code}")
            return None
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu lịch sử {symbol} từ SSI: {str(e)}")
        return None

def get_market_data_from_ssi():
    """
    Lấy dữ liệu thị trường từ SSI iBoard
    """
    try:
        # URL API của SSI iBoard cho dữ liệu thị trường
        url = "https://iboard-api.ssi.com.vn/v2/market/index"
        
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            data = response.json()
            return data
        else:
            print(f"Lỗi khi lấy dữ liệu thị trường từ SSI: {response.status_code}")
            return None
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu thị trường từ SSI: {str(e)}")
        return None

def get_stock_news_from_cafef(symbol, page=1, count=10):
    """
    Lấy tin tức về cổ phiếu từ CafeF
    """
    try:
        url = f"https://cafef.vn/timeline/{symbol}/{page}.chn"
        
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            news_items = []
            
            # Tìm các mục tin tức
            news_elements = soup.select('.timeline-item')
            
            for item in news_elements[:count]:
                try:
                    title_element = item.select_one('.title a')
                    date_element = item.select_one('.time')
                    
                    if title_element and date_element:
                        title = title_element.text.strip()
                        link = title_element['href']
                        if not link.startswith('http'):
                            link = f"https://cafef.vn{link}"
                        date = date_element.text.strip()
                        
                        news_items.append({
                            'symbol': symbol,
                            'title': title,
                            'link': link,
                            'date': date,
                            'source': 'CafeF'
                        })
                except Exception as e:
                    print(f"Lỗi khi xử lý tin tức: {str(e)}")
                    continue
            
            return news_items
        else:
            print(f"Lỗi khi lấy tin tức {symbol} từ CafeF: {response.status_code}")
            return []
    except Exception as e:
        print(f"Lỗi khi lấy tin tức {symbol} từ CafeF: {str(e)}")
        return []

def get_eod_data_from_cafef(date_str=None):
    """
    Lấy dữ liệu EOD từ CafeF
    """
    try:
        if date_str is None:
            # Lấy ngày hiện tại
            date_str = datetime.now().strftime('%d/%m/%Y')
        
        # URL để lấy dữ liệu EOD từ CafeF
        url = f"https://s.cafef.vn/Ajax/PageNew/DataHistory/PriceHistory.ashx?Symbol=^VNINDEX&Date={date_str}"
        
        response = requests.get(url, headers=HEADERS)
        
        if response.status_code == 200:
            # Xử lý dữ liệu trả về
            data = response.json()
            return data
        else:
            print(f"Lỗi khi lấy dữ liệu EOD từ CafeF: {response.status_code}")
            return None
    except Exception as e:
        print(f"Lỗi khi lấy dữ liệu EOD từ CafeF: {str(e)}")
        return None

def collect_all_vn30_data():
    """
    Thu thập dữ liệu cho tất cả các cổ phiếu VN30
    """
    # Lấy dữ liệu thị trường
    market_data = get_market_data_from_ssi()
    if market_data:
        market_df = pd.DataFrame(market_data)
        market_df.to_csv(os.path.join(SSI_DIR, 'market_data.csv'), index=False)
        print(f"Đã lưu dữ liệu thị trường vào {os.path.join(SSI_DIR, 'market_data.csv')}")
    
    # Lấy dữ liệu cổ phiếu
    stock_data_list = []
    yahoo_data_list = []
    
    for symbol in VN30_SYMBOLS:
        print(f"Đang lấy dữ liệu cho {symbol}...")
        
        # Lấy dữ liệu từ SSI
        stock_data = get_stock_data_from_ssi(symbol)
        if stock_data:
            stock_data_list.append(stock_data)
        
        # Lấy dữ liệu lịch sử 3 tháng từ SSI
        to_date = datetime.now()
        from_date = to_date - timedelta(days=90)
        historical_data = get_historical_data_from_ssi(symbol, from_date, to_date)
        
        if historical_data:
            historical_df = pd.DataFrame(historical_data)
            historical_df['symbol'] = symbol
            historical_df.to_csv(os.path.join(SSI_DIR, f'{symbol}_historical.csv'), index=False)
            print(f"Đã lưu dữ liệu lịch sử cho {symbol} từ SSI")
        
        # Lấy dữ liệu từ Yahoo Finance
        yahoo_data = get_stock_data_from_yahoo(symbol)
        if yahoo_data:
            # Lưu dữ liệu gốc
            with open(os.path.join(YAHOO_DIR, f'{symbol}_yahoo_data.json'), 'w') as f:
                json.dump(yahoo_data, f)
            
            # Xử lý dữ liệu để lưu vào CSV
            try:
                result = yahoo_data.get('chart', {}).get('result', [])
                if result and len(result) > 0:
                    timestamps = result[0].get('timestamp', [])
                    indicators = result[0].get('indicators', {})
                    quotes = indicators.get('quote', [])
                    
                    if quotes and len(quotes) > 0:
                        quote_data = quotes[0]
                        
                        # Tạo DataFrame
                        yahoo_df = pd.DataFrame({
                            'timestamp': timestamps,
                            'open': quote_data.get('open', []),
                            'high': quote_data.get('high', []),
                            'low': quote_data.get('low', []),
                            'close': quote_data.get('close', []),
                            'volume': quote_data.get('volume', [])
                        })
                        
                        # Chuyển timestamp thành datetime
                        yahoo_df['date'] = pd.to_datetime(yahoo_df['timestamp'], unit='s')
                        
                        # Thêm symbol
                        yahoo_df['symbol'] = symbol
                        
                        # Lưu vào CSV
                        yahoo_df.to_csv(os.path.join(YAHOO_DIR, f'{symbol}_yahoo_historical.csv'), index=False)
                        print(f"Đã lưu dữ liệu lịch sử cho {symbol} từ Yahoo Finance")
                        
                        # Thêm vào danh sách
                        yahoo_data_list.append({
                            'symbol': symbol,
                            'data': yahoo_data
                        })
            except Exception as e:
                print(f"Lỗi khi xử lý dữ liệu Yahoo Finance cho {symbol}: {str(e)}")
        
        # Lấy thông tin phân tích từ Yahoo Finance
        insights_data = get_stock_insights_from_yahoo(symbol)
        if insights_data:
            with open(os.path.join(YAHOO_DIR, f'{symbol}_yahoo_insights.json'), 'w') as f:
                json.dump(insights_data, f)
            print(f"Đã lưu thông tin phân tích cho {symbol} từ Yahoo Finance")
        
        # Lấy thông tin người nắm giữ từ Yahoo Finance
        holders_data = get_stock_holders_from_yahoo(symbol)
        if holders_data:
            with open(os.path.join(YAHOO_DIR, f'{symbol}_yahoo_holders.json'), 'w') as f:
                json.dump(holders_data, f)
            print(f"Đã lưu thông tin người nắm giữ cho {symbol} từ Yahoo Finance")
        
        # Lấy tin tức từ CafeF
        news_data = get_stock_news_from_cafef(symbol)
        if news_data:
            news_df = pd.DataFrame(news_data)
            news_df.to_csv(os.path.join(CAFEF_DIR, f'{symbol}_news.csv'), index=False)
            print(f"Đã lưu tin tức cho {symbol} từ CafeF")
        
        # Tạm dừng để tránh bị chặn
        time.sleep(1)
    
    # Lưu dữ liệu cổ phiếu từ SSI
    if stock_data_list:
        all_stock_df = pd.DataFrame(stock_data_list)
        all_stock_df.to_csv(os.path.join(SSI_DIR, 'vn30_stocks.csv'), index=False)
        print(f"Đã lưu dữ liệu cổ phiếu VN30 từ SSI vào {os.path.join(SSI_DIR, 'vn30_stocks.csv')}")
    
    # Lưu thông tin tổng hợp từ Yahoo Finance
    if yahoo_data_list:
        with open(os.path.join(YAHOO_DIR, 'yahoo_data_summary.json'), 'w') as f:
            json.dump(yahoo_data_list, f)
        print(f"Đã lưu thông tin tổng hợp từ Yahoo Finance vào {os.path.join(YAHOO_DIR, 'yahoo_data_summary.json')}")
    
    # Tạo dữ liệu mẫu trong trường hợp không lấy được dữ liệu thực
    create_sample_data()
    
    print("Hoàn thành thu thập dữ liệu!")

def create_sample_data():
    """
    Tạo dữ liệu mẫu trong trường hợp không lấy được dữ liệu thực
    """
    # Dữ liệu mẫu cho thông tin công ty
    company_info = []
    for symbol in VN30_SYMBOLS:
        company_info.append({
            'symbol': symbol,
            'name': f'Công ty Cổ phần {symbol}',
            'exchange': 'HOSE',
            'industry': 'Chưa phân loại',
            'website': f'https://www.{symbol.lower()}.com.vn',
            'established_year': 2000,
            'listing_date': '2010-01-01'
        })
    
    company_df = pd.DataFrame(company_info)
    company_df.to_csv(os.path.join(DATA_DIR, 'sample_company_info.csv'), index=False)
    print(f"Đã tạo dữ liệu mẫu thông tin công ty")
    
    # Dữ liệu mẫu cho dữ liệu lịch sử
    historical_data = []
    today = datetime.now()
    
    for symbol in VN30_SYMBOLS:
        base_price = 50000  # Giá cơ sở
        for i in range(90):
            date = today - timedelta(days=i)
            price_change = (90 - i) * 100  # Giá tăng dần theo thời gian
            
            # Thêm một chút biến động ngẫu nhiên
            import random
            random_change = random.randint(-2000, 2000)
            
            close_price = base_price + price_change + random_change
            open_price = close_price - random.randint(-1000, 1000)
            high_price = max(close_price, open_price) + random.randint(0, 1000)
            low_price = min(close_price, open_price) - random.randint(0, 1000)
            
            historical_data.append({
                'symbol': symbol,
                'date': date.strftime('%Y-%m-%d'),
                'open': open_price,
                'high': high_price,
                'low': low_price,
                'close': close_price,
                'volume': random.randint(100000, 1000000)
            })
    
    historical_df = pd.DataFrame(historical_data)
    historical_df.to_csv(os.path.join(DATA_DIR, 'sample_historical_data.csv'), index=False)
    print(f"Đã tạo dữ liệu mẫu lịch sử giá")
    
    # Dữ liệu mẫu cho tin tức
    news_data = []
    news_titles = [
        "Công bố báo cáo tài chính quý với kết quả tích cực",
        "Thông báo chi trả cổ tức năm tài chính",
        "Kế hoạch mở rộng thị trường trong năm tới",
        "Ký kết hợp đồng hợp tác chiến lược mới",
        "Thay đổi nhân sự cấp cao trong ban lãnh đạo",
        "Triển khai dự án đầu tư mới tại thị trường nước ngoài",
        "Công bố kế hoạch phát hành cổ phiếu tăng vốn",
        "Tổ chức sự kiện ra mắt sản phẩm mới",
        "Nhận giải thưởng doanh nghiệp xuất sắc",
        "Thông báo kết quả kinh doanh vượt kế hoạch"
    ]
    
    for symbol in VN30_SYMBOLS:
        for i in range(10):
            date = today - timedelta(days=i*3)
            
            news_data.append({
                'symbol': symbol,
                'title': f"{symbol}: {news_titles[i]}",
                'date': date.strftime('%Y-%m-%d'),
                'source': 'CafeF',
                'link': f'https://cafef.vn/news-{symbol}-{i}.html',
                'content': f'Nội dung tin tức về {symbol}: {news_titles[i]}'
            })
    
    news_df = pd.DataFrame(news_data)
    news_df.to_csv(os.path.join(DATA_DIR, 'sample_news_data.csv'), index=False)
    print(f"Đã tạo dữ liệu mẫu tin tức")

if __name__ == "__main__":
    collect_all_vn30_data()
