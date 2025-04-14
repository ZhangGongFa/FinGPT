import os
import pandas as pd
import json
import random
from datetime import datetime
import sys

# Thêm đường dẫn để import các module khác
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from config import GEMINI_API_KEY, DATA_DIR

# Cấu hình Gemini API
GEMINI_MODEL = "gemini-1.5-pro"

# Tạo mô hình Gemini
try:
    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel(GEMINI_MODEL)
    GEMINI_AVAILABLE = True
except Exception as e:
    print(f"Không thể khởi tạo Gemini API: {str(e)}")
    GEMINI_AVAILABLE = False

def analyze_sentiment_with_gemini(text, symbol):
    """
    Phân tích sentiment của văn bản sử dụng Gemini API
    
    Args:
        text (str): Văn bản cần phân tích
        symbol (str): Mã cổ phiếu liên quan
        
    Returns:
        dict: Kết quả phân tích sentiment
    """
    if not GEMINI_AVAILABLE:
        print("Gemini API không khả dụng, sử dụng phương pháp phân tích từ khóa")
        return generate_sample_sentiment(text, symbol)
    
    try:
        # Tạo prompt cho Gemini
        prompt = f"""
        Hãy phân tích sentiment (tình cảm) của tin tức sau đây về cổ phiếu {symbol}:
        
        "{text}"
        
        Phân tích và trả về kết quả theo định dạng JSON với các trường sau:
        - sentiment: "positive", "negative", hoặc "neutral"
        - score: Điểm từ -1.0 đến 1.0, trong đó -1.0 là cực kỳ tiêu cực, 1.0 là cực kỳ tích cực
        - explanation: Giải thích ngắn gọn về lý do đánh giá
        
        Chỉ trả về JSON, không có văn bản giới thiệu hoặc kết luận.
        """
        
        # Gọi Gemini API
        response = model.generate_content(prompt)
        
        # Xử lý kết quả
        response_text = response.text
        
        # Tìm và trích xuất phần JSON
        import re
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        
        if json_match:
            json_str = json_match.group(0)
            result = json.loads(json_str)
            
            # Thêm thông tin bổ sung
            result['symbol'] = symbol
            result['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            return result
        else:
            print(f"Không thể trích xuất JSON từ phản hồi của Gemini: {response_text}")
            return generate_sample_sentiment(text, symbol)
    
    except Exception as e:
        print(f"Lỗi khi phân tích sentiment với Gemini: {str(e)}")
        return generate_sample_sentiment(text, symbol)

def analyze_sentiment(text, symbol):
    """
    Phân tích sentiment của văn bản, ưu tiên sử dụng Gemini API nếu khả dụng
    
    Args:
        text (str): Văn bản cần phân tích
        symbol (str): Mã cổ phiếu liên quan
        
    Returns:
        dict: Kết quả phân tích sentiment
    """
    # Thử sử dụng Gemini API trước
    try:
        result = analyze_sentiment_with_gemini(text, symbol)
        return result
    except Exception as e:
        print(f"Lỗi khi sử dụng Gemini API: {str(e)}")
        # Nếu có lỗi, sử dụng phương pháp phân tích từ khóa
        return generate_sample_sentiment(text, symbol)

def generate_sample_sentiment(text, symbol):
    """
    Tạo dữ liệu sentiment mẫu khi không thể sử dụng Gemini API
    
    Args:
        text (str): Văn bản cần phân tích
        symbol (str): Mã cổ phiếu liên quan
        
    Returns:
        dict: Kết quả phân tích sentiment mẫu
    """
    # Phân tích đơn giản dựa trên từ khóa trong văn bản
    positive_keywords = ['tăng', 'lợi nhuận', 'tích cực', 'tốt', 'thành công', 'phát triển', 'cơ hội', 'vượt kế hoạch']
    negative_keywords = ['giảm', 'lỗ', 'tiêu cực', 'khó khăn', 'thất bại', 'rủi ro', 'thấp hơn', 'dưới kỳ vọng']
    
    # Đếm số từ khóa tích cực và tiêu cực
    positive_count = sum(1 for keyword in positive_keywords if keyword.lower() in text.lower())
    negative_count = sum(1 for keyword in negative_keywords if keyword.lower() in text.lower())
    
    # Xác định sentiment dựa trên số lượng từ khóa
    if positive_count > negative_count:
        sentiment = 'positive'
        # Tạo điểm ngẫu nhiên trong khoảng tích cực
        score = round(random.uniform(0.3, 0.9), 2)
        explanation = f"Văn bản chứa nhiều từ khóa tích cực về {symbol}"
    elif negative_count > positive_count:
        sentiment = 'negative'
        # Tạo điểm ngẫu nhiên trong khoảng tiêu cực
        score = round(random.uniform(-0.9, -0.3), 2)
        explanation = f"Văn bản chứa nhiều từ khóa tiêu cực về {symbol}"
    else:
        # Nếu không có từ khóa hoặc số lượng bằng nhau
        sentiment = 'neutral'
        # Tạo điểm ngẫu nhiên trong khoảng trung tính
        score = round(random.uniform(-0.2, 0.2), 2)
        explanation = f"Văn bản có nội dung trung tính hoặc không rõ ràng về {symbol}"
    
    # Tạo kết quả
    result = {
        'symbol': symbol,
        'sentiment': sentiment,
        'score': score,
        'explanation': explanation,
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'note': 'Dữ liệu được tạo bằng phương pháp phân tích từ khóa'
    }
    
    return result

def analyze_news_data():
    """
    Phân tích sentiment cho dữ liệu tin tức
    """
    # Đường dẫn đến file tin tức
    news_file = os.path.join(DATA_DIR, 'sample_news_data.csv')
    
    # Kiểm tra xem file có tồn tại không
    if not os.path.exists(news_file):
        print(f"File tin tức không tồn tại: {news_file}")
        return
    
    # Đọc dữ liệu tin tức
    news_df = pd.read_csv(news_file)
    
    # Kiểm tra xem có dữ liệu không
    if news_df.empty:
        print("Không có dữ liệu tin tức để phân tích")
        return
    
    # Tạo danh sách để lưu kết quả phân tích
    sentiment_results = []
    
    # Phân tích sentiment cho mỗi tin tức
    for index, row in news_df.iterrows():
        symbol = row['symbol']
        title = row['title']
        content = row.get('content', '')  # Sử dụng get để tránh lỗi nếu không có cột content
        
        # Kết hợp tiêu đề và nội dung để phân tích
        text_to_analyze = f"{title}. {content}"
        
        print(f"Đang phân tích sentiment cho tin tức {index + 1}/{len(news_df)} của {symbol}...")
        
        # Phân tích sentiment
        sentiment_result = analyze_sentiment(text_to_analyze, symbol)
        
        # Thêm thông tin từ tin tức
        sentiment_result['news_title'] = title
        sentiment_result['news_date'] = row['date']
        sentiment_result['news_source'] = row['source']
        
        # Thêm vào danh sách kết quả
        sentiment_results.append(sentiment_result)
        
        # Tạm dừng để tránh vượt quá giới hạn API
        import time
        time.sleep(1)
    
    # Tạo DataFrame từ kết quả
    sentiment_df = pd.DataFrame(sentiment_results)
    
    # Lưu kết quả vào file CSV
    output_file = os.path.join(DATA_DIR, 'sentiment_results.csv')
    sentiment_df.to_csv(output_file, index=False)
    
    print(f"Đã phân tích sentiment cho {len(sentiment_results)} tin tức và lưu kết quả vào {output_file}")
    
    return sentiment_df

def get_stock_sentiment_summary(symbol):
    """
    Lấy tóm tắt sentiment cho một cổ phiếu cụ thể
    
    Args:
        symbol (str): Mã cổ phiếu
        
    Returns:
        dict: Tóm tắt sentiment
    """
    # Đường dẫn đến file kết quả sentiment
    sentiment_file = os.path.join(DATA_DIR, 'sentiment_results.csv')
    
    # Kiểm tra xem file có tồn tại không
    if not os.path.exists(sentiment_file):
        print(f"File kết quả sentiment không tồn tại: {sentiment_file}")
        return None
    
    # Đọc dữ liệu sentiment
    sentiment_df = pd.read_csv(sentiment_file)
    
    # Lọc dữ liệu cho cổ phiếu cụ thể
    stock_sentiment = sentiment_df[sentiment_df['symbol'] == symbol]
    
    # Kiểm tra xem có dữ liệu không
    if stock_sentiment.empty:
        print(f"Không có dữ liệu sentiment cho cổ phiếu {symbol}")
        return None
    
    # Tính toán các chỉ số
    total_news = len(stock_sentiment)
    positive_news = len(stock_sentiment[stock_sentiment['sentiment'] == 'positive'])
    negative_news = len(stock_sentiment[stock_sentiment['sentiment'] == 'negative'])
    neutral_news = len(stock_sentiment[stock_sentiment['sentiment'] == 'neutral'])
    
    # Tính tỷ lệ
    positive_ratio = positive_news / total_news if total_news > 0 else 0
    negative_ratio = negative_news / total_news if total_news > 0 else 0
    neutral_ratio = neutral_news / total_news if total_news > 0 else 0
    
    # Tính điểm trung bình
    avg_score = stock_sentiment['score'].mean() if not stock_sentiment['score'].empty else 0
    
    # Xác định trạng thái sentiment tổng thể
    if avg_score > 0.2:
        sentiment_status = 'positive'
    elif avg_score < -0.2:
        sentiment_status = 'negative'
    else:
        sentiment_status = 'neutral'
    
    # Tạo tóm tắt
    summary = {
        'symbol': symbol,
        'total_news': total_news,
        'positive_news': positive_news,
        'negative_news': negative_news,
        'neutral_news': neutral_news,
        'positive_ratio': positive_ratio,
        'negative_ratio': negative_ratio,
        'neutral_ratio': neutral_ratio,
        'avg_score': avg_score,
        'sentiment_status': sentiment_status,
        'latest_update': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    return summary

def analyze_market_sentiment():
    """
    Phân tích sentiment tổng thể của thị trường
    
    Returns:
        dict: Tóm tắt sentiment thị trường
    """
    # Đường dẫn đến file kết quả sentiment
    sentiment_file = os.path.join(DATA_DIR, 'sentiment_results.csv')
    
    # Kiểm tra xem file có tồn tại không
    if not os.path.exists(sentiment_file):
        print(f"File kết quả sentiment không tồn tại: {sentiment_file}")
        return None
    
    # Đọc dữ liệu sentiment
    sentiment_df = pd.read_csv(sentiment_file)
    
    # Kiểm tra xem có dữ liệu không
    if sentiment_df.empty:
        print("Không có dữ liệu sentiment để phân tích")
        return None
    
    # Tính toán các chỉ số
    total_news = len(sentiment_df)
    positive_news = len(sentiment_df[sentiment_df['sentiment'] == 'positive'])
    negative_news = len(sentiment_df[sentiment_df['sentiment'] == 'negative'])
    neutral_news = len(sentiment_df[sentiment_df['sentiment'] == 'neutral'])
    
    # Tính tỷ lệ
    positive_ratio = positive_news / total_news if total_news > 0 else 0
    negative_ratio = negative_news / total_news if total_news > 0 else 0
    neutral_ratio = neutral_news / total_news if total_news > 0 else 0
    
    # Tính điểm trung bình
    avg_score = sentiment_df['score'].mean() if not sentiment_df['score'].empty else 0
    
    # Xác định trạng thái sentiment tổng thể
    if avg_score > 0.2:
        sentiment_status = 'positive'
    elif avg_score < -0.2:
        sentiment_status = 'negative'
    else:
        sentiment_status = 'neutral'
    
    # Tính sentiment cho từng cổ phiếu
    stock_sentiments = []
    for symbol in sentiment_df['symbol'].unique():
        stock_sentiment = get_stock_sentiment_summary(symbol)
        if stock_sentiment:
            stock_sentiments.append(stock_sentiment)
    
    # Sắp xếp cổ phiếu theo điểm sentiment giảm dần
    stock_sentiments = sorted(stock_sentiments, key=lambda x: x['avg_score'], reverse=True)
    
    # Tạo tóm tắt
    summary = {
        'total_news': total_news,
        'positive_news': positive_news,
        'negative_news': negative_news,
        'neutral_news': neutral_news,
        'positive_ratio': positive_ratio,
        'negative_ratio': negative_ratio,
        'neutral_ratio': neutral_ratio,
        'avg_score': avg_score,
        'sentiment_status': sentiment_status,
        'stock_sentiments': stock_sentiments,
        'latest_update': datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }
    
    return summary

if __name__ == "__main__":
    analyze_news_data()
